import React, { useState } from 'react';
import Login from '../../pages/users/LoginPage'; // 로그인 페이지의 컴포넌트 경로 확인

function LoginContainer() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberId, setRememberId] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(false);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password, rememberId, rememberMe })
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token; // 서버가 반환하는 JWT 토큰

                // JWT 토큰을 로컬 스토리지에 저장하거나 쿠키에 저장
                localStorage.setItem('token', token);

                // 로그인 성공 후 페이지 이동 등
                // 예: window.location.href = '/dashboard';
            } else {
                setError(true);
            }
        } catch (error) {
            console.error('로그인 요청 중 오류 발생:', error);
            setError(true);
        }
    };

    return (
        <Login
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            rememberId={rememberId}
            setRememberId={setRememberId}
            rememberMe={rememberMe}
            setRememberMe={setRememberMe}
            error={error}
            handleSubmit={handleSubmit}
        />
    );
}

export default LoginContainer;
