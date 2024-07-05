import api from './api';

// 목록
export const list = () => api.get("/api/orders")

// 조회
export const select = (no) => api.get(`/api/orders/${no}`)

// 등록
export const insert = (orders) => api.post("/api/orders", orders)

// 수정
export const update = (orders) => api.put("/api/orders", {orders})

// 삭제
export const remove = (no) => api.delete(`/api/orders/${no}`)

