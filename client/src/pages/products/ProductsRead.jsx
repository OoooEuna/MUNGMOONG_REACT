import React from 'react'
import ProductsReadContainer from '../../containers/products/ProductsReadContainer'
import { useParams } from 'react-router-dom'

const ProductsRead = () => {
  // 🔗❓ 파라미터 가져오기
  const { id } = useParams()
  console.log(`id : ${id}`);
  return (
    <>
      {/* Header */}
      <ProductsReadContainer id={id} />
      {/* Footer */}
    </>
  )
}

export default ProductsRead