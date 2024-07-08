import api from './api';
import axios from 'axios';

// 로그인
export const login = (username, password) => api.post(`/login?username=${username}&password=${password}`)

// 사용자 정보
export const info = () => api.get(`/api/users/info`)

// 회원 가입 
export const join = (data) => api.post(`/users`, data)

// 회원 정보 수정
export const update = (data) => api.put(`/users`, data)

// 회원 탈퇴
export const remove = (userId) => api.delete(`/users/${userId}`)

// 소셜 로그인
export const socialLogin = async (provider) => {
    return axios.get(`/api/oauth2/login/${provider}`);
  };