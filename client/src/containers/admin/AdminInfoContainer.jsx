import React from 'react'
import List from '../../components/admin/adminInfo'
// import * as admin from '../../apis/admins'

const AdminInfoContainer = () => {
  return (
    <>
        <List AdminUserList={AdminUserList} isLoading={isLoading} />
    </>
  )
}

export default AdminInfoContainer