import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './layout/Footer';
import Header from './layout/Header';
import Home from './pages/Home';
import List from './pages/board/List';
import Read from './pages/board/Read';
import Update from './pages/board/Update';
import Orders from './components/trainer/Orders';
import LoginContextProvider from './contexts/LoginContextProvider';
import LoginPage from './pages/users/LoginPage'; 
// QnA 관련 경로 추가
import QnAInsert from './pages/qna/QnAInsert';
import QnAList from './pages/qna/QnAList';
import QnARead from './pages/qna/QnARead';
import QnAUpdate from './pages/qna/QnAUpdate';
// MyPage 경로 추가
import UserIndex from './pages/users/Index'; 
import UpdatePage from './pages/users/UpdatePage';


function App() {
  return (
    <BrowserRouter>
      <LoginContextProvider>
        <div className='App'>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/api/trainer/info/" element={<Orders />} />
            <Route path="/api/login" element={<LoginPage />} />
            <Route path="/api/board" element={<List />} />
            <Route path="/api/board/:no" element={<Read />} />
            <Route path="/api/board/update/:no" element={<Update />} />
            {/* QnA 관련 경로 추가 */}
            <Route path='/api/qna/list' element={<QnAList />} />
            <Route path='/api/qna/read/:no' element={<QnARead />} />
            <Route path='/api/qna/update/:no' element={<QnAUpdate />} />
            <Route path='/api/qna/insert' element={<QnAInsert />} />
            {/* MyPage 관련 경로 추가 */}
            <Route path='/api/users' element={<UserIndex />} />
            <Route path='/api/users/index' element={<UserIndex />} />
            <Route path="/api/users/update" element={<UpdatePage />} />
        
          </Routes>
          <Footer />
        </div>
      </LoginContextProvider>
    </BrowserRouter>
  );
}

export default App;
