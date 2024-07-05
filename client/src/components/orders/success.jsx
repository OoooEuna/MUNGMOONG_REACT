import React from 'react'

const success = () => {
  return (
    <div>
      <section>
        <div className="album py-5 bg-body-tertiary">
            <div className="container">
            <div className="main-title py-5">
                <h3 className="display-4 fw-bold text-body-emphasis text-center">주문 완료</h3>
                <p className="text-center">주문이 완료되었습니다. 감사합니다.</p>
            </div>

            <div className="row py-5">
                {/* 결제 정보 */}
                <div className="col-12 col-md-12">
                <div className="card shadow-sm">
                    <div className="card-body">
                    <div className="card-title">
                        <h3>결제 정보</h3>
                    </div>
                    <table className="table">
                        <tr>
                        <th className="table-secondary">주문금액</th>
                        <td>
                            <p className="m-0">{`₩ ${new Intl.NumberFormat().format(order.price)} 원`}</p>
                        </td>
                        </tr>
                    </table>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center">
                        <h5>총 결제금액</h5>
                        <h5 className="text-danger fw-bold">{`₩ ${new Intl.NumberFormat().format(order.price)} 원`}</h5>
                    </div>
                    </div>
                </div>
                </div>
            </div>

            <div className="d-flex justify-content-center gap-2">
                <div className="item">
                <a href="" className="btn btn-outline-primary">주문 상세보기</a>
                </div>
                <div className="item">
                <a href="" className="btn btn-primary">쇼핑 계속하기</a>
                </div>
            </div>
            </div>
        </div>
        </section>

    </div>
  )
}

export default success