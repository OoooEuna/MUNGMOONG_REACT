import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Home from './pages/Home';
import List from './pages/board/List';

function App() {
  return (
    <BrowserRouter>

      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/api/board" element={ <List/> }></Route>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>

  );
}

export default App;
