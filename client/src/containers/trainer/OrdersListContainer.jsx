import React, { useContext, useEffect, useState } from 'react';
import * as trainer from '../../apis/trainer';
import { LoginContext } from '../../contexts/LoginContextProvider';
import Orders from '../../components/trainer/Orders';

// 예약요청 리스트 조회
const OrdersListContainer = () => {
  // Context에서 로그인된 유저 정보 가져오기
  const { userInfo } = useContext(LoginContext);
  
  // state 설정
  const [ordersList, setOrdersList] = useState([]);

  // 예약 요청 목록 데이터
  const getOrdersList = async (trainerNo) => {
    try {
      const response = await trainer.ordersList(trainerNo);
      const data = await response.data;
      console.log(data);
      setOrdersList(data);
    } catch (error) {
      console.error('Failed to fetch orders list:', error);
    }
  }

  // getOrdersList() 함수를 호출
  useEffect(() => {
    if (userInfo && userInfo.no) {
      getOrdersList(userInfo.no);
    }
  }, [userInfo]);

  return (
    <>
      {/* 예약요청 목록 내려주기 */}
      <Orders ordersList={ordersList} />
    </>
  );
}

export default OrdersListContainer;
