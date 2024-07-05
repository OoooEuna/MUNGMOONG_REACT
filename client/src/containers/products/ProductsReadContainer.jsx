import React, { useContext, useEffect, useState } from 'react';
import List from '../../components/products/ProductsRead';
import * as productApi from '../../apis/products';
import * as orderApi from '../../apis/orders'; // orderApi를 가져옵니다.
import * as authApi from '../../apis/auth'; // authApi를 가져옵니다.
import { LoginContext } from '../../contexts/LoginContextProvider';

const ProductsReadContainer = ({ id }) => {
  // 🧊 state
  const [products, setProducts] = useState({});
  const [user, setUser] = useState({});
  const [isLoading, setLoading] = useState(false);

  // 🌞 함수
  const getProducts = async () => {

    try {
      
      
      // ⌚ 로딩 시작
      setLoading(true);

      const userResponse = await authApi.info()
      const userInfo = await userResponse.data
      console.log(`:::::::::::::: 유저 정보 :::::::::::::::::`);
      console.log(`userInfo : ${userInfo}`);
      console.dir(userInfo);
      setUser(userInfo)

      const response = await productApi.select(String(id)); // id를 문자열로 변환하여 전달
      const data = await response.data; // ⭐ board
      const newProduct = await data.products
      console.log("data:", data);
      console.log("id:", id);
      console.log(`newProduct :  ${newProduct}`);
      setProducts(newProduct);

    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      // ⌚ 로딩 끝
      setLoading(false);
    }
  };

  const onSubmit = async (date, memo, address) => {
    console.log(`상품id : ${products.productId}`);
    console.log(`예약 날짜 : ${date}`);
    console.log(`요청사항 : ${memo}`);

    const orders = {
      "productId": products.id,
      "trainerNo": products.trainerNo,
      "resDate": date,
      "memo": memo,
      "address": address,
    };

    try {
      const response = await orderApi.insert(orders);
      const status = response.status;
      const data = response.data;
      const orderNo = data.no;

      if (status === 200) {
        console.info("등록된 orderNo : " + orderNo);
        // --> /orders/{orderNo}로 리다이렉트
        window.location.href = `/api/orders/${orderNo}`;
      } else {
        throw new Error("Order insertion failed with status: " + status);
      }
    } catch (error) {
      console.error('Failed to insert order:', error);
    }
  };

  // ❓ hook
  useEffect(() => {
    getProducts();
  }, [id]);

  return (
    <>
      <List id={id} products={products} user={user} isLoading={isLoading} onSubmit={onSubmit} />
    </>
  );
};

export default ProductsReadContainer;
