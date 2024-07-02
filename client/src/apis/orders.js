// 💻 npm install axios
import axios from 'axios';

// 목록
export const list = () => axios.get("/api/orders")

// 조회
export const select = (no) => axios.get(`/api/orders/${no}`)

// 등록
export const insert = (orders) => axios.post("/api/orders", {orders})

// 수정
export const update = (orders) => axios.put("/api/orders", {orders})

// 삭제
export const remove = (no) => axios.delete(`/api/orders/${no}`)

