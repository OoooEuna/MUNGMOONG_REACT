import React, { useState } from 'react';
import Swal from 'sweetalert2'; // 알림 라이브러리 추가
import './css/register.css';
import UserForm from '../../components/users/froms/UserForm';
import PetForm from '../../components/users/froms/PetForm';

const RegisterPage = () => {
  const [activeTab, setActiveTab] = useState('A'); // 현재 활성화된 탭

  const showContent = (tab) => {
    setActiveTab(tab);
  };

  const handleUserFormSubmit = (result) => {
    // 결과가 전달되면 처리합니다
    if (result.success) {
      Swal.fire({
        icon: 'success',
        title: '회원가입 성공!',
        text: result.message || '회원가입이 완료되었습니다.',
      }).then(() => {
        setActiveTab('B'); // 탭을 'B'로 변경
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: '회원가입 실패',
        text: `서버 응답 메시지: 회원가입 중 오류가 발생했습니다.`,
      });
    }
  };

  const handlePetFormSubmit = async (data) => {
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
              disabled={activeTab === 'B'}
            >
              사용자
            </button>
            <button
              id="buttonB"
              className={`tab-button ${activeTab === 'B' ? 'active' : ''}`}
              onClick={() => showContent('B')}
              disabled={activeTab === 'A'}
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
