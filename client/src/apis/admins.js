// 💻 npm install axios
import axios from 'axios';

// ------------------------- 유저정보 -------------------------
// 회원 목록
export const AdminUserList = () => axios.get("/api/admin/admin_info")

// 조회
export const AdminUserRead = (no) => axios.get(`/api/admin/${no}`)

// 삭제
export const AdminUserRemove = (no) => axios.delete(`/api/admin/${no}`)


// ------------------------- 트레이너 정보 -------------------------
// 훈련사 목록
export const AdminTrainerList = () => axios.get("/api/admin/admin_trainer")


// ------------------------- 예약정보 -------------------------
export const AdminProductsList = () => axios.get("/api/admin/admin_reserve")


// ------------------------- 게시판 정보 -------------------------
export const AdminBoardList = () => axios.get("/api/admin/admin_board")


// ------------------------- 판매상품 정보 -------------------------