import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../../contexts/LoginContextProvider'
import OrderDetails from '../../components/trainer/OrdersDetails'
import * as trainer from '../../apis/trainer'

// 예약 상세 보기 (펫 정보)
const OrdersDetailsContainer = ( {no} ) => {

  // state 설정
  const [orders, setOrders] = useState({})
  const [pet, setPet] = useState({})
  const [isLoading, setLoading] = useState(false);

  // orders 정보 조회
  const getOrders = async () => {
    // ⌚ 로딩 시작
    setLoading(true);
    const response = await trainer.orders(no)
    const data = await response.data        // ⭐ orders
    console.log(`data!! : ${data}`);

    console.log(`orders!! : ${data.orders}`);
    console.log(`pet!! : ${data.pet}`);
    console.dir(data.pet);

    setOrders(data.orders)
    setPet(data.pet)

    // orders no로 pet 정보 조회
    setLoading(false);
    // ⌚ 로딩 끝
  }

  useEffect(() => {
    getOrders()
  }, [])


  return (
    <>
      <OrderDetails pet={pet} orders={orders} />
    </>
  )
}

export default OrdersDetailsContainer