import React from 'react'
import AdminProductsUpdateContainer from '../../containers/admin/AdminProductsUpdateContainer'
import { useParams } from 'react-router-dom'

const AdminProductsUpdate = () => {
    const { id } = useParams()
  return (
    <>
        <AdminProductsUpdateContainer id={id} />
    </>
  )
}

export default AdminProductsUpdate