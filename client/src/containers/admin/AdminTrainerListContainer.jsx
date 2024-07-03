import React, { useEffect, useState } from 'react';
import AdminTrainerList from '../../components/admin/AdminTrainerList';
import * as admins from '../../apis/admins';

const AdminTrainerListContainer = () => {
// 🧊 state
const [trainerList, setTrainerList] = useState([]);
const [isLoading, setLoading] = useState(false);

// 🌞 함수
const getUsersList = async () => {
  // ⌚ 로딩 시작
  setLoading(true);
  const response = await admins.AdminTrainerList();
  const data = await response.data;      // ⭐boardList
  setTrainerList(data);
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
    <AdminTrainerList trainerList={trainerList} isLoading={isLoading} />
  </>
)
}

export default AdminTrainerListContainer