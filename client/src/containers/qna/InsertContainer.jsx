import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as qna from '../../apis/qna'; 
import InsertForm from '../../components/qna/InsertForm'; 

// 게시글 등록
const InsertContainer = () => {
  const navigate = useNavigate();

  const onInsert = async (title, writer, content) => {
    try {
      const response = await qna.insert(title, writer, content);
      alert('등록 완료');
      console.log(response.data);

      // 게시글 목록 이동
      navigate('/qna');
    } catch (e) {
      console.log(e);
    }
  };

  return <InsertForm onInsert={onInsert} />;
};

export default InsertContainer;
