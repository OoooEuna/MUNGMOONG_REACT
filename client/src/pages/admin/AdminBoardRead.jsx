import React from 'react'
import AdminBoardReadContainer from '../../containers/admin/AdminBoardReadContainer'
import { useParams } from 'react-router-dom';

const AdminBoardRead = () => {
    // 🔗❓ 파라미터 가져오기
    const { no } = useParams()
    console.log(`no;;;;;;;;;;;; : ${no}`);
    return (
        <>
            <AdminBoardReadContainer no={no} />
        </>
    )
}

export default AdminBoardRead