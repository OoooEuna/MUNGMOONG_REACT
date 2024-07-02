import React, { useEffect, useState } from 'react';
import List from '../../components/qna/QnAList';
import * as qna from '../../apis/qna';

const QnAListContainer = () => {
  // 🧊 state
  const [qnaList, setQnaList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  // 🌞 함수
  const getQnaList = async () => {
    // ⌚ 로딩 시작
    setLoading(true);
    const response = await qna.list();
    const data = response.data; // ⭐qnaList
    setQnaList(data);
    setLoading(false);
    // ⌚ 로딩 끝
  };

  // ❓ hook
  useEffect(() => {
    getQnaList();
  }, []);

  return (
    <>
      {/* 게시글 목록 */}
      <List qnaList={qnaList} isLoading={isLoading} />
    </>
  );
};

export default QnAListContainer;
