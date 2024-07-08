import React, { useContext, useState, useEffect } from 'react';
import { LoginContext } from '../../contexts/LoginContextProvider';
import './css/login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const LoginPage = () => {
  const { login } = useContext(LoginContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberId, setRememberId] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Handle OAuth2 callback
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    const platform = queryParams.get('platform');

    if (code && platform) {
      console.log('OAuth2 Code:', code);
      console.log('OAuth2 Platform:', platform);

      axios.post('http://localhost:8080/api/oauth2/callback', { code, platform })
        .then(response => {
          console.log('OAuth2 Token Response:', response.data);
          const { token } = response.data;
          localStorage.setItem('accessToken', token);
          Swal.fire({
            title: '로그인 성공',
            text: '메인 화면으로 이동합니다.',
            icon: 'success',
            confirmButtonText: '확인'
          }).then(() => {
            navigate('/home');
          });
        })
        .catch(error => {
          console.error('Error fetching OAuth2 token:', error);
          Swal.fire({
            title: '로그인 실패',
            text: 'OAuth2 인증에 실패했습니다.',
            icon: 'error',
            confirmButtonText: '확인'
          });
        });
    }
  }, [location, navigate]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      Swal.fire({
        title: '로그인 성공! 🎉',
        text: '메인 화면으로 이동합니다 (●\'◡\'●)',
        icon: 'success',
        confirmButtonText: '확인'
      }).then(() => {
        navigate('/');
      });
    } catch (e) {
      setError('아이디 또는 비밀번호가 일치하지 않습니다.');
      Swal.fire({
        title: '로그인 실패',
        text: '아이디 또는 비밀번호가 일치하지 않습니다.',
        icon: 'error',
        confirmButtonText: '확인'
      });
    }
  };

  // Handle Naver login
  const handleNaverLogin = () => {
    const redirectUri = encodeURIComponent('http://localhost:8080/api/oauth2/callback/naver');
    const url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=ZFvyeddsFEaFFM0qJIcA&redirect_uri=${redirectUri}`;
    window.location.href = url;
  };

  // Handle Kakao login
  const handleKakaoLogin = () => {
    const redirectUri = encodeURIComponent('http://localhost:8080/api/oauth2/callback/kakao');
    const url = `https://kauth.kakao.com/oauth/authorize?client_id=6eab7537fc945cb54b219628a1e82f76&redirect_uri=${redirectUri}&response_type=code`;
    window.location.href = url;
  };

  return (
    <div className="login-wrapper">
      <img src="/img/logo.png" alt="로고" style={{ width: '80%' }} />
      <form id="user" className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="사용자 아이디"
          name="username"
          value={username}
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <p className="text-center text-danger">
            {error}
          </p>
        )}
        <div className="options">
          <label htmlFor="remember-id">
            <input
              type="checkbox"
              id="remember-id"
              name="remember-id"
              checked={rememberId}
              onChange={(e) => setRememberId(e.target.checked)}
            />
            아이디 저장
          </label>
          <label htmlFor="remember-me">
            <input
              type="checkbox"
              id="remember-me"
              name="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
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
        <button className="naver" onClick={handleNaverLogin}>
          <img src="/img/naver.svg" alt="Naver" style={{ width: '30px' }} />
          네이버로 로그인하기
        </button>
        <button className="kakao" onClick={handleKakaoLogin}>
          <img src="/img/kakao.png" alt="Kakao" style={{ width: '30px' }} />
          카카오로 로그인하기
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
