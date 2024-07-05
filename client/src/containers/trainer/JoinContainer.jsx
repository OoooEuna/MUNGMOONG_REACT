import React, { useContext, useEffect, useState } from 'react';
import Join from '../../components/trainer/Join';
import * as trainers from '../../apis/trainer';
import * as Swal from '../../apis/alert';
import { LoginContext } from '../../contexts/LoginContextProvider';
import { useNavigate } from 'react-router-dom';

const JoinContainer = () => {
  const { userInfo } = useContext(LoginContext);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    if (userInfo) {
      trainers.getUserInfo(userInfo.no)
        .then(response => setUserDetails(response.data))
        .catch(error => console.error('Error loading user details:', error));
    }
  }, [userInfo]);

  const handleInsert = async (no, formData, headers) => {

    try {
      const response = await trainers.join(no ,formData, headers);
      const status = response.status;
      console.log(`훈련사 등록 요청 결과 : ${status}`);
      Swal.alert("훈련사 등록 완료!", "메인 페이지로 돌아갑니다.", "success", () => {
        navigate("/");
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  if (!userDetails) {
    return <div>Loading user details...</div>;
  }

  return (
    <Join
      userInfo={userDetails}
      onInsert={handleInsert}
    />
  );
};

export default JoinContainer;
