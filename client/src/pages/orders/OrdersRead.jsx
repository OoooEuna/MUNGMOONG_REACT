import React from 'react'
import OrdersReadContainer from '../../containers/orders/OrdersReadContainer'
import { useParams } from 'react-router-dom'

const OrdersRead = () => {
  // 🔗❓ 파라미터 가져오기
  const { no } = useParams()
  console.log(`no : ${no}`);
  return (
    <>
      {/* Header */}
        <OrdersReadContainer no={no}  />
      {/* Footer */}
    </>
  )
}

export default OrdersRead