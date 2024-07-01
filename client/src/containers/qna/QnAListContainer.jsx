import React, { useEffect, useState } from 'react'
import List from '../../components/qna/QnAList'
import * as qna from '../../apis/qna'

const QnAListContainer = () => {
  // 🧊 state
  const [boardList, setBoardList] = useState([])
  const [isLoading, setLoading] = useState(false)

  // 🌞 함수
  const getBoardList = async () => {
    // ⌚ 로딩 시작
    setLoading(true)
    const response = await qna.list()
    const data = await response.data      // ⭐boardList
    setBoardList(data)
    setLoading(false)
    // ⌚ 로딩 끝
    
  }

  // ❓ hook
  useEffect( ()=> {
    getQnadList()
  }, [])

  return (
    <>
      {/* 게시글 목록 */}
      <List qnaList={boardList} isLoading={isLoading} />
    </>
  )
}

export default QnAListContainer