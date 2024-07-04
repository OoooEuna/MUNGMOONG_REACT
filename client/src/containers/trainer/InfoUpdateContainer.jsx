import React, { useContext, useEffect, useState } from 'react';
import * as trainers from '../../apis/trainer';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContextProvider';
import InfoUpdate from '../../components/trainer/InfoUpdate';

// 트레이너 정보 수정
const InfoUpdateContainer = () => {
  // Context에서 로그인된 유저 정보 가져오기
  const { isLogin, userInfo } = useContext(LoginContext);

  // state 설정
  const [isLoading, setLoading] = useState(false)
  const [trainer, setTrainer] = useState({});
  const [careerList, setCareerList] = useState([]);
  const [certificateList, setCertificateList] = useState([]);

  const [newCareerList, setNewCareerList] = useState([]);

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

  const addCareerInput = () => {
    setNewCareerList([...newCareerList, { no: newCareerList.length + 1, name: '' }]);
  };

  const addCertificateInput = () => {
    setCertificateList([...certificateList, { no: certificateList.length + 1, imgFile: null, name: '' }]);
  };

  const handleCareerChange = (index, value) => {
    const newCareerList = [...careerList];
    newCareerList[index].name = value;
    setCareerList(newCareerList);
  };

  const handleCertificateChange = (index, value) => {
    const newCertificateList = [...certificateList];
    newCertificateList[index].name = value;
    setCertificateList(newCertificateList);
  };

  const handleContentChange = (value) => {
    setTrainer({ ...trainer, content: value });
  };

  const handleNewCareerChange = (index, value) => {
    const updatedNewCareerList = [...newCareerList];
    updatedNewCareerList[index].name = value;
    setNewCareerList(updatedNewCareerList);
  }

  // 훈련사 수정 정보 [저장]
  const onSubmit = async () => {

    // :::: [훈련사] - 경력 수정 ::::
    let trainerReq = {
      "no" : trainer.no,
      "userId" : trainer.userId,
      "careerList" : careerList
    }
    console.log(`trainerReq ::::::::::::`);
    console.dir(trainerReq)
    
    const response = await trainers.update(trainerReq)
    console.log(`response : ${response}`);
    console.log(`response.status : ${response.status}`);
    
    // :::: [훈련사] - 경력 추가 ::::
    let newTrainerReq = {
      "no" : trainer.no,
      "userId" : trainer.userId,
      "careerList" : newCareerList
    }
    console.log(`newTrainerReq ::::::::::::`);
    console.dir(newTrainerReq)
    
    const addCareerResponse = await trainers.addCareer(newTrainerReq)
    console.log(`response : ${response}`);
    console.log(`response.status : ${response.status}`);
    


  }

  return (
    <>
      <InfoUpdate
        trainer={trainer}
        careerList={careerList}
        newCareerList={newCareerList}
        certificateList={certificateList}
        addCareerInput={addCareerInput}
        addCertificateInput={addCertificateInput}
        handleCareerChange={handleCareerChange}
        handleNewCareerChange={handleNewCareerChange}
        handleContentChange={handleContentChange}
        handleCertificateChange={handleCertificateChange}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default InfoUpdateContainer;