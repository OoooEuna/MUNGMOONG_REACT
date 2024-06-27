import React, { useEffect, useState } from 'react';
import * as qna from '../../apis/qna'; // 상대 경로 수정
import BoardList from '../../components/qna/List'; // 필요하다면 임포트 추가

// 게시글 목록
const BoardListContainer = () => {
  // state 설정
  const [boardList, setBoardList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  // 게시글 목록 데이터
  const getBoardList = async () => {
    setLoading(true);
    const response = await qna.list();
    const data = await response.data;
    console.log(data);
    setBoardList(data);
    setLoading(false);
  };

  useEffect(() => {
    getBoardList();
  }, []);

  return <BoardList boardList={boardList} isLoading={isLoading} />;
};

export default BoardListContainer;
