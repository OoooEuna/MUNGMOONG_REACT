import React from 'react'
import { Link } from 'react-router-dom';

const AdminBoardList = ({boardList, isLoading}) => {
    console.log(";;;;;;;;;;;;;;;;;;;" + boardList);
    return (
      <div className='container'>
        <h1>게시글 목록</h1>

        <div className='top_btn'>
          <ul>
            <li><Link to={`/api/admin/admin_info`}>회원정보</Link></li>
            <li><Link to={`/api/admin/admin_trainer`}>훈련사</Link></li>
            <li><Link to={`/api/admin/admin_product`}>상품정보</Link></li>
            <li><Link to={`/api/admin/admin_board`}>게시판1</Link></li>
          </ul>
        </div>
  
        {
  
          !isLoading && boardList && (
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
  
                {boardList.map((board) =>
                    (
                      <tr key={board.no}>
                        <td>{board.no}</td>
                        <td>
                          <Link to={`/api/admin/admin_board_read/${board.no}`}>
                            {board.title}
                          </Link>
                        </td>
                        <td>{board.writer}</td>
                        <td>{board.regDate}</td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          )
        }
      </div>
    )
  }

export default AdminBoardList