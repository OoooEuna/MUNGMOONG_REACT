import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as qna from '../../apis/qna';
import BoardRead from '../../components/qna/Read'; 

// 게시글 조회
const BoardReadContainer = () => {
  const { no } = useParams();

  const [board, setBoard] = useState({});
  const [isLoading, setLoading] = useState(false);

  const getBoard = async () => {
    setLoading(true);
    try {
      const response = await qna.select(no);
      const data = response.data;
      console.log(data);
      setBoard(data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getBoard();
  }, []);

  return <BoardRead no={no} board={board} isLoading={isLoading} />;
};

export default BoardReadContainer;
