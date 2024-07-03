import React, { useEffect, useState } from 'react'
import AdminBoardUpdate from '../../components/admin/AdminBoardUpdate'
import {useNavigate } from 'react-router-dom'
import * as admins from '../../apis/admins'

const AdminBoardUpdateContainer = ({no}) => {
  // 🧊 state
  const [board, setBoard] = useState({})
  const [isLoading, setLoading] = useState(false)

  // 🌞 함수
  const navigate = useNavigate()

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

  
  const onUpdate = async (no, title, writer, content) => {
    try {
      const response = await admins.AdminBoardUpdate(no, title, writer, content)
      const status = await response.status
      console.log(`게시글 수정 요청 결과 : ${status}`);
      alert("게시글 수정 완료!")

      // ➡ 게시글 목록으로 이동
      navigate("/api/admin/admin_board")

    } catch (error) {
      console.log(error);
    }
  }

  const onDelete = async (no) => {
    const response = await admins.AdminBoardRemove(no)
    const status = await response.status
    console.log(`게시글 삭제 요청 결과 : ${status}`);
    alert("삭제 완료!")

    // ➡ 게시글 목록으로 이동
    navigate("/api/admin/admin_board")
  }

  // ❓ hook
  useEffect( () => {
    getBoard()
  },[])

  return (
    <>
      <AdminBoardUpdate no={no} 
                  board={board} 
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                  isLoading={isLoading} />
    </>
  )
}

export default AdminBoardUpdateContainer