import React, { useEffect, useState } from 'react'
import AdminUserRead from '../../components/admin/AdminUserRead'
import * as admins from '../../apis/admins'

const AdminUserReadContainer = ({id}) => {
  // 🧊 state
  const [users, setUsers] = useState({})
  const [isLoading, setLoading] = useState(false)

  // 🌞 함수
  const getUsers = async () => {
    // ⌚ 로딩 시작
    setLoading(true)
    const response = await admins.AdminUserRead(id)
    const data = await response.data        // ⭐ board
    console.log(data);
    setUsers(data)
    setLoading(false)
    // ⌚ 로딩 끝
  }

  // ❓ hook
  useEffect( () => {
    getUsers()
  },[])

  return (
    <>
      <AdminUserRead id={id} users={users} isLoading={isLoading} />
    </>
  )
}

export default AdminUserReadContainer