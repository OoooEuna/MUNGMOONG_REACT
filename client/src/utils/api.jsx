import axios from 'axios';

// 기본 URL 설정
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api', // 백엔드 API의 기본 URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    // 예: 인증 토큰 추가
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 예: 에러 처리
    if (error.response && error.response.status === 401) {
      // 401 Unauthorized 에러 처리
      // 예: 로그인 페이지로 리디렉션
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API 요청 함수들
export const login = (username, password) => {
  return apiClient.post('/login', { username, password });
};

export const fetchUser = () => {
  return apiClient.get('/user/profile');
};

export const oauth2Callback = (code, platform) => {
  return apiClient.post('/oauth2/callback', { code, platform });
};

// 기타 API 함수들 추가 가능
