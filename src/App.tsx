import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import ChooseGame from './Components/chooseGame';
import CompGame from './Components/compGame';
import HumanGame from './Components/humanGame';

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path = "/" element={<ChooseGame />}/>
        <Route path = "/humanGame" element={<HumanGame />}/>
        <Route path = "/compGame" element={<CompGame />}/>
      </Routes>
    </React.Fragment>
  );
}

export default App;
