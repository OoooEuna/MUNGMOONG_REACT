import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const QnADeleteComponent = () => {
    const navigate = useNavigate();
    const { no } = useParams();

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/qna/delete?no=${no}`);
            navigate('/qna');
        } catch (error) {
            console.error('Error deleting QnA:', error);
        }
    };

    return (
        <div>
            <p>정말로 삭제하시겠습니까?</p>
            <button onClick={handleDelete}>삭제</button>
        </div>
    );
};

export default QnADeleteComponent;
