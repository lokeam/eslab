import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom';
import CodeBox from './components/code-box';

const App = () => {
  return (
    <div>
      <CodeBox />
    </div>
  )
};

ReactDOM.render(
  <App />,
  document.querySelector('#root')
);
