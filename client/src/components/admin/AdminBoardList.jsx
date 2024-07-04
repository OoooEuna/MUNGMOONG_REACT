import React from 'react'
import './admin.css'
import { Link } from 'react-router-dom';

const AdminBoardList = ({ boardList, isLoading }) => {
  console.log(";;;;;;;;;;;;;;;;;;;" + boardList);
  return (
    <div className='container'>
      <div className="inner">
        <h1>게시글 목록</h1>

        <nav className='navbar navbar-expand-lg navbar-light'>
          <div className='collapse navbar-collapse justify-content-start'>
            <ul className='navbar-nav'>
              <li className='nav-item'><Link className='tab-button' to={`/api/admin/admin_info`}>회원정보</Link></li>
              <li className='nav-item'><Link className='tab-button' to={`/api/admin/admin_trainer`}>훈련사</Link></li>
              <li className='nav-item'><Link className='tab-button' to={`/api/admin/admin_product`}>상품정보</Link></li>
              <li className='nav-item'><Link className='tab-button' to={`/api/admin/admin_board`}>게시판</Link></li>
            </ul>
          </div>
        </nav>

        {

          !isLoading && boardList && (
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>제목</th>
                  <th>작성자</th>
                  <th>등록일자</th>
                </tr>
              </thead>
              <tbody>

                {boardList.map((board) =>
                (
                  <tr key={board.no}>
                    <td className='text-truncate'>{board.no}</td>
                    <td className='text-truncate'><Link to={`/api/admin/admin_board_read/${board.no}`}>{board.title}</Link></td>
                    <td className='text-truncate'>{board.writer}</td>
                    <td className='text-truncate'>{board.regDate}</td>
                  </tr>
                )
                )}
              </tbody>
            </table>
          )
        }
      </div>
    </div>
  )
}

export default AdminBoardList