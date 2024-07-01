import React, { useEffect, useState } from 'react'
import * as admins from '../../apis/admins'
import Admin_info from '../../components/admin/Admin_info'


const AdminInfoContainer = () => {
    // 🧊 state
    const [adminList, setAdminList] = useState([])
    const [isLoading, setLoading] = useState(false)

    // 🌞 함수
    const getAdminList = async () => {
        // ⌚ 로딩 시작
        setLoading(true)
        const response = await admins.AdminUserList()
        const data = await response.data      // ⭐boardList
        setAdminList(data)
        setLoading(false)
        // ⌚ 로딩 끝

    }

    // ❓ hook
    useEffect(() => {
        getAdminList()
    }, [])
    return (
        <>
            {/* 게시글 목록 */}
            <Admin_info adminList={adminList} isLoading={isLoading} />
        </>
    )
}

export default AdminInfoContainer