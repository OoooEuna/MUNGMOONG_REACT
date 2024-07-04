import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QnAListComponent from '../components/qna/QnAListComponent';
import QnAReadComponent from '../components/qna/QnAReadComponent';
import QnAInsertComponent from '../components/qna/QnAInsertComponent';
import QnAUpdateComponent from '../components/qna/QnAUpdateComponent';
import QnADeleteComponent from '../components/qna/QnADeleteComponent';
import { Routes, Route } from 'react-router-dom';

const QnAContainer = () => {
    const [qnaList, setQnAList] = useState([]);
    const [qna, setQnA] = useState(null);
    const [page, setPage] = useState(1);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetchQnAList = async () => {
            try {
                const response = await axios.get('/api/qna/list', { params: { page } });
                setQnAList(response.data[0]);
                setOptions(response.data[1]);
            } catch (error) {
                console.error('Error fetching QnA list:', error);
            }
        };
        fetchQnAList();
    }, [page]);

    const fetchQnA = async (no) => {
        try {
            const response = await axios.get(`/api/qna/read?no=${no}`);
            setQnA(response.data);
        } catch (error) {
            console.error('Error fetching QnA:', error);
        }
    };

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <QnAListComponent
                        qnaList={qnaList}
                        setQnAList={setQnAList}
                        page={page}
                        setPage={setPage}
                        options={options}
                        setOptions={setOptions}
                    />
                }
            />
            <Route path="/read/:no" element={<QnAReadComponent fetchQnA={fetchQnA} qna={qna} />} />
            <Route path="/insert" element={<QnAInsertComponent />} />
            <Route path="/update/:no" element={<QnAUpdateComponent fetchQnA={fetchQnA} qna={qna} />} />
            <Route path="/delete/:no" element={<QnADeleteComponent />} />
        </Routes>
    );
};

export default QnAContainer;
