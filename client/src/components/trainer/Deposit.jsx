import React from 'react';
import './trainer.css';
import NavBarContainer from '../../containers/trainer/NavBarContainer';

const Deposit = ({ ordersList, totalApprovedAmount, isLoading }) => {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!ordersList || ordersList.length === 0) {
    return <p>No orders found.</p>;
  }

  return (
    <div className="container">
      <div className="inner">
        <h1 className="title">입금 내역서</h1>
        <NavBarContainer />
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr className="first_tr">
              <th>예약자 id</th>
              <th>훈련</th>
              <th>승인 현황</th>
              <th>금액</th>
            </tr>
          </thead>
          <tbody>
            {ordersList.map((orders) => (
              <tr key={orders.no}>
                <td>{orders.userId}</td>
                <td>{orders.title}</td>
                <td className="status">
                  {orders.status === 'approval' && <span>승인</span>}
                  {orders.status === 'refund' && <span>환불</span>}
                  {orders.status !== 'approval' && orders.status !== 'refund' && <span>승인 대기</span>}
                </td>
                <td>{new Intl.NumberFormat('ko-KR', {
                  style: 'currency',
                  currency: 'KRW'
                }).format(orders.price)}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="3">총 금액</td>
              <td>{new Intl.NumberFormat('ko-KR', {
                style: 'currency',
                currency: 'KRW'
              }).format(totalApprovedAmount)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Deposit;
