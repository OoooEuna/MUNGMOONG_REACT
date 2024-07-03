import React from 'react';
import { Link } from 'react-router-dom';

const ProductsRead = ({ id, products }) => {
  console.log("read 아이디 뜨니");
  console.log(id);

  return (
    <div className='container'>
      <h1 className="title">게시글 조회</h1>
      <h3>훈련사아이디</h3>
      <hr />

      {products && (
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
                <input type="date" value={products.createdAt} readOnly />
              </td>
            </tr>
            <tr>
              <td>수정일</td>
              <td>
                <input type="date" value={products.updatedAt} readOnly />
              </td>
            </tr>
            {/* <tr>
              <td>썸네일</td>
              <td>
                <input type="" value={products.thumbnail} readOnly />
              </td>
            </tr>
            <tr>
              <td>썸네일아이디</td>
              <td>
                <input type="text" value={products.thumbnailId} readOnly />
              </td>
            </tr>
            <tr>
              <td>파일</td>
              <td>
                <input type="" value={products.files} readOnly />
              </td>
            </tr> */}
          </tbody>
        </table>
      )}
      
      <hr />
      <div className="btn-box">
        <Link to="/api/products" className='btn'>목록</Link>
      </div>
    </div>
  );
};

export default ProductsRead;
