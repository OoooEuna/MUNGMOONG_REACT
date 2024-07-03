import React, { useEffect, useState } from 'react';
import AdminBoardList from '../../components/admin/AdminBoardList';
import * as admins from '../../apis/admins';

const AdminBoardListContainer = () => {
// 🧊 state
const [boardList, setBoardList] = useState([]);
const [isLoading, setLoading] = useState(false);

// 🌞 함수
const getBoardList = async () => {
  // ⌚ 로딩 시작
  setLoading(true);
  const response = await admins.AdminBoardList();
  const data = await response.data;      // ⭐boardList
  setBoardList(data);
  setLoading(false);
  // ⌚ 로딩 끝
  
}

// ❓ hook
useEffect( ()=> {
    getBoardList();
}, []);

return (
  <>
    {/* 게시글 목록 */}
    <AdminBoardList boardList={boardList} isLoading={isLoading} />
  </>
)
}

export default AdminBoardListContainer