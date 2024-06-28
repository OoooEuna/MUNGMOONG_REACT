import React from 'react';
import { Link } from 'react-router-dom';

const QnAList = ({ qnaList, isLoading }) => {
  console.log(qnaList);
  return (
    <div className='container'>
      <h1>문의 게시판</h1>
      <Link to="/api/qna/insert">글쓰기</Link>

      {
        isLoading &&
        <div>
          <img src="/img/loading.webp" alt="loading" width="100%" />
        </div>
      }
      {
        !isLoading && qnaList && qnaList.length > 0 ? (
          <table border={1}>
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>등록일자</th>
              </tr>
            </thead>
            <tbody>
              {qnaList.map((qna) => 
                (
                  <tr key={qna.no}>
                    <td>{qna.no}</td>
                    <td>
                      <Link to={`/api/qna/${qna.no}`}>
                        {qna.title}
                      </Link>
                    </td>
                    <td>{qna.writer}</td>
                    <td>{qna.regDate}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        ) : (
          !isLoading && (
            <div>조회된 게시글이 없습니다.</div>
          )
        )
      }
    </div>
  );
}

export default QnAList;
