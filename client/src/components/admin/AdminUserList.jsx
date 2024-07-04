import React from 'react'
import { Link } from 'react-router-dom'

const AdminUserList = ({ usersList, isLoading, id }) => {
  console.log(";;;;;;;;;;;;;;;;;;;" + usersList);
  return (
    <div className='container'>
      <h1>게시글 목록</h1>

      {

        !isLoading && usersList && (
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

              {usersList.map((users) =>
                  (
                    <tr key={users.id}>
                      <td>{users.no}</td>
                      <td>
                        <Link to={`/api/admin/admin_info_read/${users.userId}`}>
                          {users.userId}
                        </Link>
                      </td>
                      <td>{users.name}</td>
                      <td>{users.regDate}</td>
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


export default AdminUserList