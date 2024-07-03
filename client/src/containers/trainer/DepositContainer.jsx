import React, { useContext, useEffect, useState } from 'react';
import * as trainer from '../../apis/trainer';
import { LoginContext } from '../../contexts/LoginContextProvider';
import Deposit from '../../components/trainer/Deposit';

// 입금 내역서 리스트
const DepositContainer = () => {
  // Context에서 로그인된 유저 정보 가져오기
  const { isLogin, userInfo } = useContext(LoginContext);

  // state 설정
  const [isLoading, setLoading] = useState(false);
  const [trainerNo, setTrainerNo] = useState(null);
  const [ordersList, setOrdersList] = useState([]);
  const [totalApprovedAmount, setTotalApprovedAmount] = useState(null);
  // const [approvedOrdersList, setApprovedOrdersList] = useState(null)

  // 트레이너 정보 조회
  const fetchTrainerInfo = async (userId) => {
    try {
      const response = await trainer.getTrainerInfo(userId);
      console.log('트레이너 정보 조회 성공:', response.data);
      return response.data.no; // trainerNo 반환
    } catch (error) {
      console.error('트레이너 정보 조회 실패 :O', error);
      return null;
    }
  }

  // 예약 요청 목록 데이터 조회
  const fetchOrdersList = async (trainerNo) => {
    if (!trainerNo) return;

    setLoading(true); // 로딩 시작
    try {
      const response = await trainer.deposit(trainerNo);
      console.log('예약 요청 목록 조회 성공:', response.data);
      const { ordersList, totalApprovedAmount } = response.data;

      setOrdersList(ordersList);
      setTotalApprovedAmount(totalApprovedAmount);
      // setApprovedOrdersList(approvedOrdersList);
    } catch (error) {
      console.error('예약 요청 목록 조회 실패 :O', error);
    }
    setLoading(false); // 로딩 끝
  }

  // 데이터 로드
  useEffect(() => {
    if (isLogin && userInfo) {
      const { userId } = userInfo;
      fetchTrainerInfo(userId).then((result) => {
        if (result) {
          setTrainerNo(result);
          fetchOrdersList(result);
        }
      });
    }
  }, [isLogin, userInfo]); // isLogin 또는 userInfo가 변경될 때마다 실행

  return (
    <>
      <Deposit ordersList={ordersList} isLoading={isLoading} totalApprovedAmount={totalApprovedAmount} />
    </>
  )
}

export default DepositContainer;
