import React from 'react'
import ProductsReadContainer from '../../containers/products/ProductsReadContainer'
import { useParams } from 'react-router-dom'

const ProductsRead = () => {
  // 🔗❓ 파라미터 가져오기
  const { no } = useParams()
  console.log(`no : ${no}`);
  return (
    <>
      {/* Header */}
      <ProductsReadContainer no={no} />
      {/* Footer */}
    </>
  )
}

export default ProductsRead