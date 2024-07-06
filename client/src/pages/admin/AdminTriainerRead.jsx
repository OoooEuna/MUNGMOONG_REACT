import React from 'react'
import AdminTrainerReadContainer from '../../containers/admin/AdminTrainerReadContainer'
import { useParams } from 'react-router-dom'

const AdminTriainerRead = () => {
  const { no } = useParams()
  return (
    <AdminTrainerReadContainer no={no} />
  )
}

export default AdminTriainerRead