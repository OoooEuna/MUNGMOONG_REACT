import React, { useContext, useState } from 'react';
import { LoginContext } from '../../contexts/LoginContextProvider'; // 컨텍스트 경로 확인
import './css/login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const { login, isLogin, logout } = useContext(LoginContext); // 컨텍스트에서 값 가져오기
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberId, setRememberId] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div className="login-wrapper">
      <img src="/img/logo.png" alt="로고" style={{ width: '80%' }} />
      <form id="user" className="login-form" onSubmit={handleSubmit}>
        <input type="hidden" name="_csrf" value="{CSRF_TOKEN}" /> {/* CSRF 토큰 처리 필요 */}
        <input
          type="text"
          placeholder="사용자 아이디"
          name="username"
          value={username}
          id="username"
          onChange={(e) => setUsername(e.target.value)} // 상태 업데이트
        />
        <input
          type="password"
          placeholder="비밀번호"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // 상태 업데이트
        />

        {error && (
          <p className="text-center text-danger">
            아이디 또는 비밀번호를 잘못 입력했습니다.
          </p>
        )}
        <div className="options">
          <label htmlFor="remember-id">
            <input
              type="checkbox"
              id="remember-id"
              name="remember-id"
              checked={rememberId}
              onChange={(e) => setRememberId(e.target.checked)} // 상태 업데이트
            />
            아이디 저장
          </label>
          <h1> &nbsp;&nbsp;&nbsp;</h1>
          <label htmlFor="remember-me">
            <input
              type="checkbox"
              id="remember-me"
              name="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)} // 상태 업데이트
            />
            로그인 상태 유지
          </label>
        </div>
        <button type="submit" className="login">로그인</button>
      </form>
      <div className="options">
        <Link to="/users/register">회원가입</Link>
        <Link to="/users/findId">아이디/비밀번호 찾기</Link>
      </div>
      <div className="social-login">
        <h3>소셜로그인</h3>
        <button className="naver">
          <a href="/oauth2/authorization/naver" style={{ color: 'white', textDecoration: 'none' }}>
            <img src="/img/naver.svg" style={{ width: '30px' }} /> 네이버로 로그인하기
          </a>
        </button>
        <button className="kakao">
          <a href="/oauth2/authorization/kakao" style={{ color: 'black', textDecoration: 'none' }}>
            <img src="/img/kakao.png" style={{ width: '30px' }} /> 카카오로 로그인하기
          </a>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
