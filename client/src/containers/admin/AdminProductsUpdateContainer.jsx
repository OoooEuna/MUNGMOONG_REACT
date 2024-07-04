import React, { useEffect, useState } from 'react'
import AdminProductsUpdate from '../../components/admin/AdminProductsUpdate'
import { useNavigate } from 'react-router-dom'
import * as admins from '../../apis/admins'

const AdminProductsUpdateContainer = ({id}) => {
  // 🧊 state
  const [products, setProducts] = useState({})
  const [isLoading, setLoading] = useState(false)

  // 함수
  const navigate = useNavigate()

  // 🌞 함수
  const getProducts = async () => {
      // ⌚ 로딩 시작
      setLoading(true)
      const response = await admins.AdminProductsRead(id)
      const data = await response.data        // ⭐ board
      console.log(data);
      setProducts(data)
      setLoading(false)
      // ⌚ 로딩 끝
  }

  const onUpdate = async (id, name, trainerNo, content, price) => {
    try {
      const response = await admins.AdminProductsUpdate(id,name, trainerNo, content, price)
      const status = await response.status
      console.log(`게시글 수정 요청 결과 : ${status}`);
      alert("게시글 수정 완료!")

      // ➡ 게시글 목록으로 이동
      navigate("/api/admin/admin_product")

    } catch (error) {
      console.log(error);
    }
  }

  const onDelete = async (id) => {
    const response = await admins.AdminProductsDelete(id)
    const status = await response.status
    console.log(`게시글 삭제 요청 결과 : ${status}`);
    alert("삭제 완료!")

    // ➡ 게시글 목록으로 이동
    navigate("/api/admin/admin_product")
  }

  // ❓ hook
  useEffect(() => {
      getProducts()
  }, [])

  return (
      <>
          <AdminProductsUpdate id={id} 
                               products={products}
                               onUpdate={onUpdate}
                               onDelete={onDelete} 
                               isLoading={isLoading} />
      </>
  )
}

export default AdminProductsUpdateContainer