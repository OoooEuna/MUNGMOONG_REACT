import React, { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';

const InfoList = () => {
  const [userId] = useState('sampleUserId'); // 임시 userId
  const [ordersList, setOrdersList] = useState([]);

  useEffect(() => {
    // 실제 API 호출 코드는 여기에 작성합니다.
    // 예시:
    // axios.get(`/api/trainer/orders?userId=${userId}`)
    //   .then(response => setOrdersList(response.data));

    // 샘플 데이터
    const sampleOrdersList = [
      {
        no: 1,
        userId: 'user1',
        resDate: new Date().toISOString(),
        meaning: 0,
        status: 'pending',
      },
      {
        no: 2,
        userId: 'user2',
        resDate: new Date().toISOString(),
        meaning: 1,
        status: 'paid',
      },
      {
        no: 3,
        userId: 'user3',
        resDate: new Date().toISOString(),
        meaning: 2,
        status: 'approval',
      },
    ];

    setOrdersList(sampleOrdersList);
  }, []);

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
  };

  return (
    <div className="container">
      <div className="inner">
        <h1 className="title">예약요청 반려동물</h1>
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="collapse navbar-collapse justify-content-start">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="tab-button" to={`/trainer/info?userId=${userId}`}>
                  훈련사 정보
                </Link>
              </li>
              <li className="nav-item">
                <Link className="tab-button" to="/trainer/schedule">
                  스케쥴 관리
                </Link>
              </li>
              <li className="nav-item">
                <Link className="tab-button" to="/trainer/deposit">
                  입금 내역서
                </Link>
              </li>
              <li className="nav-item">
                <Link className="tab-button active" to="/trainer/orders">
                  예약
                </Link>
              </li>
            </ul>
          </div>
        </nav>
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
                    <Link to={`/trainer/orders_details?no=${orders.no}`}>{orders.userId}</Link>
                  </td>
                  <td>{formatDate(orders.resDate)}</td>
                  <td>
                    <div>
                      {orders.meaning === 0 && (
                        <form action="/trainer/orders" method="post">
                          <input type="hidden" name="orderNo" value={orders.no} />
                          <input type="hidden" name="meaning" value="1" />
                          <button type="submit" className="btn button_sta">진행</button>
                        </form>
                      )}
                      {orders.meaning === 1 && (
                        <form action="/trainer/orders" method="post">
                          <input type="hidden" name="orderNo" value={orders.no} />
                          <input type="hidden" name="meaning" value="2" />
                          <button type="submit" className="btn button_sta">완료</button>
                        </form>
                      )}
                      {orders.meaning === 2 && (
                        <form action="/trainer/orders" method="post">
                          <input type="hidden" name="orderNo" value={orders.no} />
                          <input type="hidden" name="meaning" value="2" />
                          <button type="submit" className="btn button_sta" disabled>
                            완료
                          </button>
                        </form>
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

export default InfoList;
