import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './layout/Footer';
import Header from './layout/Header';
import Home from './pages/Home';
import List from './pages/board/List';
import Read from './pages/board/Read';

import Update from './pages/board/Update';
import TrainerInfo from './components/trainer/TrainerInfo';
// QnA 관련 경로 추가
// import QnAInsert from './pages/qna/QnAInsert';
// import QnAList from './pages/qna/QnAList';
// import QnARead from './pages/qna/QnARead';
// import QnAUpdate from './pages/qna/QnAUpdate';
=======
import Orders from './components/trainer/Orders';
import LoginPage from './pages/users/LoginPage';
import LoginContextProvider from './contexts/LoginContextProvider';
import RegisterPage from './pages/users/RegisterPage';
import './css/font.css';



function App() {
  return (
    <BrowserRouter>
<LoginContextProvider>
    <div className='App'>
    <Header />
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/api/trainer/orders" element={ <Orders/> }></Route>
      {/* <Route path="/api/products" element={ <ProductsList/> }></Route> */}
      {/* <Route path="/api/login" element={ <LoginPage/> }></Route> */}
      <Route path="/api/board" element={ <List/> }></Route>
      <Route path="/api/board/insert" element={ <Insert/> }></Route>
      <Route path="/api/board/:no" element={ <Read/> }></Route>
      <Route path="/api/board/update/:no" element={ <Update/> }></Route>
      {/* QnA 관련 경로 추가 */}
      {/* <Route path='/api/qna/list' element={<QnAList />} />
      <Route path='/api/qna/read/:no' element={<QnARead />} />
      <Route path='/api/qna/update/:no' element={<QnAUpdate />} />
      <Route path='/api/qna/insert' element={<QnAInsert />} /> */}

    </Routes>
    <Footer />
    </div>
    </LoginContextProvider>
  </BrowserRouter>

  );
}
export default App;

