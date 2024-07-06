import React, { useContext, useEffect, useState } from 'react';
import * as trainers from '../../apis/trainer';
import * as Swal from '../../apis/alert'
import { LoginContext } from '../../contexts/LoginContextProvider';
import InfoUpdate from '../../components/trainer/InfoUpdate';

const InfoUpdateContainer = () => {
  const { isLogin, userInfo } = useContext(LoginContext);

  // state 설정
  const [isLoading, setLoading] = useState(false);
  const [trainer, setTrainer] = useState({});
  const [careerList, setCareerList] = useState([]);
  const [certificateList, setCertificateList] = useState([]);
  const [newCareerList, setNewCareerList] = useState([]);

  // 트레이너 정보 조회 (+ 경력, 자격증 리스트)
  const fetchTrainerInfo = async (userId) => {
    setLoading(true);
    try {
      const response = await trainers.info(userId);
      const data = response.data; // ⭐ trainer, careerList, certificateList
      console.dir(`data :D ${data}`);

      setTrainer(data.trainer);
      setCareerList(data.careerList);
      setCertificateList(data.certificateList);
    } catch (error) {
      console.error('Error fetching trainer info:', error);
    } finally {
      setLoading(false);
    }
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

  const handleDeleteCareer = async (careerNo) => {
    try {
      const response = await trainers.deleteCareer(careerNo);
      if (response.status === 200) {
        Swal.alert("경력 삭제 성공!", "경력 삭제가 완료되었습니다.", "success")
        setCareerList(careerList.filter(career => career.no !== careerNo));
      } else {
        return;
      }
    } catch (error) {
      console.error('Error occurred while deleting career:', error);
    }
  };

  // 훈련사 수정 정보 [저장]
  const onSubmit = async () => {
    try {
      // :::: [훈련사] - 경력 수정 ::::
      let trainerReq = {
        no: trainer.no,
        userId: trainer.userId,
        careerList: careerList,
        content: trainer.content // 추가된 content 필드
      };
      console.log(`trainerReq ::::::::::::`);
      console.dir(trainerReq);

      const response = await trainers.update(trainerReq);
      console.log(`response : ${response}`);
      console.log(`response.status : ${response.status}`);

      // 성공 응답 확인
      if (response.status === 200) {
        Swal.alert("수정 성공!", "훈련사 정보 수정이 완료되었습니다.", "success")
      } else {
        return; // 첫 번째 요청이 실패하면 함수 종료
      }

      // :::: [훈련사] - 경력 추가 ::::
      let newTrainerReq = {
        no: trainer.no,
        userId: trainer.userId,
        careerList: newCareerList,
        content: trainer.content // 추가된 content 필드
      };
      console.log(`newTrainerReq ::::::::::::`);
      console.dir(newTrainerReq);

      const addCareerResponse = await trainers.addCareer(newTrainerReq);
      console.log(`addCareerResponse : ${addCareerResponse}`);
      console.log(`addCareerResponse.status : ${addCareerResponse.status}`);

    } catch (error) {
      console.error('Error occurred while updating trainer info:', error);
    }
  };



  return (
    <>
      <InfoUpdate
        trainer={trainer}
        careerList={careerList}
        newCareerList={newCareerList}
        certificateList={certificateList}
        addCareerInput={addCareerInput}
        addCertificateInput={addCertificateInput}
        handleDeleteCareer={handleDeleteCareer}
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
