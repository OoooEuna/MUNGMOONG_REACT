import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../products/css/ProductsRead.module.css'
// ckeditor5
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as filesApi from '../../apis/files'

const ProductsInsertForm = ({ onInsert }) => {

  // 🧊 state
  const [id, setId] = useState('')
  const [trainerNo, setTrainerNo] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')   
  const [files, setFiles] = useState(null)      // ✅ files state 추가

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
  // ✅ 파일 핸들러 추가
  const handleChangeFile = (e) => {
    setFiles(e.target.files)
  }

  const onSubmit = () => {
    // 유효성 검사 ✅

    // 파일 업로드에서는 
    // Content-Type : application/json ➡ multipart/form-data
    const formData = new FormData()
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

    // onInsert(title, writer, content)       // json
    onInsert(formData, headers)               // formData
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

  return (
    <div className='container'>
      <h1 className='title'>게시글 등록</h1>
      <table className={styles.table}>
        <tbody>
          <tr>
            <td>제목</td>
            <td>
              {/* 
                CSS moduel 의 클래스 선택자는 카멜케이스로 쓰는 것이 관례
                - 카멜 케이스 : styles.formInput
                - 케밥 케이스 : styles['form-input']
              */}
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
                data=""         // ⭐ 기존 컨텐츠 내용 입력 (HTML)
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
            <td>파일</td>
            <td>
              <input type="file" onChange={handleChangeFile} multiple />
            </td>
          </tr>
        </tbody>
      </table>
      
      <div className="btn-box">
        <Link to="/products" className='btn'>목록</Link>
        <button className='btn' onClick={ onSubmit }>등록</button>
      </div>
    </div>
  )
}

export default ProductsInsertForm