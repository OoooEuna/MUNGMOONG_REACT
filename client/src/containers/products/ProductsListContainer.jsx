import React, { useEffect, useState } from 'react'
import * as product from '../../apis/products'

const ProductsListContainer = () => {
  // 🧊 state
  const [productsList, setProductsList] = useState([])


  // 🌞 함수
  const getProductsList = async () => {
    // ⌚ 로딩 시작
   // setLoading(true)
    const response = await product.list()
    const data = await response.data      // ⭐productsList
    setProductsList(data)
   // setLoading(false)
    // ⌚ 로딩 끝
    
  }

  // ❓ hook
  useEffect( ()=> {
    getProductsList()
  }, [])

  return (
    <>
      {/* 상품 목록 */}
      <list productsList={productsList} />
    </>
  )
}

export default ProductsListContainer