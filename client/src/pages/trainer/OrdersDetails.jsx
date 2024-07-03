import React from 'react'
import OrdersDetailsContainer from '../../containers/trainer/OrdersDetailsContainer'
import { useParams } from 'react-router-dom'

const OrdersDetails = () => {
  // 🔗❓ 파라미터 가져오기
  const { no } = useParams()
  console.log(`no （︶^︶） : ${no}`);
  return (
    <>
      {/* Header */}
      <OrdersDetailsContainer no={no} />
      {/* Footer */}
    </>
  )
}

export default OrdersDetails