import axios from 'axios';

// 목록
export const list = () => axios.get("/api/qna/list");

// 조회
export const select = (no) => axios.get(`/api/qna/read?no=${no}`);

// 등록
export const insert = (title, writer, content, answer) => axios.post("/api/qna/insert", { title, writer, content, answer });

// 수정
export const update = (no, title, writer, content, answer) => axios.post("/api/qna/update", { no, title, writer, content, answer });

// 삭제
export const remove = (no) => axios.delete(`/api/qna/delete?no=${no}`);

// 댓글 목록
export const listReplies = (parent) => axios.get("/api/qna/reply", { params: { parent } });

// 댓글 등록
export const insertReply = (reply) => axios.post("/api/qna/reply", reply);
