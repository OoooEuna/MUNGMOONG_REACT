import React from 'react'
import { Link } from 'react-router-dom';

const AdminProductsList = ({ productsList, isLoading }) => {
  console.log(";;;;;;;;;;;;;;;;;;;" + productsList);
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


      <Link to="/api/admin/admin_product_insert">훈련상품 등록</Link>

      

      {

        !isLoading && productsList && (
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

              {productsList.map((products) =>
              (
                <tr key={products.id}>
                  <td>{products.id}</td>
                  <td>
                    <Link to={`/api/admin/admin_product_read/${products.id}`}>
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