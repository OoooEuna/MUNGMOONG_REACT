import React, { useEffect, useState } from 'react'
import * as admins from '../../apis/admins'
import AdminBoardRead from '../../components/admin/AdminBoardRead'

const AdminBoardReadContainer = ({no}) => {
  // 🧊 state
  const [board, setBoard] = useState({})
  const [isLoading, setLoading] = useState(false)

  // 🌞 함수
  const getBoard = async () => {
    // ⌚ 로딩 시작
    setLoading(true)
    const response = await admins.AdminBoardRead(no)
    const data = await response.data        // ⭐ board
    console.log(data);
    setBoard(data)
    setLoading(false)
    // ⌚ 로딩 끝
  }

  // ❓ hook
  useEffect( () => {
    getBoard()
  },[])

  return (
    <>
      <AdminBoardRead no={no} board={board} isLoading={isLoading} />
    </>
  )
}

export default AdminBoardReadContainer