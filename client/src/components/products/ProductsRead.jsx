import React from 'react'
import { Link } from 'react-router-dom'
import '../products/css/ProductsRead.css'


const ProductsRead = ({ id, products, isLoading}) => {
  console.log(id);
  return (
    <div className='container'>
      <h1 className="title">게시글 조회</h1>
      <h3>훈련사아이디 : {id}</h3>
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
              <td>아이디</td>
              <td>
                <input type="text" value={products.id} readOnly />
              </td>
            </tr>
            <tr>
              <td>훈련사번호</td>
              <td>
                <input type="text" value={products.trainerNo} readOnly />
              </td>
            </tr>
            <tr>
              <td>이름</td>
              <td>
                <input type="text" value={products.name} readOnly />
              </td>
            </tr>
            <tr>
              <td>훈련간단소개</td>
              <td>
                <input type="text" value={products.description} readOnly />
              </td>
            </tr>
            <tr>
              <td>훈련</td>
              <td>
                <input type="text" value={products.content} readOnly />
              </td>
            </tr>
            <tr>
              <td>훈련금액</td>
              <td>
                <input type="text" value={products.price} readOnly />
              </td>
            </tr>
            <tr>
              <td>작성일</td>
              <td>
                <input type="text" value={products.createdAt} readOnly />
              </td>
            </tr>
            <tr>
              <td>수정일</td>
              <td>
                <input type="text" value={products.updatedAt} readOnly />
              </td>
            </tr>
          </tbody>
        </table>
  )
}
       <hr />
      <div className="btn-box">
        <Link to="/api/products" className='btn'>목록</Link>
      </div>
  </div>
  )
}

export default ProductsRead