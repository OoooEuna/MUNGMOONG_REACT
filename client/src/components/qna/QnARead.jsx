import React from 'react';
import { Link } from 'react-router-dom';

const QnARead = ({ no, qna, isLoading }) => { 
  return (
    <div className='container'>
      <h1 className="title">문의 조회</h1>
      <h3>번호 : {no}</h3>
      <hr />

      {
        isLoading &&
        <div>
          <img src="/img/loading.webp" alt="loading" width="100%" />
        </div>
      }
      {
        !isLoading && qna && ( 
          <table>
            <tbody>
              <tr>
                <td>번호</td>
                <td>
                  <input type="text" value={no} readOnly />
                </td>
              </tr>
              <tr>
                <td>등록일자</td>
                <td>
                  <input type="text" value={qna.regDate} readOnly /> 
                </td>
              </tr>
              <tr>
                <td>제목</td>
                <td>
                  <input type="text" value={qna.title} readOnly /> 
                </td>
              </tr>
              <tr>
                <td>작성자</td>
                <td>
                  <input type="text" value={qna.writer} readOnly /> 
                </td>
              </tr>
              <tr>
                <td colSpan={2}>내용</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <textarea cols="40" rows="10" value={qna.content} readOnly></textarea> 
                </td>
              </tr>
            </tbody>
          </table>
        )
      }
      <hr />
      <div className="btn-box">
        <Link to="/api/qna" className='btn'>목록</Link>
        <Link to={`/api/qna/update/${no}`} className='btn'>수정</Link>
      </div>
    </div>
  )
}

export default QnARead;
