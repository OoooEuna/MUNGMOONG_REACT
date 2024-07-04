import React from 'react'
import AdminProductsInsert from '../../components/admin/AdminProductsInsert'
import * as admins from '../../apis/admins'
import { useNavigate } from 'react-router-dom'

const AdminProductsInsertContainer = () => {
    const navigate = useNavigate()
    // 🧊 state
    // 🌞 함수
    const onInsert = async ( name, trainerNo, description, content, price) => {
      try {
        const response = await admins.AdminProductsInsert( name, trainerNo, description, content, price)
        const status = response.status
        console.log(`게시글 등록 요청 결과 : ${status}`);
        alert("게시글 등록 완료!")
  
        // ➡ 게시글 목록으로 이동
        navigate("/api/admin/admin_product")
      } catch (error) {
        console.log(error);
      }
    }
    return (
      <>
        <AdminProductsInsert onInsert={onInsert} />
      </>
    )
  }

export default AdminProductsInsertContainer