import React, { useEffect, useState } from 'react'
import * as admins from '../../apis/admins'
import AdminProductsRead from '../../components/admin/AdminProductsRead'

const AdminProductsReadContainer = ({id}) => {
    // 🧊 state
    const [products, setProducts] = useState({})
    const [isLoading, setLoading] = useState(false)

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

    // ❓ hook
    useEffect(() => {
        getProducts()
    }, [])

    return (
        <>
            <AdminProductsRead id={id} products={products} isLoading={isLoading} />
        </>
    )
}

export default AdminProductsReadContainer