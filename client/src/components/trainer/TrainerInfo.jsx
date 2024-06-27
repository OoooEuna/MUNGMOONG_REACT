import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';


const TrainerInfo = () => {
  const { userId } = useParams();
  const [trainer, setTrainer] = useState(null);
  const [careerList, setCareerList] = useState([]);
  const [certificateList, setCertificateList] = useState([]);

  useEffect(() => {
    // 훈련사 정보 가져오기
    const fetchTrainerInfo = async () => {
      try {
        const response = await axios.get(`/api/trainer/info?userId=${userId}`);
        setTrainer(response.data.trainer);
        setCareerList(response.data.careerList);
        setCertificateList(response.data.certificateList);
      } catch (error) {
        console.error('Error fetching trainer info:', error);
      }
    };

    fetchTrainerInfo();
  }, [userId]);

  return (
    <div className="container">
      <div className="inner">
        <h1 className="title">훈련사 정보</h1>
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="collapse navbar-collapse justify-content-start">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="tab-button active" to={`/trainer/info?userId=${userId}`}>훈련사 정보</Link>
              </li>
              <li className="nav-item">
                <Link className="tab-button" to="/trainer/schedule">스케쥴 관리</Link>
              </li>
              <li className="nav-item">
                <Link className="tab-button" to="/trainer/deposit">입금 내역서</Link>
              </li>
              <li className="nav-item">
                <Link className="tab-button" to="/trainer/orders">예약</Link>
              </li>
            </ul>
          </div>
        </nav>
        <form>
          <div className="info">
            <table className="table table-bordered">
              <thead className="thead-light">
                <tr className="first_tr">
                  <th>목록</th>
                  <th>내용</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-left-content">
                  <td>경력</td>
                  <td>
                    {careerList.map(career => (
                      <p className="text-start" key={career.id}>{career.name}</p>
                    ))}
                  </td>
                </tr>
                <tr className="text-left-content">
                  <td>소개</td>
                  <td className="text-start">
                    {!trainer?.imgFile ? (
                      <img src="/file/img/0" alt="Certificate Image" />
                    ) : (
                      trainer.imgFile.no !== 0 && (
                        <img src={`/file/img/${trainer.imgFile.no}`} alt="Trainer Image" />
                      )
                    )}
                    <p>{trainer?.content}</p>
                  </td>
                </tr>
                <tr className="text-left-content">
                  <td>자격증</td>
                  <td>
                    <div className="d-flex justify-content-start mt-3 gap-5 mx-4">
                      {certificateList.map(certificate => (
                        <div className="d-flex flex-column align-items-center mx-2" key={certificate.id}>
                          {certificate.imgFile && (
                            <img src={`/file/img/${certificate.imgFile.no}`} alt="Certificate Image" />
                          )}
                          <p>{certificate.name}</p>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="text-end">
              <Link to={`/trainer/info_update?userId=${userId}`}>
                <button type="button" className="btn-custom2">수정</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};


export default TrainerInfo