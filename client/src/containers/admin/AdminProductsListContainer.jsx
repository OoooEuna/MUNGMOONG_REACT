import React, { useEffect, useState } from 'react'
import AdminProductsList from '../../components/admin/AdminProductsList';
import * as admins from '../../apis/admins';

const AdminProductsListContainer = () => {
  const [productsList, setProductsList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  // 함수
  const getProductsList = async () => {
    // 로딩 시작
    setLoading(true);
    const response = await admins.AdminProductsList();
    const data = await response.data;
    setProductsList(data);
    setLoading(false);
    // 로딩 끝
  }

  // hook
  useEffect( () => {
    getProductsList();
  }, [] );

  return (
    <AdminProductsList productsList={productsList} isLoading={isLoading} />
  )
}

export default AdminProductsListContainer