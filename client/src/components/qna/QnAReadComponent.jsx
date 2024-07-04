import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const QnAReadComponent = () => {
    const { no } = useParams();
    const [qna, setQnA] = useState(null); // setQnA 정의

    useEffect(() => {
        const fetchQnA = async () => {
            try {
                const response = await axios.get(`/api/qna/read?no=${no}`);
                setQnA(response.data);
            } catch (error) {
                console.error('Error fetching QnA:', error);
            }
        };
        fetchQnA();
    }, [no]);

    if (!qna) return <div>Loading...</div>;

    return (
        <div>
            <h1>{qna.title}</h1>
            <p>{qna.writer}</p>
            <p>{qna.content}</p>
            <p>{qna.regDate}</p>
            <p>{qna.updDate}</p>
        </div>
    );
};

export default QnAReadComponent;
