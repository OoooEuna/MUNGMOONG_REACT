import React from 'react';
import { Link } from 'react-router-dom';

const ProductsRead = ({ id, products }) => {
  console.log("read 아이디 뜨니");
  console.log(id);

  return (
    <div className="album bg-body-tertiary">
        <div className="container">
            <div className='main-title'>
                <h1 className="display-4 fw-bold text-body-emphasis text-center">예약정보</h1>
              </div>
              {products && (
                <div className='row'>
                      <div className='col-12 col-md-6'>
                            <div className='card shadow-sm' style={{height:'100%'}}>
                                  &nbsp;
                                      <a href='/api/product/id={id}'>{products.id}
                                          <div className='card-box'>
                                            <img src={'/img/trainer01.png'} className="col-4 img-thumbnail img-fluid" style={{width:'100%'}} alt="훈련사"/>
                                          </div>
                                      </a>
                                  &nbsp;
                              </div>
                          </div>
                        <div className="col-12 col-md-6 card shadow-sm">
                            <div className="card-body">
                              <h3 className="card-title fs-2">{products.name}</h3>
                              <input type="hidden" name="title" value={products.name} />
                              <p className="card-text">{products.description}</p>
                                  <div className="d-flex justify-content-end">
                                    <p>
                                      <input type="hidden" name="price" value={products.price} />
                                      가격 : <span className="fw-bold">{products.price}</span>
                                    </p>
                                  </div>
                                  <div className="modal-body">
                                    예약날짜를 선택해주세요
                                    <label htmlFor="resDate">예약날짜</label>
                                        <div id="calendar" className="input-group">
                                          <input type="date" className="form-control" name="resDate" id="resDate" defaultValue="" />
                                          <input className="message" type="hidden" id="message" />
                                        </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-12 mb-3">
                                      <label htmlFor="address">방문주소</label>
                                      {/* <input type="text" className="form-control" id="address" name="address" value={user.address} /> */}
                                      <div className="invalid-feedback">주소을 입력해주세요.</div>
                                    </div>
                              </div>
                              <div className="row">
                                <div className="col-md-12 mb-3">
                                  <label htmlFor="memo">요청사항</label>
                                  <input type="text" className="form-control" id="memo" name="memo" placeholder="" />
                                  <div className="invalid-feedback">요청사항을 입력해주세요.</div>
                                </div>
                              </div>
                              <input type="hidden" id="productId" name="productId" value={products.id} />
                              <button type="submit" className="btn btn-success w-100" data="trainer123">
                                예약하기
                              </button>
                        </div>
                    </div>
                    <div>
                  <div id="page-top">
                    {/* Services */}
                    <section className="content-section text-center" style={{ color: '#333', backgroundColor: '#fff7e1' }}>
                      <div className="container px-4 px-lg-5">
                        <h2 className="mb-5">{products.content}</h2>
                        <div className="row gx-4 gx-lg-5">
                          {/* Additional content can be added here */}
                        </div>
                      </div>
                    </section>

                    <section className="content-section">
                      <p className="line"></p>
                      <h3 className="title">경력·자격</h3>
                      <div className="row">
                        <div className="col-4 mb-3">
                          <img src="/img/license.png" style={{display:'block',width:'100%'}} className="license" />
                          <p>반려동물 종합관리사</p>
                        </div>
                        <div className="col-4 mb-3">
                          <img src="/img/license.png"style={{display:'block',width:'100%'}}  className="license" />
                          <p>반려동물 행동교정사</p>
                        </div>
                        <div className="col-4 mb-3">
                          <img src="/img/license.png"style={{display:'block',width:'100%'}}  className="license" />
                          <p>반려동물 아로마관리사</p>
                        </div>
                      </div>
                      <p className="line"></p>
                      <h3 className="title">자기소개</h3>
                      <div className="licence_img row px-4 px-lg-5">
                        <span>
                          교육의 시작은 우리 아이의 기질, 성격을 아는 것부터 시작합니다. 모든 문제행동은 아이의 기질을 고려하지 못해 잘못된 교감에 기인한 경우가 많죠. 아이들과의 올바른 교감과 이해를
                          바탕으로 행복한 반려생활을 돕겠습니다.<br />
                        </span>
                      </div>
                    </section>
                  </div>
                </div>

              <div className="btn-box">
                <Link to="/api/products" className='btn'>목록</Link>
              </div>
          </div>
              )
              }
              </div>
              </div>
  )
}

  


export default ProductsRead;
