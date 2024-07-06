import React, { useEffect, useState } from 'react'
import OrdersUpdate from '../components/orders/OrdersUpdate'
import * as orders from '../apis/orders'
import * as files from '../apis/files'
import { useNavigate } from 'react-router-dom'

 
const OrdersUpdateContainer = ({ no }) => {
  // 🧊 state
  const [orders, setorders] = useState({})
  const [fileList, setFileList] = useState([])
  const [isLoading, setLoading] = useState(false)

  // 🌞 함수
  const navigate = useNavigate()

  const getorders = async () => {
    // ⌚ 로딩 시작
    setLoading(true)
    const response = await orders.select(no)
    const data = await response.data        // ⭐ orders + 📄filelist
    console.log(data)
    
    const orders = data.orders
    const fileList = data.fileList

    setorders(orders)
    setFileList(fileList)

    setLoading(false)
    // ⌚ 로딩 끝
  }


  // 다운로드
  const onDownload = async (no, fileName) => {
    const response = await files.download(no)
    console.log(response);

    // 서버에서 반환된 파일 데이터를 Blob으로 변환
    // 브라우저를 통해 데이터를 a 태그로 등록하고 다운로드하도록 요청
    const url = window.URL.createObjectURL(new Blob( [response.data] ))
    const link = document.createElement('a')
    link.href = url 
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  
  
  const onUpdate = async (no, title, writer, content) => {
    try {
      const response = await orders.update(no, title, writer, content)
      const status = await response.status
      console.log(`게시글 수정 요청 결과 : ${status}`);
      alert("게시글 수정 완료!")

      // ➡ 게시글 목록으로 이동
      navigate("/orders")

    } catch (error) {
      console.log(error);
    }
  }

  const onDelete = async (no) => {
    const response = await orders.remove(no)
    const status = await response.status
    console.log(`게시글 삭제 요청 결과 : ${status}`);
    alert("삭제 완료!")

    // ➡ 게시글 목록으로 이동
    navigate("/orders")
  }

  const onDeleteFile = async (fileNo) => {
    try {
      // 파일 삭제 요청
      const fileResponse = await files.remove(fileNo)
      console.log(fileResponse.data);

      // 파일 목록 갱신
      const ordersResponse = await orders.select(no)
      const data = ordersResponse.data
      const fileList = data.fileList
      setFileList(fileList)

    } catch (error) {
      console.log(error);
    }
  }

  const deleteCheckedFiles = async (fileNoList) => {
    const fileNos = fileNoList.join(",")
    console.log(fileNos);

    try {
      // 파일 선택 삭제 요청
      const response = await files.removeFiles(fileNos)
      console.log(response.status);

       // 파일 목록 갱신
       const ordersResponse = await orders.select(no)
       const data = ordersResponse.data
       const fileList = data.fileList
       setFileList(fileList)
    } catch (error) {
      console.log(error);
    }
  }

  // ❓ hook
  useEffect( () => {
    getorders()
  },[])

  return (
    <>
      <UpdateForm no={no} 
                  orders={orders} 
                  fileList={fileList}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                  onDownload={onDownload}
                  onDeleteFile={onDeleteFile}
                  deleteCheckedFiles={deleteCheckedFiles}
                  isLoading={isLoading} />
    </>
  )
}

export default OrdersUpdateContainer