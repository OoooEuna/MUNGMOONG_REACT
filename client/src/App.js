import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import List from './pages/board/List';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/api/board" element={ <List/> }></Route>
     
    </Routes>
  </BrowserRouter>
  );
}

export default App;