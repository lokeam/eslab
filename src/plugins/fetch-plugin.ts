import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
  name: 'filecache'
});

export const fetchPlugin = (textAreaInput: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        // Todo: reduce number of requests react is requring us to download
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: textAreaInput,
          };
        }

        // const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
        // if (cachedResult) {
        //   return cachedResult;
        // }

        // check if file already cached
        const { data, request } = await axios.get(args.path);

        // Proof of concept: loading CSS
        const loader = args.path.match(/.css$/) ? 'css' : 'jsx';

        const fileType = args.path.match(/.css$/) ? 'css' : 'jsx';

        const escaped = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");
        const contents = fileType === 'css'
          ? `
          const style = document.createElement('style');
          style.innerText = '${escaped}';
          document.head.appendChild(style);
        ` : data;

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname
        };

        await fileCache.setItem(args.path, result);

        return result;
      });
    }
  }
}

