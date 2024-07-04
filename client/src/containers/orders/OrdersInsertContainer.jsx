import React from 'react'
import OrdersInsert from '../components/orders/OrdersInsert'
import * as orders from '../apis/orders'
import { useNavigate } from 'react-router-dom'

const OrdersInsertContainer = () => {
  const navigate = useNavigate()
  // 🧊 state
  // 🌞 함수
  // const onInsert = async (title, writer, content) => {
  const onInsert = async (ID, PRODUCT_ID, USER_ID, pet_no, trainer_no, address, resDate, MEMO, TITLE, price, STATUS) => {
    try {
      // const response = await productss.insert(title, writer, content)
      const response = await orders.insert(ID, PRODUCT_ID, USER_ID, pet_no, trainer_no, address, resDate, MEMO, TITLE, price, STATUS)
      const status = await response.status
      console.log(`게시글 등록 요청 결과 : ${status}`);
      alert("게시글 등록 완료!")

      // ➡ 게시글 목록으로 이동
      navigate("/orders")
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <OrdersInsert onInsert={onInsert} />
    </>
  )
}

export default OrdersInsertContainer

