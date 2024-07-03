import React, { useState } from 'react';
import UserForm from '../../components/users/froms/UserForm';
import PetForm from '../../components/users/froms/PetForm';
import './css/register.css';

const RegisterPage = () => {
  const [activeTab, setActiveTab] = useState('A'); // 현재 활성화된 탭

  const showContent = (tab) => {
    setActiveTab(tab);
  };

  const handleUserFormSubmit = async (data) => {
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // 사용자 등록 성공 시 반려견 탭으로 전환
        setActiveTab('B');
      } else {
        console.error('사용자 등록 실패');
      }
    } catch (error) {
      console.error('사용자 등록 실패:', error);
    }
  };

  const handlePetFormSubmit = (data) => {
    console.log('반려견 데이터:', data);
    // PetForm 제출 처리
  };

  return (
    <div className="container-sm reserve" style={{ padding: '3%', width: '50%', borderRadius: '15px', margin: '0 auto', marginTop: '30px', marginBottom: '4%', background: '#fff4d5' }}>
      <div className="input-form-background row">
        <div className="input-form col-md-12 mx-auto">
          <h4 className="mb-3">회원가입</h4>
          <div className="button-container">
            <button
              id="buttonA"
              className={`tab-button ${activeTab === 'A' ? 'active' : ''}`}
              onClick={() => showContent('A')}
              disabled={activeTab === 'A' ? false : true} // 현재 탭이 'A'일 때만 활성화
            >
              사용자
            </button>
            <button
              id="buttonB"
              className={`tab-button ${activeTab === 'B' ? 'active' : ''}`}
              onClick={() => showContent('B')}
              disabled={activeTab === 'B' ? false : true} // 현재 탭이 'B'일 때만 활성화
            >
              반려견
            </button>
          </div>
          <div className="validation-form" novalidate>
            {activeTab === 'A' && <UserForm onSubmit={handleUserFormSubmit} />}
            {activeTab === 'B' && <PetForm onSubmit={handlePetFormSubmit} />}
          </div>
          <div>
            <img src="/img/logo.png" alt="댕댕이" style={{ width: '30%', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
