import React, { useEffect, useState } from 'react'
import AdminTrainerRead from '../../components/admin/AdminTrainerRead'
import * as admins from '../../apis/admins'

const AdminTrainerReadContainer = ({id}) => {
  // 🧊 state
  const [trainer, setTrainer] = useState({})
  const [isLoading, setLoading] = useState(false)

  // 🌞 함수
  const getTrainer = async () => {
    // ⌚ 로딩 시작
    setLoading(true)
    const response = await admins.AdminTrainerRead(id)
    const data = await response.data        // ⭐ board
    console.log(data);
    setTrainer(data)
    setLoading(false)
    // ⌚ 로딩 끝
  }

  // ❓ hook
  useEffect( () => {
    getTrainer()
  },[])

  return (
    <>
      <AdminTrainerRead id={id} trainer={trainer} isLoading={isLoading} />
    </>
  )
}

export default AdminTrainerReadContainer