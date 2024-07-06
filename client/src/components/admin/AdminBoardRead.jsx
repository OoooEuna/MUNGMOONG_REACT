import React from 'react'
import { Link } from 'react-router-dom'

const AdminBoardRead = ({ no, board, isLoading }) => {
  return (
    <div className='container'>
      <div className="inner">
        <h1 className="title">게시글 조회</h1>

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
                    <input type="text" value={board.title} readOnly />
                  </td>
                </tr>
                <tr>
                  <td>작성자</td>
                  <td>
                    <input type="text" value={board.userId} readOnly />
                  </td>
                </tr>
                <tr>
                  <td><span>내용</span></td>
                  <td>
                    <textarea cols="40" rows="10" value={board.content} readOnly></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
          )
        }
        <div className="btn-box bottom-btn">
          <Link to="/api/admin/admin_board" className='btn btn btn-primary btn-lg listBtn'>목록</Link>
          <Link to={`/api/admin/admin_board_update/${no}`} className='btn btn btn-secondary btn-lg updateBtn'>수정</Link>
        </div>
      </div>
    </div>
  )
}

export default AdminBoardRead