import React from 'react'
import { Link } from 'react-router-dom';

const AdminProductsList = ({ productsList, isLoading }) => {
  console.log(";;;;;;;;;;;;;;;;;;;" + productsList);
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


        <div className="Cbtn">
          <Link to="/api/admin/admin_product_insert">훈련상품 등록</Link>
        </div>


        {

          !isLoading && productsList && (
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

                {productsList.map((products) =>
                (
                  <tr key={products.id}>
                    <td className='text-truncate'>{products.id}</td>
                    <td className='text-truncate'>
                      <Link to={`/api/admin/admin_product_read/${products.id}`}>
                        {products.name}
                      </Link>
                    </td>
                    <td className='text-truncate'>{products.description}</td>
                    <td className='text-truncate'>{products.content}</td>
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

export default AdminProductsList