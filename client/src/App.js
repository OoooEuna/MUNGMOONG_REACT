import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './layout/Footer';
import Header from './layout/Header';
import Home from './pages/Home';
import List from './pages/board/List';
import Read from './pages/board/Read';
import LoginPage from './pages/users/LoginPage';
import LoginContextProvider from './contexts/LoginContextProvider';
import RegisterPage from './pages/users/RegisterPage';
import './css/font.css';
import AdminUserList from './pages/admin/AdminUserList';
import AdminTrainerList from './pages/admin/AdminTrainerList';
import AdminBoardList from './pages/admin/AdminBoardList';
import OrdersListContainer from './containers/trainer/OrdersListContainer';
import Update from './pages/board/Update';

// QnA 관련 경로 추가
import QnAInsert from './pages/qna/QnAInsert';
import QnAList from './pages/qna/QnAList';
import QnARead from './pages/qna/QnARead';
import QnAUpdate from './pages/qna/QnAUpdate';

// MyPage 경로 추가
import UserIndex from './pages/users/Index'; 
import UpdatePage from './pages/users/UpdatePage';


import AdminProductsList from './pages/admin/AdminProductsList';
import OrdersList from './pages/trainer/OrdersList';
import OrdersDetails from './pages/trainer/OrdersDetails';
import Deposit from './pages/trainer/Deposit';

import ProductsList from './pages/products/ProductsList';
import ProductsRead from './pages/products/ProductsRead';


function App() {
  return (
    <BrowserRouter>
      <LoginContextProvider>
        <div className='App'>
          <Header />
          <Routes>
            {/* 메인 */}
            <Route path="/" element={<Home />} />

            {/* 유저영역 */}

            {/* 보드영역 */}
            <Route path="/api/trainer/orders" element={<OrdersListContainer />} />
            <Route path="/api/board" element={<List />} />
            <Route path="/api/board/:no" element={<Read />} />
            <Route path="/api/board/update/:no" element={<Update />} />

            {/* 훈련사영역 */}
            <Route path="/orders/:trainerNo" element={<OrdersList />} />
            <Route path="/orders_details/:no" element={<OrdersDetails />} />
            <Route path="/deposit" element={<Deposit />} />


          <Route path="/" element={<Home />}></Route>

            {/* 관리자영역 */}
            {/* <Route path="/api/admin/admin_info" element={<AdminUserList />} />
            <Route path="/api/admin/admin_trainer" element={<AdminTrainerList />} />
            <Route path="/api/admin/admin_board" element={<AdminBoardList />} />
            <Route path="/api/admin/admin_product" element={<AdminProductsList />} /> */}

            {/* 상품 결재 영역 */}
            <Route path="/api/products" element={<ProductsList />} />
            <Route path="/api/products/:id" element={<ProductsRead />} />

            {/* 로그인 영역 */}
            <Route path="/api/login" element={<LoginPage />} />
            <Route path="/api/register" element={<RegisterPage />} />

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
