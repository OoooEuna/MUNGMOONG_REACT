import React from 'react';
import { Link } from 'react-router-dom';
import '../../pages/pet/css/PetUsing.css'; // 정확한 경로로 CSS 파일 임포트


const UserInfoComponent = ({ user, pets, onDeletePet }) => {
  console.log('User:', user);
  console.log('Pets:', pets);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="inner">
        <h1 className="title">마이페이지</h1>
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="collapse navbar-collapse justify-content-start">
            <ul className="navbar-nav">
              {user.role !== 2 && (
                <>
                  <li className="nav-item">
                    <Link className="tab-button active" style={{ width: '130px' }} to="#">나의 정보</Link>
                  </li>
                  <li className="nav-item" id="petSitterUsage">
                    <Link className="tab-button" to="/api/pet/PetUsing" style={{ width: '130px' }}>이용중인 펫시터</Link>
                  </li>
                  <li className="nav-item" id="petSitterDetails">
                    <Link className="tab-button" to="/api/pet/PetDetail" style={{ width: '130px' }}>펫시터 이용내역</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
        <div className="box">
          <div className="my-info mb-5">
            <h2>내 정보</h2>
            <div className="col d-flex p-3" style={{ justifyContent: 'space-between' }}>
              <img src="/img/users/user1.png" alt="프로필 사진" className="mr-3" style={{ display: 'block', width: '250px' }} />
              <div className="info col-6">
                <p>{user.name} ({user.gender === 0 ? '♂' : '♀'})</p>
                <p>{user.email}</p>
                <p>{user.phone}</p>
                <p>생일: {new Date(user.birth).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}</p>
                <p>{user.address}</p>
              </div>
              <button type="button" className="tab-button" onClick={() => window.location.href = '/api/users/update'} style={{ padding: '3% 0', height: '45px', lineHeight: '2px', background: '#B9D6DC', color: '#fff' }}>정보수정</button>
            </div>
          </div>
          <div className="my-pets">
            <h2>마이 펫</h2>
            <div className="row d-flex" id="petListContainer">
              {pets.map(pet => (
                <div key={pet.petNo} style={{ width: '46%', backgroundColor: '#E5EFF7', display: 'flex', justifyContent: 'space-between', margin: '3% 2%' }}>
                  <div className="pet-card d-flex" style={{ padding: '3% 0' }}>
                    <img src="/img/users/pet1.png" alt={pet.petname} className="mr-3" style={{ display: 'block', width: '150px', height: '170px' }} />
                    <div className="pet-info" style={{ width: '48%' }}>
                      <p>{pet.petname} ({pet.petgender === 'M' ? '♂' : '♀'})</p>
                      <p>나이: {pet.age} 살</p>
                      <p>성격: {pet.petcharacter}</p>
                      <p>특이 사항: {pet.specialNotes}</p>
                    </div>
                    <div className="button-container">
                      <form action="/api/pet/petUpdate" method="get" style={{ display: 'inline' }}>
                        <input type="hidden" name="petNo" value={pet.petNo} />
                        <button type="submit" className="tab-buttonn" style={{ margin: '5% 0', background: '#B9D6DC', color: '#fff', borderRadius: '30px' }}>마이펫 수정</button>
                      </form>
                      <button type="button" className="tab-buttonn" style={{ margin: '5% 0', background: '#B9D6DC', color: '#fff', borderRadius: '30px' }} onClick={() => onDeletePet(pet.petNo)}>마이펫 삭제</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bottom-btn" style={{ textAlign: 'center' }}>
              <button type="button" className="custom-buttonn" style={{ textAlign: 'center', background: '#B9D6DC', color: '#fff', borderRadius: '30px' }} onClick={() => window.location.href = '/api/pet/petAdd'}>펫 추가</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoComponent;
