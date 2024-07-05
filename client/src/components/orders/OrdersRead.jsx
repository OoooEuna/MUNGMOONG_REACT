import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';


const OrdersRead = ({ no, orders }) => {

  const requestPay = () =>{
    console.log('결제한다요')
  }

  useEffect(() => {
    console.log(`:::::::::::::::::::`);
    console.log(`orders : ${orders}`);
  }, []) 

  return (
    <form action="/orders" method="get" id="checkForm">
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
                    <tbody>
                      <tr>
                        <th className="table-secondary">이름</th>
                        <td>
                          <p className="m-0" id="name">{ orders?.user?.name }</p>
                        </td>
                      </tr>
                      <tr>
                        <th className="table-secondary">전화번호</th>
                        <td>
                          <p className="m-0" id="tel">{orders?.user?.phone}</p>
                        </td>
                      </tr>
                      <tr>
                        <th className="table-secondary">마이펫</th>
                        <td>
                          <select name="petNo" id="petNo" className="form-control">
                            {orders.petList?.map(pet => (
                              <option key={pet.petNo} value={pet.petNo}>{pet.petname}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    </tbody>
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
                    <tbody>
                      <tr>
                        <th className="table-secondary">이름</th>
                        <td>
                          <p className="m-0" id="name">{orders.trainer?.name}</p>
                        </td>
                      </tr>
                      <tr>
                        <th className="table-secondary">전화번호</th>
                        <td>
                          <p className="m-0" id="tel">{orders.trainer?.phone}</p>
                        </td>
                      </tr>
                    </tbody>
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
                    <tbody>
                      <tr>
                        <th className="col-4 col-md-2 table-secondary">주문 정보</th>
                        <td className="col-8 col-md-10">
                          <p className="m-0" id="orderTitle">{orders?.order?.title}</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table className="table my-0">
                    <tbody>
                      <tr>
                        <th className="col-4 col-md-2 table-secondary">총 가격</th>
                        <td className="col-8 col-md-10">&#8361; {orders.order?.price.toLocaleString()} 원</td>
                      </tr>
                    </tbody>
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
                      <tbody>
                        <tr>
                          <th className="col-4 col-md-2 table-secondary">총상품가격</th>
                          <td className="col-8 col-md-10">
                            <p className="m-0">&#8361; {orders.order?.price.toLocaleString()} 원</p>
                          </td>
                        </tr>
                        <tr>
                          <th className="col-4 col-md-2 table-secondary">총결제금액</th>
                          <td className="col-8 col-md-10">
                            {/* TODO: 나중에 할인/쿠폰 고려 */}
                            <p className="m-0">&#8361; {orders.order?.price.toLocaleString()} 원</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="d-grid gap-2 my-5">
                    {/* TODO: 배송지ID 가져오기 */}
                    <input type="hidden" name="addressId" id="addressId" value="" />
                    <input type="hidden" name="price" id="price" value={orders?.order?.price} />
                    <button className="btn btn-primary" type="button" onClick={requestPay}>결제하기</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </form>
  )
}


  


export default OrdersRead;
