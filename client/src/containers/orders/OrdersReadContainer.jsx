import React, { useEffect, useState } from 'react';
import List from '../../components/orders/OrdersRead';
import * as orderApi from '../../apis/orders';

const OrdersReadContainer = ({ no }) => {
  // 🧊 state
  // const [orders, setOrders] = useState({"user":{},"order":{},"petList":[],"trainer":{}});
  const [orders, setOrders] = useState({});
  const [isLoading, setLoading] = useState(false);

  // 🌞 함수
  const getOrders = async () => {
    try {
      // ⌚ 로딩 시작
      setLoading(true);
      const response = await orderApi.select(no); // id를 문자열로 변환하여 전달
      const data = await response.data; // ⭐ board
      console.log(`:::::::::::::::::::::::::::::::::`);
      console.log(`/api/orders/:no`);
      console.log(data) ;
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      // ⌚ 로딩 끝
      setLoading(false);
    }
  };

  // ❓ hook
  useEffect(() => {
    getOrders();
  }, [no]);

  return (
    <>
      <List no={no} orders={orders} isLoading={isLoading} />
    </>
  );
};

export default OrdersReadContainer;
