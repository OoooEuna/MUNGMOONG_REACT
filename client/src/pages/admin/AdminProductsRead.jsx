import React from 'react'
import AdminProductsReadContainer from '../../containers/admin/AdminProductsReadContainer'
import { useParams } from 'react-router-dom';

const AdminProductsRead = () => {
    // 🔗❓ 파라미터 가져오기
    const { id } = useParams()
    console.log(`no;;;;;;;;;;;; : ${id}`);
    return (
        <>
            <AdminProductsReadContainer id={id} />
        </>
    )
}

export default AdminProductsRead