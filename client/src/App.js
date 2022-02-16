import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Tasks } from './components';
import './App.css';
import './styles/global.scss';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/:param" element={<Tasks />} />
          <Route path="/" element={<Tasks />} />
          {/** Other routes... */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
