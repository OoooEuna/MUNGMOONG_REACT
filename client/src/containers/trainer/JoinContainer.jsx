import React, { useContext, useState, useEffect } from 'react';
import Join from '../../components/trainer/Join';
import * as trainers from '../../apis/trainer';
import { LoginContext } from '../../contexts/LoginContextProvider';

// 트레이너 정보 등록
const JoinContainer = () => {
  const { userInfo } = useContext(LoginContext);
  const [userDetails, setUserDetails] = useState(null);
  const [careerList, setCareerList] = useState(['']);
  const [certificateList, setCertificateList] = useState([{ name: '', file: null }]);
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    if (userInfo) {
      trainers.getUserInfo(userInfo.no)
        .then(response => {
          setUserDetails(response.data);  // userDetails에서 data 필드로 접근
        })
        .catch(error => {
          console.error('Error loading user details:', error);
        });
    }
  }, [userInfo]);

  const addCareerInput = () => {
    setCareerList([...careerList, '']);
  };

  const handleCareerChange = (index, value) => {
    const newCareerList = [...careerList];
    newCareerList[index] = value;
    setCareerList(newCareerList);
  };

  const addCertificateInput = () => {
    setCertificateList([...certificateList, { name: '', file: null }]);
  };

  const handleCertificateChange = (index, field, value) => {
    const newCertificateList = [...certificateList];
    newCertificateList[index][field] = value;
    setCertificateList(newCertificateList);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleThumbnailChange = (event) => {
    setThumbnail(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userDetails) {
      const formData = new FormData();
      formData.append('userId', userDetails.userId);
      formData.append('name', userDetails.name);
      formData.append('gender', userDetails.gender);
      formData.append('birth', userDetails.birth);
      formData.append('address', userDetails.address);
      formData.append('phone', userDetails.phone);
      formData.append('mail', userDetails.email);
      formData.append('content', content);
      formData.append('thumbnail', thumbnail);
      formData.append('careerList', JSON.stringify(careerList));
      
      certificateList.forEach((certificate, index) => {
        formData.append(`certificateList[${index}].name`, certificate.name);
        formData.append(`certificateList[${index}].file`, certificate.file);
      });

      try {
        const response = await trainers.join(userDetails.no, formData);
        console.log('Response:', response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.error('User is not logged in.');
    }
  };

  if (!userInfo) {
    return <div>Loading...</div>; // 혹은 다른 로딩 상태 표시
  }

  if (!userDetails) {
    return <div>Loading user details...</div>;
  }

  console.log('userInfo:', userInfo);
  console.log('userDetails:', userDetails);

  return (
    <Join
      userInfo={userDetails}
      handleSubmit={handleSubmit}
      careerList={careerList}
      addCareerInput={addCareerInput}
      handleCareerChange={handleCareerChange}
      certificateList={certificateList}
      addCertificateInput={addCertificateInput}
      handleCertificateChange={handleCertificateChange}
      content={content}
      handleContentChange={handleContentChange}
      handleThumbnailChange={handleThumbnailChange}
    />
  );
};

export default JoinContainer;
