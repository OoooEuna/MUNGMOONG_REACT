import React from 'react';
import QnAUpdateContainer from '../../containers/qna/QnAUpdateContainer';
import { useParams } from 'react-router-dom';

const QnAUpdate = () => {
  const { no } = useParams();
  return (
    <>
      <QnAUpdateContainer no={no} />
    </>
  );
};

export default QnAUpdate;
