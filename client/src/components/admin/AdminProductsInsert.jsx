import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const AdminProductsInsert = ({ onInsert }) => {
    // 🧊 state
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [trainerNo, setTrainerNo] = useState('')
    const [description, setDescription] = useState('')
    const [content, setContent] = useState('')
    const [price, setPrice] = useState('')


    

    // 🌞 함수
    const handleChangeId = (e) => {
        setId(e.target.value)
    }
    const handleChangeName = (e) => {
        setName(e.target.value)
    }
    const handleChangeTrainerNo = (e) => {
        setTrainerNo(e.target.value)
    }
    const handleChangeDescription = (e) => {
        setDescription(e.target.value)
    }
    const handleChangeContent = (e) => {
        setContent(e.target.value)
    }
    const handleChangePrice = (e) => {
        setPrice(e.target.value)
    }

    const onSubmit = () => {
        onInsert(id, name, trainerNo, description, content, price)
    }



    return (
        <div className='container'>
            <h1 className="title">게시글 조회</h1>
            <hr />

            <table>
                <tbody>
                <tr>
                        <td>Id</td>
                        <td>
                            <input type="text" value={id} onChange={handleChangeId} />
                        </td>
                    </tr>
                    <tr>
                        <td>트레이너번호</td>
                        <td>
                            <input type="text" value={trainerNo} onChange={handleChangeTrainerNo} />
                        </td>
                    </tr>
                    <tr>
                        <td>훈련 내용</td>
                        <td>
                            <input type="text" value={description} onChange={handleChangeDescription} />
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
            <hr />
            <div className="btn-box">
                <Link to="/api/admin/admin_product" className='btn'>목록</Link>
                <button className='btn' onClick={onSubmit}>등록</button>
            </div>
        </div>
    )
}

export default AdminProductsInsert