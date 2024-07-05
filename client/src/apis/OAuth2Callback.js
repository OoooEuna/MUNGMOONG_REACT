import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OAuth2Callback = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    useEffect(() => {
        if (token) {
            console.log('Received JWT Token:', token);
            // JWT 토큰을 로컬 스토리지에 저장
            localStorage.setItem('jwtToken', token);
            // 로그인 완료 후 홈 페이지로 리다이렉트
            navigate('/');
        } else {
            console.error('No token found in query params.');
            // 에러 페이지로 리다이렉트
            navigate('/error');
        }
    }, [token, navigate]);

    return <div>Logging in...</div>;
};

export default OAuth2Callback;
