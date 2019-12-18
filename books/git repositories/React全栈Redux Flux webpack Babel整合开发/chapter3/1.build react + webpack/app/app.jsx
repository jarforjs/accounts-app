import React from 'react';
import ReactDOM from 'react-dom';
import VDraggable from './components/VDraggable';
const data = [
  {
      content: 'div1',
      code: '01',
      sort: 0,
  },
  {
      content: 'div2',
      code: '02',
      sort: 1
  },
  {
      content: 'div3',
      code: '03',
      sort: 2
  },
  {
      content: 'div5',
      code: '05',
      sort: 5
  },
  {
      content: 'div4',
      code: '04',
      sort: 4
  }]

function App() {
  return (
    <div className="container">
      {/* <VDraggable
        value={data}
      /> */}
      <h1>hello world！</h1>
    </div>
  );
}

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<App />, app);
