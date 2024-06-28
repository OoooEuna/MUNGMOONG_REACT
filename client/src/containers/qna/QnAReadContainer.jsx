import React, { useEffect, useState } from 'react';
import Read from '../../components/qna/QnARead';
import * as qnas from '../../apis/qna'; 

const QnAReadContainer = ({ no }) => {
  // 🧊 state
  const [qna, setQna] = useState({}); 
  const [isLoading, setLoading] = useState(false);

  // 🌞 함수
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

  // ❓ hook
  useEffect(() => {
    getQna(); 
  }, [no]);

  return (
    <>
      <Read no={no} qna={qna} isLoading={isLoading} /> 
    </>
  );
};

export default QnAReadContainer;
