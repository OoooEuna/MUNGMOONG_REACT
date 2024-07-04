import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const QnAUpdateComponent = () => {
    const { no } = useParams();
    const [title, setTitle] = useState('');
    const [writer, setWriter] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQnA = async () => {
            try {
                const response = await axios.get(`/api/qna/read?no=${no}`);
                const qna = response.data;
                setTitle(qna.title);
                setWriter(qna.writer);
                setContent(qna.content);
            } catch (error) {
                console.error('Error fetching QnA:', error);
            }
        };
        fetchQnA();
    }, [no]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`/api/qna/update`, { no, title, writer, content });
            navigate('/qna');
        } catch (error) {
            console.error('Error updating QnA:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>제목:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
                <label>작성자:</label>
                <input type="text" value={writer} onChange={(e) => setWriter(e.target.value)} required />
            </div>
            <div>
                <label>내용:</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
            </div>
            <button type="submit">수정</button>
        </form>
    );
};

export default QnAUpdateComponent;
