import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Home from './pages/Home';
import List from './pages/board/List';
import Read from './pages/board/Read';
import Update from './pages/board/Update';
import ProductsList from './pages/products/ProductsList';

function App() {
  return (
    <BrowserRouter>

      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/api/board" element={ <List/> }></Route>
          <Route path="/api/products" element={ <ProductsList/> }></Route>
          {/* <Route path="/api/login" element={ <LoginPage/> }></Route> */}

        </Routes>
        <Footer />
      </div>
    </BrowserRouter>

  );
}
export default App;

