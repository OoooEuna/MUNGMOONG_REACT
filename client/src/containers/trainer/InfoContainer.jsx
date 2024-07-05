import React, { useContext, useEffect, useState } from 'react';
import * as trainers from '../../apis/trainer';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContextProvider';
import Info from '../../components/trainer/Info';

// 트레이너 정보 조회
const InfoContainer = () => {
  // Context에서 로그인된 유저 정보 가져오기
  const { isLogin, userInfo } = useContext(LoginContext);
  
  // state 설정
  const [ isLoading, setLoading ] = useState(false)
  const [trainer, setTrainer] = useState({});
  const [careerList, setCareerList] = useState([]);
  const [certificateList, setCertificateList] = useState([]);

  // 트레이너 정보 조회 (+ 경력, 자격증 리스트)
  const fetchTrainerInfo = async (userId) => {
    setLoading(true)
    const response = await trainers.info(userId);
    const data = response.data; // ⭐ trainer, careerList, certificateList
    console.dir(`data :D ${data}`);
    
    setTrainer(data.trainer);
    setCareerList(data.careerList);
    setCertificateList(data.certificateList);
    
    setLoading(false)
  };

  useEffect(() => {
    if (isLogin && userInfo.userId) {
      fetchTrainerInfo(userInfo.userId);
    }
  }, [isLogin, userInfo]);

  return (
    <>
      <Info trainer={trainer} careerList={careerList} certificateList={certificateList} />
    </>
  );
};

export default InfoContainer;
