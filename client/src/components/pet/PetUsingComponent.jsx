// src/components/pet/PetUsingComponent.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../../pages/users/css/Mypage.css';

const PetUsingComponent = ({ trainer, pets }) => {
    return (
        <div className="container">
            <div className="inner" style={{ backgroundColor: '#fff', borderRadius: '49px', padding: '66px' }}>
                <h1 className="title">마이페이지</h1>
                <nav className="navbar navbar-expand-lg navbar-light" style={{ margin: '3% 0' }}>
                    <div className="collapse navbar-collapse justify-content-start">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="tab-button" to="/api/users/index" style={{ width: '130px' }}>나의 정보</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="tab-button active" to="#" style={{ width: '130px' }}>이용중인 펫시터</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="tab-button" to="/api/users/details" style={{ width: '130px' }}>펫시터 이용내역</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="box">
                    <div className="my-info mb-5">
                        <h2>진행현황</h2>
                        <div className="status-section">
                            <div>
                                <img src="/img/users/waiting.png" alt="대기" />
                                <p>대기</p>
                            </div>
                            <div>
                                <img src="/img/users/going.png" alt="진행" />
                                <p>진행</p>
                            </div>
                            <div>
                                <img src="/img/users/complete.png" alt="완료" />
                                <p>완료</p>
                            </div>
                            <div>
                                <img src="/img/users/cencle.png" alt="취소" />
                                <p>취소</p>
                            </div>
                        </div>
                        <div className="trainer-info mb-5">
                            <h2>훈련사 정보</h2>
                            <div className="info-card d-flex align-items-center p-3">
                                <img src="/img/users/trn1.png" alt="프로필 사진" className="mr-3" />
                                {trainer && (
                                    <div className="info">
                                        <p>{trainer.name}</p>
                                        <p>{trainer.phone}</p>
                                        <p>{trainer.mail}</p>
                                        <p>경력: {trainer.content}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-md-12">
                            <h2>나의 반려견</h2>
                            <div className="my-pets">
                                <div className="row">
                                    {pets.map(pet => (
                                        <div key={pet.petNo} className="col-md-6">
                                            <div className="pet-card d-flex align-items-center p-3 mb-3">
                                                <img src="/img/users/pet1.png" alt={pet.petname} className="mr-3" />
                                                <div className="pet-info">
                                                    <p>{pet.petname} ({pet.petgender === 'M' ? '♂' : '♀'})</p>
                                                    <p>나이: {pet.age} 살</p>
                                                    <p>성격: {pet.petcharacter}</p>
                                                    <p>특이사항: {pet.specialNotes}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="bottom-message">
                            현재 훈련사님과 함께 집으로 훈련사님이 방문하고 있습니다.
                        </div>
                        <div className="bottom-message2">
                            훈련사 현황이 완료처리가 되었을 때 확인버튼이 활성화 됩니다.
                        </div>
                        <div className="bottom-message3">
                            취소는 1:1 문의를 신청해주세요.
                        </div>
                        <div className="bottom-buttons">
                            <button type="button" onClick={() => window.location.href = '/QnA/list'}>취소</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PetUsingComponent;
