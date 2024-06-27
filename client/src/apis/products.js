// 💻 npm install axios
import axios from 'axios';

// 목록
export const list = () => axios.get("/api/products")

// 조회
export const getOne = (id) => axios.get(`/api/products/${id}`)

// 등록
export const create = (products) => axios.post("/api/products", {products})

// 수정
export const update = (products) => axios.put("/api/products", {products})

// 삭제
export const destroy = (deleteIdList) => axios.delete(`/api/products/${deleteIdList}`)