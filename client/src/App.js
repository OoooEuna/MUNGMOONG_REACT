import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/trainer/info/:userId" component={TrainerInfo} />
     
    </Routes>
  </BrowserRouter>
  );
}

export default App;