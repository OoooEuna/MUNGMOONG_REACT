import React, { useContext, useEffect, useState } from 'react';
import * as trainer from '../../apis/trainer';
import { LoginContext } from '../../contexts/LoginContextProvider';
import OrdersList from '../../components/trainer/OrdersList';

// 예약 요청 리스트 조회
const OrdersListContainer = () => {
  // Context에서 로그인된 유저 정보 가져오기
  const { isLogin, userInfo } = useContext(LoginContext);
  
  // state 설정
  const [ordersList, setOrdersList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [trainerNo, setTrainerNo] = useState(null);

  // 트레이너 정보 조회
  const fetchTrainerInfo = async (userId) => {
    try {
      const response = await trainer.getTrainerInfo(userId);
      return response.data.no; // trainerNo 반환
    } catch (error) {
      console.error('트레이너 정보 조회 실패:', error);
      return null;
    }
  }

  // 예약 요청 목록 데이터 조회
  const fetchOrdersList = async (trainerNo) => {
    if (!trainerNo) return;

    setLoading(true); // 로딩 시작
    try {
      const response = await trainer.ordersList(trainerNo);
      setOrdersList(response.data);
    } catch (error) {
      console.error('예약 요청 목록 조회 실패:', error);
    }
    setLoading(false); // 로딩 끝
  }

    // meaning 수정
    const onMeaning = async (no, newMeaning) => {
      try {
        const response = await trainer.meaning(no, newMeaning);
        if (response.status === 200) {
          setOrdersList(prevOrdersList => 
            prevOrdersList.map(order => 
              order.no === no ? { ...order, meaning: newMeaning } : order
            )
          );
          console.log(`Meaning이 성공적으로 수정되었습니다 :)`, response);
        } else {
          console.error('Meaning 수정에 실패하였습니다. :(');
        }
      } catch (error) {
        console.error('Meaning 수정 에러... :(', error);
      }
    }
  

  
  // 데이터 로드
  useEffect(() => {
    const fetchData = async () => {
      console.log('유저 정보:', userInfo);
      
      const fetchedTrainerNo = await fetchTrainerInfo(userInfo.userId);
      setTrainerNo(fetchedTrainerNo);
      fetchOrdersList(fetchedTrainerNo);
    }

    if (isLogin && userInfo) {
      fetchData();
    }
  }, [isLogin, userInfo]);

  return (
    <>
      <OrdersList ordersList={ordersList} isLoading={isLoading} onMeaning={onMeaning} />
    </>
  );
}

export default OrdersListContainer;
