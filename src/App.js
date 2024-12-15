import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './view/homeView';
import SelectView from './view/selectView';
import ResultView from './view/resultView';

function App() {
  return (
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/select" element={< SelectView/>} />
  <Route path="/result" element={< ResultView/>} />
</Routes>
  );
}

export default App;
