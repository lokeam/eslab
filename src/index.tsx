import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './state';
import CodeBox from './components/code-box';
import MarkdownEditor from './components/markdown-editor';
import BoxList from './components/box-list';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        {/* <CodeBox /> */}
        {/* <MarkdownEditor /> */}
        <BoxList />
      </div>
    </Provider>
  )
};

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(<App />);
