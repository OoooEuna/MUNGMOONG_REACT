import React from 'react'
import OrdersUpdateContainer from '../../containers/orders/OrdersUpdateContainer'
import { useParams } from 'react-router-dom'

const ordersUpdate = () => {
  const { no } = useParams()
  return (
    <>
      {/* Header */}
      <OrdersUpdateContainer no={no} />
      {/* Footer */}
    </>
  )
}

export default ordersUpdate