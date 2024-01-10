import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { createRoot } from 'react-dom/client';
import CodeBox from './components/code-box';

const App = () => {
  return (
    <div>
      <CodeBox />
    </div>
  )
};

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(<App />);
