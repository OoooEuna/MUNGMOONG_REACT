import React, { useEffect } from 'react'
import ProductsRead from '../../components/products/ProductsRead'
import { useState } from 'react'
import * as products from '../../apis/products'

const ProductsReadContainer = ({ id }) => {
  // 🧊 state
  const [products, setProducts] = useState({})
  const [isLoading, setLoading] = useState(false)

  // 🌞 함수
  const getProducts = async () => {
    // ⌚ 로딩 시작
    setLoading(true)
    const response = await products.select(id)
    const data = await response.data        // ⭐ board
    console.log(data);
    setProducts(data)
    setLoading(false)
    // ⌚ 로딩 끝
  }

  // ❓ hook
  useEffect( () => {
    getProducts()
  },[])

  return (
    <>
      <Read no={no} board={board} isLoading={isLoading} />
    </>
  )
}

export default ProductsReadContainer