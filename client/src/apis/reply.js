import axios from "axios";

// 목록
export const list = () => axios.get("/api/replys")

// 등록
export const insert = (title, writer, content) => axios.post("/api/replys", {title, writer, content})

// 삭제
export const remove = (no) => axios.delete(`/api/replys/${no}`)

