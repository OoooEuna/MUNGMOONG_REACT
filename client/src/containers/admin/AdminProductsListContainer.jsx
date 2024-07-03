import React, { useEffect, useState } from 'react'
import AdminProductsList from '../../components/admin/AdminProductsList';
import * as admins from '../../apis/admins';

const AdminProductsListContainer = () => {
  const [productsList, setProuctsList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  // 함수
  const getProuctsList = async () => {
    // 로딩 시작
    setLoading(true);
    const response = await admins.AdminProductsList();
    const data = await response.data;
    setProuctsList(data);
    setLoading(false);
    // 로딩 끝
  }

  // hook
  useEffect( () => {
    getProuctsList();
  }, [] );

  return (
    <AdminProductsList productsList={productsList} isLoading={isLoading} />
  )
}

export default AdminProductsListContainer