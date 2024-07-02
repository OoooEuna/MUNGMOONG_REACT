import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './layout/Footer';
import Header from './layout/Header';
import Home from './pages/Home';
import List from './pages/board/List';
import Read from './pages/board/Read';
import InfoList from './components/trainer/InfoList';
import LoginPage from './pages/users/LoginPage';
import LoginContextProvider from './contexts/LoginContextProvider';
import RegisterPage from './pages/users/RegisterPage';
import './css/font.css';
import AdminUserList from './pages/admin/AdminUserList';
import AdminTrainerList from './pages/admin/AdminTrainerList';
import AdminBoardList from './pages/admin/AdminBoardList';


function App() {
  return (
    <BrowserRouter>
<LoginContextProvider>
    <div className='App'>
    <Header />
    <Routes>
      {/* 메인 */}
      <Route path="/" element={<Home/>}></Route>


      {/* 유저영역 */}


      {/* 보드영역 */}
      <Route path="/api/board" element={ <List/> }></Route>
      <Route path="/api/board/:no" element={ <Read/> }></Route>
      {/* <Route path="/api/board/update/:no" element={ <Update/> }></Route> */}
      <Route path="/api/board" element={ <List/> }></Route>
      <Route path="/api/board/:no" element={ <Read/> }></Route>
      {/* <Route path="/api/board/update/:no" element={ <Update/> }></Route> */}


      {/* 훈련사영역 */}
      <Route path="/api/trainer/info/" element={ <InfoList/> }></Route>


      {/* 관리자영역 */}
      <Route path="/api/admin/admin_info" element={ <AdminUserList/> }></Route>
      <Route path="/api/admin/admin_trainer" element={ <AdminTrainerList/> }></Route>
      <Route path="/api/admin/admin_board" element={ <AdminBoardList/> }></Route>



      {/* 상품 결재 영역 */}
      {/* <Route path="/api/products" element={ <ProductsList/> }></Route> */}
      {/* <Route path="/api/products" element={ <ProductsList/> }></Route> */}


      {/* 로그인 영역 */}
      {/* <Route path="/api/login" element={ <LoginPage/> }></Route> */}
      <Route path="/api/login" element={ <LoginPage/> }></Route>
      <Route path="/api/register" element={ <RegisterPage/> }></Route>

    </Routes>
    <Footer />
    </div>
    </LoginContextProvider>
  </BrowserRouter>

  );
}
export default App;

