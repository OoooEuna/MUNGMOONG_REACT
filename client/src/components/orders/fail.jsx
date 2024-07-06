import React from 'react'

const fail = () => {
  return (
    <div>
      <section style={{ height: "69vh" }}>
        <div className="album py-5 bg-body-tertiary">
            <div className="container">
            <div className="main-title py-5">
                <h3 className="display-4 fw-bold text-body-emphasis text-center">주문 실패</h3>
                <p className="text-center">주문이 실패되었습니다. 재주문 요청 바랍니다.</p>
            </div>
            <div className="d-flex justify-content-center gap-2">
                <div className="item">
                <a href={`/orders/${no}`} className="btn btn-lg btn-primary">다시 주문하기</a>
                </div>
            </div>
            </div>
        </div>
       </section>
    </div>
  )
}

export default fail