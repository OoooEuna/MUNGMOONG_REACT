import axios from 'axios';

// 목록
export const list = () => axios.get("/api/qna/list");

// 상세
export const select = (no) => axios.get(`/api/qna/read?no=${no}`);

// 등록
export const insert = (qna) => axios.post("/api/qna/insert", qna);

// 수정
export const update = (qna) => axios.post("/api/qna/update", qna);

// 삭제
export const remove = (no) => axios.delete(`/api/qna/delete?no=${no}`);

// 댓글 목록
export const listReplies = (parent) => axios.get("/api/qna/reply", { params: { parent } });

// 댓글 등록
export const insertReply = (reply) => axios.post("/api/qna/reply", reply);
