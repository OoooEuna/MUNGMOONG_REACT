import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QnAInsertComponent = () => {
    const [title, setTitle] = useState('');
    const [writer, setWriter] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/api/qna/insert', { title, writer, content });
            navigate('/qna');
        } catch (error) {
            console.error('Error inserting QnA:', error);
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
            <button type="submit">저장</button>
        </form>
    );
};

export default QnAInsertComponent;
