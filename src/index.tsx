import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { createRoot } from 'react-dom/client';
import CodeBox from './components/code-box';
import MarkdownEditor from './components/markdown-editor';

const App = () => {
  return (
    <div>
      {/* <CodeBox /> */}
      <MarkdownEditor />
    </div>
  )
};

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(<App />);
