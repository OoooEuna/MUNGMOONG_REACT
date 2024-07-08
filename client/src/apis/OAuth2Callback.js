import React, { useEffect } from 'react'; // Import React and useEffect
import { useNavigate, useLocation } from 'react-router-dom'; // Import navigate and location from react-router-dom
import Swal from 'sweetalert2'; // Import Swal from SweetAlert2

const OAuth2Callback = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    
    // Correct parameter extraction
    const token = queryParams.get('access_token') || queryParams.get('token');

    useEffect(() => {
        if (token) {
            console.log('Received JWT Token:', token);

            // Save JWT token to local storage
            localStorage.setItem('accessToken', token);

            // Show success alert
            Swal.fire({
                title: '로그인 성공',
                text: '메인 화면으로 이동합니다.',
                icon: 'success',
                confirmButtonText: '확인'
            }).then(() => {
                // Redirect to home page after success
                navigate('/');
            });
        } else {
            console.error('No token found in query params.');

            // Show error alert
            Swal.fire({
                title: '로그인 실패',
                text: '로그인 토큰을 찾을 수 없습니다. 다시 시도해 주세요.',
                icon: 'error',
                confirmButtonText: '확인'
            }).then(() => {
                // Redirect to error page after failure
                navigate('/error');
            });
        }
    }, [token, navigate]);

    return (
        <div>
            <p>로그인 중...</p>
        </div>
    );
};

export default OAuth2Callback;
