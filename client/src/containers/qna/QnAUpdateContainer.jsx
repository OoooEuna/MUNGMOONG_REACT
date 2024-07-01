import React, { useEffect, useState } from 'react';
import UpdateForm from '../../components/qna/QnAUpdateForm';
import * as qnas from '../../apis/qna'; 
import { useNavigate } from 'react-router-dom';

const QnAUpdateContainer = ({ no }) => {
  // 🧊 state
  const [qna, setQna] = useState({});
  const [isLoading, setLoading] = useState(false);

  // 🌞 함수
  const navigate = useNavigate();

  const getQna = async () => {
    // ⌚ 로딩 시작
    setLoading(true);
    const response = await qnas.select(no); 
    const data = await response.data; // ⭐ qna
    console.log(data);
    setQna(data);
    setLoading(false);
    // ⌚ 로딩 끝
  };

  const onUpdate = async (no, title, writer, content) => {
    try {
      const response = await qnas.update(no, title, writer, content); 
      const status = await response.status;
      console.log(`게시글 수정 요청 결과 : ${status}`);
      alert("게시글 수정 완료!");

      // ➡ 게시글 목록으로 이동
      navigate("/api/qna"); 
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async (no) => {
    const response = await qnas.remove(no);
    const status = await response.status;
    console.log(`게시글 삭제 요청 결과 : ${status}`);
    alert("삭제 완료!");

    // ➡ 게시글 목록으로 이동
    navigate("/api/qna"); 
  };

  // ❓ hook
  useEffect(() => {
    getQna(); 
  }, [no]);

  return (
    <>
      <UpdateForm
        no={no}
        qna={qna} 
        onUpdate={onUpdate}
        onDelete={onDelete}
        isLoading={isLoading}
      />
    </>
  );
};

export default QnAUpdateContainer;
