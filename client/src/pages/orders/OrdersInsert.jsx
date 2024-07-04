import React from 'react'
import OrdersInsertContainer from '../../containers/orders/OrdersInsertContainer'

const OrdersInsert = () => {
  const { no } = useParams()
  console.log(`no : ${no}`);
  return (
    <>
      {/* Header */}
      <OrdersInsertContainer no={no}/>
      {/* Footer */}
    </>
  )
}

export default OrdersInsert



