import React, { useEffect, useState } from 'react';
import AdminUserList from '../../components/admin/AdminUserList';
import * as admins from '../../apis/admins';


const AdminUserListContainer = () => {
   // 🧊 state
   const [usersList, setUsersList] = useState([]);
   const [isLoading, setLoading] = useState(false);
 
   // 🌞 함수
   const getUsersList = async () => {
     // ⌚ 로딩 시작
     setLoading(true);
     const response = await admins.AdminUserList();
     const data = await response.data;      // ⭐boardList
     setUsersList(data);
     setLoading(false);
     // ⌚ 로딩 끝
     
   }
 
   // ❓ hook
   useEffect( ()=> {
     getUsersList();
   }, []);
 
   return (
     <>
       {/* 게시글 목록 */}
       <AdminUserList usersList={usersList} isLoading={isLoading} />
     </>
   )
 }
 

export default AdminUserListContainer;