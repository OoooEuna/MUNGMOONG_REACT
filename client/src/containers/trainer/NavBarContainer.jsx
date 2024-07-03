import React, { useContext, useEffect, useState } from 'react';
import NavBar from '../../components/trainer/NavBar';
import * as trainer from '../../apis/trainer';
import { LoginContext } from '../../contexts/LoginContextProvider';

const NavBarContainer = () => {
  // Context
  const { userInfo } = useContext(LoginContext);

  // state
  const [trainerNo, setTrainerNo] = useState(null);

  // 트레이너 정보 조회
  const fetchTrainerInfo = async (userId) => {
    try {
      const response = await trainer.getTrainerInfo(userId);
      return response.data.no; // trainerNo 반환
    } catch (error) {
      console.error('트레이너 정보 조회 실패 - NavBarContainer ', error);
      return null;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (userInfo) {
        const fetchedTrainerNo = await fetchTrainerInfo(userInfo.userId);
        console.log(`유저 정보  : ${userInfo}`);
        console.log(`트레이너 번호  : ${fetchedTrainerNo}`);
        setTrainerNo(fetchedTrainerNo);
      }
    }

    fetchData();
  }, [userInfo]);

  return (
    <>
      <NavBar trainerNo={trainerNo} userId={userInfo ? userInfo.userId : null} />
    </>
  )
}

export default NavBarContainer;
