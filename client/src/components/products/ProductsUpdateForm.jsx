import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../products/css/update.module.css'
import * as format from '../../apis/format'
// ckeditor5
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as filesApi from '../../apis/files'


const UpdateForm = (
  { no, products, fileList
    , onUpdate, onDelete, isLoading
    , onDownload, onDeleteFile, deleteCheckedFiles }) => {
  // 🧊 state
  const [title, setTitle] = useState('')
  const [writer, setWriter] = useState('')
  const [content, setContent] = useState('')
  const [files, setFiles] = useState(null)          
  const [fileNoList, setFileNoList] = useState([])  // ✅ 파일 선택 삭제
  const [checkAll, setCheckAll] = useState(false)
 
  // 🌞 함수
  const handleChangeTitle = (e) => {
    setTitle(e.target.value)
  }
  const handleChangeWriter = (e) => {
    setWriter(e.target.value)
  }
  const handleChangeContent = (e) => {
    setContent(e.target.value)
  }

  const onSubmit = () => {
    // 유효성 검사 ✅

    // 파일 업로드에서는 
    // Content-Type : application/json ➡ multipart/form-data
    const formData = new FormData()
    formData.append('no', no)
    formData.append('title', title)
    formData.append('writer', writer)
    formData.append('content', content)

    // 📄 파일 데이터 추가
    if( files ) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        formData.append('files', file)
      }
    }

    // 🎫 헤더 
    const headers = {
      'Content-Type' : 'multipart/form-data'
    }

    // onUpdate(no, title, writer, content)       // json
    onUpdate(formData, headers)               // formData
  }

  const handleDelete = () => {
    const check = window.confirm("정말로 삭제하시겠습니까?")
    if( check ) {
      onDelete(no)
    }
  }

  const handleDownload = (no, fileName) => {    
    onDownload(no, fileName)
  }

  const handleDeleteFile = ( no ) => {
    const check = window.confirm("정말로 삭제하시겠습니까?")
    if( check ) 
      onDeleteFile( no )
  }

  // ✅ 파일 번호 체크
  const checkFileNo = ( no ) => {
    let duplicated = false
    for (let i = 0; i < fileNoList.length; i++) {
      const fileNo = fileNoList[i];
      // 중복 : 체크박스 해제 🟩 ➡ 제거
      if( fileNo == no ) {
        fileNoList.splice(i, 1)
        duplicated = true
      }
    }
    // 중복❌ ➡ 체크박스 지정 ✅ ➡ 추가
    if( !duplicated ) fileNoList.push(no)

    console.log(`선택된 파일 번호 : ${fileNoList}`);
    setFileNoList(fileNoList)
  }

  const handleDeleteFiles = () => {
    const check = window.confirm("정말로 삭제하시겠습니까? \n" + fileNoList)
    if( check ) {
      deleteCheckedFiles(fileNoList)
    }

    setFileNoList([]) // 파일번호 체크박스 초기화
  }

  const fileCheckAll = () => {
    let checkList = document.getElementsByClassName('check-file')

    if( !checkAll ) {
      for (let i = 0; i < checkList.length; i++) {
        const check = checkList[i];
        if( !check.checked )
          checkFileNo( check.value )
        check.checked = true
      }
      setCheckAll(true)
    }
    else {
      for (let i = 0; i < checkList.length; i++) {
        const check = checkList[i];
        if( check.checked )
          checkFileNo( check.value )
        check.checked = false
      }
      setCheckAll(false)
    }

  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
        return customUploadAdapter(loader);
    };
  }

  const customUploadAdapter = (loader) => {
    return {
      upload() {
        return new Promise( (resolve, reject) => {
          const formData = new FormData();
          loader.file.then( async (file) => {
                console.log(file);
                formData.append("parentTable", 'editor');
                formData.append("file", file);

                const headers = {
                  'Content-Type' : 'multipart/form-data'
                }

                let response = await filesApi.upload(formData, headers);
                let data = await response.data;
                console.log(`data : ${data}`);
                
                let newFile = data;
                let newFileNo = newFile.no

                // 이미지 렌더링
                await resolve({
                    default: `http://localhost:8080/files/img/${newFileNo}`
                })
                
          });
        });
      },
    };
  };

  // ✅ 파일 핸들러 추가
  const handleChangeFile = (e) => {
    setFiles(e.target.files)
  }


  useEffect( () => {
    if( products ) {
      setTitle(products.title)
      setWriter(products.writer)
      setContent(products.content)
    }
  }, [products])
  // [의존하는 객체] (⭐의존성 배열)
  // : 지정한 객체가 변화했을때, 다시 useEffect 를 실행한다.


  return (
    <div className='container'>
      <h1 className='title'>게시글 수정</h1>

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
                <td>제목</td>
                <td>
                  <input type="text" 
                        className={styles['form-input']}
                        value={title}
                        onChange={handleChangeTitle} />
                </td>
              </tr>
              <tr>
                <td>작성자</td>
                <td>
                  <input type="text" 
                        className={styles['form-input']}
                        value={writer}
                        onChange={handleChangeWriter} />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>내용</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <CKEditor
                    editor={ ClassicEditor }
                    config={{
                        placeholder: "내용을 입력하세요.",
                        toolbar: {
                            items: [
                                'undo', 'redo',
                                '|', 'heading',
                                '|', 'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor',
                                '|', 'bold', 'italic', 'strikethrough', 'subscript', 'superscript', 'code',
                                '|', 'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent',
                                '|', 'link', 'uploadImage', 'blockQuote', 'codeBlock',
                                '|', 'mediaEmbed',
                            ],
                            shouldNotGroupWhenFull: false
                        },
                        editorConfig: {
                            height: 500, // Set the desired height in pixels
                        },
                        alignment: {
                            options: ['left', 'center', 'right', 'justify'],
                        },
                        
                        extraPlugins: [uploadPlugin]            // 업로드 플러그인
                    }}
                    data={content}         // ⭐ 기존 컨텐츠 내용 입력 (HTML)
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                        setContent(data);
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                  />
                  {/* <textarea cols="40" rows="10" 
                            className={styles['form-input']}
                            value={content}
                            onChange={handleChangeContent}></textarea> */}
                </td>
              </tr>
              <tr>
                <td colSpan={2}>파일</td>
              </tr>
              <tr>
                <td>파일</td>
                <td>
                  <input type="file" onChange={handleChangeFile} multiple />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <div className="flex-box">
                    <div className="item">
                      <button className="btn"
                              onClick={fileCheckAll}>전체선택</button>
                    </div>
                    <div className="item">
                      <button className='btn' 
                              onClick={handleDeleteFiles}>
                                선택삭제
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
              {fileList.map( (file) => (
                <tr key={file.no}>
                  <td className={styles.check}>
                    {/* ✅ 파일 선택 체크 박스 */}
                    <span>체크여부 : {file.checked}</span>
                    <input type="checkbox" 
                           className='check-file'
                           onChange={ () => checkFileNo(file.no) }
                           checked={file.checked}
                           value={file.no} />        
                    <img src={`/files/img/${file.no}`} alt={file.fileName} />
                  </td>
                  <td>
                    <div className="flex-box" >
                      <div className="item">
                        <span>{file.originName} ({ format.byteToUnit(file.fileSize) })</span>
                      </div>

                      <div className="item">
                        <button className='btn' onClick={ () => handleDownload(file.no, file.originName) }>다운로드</button>
                        <button className="btn" onClick={ () => handleDeleteFile(file.no) }>삭제</button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      }

      <div className="btn-box">
        <div className="item">
          <Link to="/productss" className='btn'>목록</Link>
        </div>
        <div className="item">
          <button className='btn' onClick={handleDelete}>삭제</button>
          <button className='btn' onClick={onSubmit}>수정</button>
        </div>
      </div>
    </div>
  )
}

export default UpdateForm