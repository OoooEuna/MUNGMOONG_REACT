import React, { useEffect } from 'react';
import axios from 'axios';

const QnAListComponent = ({ qnaList, setQnAList, page, setPage, options, setOptions }) => {
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
    }, [page, setQnAList, setOptions]);

    return (
        <div>
            <h1>QnA List</h1>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>내용</th>
                        <th>등록일자</th>
                        <th>수정일자</th>
                    </tr>
                </thead>
                <tbody>
                    {qnaList.length === 0 ? (
                        <tr>
                            <td colSpan="6">조회된 게시글이 없습니다.</td>
                        </tr>
                    ) : (
                        qnaList.map(qna => (
                            <tr key={qna.no}>
                                <td>{qna.no}</td>
                                <td>{qna.title}</td>
                                <td>{qna.writer}</td>
                                <td>{qna.content}</td>
                                <td>{qna.regDate}</td>
                                <td>{qna.updDate}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <div>
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                <span>{page}</span>
                <button onClick={() => setPage(page + 1)}>Next</button>
            </div>
        </div>
    );
};

export default QnAListComponent;
