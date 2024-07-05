import React from 'react'
import { Link } from 'react-router-dom'

const AdminProductsRead = ({id, products, isLoading}) => {
  return (
    <div className='container'>
      <h1 className="title">게시글 조회</h1>
      <h3>번호 : {id}</h3>
      <hr />

      {
        isLoading &&
        <div>
          <img src="/img/loading.webp" alt="loading" width="100%" />
        </div>
      }
      {
        !isLoading && products && (
          <table>
            <tbody>
              <tr>
                <td>트레이너번호</td>
                <td>
                  <input type="text" value={products.trainerNo} readOnly />
                </td>
              </tr>
              <tr>
                <td>제목</td>
                <td>
                  <input type="text" value={products.name} readOnly />
                </td>
              </tr>
              <tr>
                <td>가격</td>
                <td>
                  <input type="text" value={products.price} readOnly />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>내용</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <textarea cols="40" rows="10" value={products.content} readOnly></textarea>
                </td>
              </tr>
            </tbody>
          </table>
        )
      }
      <hr />
      <div className="btn-box">
        <Link to="/api/admin/admin_product" className='btn'>목록</Link>
        <Link to={`/api/admin/admin_product_update/${id}`} className='btn'>수정</Link>
      </div>
    </div>
  )
}

export default AdminProductsRead