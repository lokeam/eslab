import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
  name: 'filecache'
});

/*
  test plugin that hardcodes 2 files, will handle different types of files
*/

export const unpkgPathPlugin = (textAreaInput: string) => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResolve', args);
        
        // proof of concept
        if (args.path === 'index.js') {
          return { path: args.path, namespace: 'a' };
        }

        // another naive 
        if (args.path.includes('./') || args.path.includes('../')) {
          return {
            namespace: 'a',
            path: new URL(
              args.path,
              'https://unpkg.com' + args.resolveDir + '/'
            ).href
          };
        }

        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`
        }
      });
 
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);
 
        // Todo: reduce number of requests react is requring us to download
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: textAreaInput,
          };
        }

        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
        if (cachedResult) {
          return cachedResult;
        }

        // check if file already cached
        const { data, request } = await axios.get(args.path);
        
        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname
        };

        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};
