import React from 'react'
import AdminTrainerReadContainer from '../../containers/admin/AdminTrainerReadContainer'
import { useParams } from 'react-router-dom'

const AdminTriainerRead = () => {
  const { id } = useParams()
  return (
    <AdminTrainerReadContainer id={id} />
  )
}

export default AdminTriainerRead