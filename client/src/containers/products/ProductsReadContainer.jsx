import React, { useEffect } from 'react'
import ProductsRead from '../components/products/ProductsRead'
import { useState } from 'react'
import * as products from '../../apis/products'
import * as files from '../apis/files'


const ProductsReadContainer = ({ id }) => {
  // 🧊 state
  const [products, setproducts] = useState({})
   const [fileList, setFileList] = useState([])
  const [isLoading, setLoading] = useState(false)

  // 🌞 함수
  const getproducts = async () => {
    // ⌚ 로딩 시작
    setLoading(true)
    const response = await products.select(id)
    const data = await response.data        // ⭐ 🎫products + 📄filelist
    console.log(data)
    
    const products = data.products
    const fileList = data.fileList

    setproducts(products)
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

  // ❓ hook
  useEffect( () => {
    getproducts()
  },[])

  return (
    <>
      <ProductsRead id={id} 
            products={products} 
            fileList={fileList}
            isLoading={isLoading}
            onDownload={onDownload} />
    </>
  )
}

export default ProductsReadContainer