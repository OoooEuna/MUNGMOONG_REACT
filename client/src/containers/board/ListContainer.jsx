import React, { useEffect, useState } from 'react'
import List from '../components/board/List'
import * as board from '../apis/board'

const ListContainer = () => {
  // 🧊 state
  const [boardList, setBoardList] = useState([])
  const [isLoading, setLoading] = useState(false)

  // 🌞 함수
  const getBoardList = async () => {
    // ⌚ 로딩 시작
    setLoading(true)
    const response = await board.list()
    const data = await response.data      // ⭐boardList
    setBoardList(data)
    setLoading(false)
    // ⌚ 로딩 끝
    
  }

  // ❓ hook
  useEffect( ()=> {
    getBoardList()
  }, [])

  return (
    <>
      {/* 게시글 목록 */}
      <List boardList={boardList} isLoading={isLoading} />
    </>
  )
}

export default ListContainer