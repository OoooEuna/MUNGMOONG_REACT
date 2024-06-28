import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const QnAInsertForm = ({ onInsert }) => {

  // 🧊 state
  const [title, setTitle] = useState('');
  const [writer, setWriter] = useState('');
  const [content, setContent] = useState('');
  const [answer, setAnswer] = useState('');

  // 🌞 함수
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  }
  const handleChangeWriter = (e) => {
    setWriter(e.target.value);
  }
  const handleChangeContent = (e) => {
    setContent(e.target.value);
  }
  const handleChangeAnswer = (e) => {
    setAnswer(e.target.value);
  }

  const onSubmit = () => {
    // 유효성 검사 ✅
    // ...
    onInsert(title, writer, content, answer);
  }

  return (
    <div className='container'>
      <h1 className='title'>문의하기</h1>
      <table>
        <tbody>
          <tr>
            <td>제목</td>
            <td>
              <input type="text"
                     value={title}
                     onChange={handleChangeTitle} />
            </td>
          </tr>
          <tr>
            <td>작성자</td>
            <td>
              <input type="text"
                     value={writer}
                     onChange={handleChangeWriter} />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>질문 내용</td>
          </tr>
          <tr>
            <td colSpan={2}>
              <textarea cols="40" rows="10"
                        value={content}
                        onChange={handleChangeContent}></textarea>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>답변</td>
          </tr>
          <tr>
            <td colSpan={2}>
              <textarea cols="40" rows="10"
                        value={answer}
                        onChange={handleChangeAnswer}></textarea>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="btn-box">
        <Link to="/api/qna" className='btn'>목록</Link>
        <button className='btn' onClick={ onSubmit }>등록</button>
      </div>
    </div>
  );
}

export default QnAInsertForm;
