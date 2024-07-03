import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserUpdateComponent from '../../components/users/UserUpdateComponent';

const UserUpdateContainer = () => {
  const [user, setUser] = useState({
    name: '',
    password: '',
    birth: '',
    mail: '',
    phone: '',
    address: ''
  });

  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    // 초기 사용자 정보 로드
    axios.get('/api/users/me')
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 사용자 정보 업데이트 요청
    axios.post('/api/users/update', user)
      .then(response => {
        alert('사용자 정보가 성공적으로 업데이트되었습니다.');
      })
      .catch(error => {
        console.error('Error updating user data:', error);
      });
  };

  return <UserUpdateComponent user={user} confirmPassword={confirmPassword} handleChange={handleChange} handleConfirmPasswordChange={handleConfirmPasswordChange} handleSubmit={handleSubmit} />;
};

export default UserUpdateContainer;
