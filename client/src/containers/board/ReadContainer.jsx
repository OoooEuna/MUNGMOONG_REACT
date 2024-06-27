import React, { useEffect } from 'react'
import Read from '../../components/board/Read'
import { useState } from 'react'
import * as boards from '../../apis/board'

const ReadContainer = ({ no }) => {
  // 🧊 state
  const [board, setBoard] = useState({})
  const [isLoading, setLoading] = useState(false)

  // 🌞 함수
  const getBoard = async () => {
    // ⌚ 로딩 시작
    setLoading(true)
    const response = await boards.select(no)
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
      <Read no={no} board={board} isLoading={isLoading} />
    </>
  )
}

export default ReadContainer