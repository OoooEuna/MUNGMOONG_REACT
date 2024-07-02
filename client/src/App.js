import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Home from './pages/Home';
import List from './pages/board/List';
import Read from './pages/board/Read';
import Update from './pages/board/Update';
import Insert from './pages/board/Insert';
import TrainerInfo from './components/trainer/TrainerInfo';
// QnA 관련 경로 추가
import QnAInsert from './pages/qna/QnAInsert';
import QnAList from './pages/qna/QnAList';
import QnARead from './pages/qna/QnARead';
import QnAUpdate from './pages/qna/QnAUpdate';

function App() {
  return (
    <BrowserRouter>
    <div className='App'>
    <Header />
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/api/trainer/info/:userId" component={TrainerInfo}></Route>
      {/* <Route path="/api/login" element={ <LoginPage/> }></Route> */}
      <Route path="/api/board" element={ <List/> }></Route>
      <Route path="/api/board/insert" element={ <Insert/> }></Route>
      <Route path="/api/board/:no" element={ <Read/> }></Route>
      <Route path="/api/board/update/:no" element={ <Update/> }></Route>
      {/* QnA 관련 경로 추가 */}
      <Route path='/qna/list' element={<QnAList />} />
      <Route path='/qna/read/:no' element={<QnARead />} />
      <Route path='/qna/update/:no' element={<QnAUpdate />} />
      <Route path='/qna/insert' element={<QnAInsert />} />

    </Routes>
    <Footer />
    </div>
  </BrowserRouter>
  );
}

export default App;

