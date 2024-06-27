// 💻 npm install axios
import axios from 'axios';

// 목록
export const list = () => axios.get("/boards")

// 조회
export const select = (no) => axios.get(`/boards/${no}`)

// 등록
export const insert = (title, writer, content) => axios.post("/boards", {title, writer, content})

// 수정
export const update = (no, title, writer, content) => axios.put("/boards", {no,title,writer,content})

// 삭제
export const remove = (no) => axios.delete(`/boards/${no}`)