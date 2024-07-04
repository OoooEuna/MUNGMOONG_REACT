import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';
import NavBarContainer from '../../containers/trainer/NavBarContainer';

// 훈련사 정보 수정
const InfoUpdate = ({ trainer, careerList, newCareerList, certificateList, addCareerInput, addCertificateInput, handleCareerChange, handleNewCareerChange, handleContentChange, handleCertificateChange, onSubmit }) => {



  const handleSubmit = () => {
    // 유효성 검사

    onSubmit()
  }



    return (
        <div className="container mt-5">
            <div className="inner">
                <h1 className="title">훈련사 정보 수정</h1>
                <NavBarContainer />
                <form >
                    <table className="table table-bordered">
                        <thead className="thead-light">
                            <tr className="first_tr">
                                <th>목록</th>
                                <th>내용</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>경력</td>
                                <td id="career">
                                    {careerList.map((career, index) => (
                                        <div key={career.no}>
                                            <input
                                                type="hidden"
                                                name="careerNos"
                                                value={career.no}
                                            />
                                            <input
                                                type="text"
                                                className="form-control mb-1"
                                                value={career.name}
                                                name="careerNames"
                                                onChange={(e) => handleCareerChange(index, e.target.value)}
                                            />
                                        </div>
                                    ))}
                                    {/* 추가된 경력 */}
                                    {newCareerList.map((career, index) => (
                                        <div key={career.no}>
                                            <input
                                                type="text"
                                                className="form-control mb-1"
                                                value={career.name}
                                                name="careerNames"
                                                onChange={(e) => handleNewCareerChange(index, e.target.value)}
                                            />
                                        </div>
                                    ))}
                                    <button type="button" className="btn btn-custom5" onClick={addCareerInput}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>소개</td>
                                <td className="text-start">
                                    {trainer.imgFile == null ? (
                                        <img src="/file/img/0" alt="Certificate Image" />
                                    ) : (
                                        <img src={`/file/img/${trainer.imgFile.no}`} alt="Trainer Image" />
                                    )}
                                    <input className="form-control mb-2" type="file" name="thumbnail" />
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        value={trainer.content}
                                        onChange={(e) => handleContentChange(e.target.value)}
                                        name="content"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>자격증</td>
                                <td id="certificate">
                                    <div className="d-flex justify-content-start mt-3 gap-5 mx-4">
                                        {certificateList.map((certificate, index) => (
                                            <div
                                                id="certificateImg"
                                                className="d-flex flex-column align-items-center mx-2"
                                                key={certificate.no}
                                            >
                                                {certificate.imgFile == null ? (
                                                    <img src="/file/img/0" alt="Certificate Image" />
                                                ) : (
                                                    <img
                                                        src={`/file/img/${certificate.imgFile.no}`}
                                                        alt="Certificate Image"
                                                    />
                                                )}
                                                <p>{certificate.name}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        style={{ textAlign: 'center' }}
                                        type="button"
                                        className="btn btn-custom5"
                                        onClick={addCertificateInput}
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="bottom-btn text-end">
                        <button type="button" className="btn btn-lg btn-custom2" onClick={handleSubmit}>
                            저장
                        </button>
                        <a href="/trainer/info">
                            <button type="button" className="btn btn-lg btn-custom3" >
                                목록
                            </button>
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InfoUpdate;
