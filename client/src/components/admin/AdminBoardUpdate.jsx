import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const AdminBoardUpdate = ({ no, board, onUpdate , onDelete , isLoading }) => {
    // 🧊 state
    const [title, setTitle] = useState('')
    const [writer, setWriter] = useState('')
    const [content, setContent] = useState('')
   
    // 🌞 함수
    const handleChangeTitle = (e) => {
      setTitle(e.target.value)
    }
    const handleChangeContent = (e) => {
      setContent(e.target.value)
    }
  
    const onSubmit = () => {
      onUpdate(no, title, writer, content)
    }
  
    const handleDelete = () => {
      const check = window.confirm("정말로 삭제하시겠습니까?")
      if( check ) {
        onDelete(no)
      }
    }
  
    useEffect( () => {
      if( board ) {
        setTitle(board.title)
        setWriter(board.writer)
        setContent(board.content)
      }
    }, [board])
    // [의존하는 객체] (⭐의존성 배열)
    // : 지정한 객체가 변화했을때, 다시 useEffect 를 실행한다.
  
  
  return (
    <div className='container'>
      <h1 className="title">게시글 조회</h1>
      <h3>번호 : {no}</h3>
      <hr />

      {
        isLoading &&
        <div>
          <img src="/img/loading.webp" alt="loading" width="100%" />
        </div>
      }
      {
        !isLoading && board && (
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
                  <input type="text" value={board.regDate} readOnly />
                </td>
              </tr>
              <tr>
                <td>제목</td>
                <td>
                  <input type="text" value={title} onChange={handleChangeTitle} />
                </td>
              </tr>
              <tr>
                <td>작성자</td>
                <td>
                  <input type="text" value={board.userId} readOnly />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>내용</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <textarea cols="40" rows="10" value={content} onChange={handleChangeContent}></textarea>
                </td>
              </tr>
            </tbody>
          </table>
        )
      }
      <hr />
      <div className="btn-box">
      <Link to="/api/admin/admin_board" className='btn'>목록</Link>
        <button className='btn' onClick={handleDelete}>삭제</button>
        <button className='btn' onClick={onSubmit}>수정</button>
      </div>
    </div>
  )
}

export default AdminBoardUpdate