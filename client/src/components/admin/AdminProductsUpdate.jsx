import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const AdminProductsUpdate = ({id, products, onUpdate, onDelete, isLoading}) => {

    // 🧊 state
    const [name, setName] = useState('')
    const [trainerNo, setTrainerNo] = useState('')
    const [content, setContent] = useState('')
    const [price, setPrice] = useState('')
   
    // 🌞 함수
    const handleChangeName = (e) => {
      setName(e.target.value)
    }
    const handleChangeTrainerNo = (e) => {
      setTrainerNo(e.target.value)
    }
    const handleChangeContent = (e) => {
      setContent(e.target.value)
    }
    const handleChangePrice = (e) => {
      setPrice(e.target.value)
    }
  
    const onSubmit = () => {
      onUpdate(id, name, trainerNo, content, price)
    }
  
    const handleDelete = () => {
      const check = window.confirm("정말로 삭제하시겠습니까?")
      if( check ) {
        onDelete(id)
      }
    }
  
    useEffect( () => {
      if( products ) {
        setName(products.name)
        setTrainerNo(products.trainerNo)
        setContent(products.content)
        setPrice(products.price)
      }

    }, [products])
    // [의존하는 객체] (⭐의존성 배열)
    // : 지정한 객체가 변화했을때, 다시 useEffect 를 실행한다.

  return (
    <div className='container'>
      <h1 className="title">게시글 조회</h1>
      <h3>번호 : {id}</h3>
      <hr />

      {
        isLoading &&
        <div>
          <img src="/img/loading.webp" alt="loading" width="100%" />
        </div>
      }
      {
        !isLoading && products && (
          <table>
            <tbody>
            <tr>
                <td>ID</td>
                <td>
                  <input type="text" value={id} readOnly />
                </td>
              </tr>
              <tr>
                <td>트레이너번호</td>
                <td>
                  <input type="text" value={trainerNo} onChange={handleChangeTrainerNo} />
                </td>
              </tr>
              <tr>
                <td>제목</td>
                <td>
                  <input type="text" value={name} onChange={handleChangeName} />
                </td>
              </tr>
              <tr>
                <td>가격</td>
                <td>
                  <input type="text" value={price} onChange={handleChangePrice} />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>내용</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <textarea cols="40" rows="10" value={content} onChange={handleChangeContent} ></textarea>
                </td>
              </tr>
            </tbody>
          </table>
        )
      }
      <hr />
      <div className="btn-box">
        <Link to="/api/admin/admin_product" className='btn'>목록</Link>
        <button className='btn' onClick={handleDelete}>삭제</button>
        <button className='btn' onClick={onSubmit}>수정</button>
      </div>
    </div>
  )
}

export default AdminProductsUpdate