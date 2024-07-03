import React, { useContext, useState } from 'react'
import { LoginContext } from '../../contexts/LoginContextProvider'
import OrderDetails from '../../components/trainer/OrdersDetails'

// 예약 상세 보기 (펫 정보)
const OrdersDetailsContainer = () => {

  // state 설정
  const [orders, setOrders] = useState(null)
  const [pet, setPet] = useState(null)

  // orders 정보 조회

  return (
    <>
      <OrderDetails />
    </>
  )
}

export default OrdersDetailsContainer