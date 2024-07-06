import React from 'react'
import { Link } from 'react-router-dom';
import formatDate from '../../apis/format'


const OrdersList = ({ ordersList, isLoading }) => {
  console.log(ordersList);
  console.log("read 주문번호 뜨니");
  console.log(no);
  console.log("no");
  console.log(orders);
  console.log("orders");
  const templateStyle = {
    backgroundColor : "#fff",
    padding: "7%",
    margin: "3% 0px",
    borderRadius: "24px"
}
  return (
    <div className='container px-5 mb-5'>
        <div className="text-center mb-5" style={{ paddingTop: "5%"}}>
                <h1 className="display-5 fw-bolder mb-0"><span className="text-gradient d-inline">예약/결제정보</span></h1>
            </div>
       {
        isLoading &&
        <div>
          <img src="/img/loading.webp" alt="loading" width="100%" />
        </div>
      }
    {
        !isLoading && ordersList && (
             <div className="row gx-5 justify-content-center">
                  <div className="col-lg-11 col-xl-9 col-xxl-8">
                      <div>
                          <div className="card-body p-0">
                              <div className="row align-items-start">
                              {ordersList.map((orders) => (
                                  <div className='d-flex' key={orders.id} style={templateStyle}>                                 
                                          <div className="col-8">
                                              <h2 className="fw-bolder" style={{padding:'3% 10%',fontSize : "1.01rem"}}>
                                                <p className="card-title fs-5">{orders.productId}</p>
                                                <p className="card-text">{orders.price}</p>
                                                <p className="card-text">{orders.title}</p>
                                              </h2>
                                        </div>
                                 </div>
                                )  
                              )       
                              }
                             </div>
                       </div>
                  </div>
              </div>
            </div>                                               
          )  
        }
        </div>
        )
      }

export default OrdersList