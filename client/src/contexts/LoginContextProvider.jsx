import React, { createContext, useEffect, useState } from 'react';
import api from '../apis/api';
import * as auth from '../apis/auth';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const LoginContext = createContext();

const LoginContextProvider = ({ children }) => {
  const [isLogin, setLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [roles, setRoles] = useState({ isUser: false, isAdmin: false });
  const navigate = useNavigate();

  const loginCheck = async () => {
    const accessToken = localStorage.getItem('accessToken'); // 쿠키 대신 localStorage에서 토큰을 읽음
    console.log(`accessToken : ${accessToken}`);

    if (!accessToken) {
      console.log(`쿠키에 accessToken(jwt)가 없음 (˘･_･˘)`);
      logoutSetting();
      return;
    }

    console.log(`쿠키에 JWT(accessToken) 이 저장되어 있습니다! o(*￣▽￣*)ブ`);
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    try {
      const response = await auth.info();
      const data = response.data;
      console.log(`data : ${data}`);

      if (data === 'UNAUTHORIZED' || response.status === 401) {
        console.log(`accessToken(jwt) 이 만료되었거나 인증에 실패하였습니다 (⊙_⊙;)`);
        return;
      }

      console.log(`accessToken(jwt) 토큰으로 사용자 정보 요청 성공 ヽ(✿ﾟ▽ﾟ)ノ`);
      loginSetting(data, accessToken);
    } catch (error) {
      console.log(`error : ${error}`);
      // 오류가 발생했을 때, response를 사용하지 않고 오류 메시지만 출력하도록 수정
      logoutSetting();
    }
  };

  const login = async (username, password) => {
    try {
      const response = await auth.login(username, password);
      const data = response.data;
      const status = response.status;
      const headers = response.headers;
      const authorization = headers.authorization;
      const accessToken = authorization.replace('Bearer ', '');

      console.log(`data : ${data}`);
      console.log(`status : ${status}`);
      console.log(`headers : ${headers}`);
      console.log(`jwt : ${accessToken}`);

      if (status === 200) {
        localStorage.setItem('accessToken', accessToken); // 쿠키 대신 localStorage에 저장

        loginCheck();

        Swal.fire({
          title: '로그인 성공! 🎉',
          text: '메인 화면으로 이동합니다 (●\'◡\'●)',
          icon: 'success',
          confirmButtonText: '확인'
        }).then();
      }
    } catch (error) {
      Swal.fire({
        title: '로그인 실패 :(',
        text: '아이디 또는 비밀번호가 일치하지 않습니다',
        icon: 'error',
        confirmButtonText: '확인'
      });
      console.log(`로그인 실패 :(`);
    }
  };

  const loginSetting = (userData, accessToken) => {
    const { no, userId, authList } = userData;
    const roleList = authList.map(auth => auth.auth);

    console.log(`no : ${no}`);
    console.log(`userId : ${userId}`);
    console.log(`authList : ${authList}`);
    console.log(`roleList : ${roleList}`);

    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    setLogin(true);

    const updatedUserInfo = { no, userId, roleList };
    setUserInfo(updatedUserInfo);

    const updatedRoles = { isUser: false, isAdmin: false };
    roleList.forEach(role => {
      if (role === 'ROLE_USER') updatedRoles.isUser = true;
      if (role === 'ROLE_ADMIN') updatedRoles.isAdmin = true;
    });
    setRoles(updatedRoles);
  };

  const logoutSetting = () => {
    api.defaults.headers.common.Authorization = undefined;
    localStorage.removeItem('accessToken'); // 쿠키 대신 localStorage에서 제거
    setLogin(false);
    setUserInfo(null);
    setRoles({ isUser: false, isAdmin: false });
  };

  const logout = () => {
    Swal.fire({
      title: '로그아웃 하시겠습니까? (•_•)',
      text: '로그아웃을 진행합니다 (•_•)',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '로그아웃 성공 ( •̀ ω •́ )✧',
          text: '',
          icon: 'success',
          confirmButtonText: '확인'
        }).then(() => {
          logoutSetting();
          navigate('/');
        });
      }
    });
  };

  useEffect(() => {
    loginCheck();
  }, []);

  return (
    <LoginContext.Provider value={{ isLogin, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
