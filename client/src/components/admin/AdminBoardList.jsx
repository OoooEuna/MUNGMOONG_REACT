import React from 'react'
import { Link } from 'react-router-dom';

const AdminBoardList = ({boardList, isLoading}) => {
    console.log(";;;;;;;;;;;;;;;;;;;" + boardList);
    return (
      <div className='container'>
        <h1>게시글 목록</h1>
  
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
                          <Link to={`/api/admin/${board.no}`}>
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