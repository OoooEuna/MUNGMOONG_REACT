import React from 'react';
import { Link } from 'react-router-dom';
import NavBarContainer from '../../containers/trainer/NavBarContainer';

const Info = ({ userId, careerList, trainer, certificateList }) => {
  return (
    <div className="container">
      <div className="inner">
        <h1 className="title">훈련사 정보</h1>
        <NavBarContainer />
        <form action={`/trainer/info?userId=${userId}`} method="get">
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
                    {careerList.map((career, index) => (
                      <p key={index} className="text-start">{career.name}</p>
                    ))}
                  </td>
                </tr>
                <tr className="text-left-content">
                  <td>소개</td>
                  <td className="text-start">
                    {trainer.imgFile == null ? (
                      <img src="/file/img/0" alt="Certificate Image" />
                    ) : (
                      <img src={`/file/img/${trainer.imgFile.no}`} alt="Trainer Image" />
                    )}
                    <p>{trainer.content}</p>
                  </td>
                </tr>
                <tr className="text-left-content">
                  <td>자격증</td>
                  <td>
                    <div className="d-flex justify-content-start mt-3 gap-5 mx-4">
                      {certificateList.map((certificate, index) => (
                        <div key={index} className="d-flex flex-column align-items-center mx-2">
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

export default Info;
