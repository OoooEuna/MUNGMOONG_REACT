import React from 'react'
import AdminBoardUpdateContainer from '../../containers/admin/AdminBoardUpdateContainer'
import { useParams } from 'react-router-dom'

const AdminBoardUpdate = () => {
  const { no } = useParams()
  return (
    <>
      {/* Header */}
      <AdminBoardUpdateContainer no={no} />
      {/* Footer */}
    </>
  )
}

export default AdminBoardUpdate