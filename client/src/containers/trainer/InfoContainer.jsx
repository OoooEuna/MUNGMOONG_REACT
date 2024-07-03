import React, { useContext, useEffect, useState } from 'react';
import * as trainer from '../../apis/trainer';
import { Link } from 'react-router-dom'
import { LoginContext } from '../../contexts/LoginContextProvider';

// 트레이너 정보 조회
const InfoContainer = () => {
  // Context에서 로그인된 유저 정보 가져오기
  const { isLogin, userInfo } = useContext(LoginContext);

  // state 설정
  

  return (
    <>
    </>
  )
}

export default InfoContainer