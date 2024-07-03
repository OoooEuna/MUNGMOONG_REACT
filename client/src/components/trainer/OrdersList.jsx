import React from 'react';
import { Link } from 'react-router-dom';
import './trainer.css';
import NavBarContainer from '../../containers/trainer/NavBarContainer';

const OrdersList = ({ ordersList, isLoading, onMeaning }) => {

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
  };

  const handleStatusChange = async (no, meaning) => {
    const newMeaning = meaning + 1;
    try {
      const response = await onMeaning(no, newMeaning);
      if (response.status === 200) {
        console.log(`Meaning updated successfully:`, response);
      } else {
        console.error('Failed to update meaning');
      }
    } catch (error) {
      console.error('Error updating meaning:', error);
    }
  };

  return (
    <div className="container">
      <div className="inner">
        <h1 className="title">예약요청 반려동물</h1>
        <NavBarContainer />
        <div className="user_info">
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr className="first_tr">
                <th>예약자 id</th>
                <th>일정</th>
                <th>진행 상태</th>
                <th>결제 상태</th>
              </tr>
            </thead>
            <tbody>
              {ordersList.map((orders) => (
                <tr key={orders.no}>
                  <td>
                    <Link to={`/orders_details/${orders.no}`}>{orders.userId}</Link>
                  </td>
                  <td>{formatDate(orders.resDate)}</td>
                  <td>
                    <div>
                      {orders.meaning === 0 && (
                        <button
                          type="button"
                          className="btn button_sta"
                          onClick={() => handleStatusChange(orders.no, 0)}
                        >
                          진행
                        </button>
                      )}
                      {orders.meaning === 1 && (
                        <button
                          type="button"
                          className="btn button_sta"
                          onClick={() => handleStatusChange(orders.no, 1)}
                        >
                          완료
                        </button>
                      )}
                      {orders.meaning === 2 && (
                        <button type="button" className="btn button_sta" disabled>
                          완료
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="status">
                    {orders.status === 'pending' && <span>결제 대기</span>}
                    {orders.status === 'paid' && <span>결제 완료</span>}
                    {orders.status === 'refund' && <span>환불</span>}
                    {orders.status === 'approval' && <span>승인 완료</span>}
                    {!['pending', 'paid', 'refund', 'approval'].includes(orders.status) && (
                      <span>알 수 없음</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersList;
