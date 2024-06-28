import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../products/css/ProductsRead.module.css'
import '../products/css/ProductsRead.css'
import * as format from '../../apis/format'
// ckeditor5
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Read = ({ id, trainerNo, name, description, content, price }) => {

  const handleDownload = (no, fileName) => {    
    onDownload(no, fileName)
  }

  return (
    <div className='container'>
      <h1 className="title">게시글 조회</h1>
      <h3>번호 : {no}</h3>
      <hr />

      {
        isLoading &&
        <div>
          <img src="/img/loading.webp" alt="loading" width="100%" />
        </div>
      }
      {
        !isLoading && products && (
          <table className={styles.table}>
            <tbody>
              <tr>
                <td>번호</td>
                <td>
                  <input type="text" value={no} readOnly
                         className={styles['form-input']} />
                </td>
              </tr>
              <tr>
                <td>등록일자</td>
                <td>
                  <input type="text" value={products.regDate} readOnly
                         className={styles['form-input']} />
                </td>
              </tr>
              <tr>
                <td>제목</td>
                <td>
                  <input type="text" value={products.title} readOnly
                         className={styles['form-input']} />
                </td>
              </tr>
              <tr>
                <td>작성자</td>
                <td>
                  <input type="text" value={products.writer} readOnly
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
        <Link to="/productss" className='btn'>목록</Link>
        <Link to={`/productss/update/${no}`} className='btn'>수정</Link>
      </div>
    </div>
  )
}

export default Read