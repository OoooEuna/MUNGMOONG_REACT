import React from 'react'
import InsertForm from '../../components/qna/QnAInsertForm'
import * as qna from '../../apis/qna'
import { useNavigate } from 'react-router-dom'

const QnAInsertContainer = () => {
  const navigate = useNavigate()
  // 🧊 state
  // 🌞 함수
  const onInsert = async (title, writer, content, answer) => {
    try {  
      const response = await qna.insert(title, writer, content, answer)
      const status = await response.status
      console.log(`문의 등록 요청 결과 : ${status}`);
      alert("문의 등록 완료!")

      // ➡ 문의 목록으로 이동
      navigate("/api/qna")
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <InsertForm onInsert={onInsert} />
    </>
  )
}

export default QnAInsertContainer