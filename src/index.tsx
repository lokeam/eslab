import 'bulmaswatch/superhero/bulmaswatch.min.css';
import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { unpkgPathPlugin } from './plugins/unpackage-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';
import CodeEditor from './components/code-editor';

const App = () => {
  const ref = useRef<any>();
  const iframe = useRef<any>();
  const [input, setInput] = useState('');

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    if (!ref.current) return;

    // Todo: clean this area up
    iframe.current.srcdoc = html;

    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [
        unpkgPathPlugin(), // First sort out pathing
        fetchPlugin(input) // Then fetch all the things
      ],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window'
      },
    });

    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
  }

  const html = `
  <html>
    <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch(err) {
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>'+err+'</div>'
              console.error(err);
            }
          }, false);
        </script>
      </body>
  </html>
  `;

  const codeEditorInitialValue="let editMe = true;"

  return (
    <div>
      <CodeEditor
        initialValue={codeEditorInitialValue}
        onChange={(value) => setInput(value)}
      />
      <textarea 
        onChange={(event) => setInput(event.target.value)}
        value={input}
      >
      </textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <iframe
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html} />
    </div>
  )
};

ReactDOM.render(
  <App />,
  document.querySelector('#root')
);
