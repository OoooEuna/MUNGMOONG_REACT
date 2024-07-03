import React from 'react'
import { Link } from 'react-router-dom';

const AdminProductsList = (prouctsList, isLoading) => {
  console.log(";;;;;;;;;;;;;;;;;;;" + prouctsList);
  return (
    <div className='container'>
      <h1>게시글 목록</h1>

      {

        !isLoading && prouctsList && (
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

              {prouctsList.map((products) =>
                  (
                    <tr key={products.id}>
                      <td>{products.id}</td>
                      <td>
                        <Link to={`/api/admin/${products.trainerNo}`}>
                          {products.name}
                        </Link>
                      </td>
                      <td>{products.description}</td>
                      <td>{products.content}</td>
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

export default AdminProductsList