import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpackage-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

let service: esbuild.Service;
const bundle = async (userInput: string) => {
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
    });
  }

  try {
    const result = await service.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [
        unpkgPathPlugin(), // First sort out pathing
        fetchPlugin(userInput) // Then fetch all the things
      ],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window'
      },
    });

    return {
      code: result.outputFiles[0].text,
      err: ''
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        code: "",
        err: err.message,
      };
    } else {
      throw err;
    }
  }
};

export default bundle;
