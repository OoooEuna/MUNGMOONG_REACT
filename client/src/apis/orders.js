// 💻 npm install axios
import axios from 'axios';

// 목록
export const orders = () => axios.get("/api/orders")

// 조회
export const getOne = (no) => axios.get(`/api/orders/${no}`)

// 등록
export const create = (orders) => axios.post("/api/orders", {title, writer, content})

// 수정
export const update = (orders) => axios.put("/api/orders", {no,title,writer,content})

// 삭제
export const destroy = (no) => axios.delete(`/api/products/${no}`)