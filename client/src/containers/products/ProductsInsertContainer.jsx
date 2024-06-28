import React from 'react'
import ProductsInsertForm from '../components/products/ProductsInsertForm'
import * as products from '../apis/products'
import { useNavigate } from 'react-router-dom'

const ProductsInsertContainer = () => {
  const navigate = useNavigate()
  // 🧊 state
  // 🌞 함수
  // const onInsert = async (title, writer, content) => {
  const onInsert = async (formData, headers) => {
    try {
      // const response = await productss.insert(title, writer, content)
      const response = await products.insert(formData, headers)
      const status = await response.status
      console.log(`게시글 등록 요청 결과 : ${status}`);
      alert("게시글 등록 완료!")

      // ➡ 게시글 목록으로 이동
      navigate("/products")
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <ProductsInsertForm onInsert={onInsert} />
    </>
  )
}

export default ProductsInsertContainer