import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import * as format from '../../apis/format'
// ckeditor5
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as filesApi from '../../apis/files'


const UpdateForm = (
  { no, orders, fileList
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
    if( orders ) {
      setTitle(orders.no)
      setWriter(orders.trainerNo)
      setContent(orders.petNo)
    }
  }, [orders])
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
        !isLoading && orders && (
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
                        value={userId}
                        onChange={handleChangeTitle} />
                </td>
              </tr>
              <tr>
                <td>작성자</td>
                <td>
                  <input type="text" 
                        className={styles['form-input']}
                        value={address}
                        onChange={handleChangeWriter} />
                </td>
              </tr>
            </tbody>
          </table>
        )
      }
    </div>
  )
}

export default UpdateForm