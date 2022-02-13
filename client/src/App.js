import React from 'react';
import { Tasks } from './components';
import './App.css';
import './styles/global.scss';

function App() {
  return (
    <div className="App">
      <h1 className="heading">YOUR TASK LIST</h1>
      <Tasks />
    </div>
  );
}

export default App;
