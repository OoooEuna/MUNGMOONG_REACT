import React from 'react'
import { Link } from 'react-router-dom';
import formatDate from '../../apis/format'


const ProductsList = ({ productList, isLoading }) => {
  console.log(productList);
  return (
    <div className='container'>
       <h3>훈련상품 목록</h3>
       <Link to="/api/products/insert">글쓰기</Link>
       {
        isLoading &&
        <div>
          <img src="/img/loading.webp" alt="loading" width="100%" />
        </div>
      }
    {
        !isLoading && productList && (
          <table  border={1}>
            <thead>
              <tr>
                <th>name</th>
                <th>discription</th>
                <th>price</th>
                <th>content</th>

              </tr>
            </thead>
            <tbody>
            {productList.map((product) => 
                (
                  <tr key={product.id}>
                    <Link to={`/prodcuts/${product.id}`}>
                      {product.name}
                    </Link>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>{product.content}</td>

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

export default ProductsList