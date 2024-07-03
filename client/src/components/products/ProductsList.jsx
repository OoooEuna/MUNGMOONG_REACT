import React from 'react'
import { Link } from 'react-router-dom';
import formatDate from '../../apis/format'


const ProductsList = ({ productList, isLoading }) => {
  console.log(productList);
  const templateStyle = {
    backgroundColor : "#fff",
    padding: "7%",
    margin: "3% 0px",
    borderRadius: "24px"
}
  return (
    <div className='container px-5 mb-5'>
        <div className="text-center mb-5" style={{ paddingTop: "5%"}}>
                <h1 className="display-5 fw-bolder mb-0"><span className="text-gradient d-inline">훈련사</span></h1>
            </div>
       {
        isLoading &&
        <div>
          <img src="/img/loading.webp" alt="loading" width="100%" />
        </div>
      }
    {
        !isLoading && productList && (
             <div className="row gx-5 justify-content-center">
                  <div className="col-lg-11 col-xl-9 col-xxl-8">
                      <div>
                          <div className="card-body p-0">
                              <div className="row align-items-start">
                              {productList.map((product) => (
                                  <div className='d-flex' key={product.id} style={templateStyle}>                                 
                                        <img src={'/img/trainer01.png'} className="col-4 img-thumbnail img-fluid" alt="훈련사"/>
                                          <div className="col-8">
                                              <h2 className="fw-bolder" style={{padding:'3% 10%',fontSize : "1.01rem"}}>
                                              <Link className="btn btn-warning" style={{marginBottom: "13%"}} to={`/prodcuts/${product.id}`}>
                                                더보기
                                              </Link>
                                                <p className="card-title fs-5">{product.description}</p>
                                                <p className="card-text">{product.price}</p>
                                                <p className="card-text">{product.content}</p>
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

export default ProductsList