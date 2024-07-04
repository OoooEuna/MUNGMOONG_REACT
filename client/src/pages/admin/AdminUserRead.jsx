import React from 'react'
import AdminUserReadContainer from '../../containers/admin/AdminUserReadContainer'
import { useParams } from 'react-router-dom';

const AdminUserRead = () => {
  // 🔗❓ 파라미터 가져오기
  const { id } = useParams()
  console.log(`no;;;;;;;;;;;; : ${id}`);
  return (
    <>
      <AdminUserReadContainer id={id} />
    </>
  )
}

export default AdminUserRead