import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../products/css/ProductsRead.module.css'
import '../products/css/ProductsRead.css'
import * as format from '../../apis/format'
import Products from './ProductsList'
// ckeditor5
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const ProductsRead = ({ id, products, fileList, isLoading}) => {

  const handleDownload = (no, fileName) => {    
    onDownload(no, fileName)
  }

  return (
    <div className='container'>
      <h1 className="title">게시글 조회</h1>
      <h3>훈련사아이디 : {id}</h3>
      <hr />

      {
        isLoading &&
        <div>
          <img src="/img/loading.webp" alt="loading" width="100%" />
        </div>
      }
      {
        !isLoading && Products && (
          <table className={styles.table}>
            <tbody>
              <tr>
                <td>훈련사아이디</td>
                <td>
                  <input type="text" value={products.id} readOnly
                         className={styles['form-input']} />
                </td>
              </tr>
              <tr>
                <td>훈련명</td>
                <td>
                  <input type="text" value={products.name} readOnly
                         className={styles['form-input']} />
                </td>
              </tr>
              <tr>
                <td>금액</td>
                <td>
                  <input type="text" value={products.price} readOnly
                         className={styles['form-input']} />
                </td>
              </tr>
              <tr>
                <td>훈련소개</td>
                <td>
                  <input type="text" value={products.trainerNo} readOnly
                         className={styles['form-input']} />
                </td>
              </tr>
              <tr>
                <td>훈련소개</td>
                <td>
                  <input type="text" value={products.description} readOnly
                         className={styles['form-input']} />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>내용</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <CKEditor editor={ ClassicEditor }
                            data={ products.content }      // 조회할 데이터 컨텐츠 
                            disabled={true}
                            config={{
                                toolbar: [],
                            }}
                  />
                  {/* <textarea cols="40" rows="10" value={products.content} readOnly
                            className={styles['form-input']}></textarea> */}
                </td>
              </tr>
              <tr>
                <td colSpan={2}>파일</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  {fileList.map( (file) => (
                    <div className="flex-box" key={file.no}>
                      <div className="item">
                        <img src={`/files/img/${file.no}`} alt={file.fileName} />
                        <span>{file.originName} ({ format.byteToUnit(file.fileSize) })</span>
                      </div>

                      <div className="item">
                        <button className='btn'
                                onClick={ () => handleDownload(file.no, file.originName) }>다운로드</button>
                      </div>
                    </div>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        )
      }
      <hr />
      <div className="btn-box">
        <Link to="/products" className='btn'>목록</Link>
        <Link to={`/products/update/${id}`} className='btn'>수정</Link>
      </div>
    </div>
  )
}

export default ProductsRead