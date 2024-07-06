// 💻 npm install axios
import axios from 'axios';

// ------------------------- 유저정보 -------------------------
// 회원 목록
export const AdminUserList = () => axios.get("/api/admin/admin_info")

// 조회
export const AdminUserRead = (id) => axios.get(`/api/admin/admin_info_read/${id}`)

// 수정
export const AdminUpdate = (no, title, writer, content) => axios.put("/boards", {no,title,writer,content})




// ------------------------- 트레이너 정보 -------------------------
// 훈련사 목록
export const AdminTrainerList = () => axios.get("/api/admin/admin_trainer")
export const AdminTrainerRead = (no) => axios.get(`/api/admin/admin_trainer_read/${no}`)


// ------------------------- 예약정보 -------------------------

export const AdminReserveList = () => axios.get("/api/admin/admin_reserve")


// ------------------------- 게시판 정보 -------------------------
// 관리자 보드 목록
export const AdminBoardList = () => axios.get("/api/admin/admin_board")

// 관리자 보드 조회
export const AdminBoardRead = (no) => axios.get(`/api/admin/admin_board_read/${no}`)

// 관리자 보드 수정
export const AdminBoardUpdate = (no, title, writer, content) => axios.put("/api/admin/admin_board_read_update", {no, title, writer, content})

// 관리자 보드 삭제
export const AdminBoardRemove = (no) => axios.delete(`/api/admin/BoardDelete/${no}`)


// ------------------------- 판매상품 정보 -------------------------
// 관리자 판매상품 목록
export const AdminProductsList = () => axios.get("/api/admin/admin_product")

// 관리자 판매상품 조회
export const AdminProductsRead = (id) => axios.get(`/api/admin/admin_product_read/${id}`)

// 관리자 판매상품 등록
export const AdminProductsInsert = (id, name, trainerNo, description, content, price) => axios.post("/api/admin/admin_product_insert", {id, name, trainerNo, description, content, price})

// 관리자 판매상품 수정
export const AdminProductsUpdate = (id, name, trainerNo, content, price) => axios.put("/api/admin/admin_product_update", {id, name, trainerNo, content, price})

// 관리자 판매상품 삭제
export const AdminProductsDelete = (id) => axios.delete(`/api/admin/admin_product_delete/${id}`)















