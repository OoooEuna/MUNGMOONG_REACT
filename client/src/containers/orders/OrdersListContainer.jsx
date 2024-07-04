import React, { useEffect, useState } from 'react'
import List from '../../components/orders/OrderList'
import * as orders from '../../apis/orders'

const OrdersListContainer = () => {
  // 🧊 state
  const [orderList, setOrderList] = useState([])

  // 🌞 함수
  const getOrdersList = async () => {
    // ⌚ 로딩 시작
   // setLoading(true)
    const response = await orders.list()
    const data = await response.data      // ⭐productsList
    setOrderList(data)
   // setLoading(false)
    // ⌚ 로딩 끝
    
  }

  // ❓ hook
  useEffect( ()=> {
    getOrdersList()
  }, [])

  return (
    <>
      {/* 상품 목록 */}
      <List orderList={orderList} />
    </>
  )
}

export default OrdersListContainer