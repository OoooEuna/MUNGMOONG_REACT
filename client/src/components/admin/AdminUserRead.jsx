import React from 'react'
import { Link } from 'react-router-dom'

const AdminUserRead = ({id, users, isLoading}) => {
    return (
        <div className='container'>
          <h1 className="title">게시글 조회</h1>
          <h3>번호 : {id}</h3>
          <hr />
    
          {
            !isLoading && users && (
              <table>
                <tbody>
                  <tr>
                    <td>번호</td>
                    <td>
                      <input type="text" value={users.no} readOnly />
                    </td>
                  </tr>
                  <tr>
                    <td>등록일자</td>
                    <td>
                      <input type="text" value={users.regDate} readOnly />
                    </td>
                  </tr>
                  <tr>
                    <td>제목</td>
                    <td>
                      <input type="text" value={users.title} readOnly />
                    </td>
                  </tr>
                  <tr>
                    <td>작성자</td>
                    <td>
                      <input type="text" value={users.userId} readOnly />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>내용</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <textarea cols="40" rows="10" value={users.content} readOnly></textarea>
                    </td>
                  </tr>
                </tbody>
              </table>
            )
          }
          <hr />
          <div className="btn-box">
            <Link to="/api/admin/admin_info" className='btn'>목록</Link>
            <Link to={`/api/admin/admin_info/${id}`} className='btn'>수정</Link>
          </div>
        </div>
      )
    }

export default AdminUserRead