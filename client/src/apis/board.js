// 💻 npm install axios
import axios from 'axios';

// 목록
export const list = () => axios.get("/api/board")

// 조회
export const select = (no) => axios.get(`/api/board/${no}`)

// 등록
export const insert = (title, writer, content) => axios.post("/api/board", {title, writer, content})

// 수정
export const update = (no, title, writer, content) => axios.put("/api/board", {no,title,writer,content})

// 삭제
export const remove = (no) => axios.delete(`/api/board/${no}`)