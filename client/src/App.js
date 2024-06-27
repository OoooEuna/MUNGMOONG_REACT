import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Home from './pages/Home';
import List from './pages/board/List';
import Read from './pages/board/Read';
import Update from './pages/board/Update';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/api/board" element={ <List/> }></Route>
      <Route path="/api/board/:no" element={ <Read/> }></Route>
      <Route path="/api/board/update/:no" element={ <Update/> }></Route>
     
    </Routes>
  </BrowserRouter>
  );
}

export default App;
