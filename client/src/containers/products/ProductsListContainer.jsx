import React, { useEffect, useState } from 'react'
import List from '../../components/products/ProductsList'
import * as product from '../../apis/products'

const ProductsListContainer = () => {
  // 🧊 state
  const [productList, setProductList] = useState([])


  // 🌞 함수
  const getProductList = async () => {
    // ⌚ 로딩 시작
   // setLoading(true)
    const response = await product.list()
    const data = await response.data      // ⭐productsList
    setProductList(data)
   // setLoading(false)
    // ⌚ 로딩 끝
    
  }

  // ❓ hook
  useEffect( ()=> {
    getProductList()
  }, [])

  return (
    <>
      {/* 상품 목록 */}
      <List productList={productList} />
    </>
  )
}

export default ProductsListContainer