import React from 'react';
import QnAReadContainer from '../../containers/qna/QnAReadContainer';
import { useParams } from 'react-router-dom';

const QnARead = () => {
  // 🔗❓ 파라미터 가져오기
  const { no } = useParams();
  console.log(`no : ${no}`);
  
  return (
    <>
      <QnAReadContainer no={no} />
    </>
  );
};

export default QnARead;
