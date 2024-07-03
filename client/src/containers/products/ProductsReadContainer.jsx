import React, { useEffect, useState } from 'react';
import List from '../../components/products/ProductsRead';
import * as productsApi from '../../apis/products';

const ProductsReadContainer = ({ id }) => {
  // 🧊 state
  const [products, setProducts] = useState({});
  const [isLoading, setLoading] = useState(false);

  // 🌞 함수
  const getProducts = async () => {
    try {
      // ⌚ 로딩 시작
      setLoading(true);
      const response = await productsApi.select(String(id)); // id를 문자열로 변환하여 전달
      const data = response.data; // ⭐ board
      console.log("data") ;
      console.log("id") ;
      console.log(id) ;
      console.log(data) ;
      setProducts(data.products);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      // ⌚ 로딩 끝
      setLoading(false);
    }
  };

  // ❓ hook
  useEffect(() => {
    getProducts();
  }, [id]);

  return (
    <>
      <List id={id} products={products} isLoading={isLoading} />
    </>
  );
};

export default ProductsReadContainer;
