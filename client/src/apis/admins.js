// 💻 npm install axios
import axios from 'axios';

// 목록
export const AdminUserList = () => axios.get("/api/admin")

// 조회
export const AdminUserRead = (no) => axios.get(`/api/admin/${no}`)

// 삭제
export const AdminUserRemove = (no) => axios.delete(`/api/admin/${no}`)