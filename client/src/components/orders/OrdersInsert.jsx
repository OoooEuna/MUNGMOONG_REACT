import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// ckeditor5
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as filesApi from '../../apis/files'

const OrdersInsert = ({ no, orders, onInsert }) => {
  console.log("read 주문번호 뜨니");
  console.log(onInsert);
  console.log("no");
  console.log(orders);
  console.log("orders");

  // 🧊 state 상태확인
  const [id, setId] = useState('')
  const [trainerNo, setTrainerNo] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')   
  //const [files, setFiles] = useState(null)      // ✅ files state 추가

  // 🌞 함수 이벤트 입력받는 값
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
        <section>
        <div className="album py-5 bg-body-tertiary">
          <div className="container">
            <div className="main-title py-5">
              <h3 className="display-4 fw-bold text-body-emphasis text-center">주문/결제</h3>
            </div>
            <div className="row my-3 row-gap-3">
              {/* 구매자 정보 */}
              <div className="col-12 col-md-6">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <div className="card-title">
                      <h3>구매자 정보</h3>
                    </div>
                    <table className="table">
                      <tr>
                        <th className="table-secondary">이름</th>
                        <td>
                          <p className="m-0" id="name">{order.user.name}</p>
                        </td>
                      </tr>
                      <tr>
                        <th className="table-secondary">전화번호</th>
                        <td>
                          <p className="m-0" id="tel">{order.user.phone}</p>
                        </td>
                      </tr>
                      <tr>
                        <th className="table-secondary">마이펫</th>
                        <td>
                          <select name="petNo" id="petNo" className="form-control">
                            {petList.map(pet => (
                              <option key={pet.petNo} value={pet.petNo}>{pet.petname}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
              {/* 훈련사 정보 */}
              <div className="col-12 col-md-6">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <div className="card-title">
                      <h3>훈련사 정보</h3>
                    </div>
                    <table className="table">
                      <tr>
                        <th className="table-secondary">이름</th>
                        <td>
                          <p className="m-0" id="name">{trainer.user.name}</p>
                        </td>
                      </tr>
                      <tr>
                        <th className="table-secondary">전화번호</th>
                        <td>
                          <p className="m-0" id="tel">{trainer.user.phone}</p>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* 주문 정보 */}
            <div className="row my-3">
              <div className="col-12">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <div className="card-title">
                      <h3>주문 정보</h3>
                    </div>
                    <table className="table my-0">
                      <tr>
                        <th className="col-4 col-md-2 table-secondary">주문 정보</th>
                        <td className="col-8 col-md-10">
                          <p className="m-0" id="orderTitle">{order.title}</p>
                        </td>
                      </tr>
                    </table>
                    <table className="table my-0">
                      <tr>
                        <th className="col-4 col-md-2 table-secondary">총 가격</th>
                        <td className="col-8 col-md-10">
                          &#8361; <span>{order.price.toLocaleString()}</span> 원
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* 결제 정보 */}
            <div className="row my-3">
              <div className="col-12">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <div className="card-title">
                      <h3>결제 정보</h3>
                    </div>
                    <div className="card-text">
                      <table className="table my-0">
                        <tr>
                          <th className="col-4 col-md-2 table-secondary">총상품가격</th>
                          <td className="col-8 col-md-10">
                            <p className="m-0">&#8361; {order.price.toLocaleString()} 원</p>
                          </td>
                        </tr>
                        <tr>
                          <th className="col-4 col-md-2 table-secondary">총결제금액</th>
                          <td className="col-8 col-md-10">
                            <p className="m-0">&#8361; {order.price.toLocaleString()} 원</p>
                          </td>
                        </tr>
                      </table>
                    </div>
                    <div className="d-grid gap-2 my-5">
                      <input type="hidden" name="addressId" id="addressId" value="" />
                      <input type="hidden" name="price" id="price" value={order.price} />
                      <button className="btn btn-primary" type="button" onClick={() => requestPay()}>결제하기</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default OrdersInsert