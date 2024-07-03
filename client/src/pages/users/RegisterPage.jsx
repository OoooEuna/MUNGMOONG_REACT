// RegisterPage.jsx
import React, { useState } from 'react';
import UserForm from '../../components/users/froms/UserForm';
import PetForm from '../../components/users/froms/PetForm';
import Swal from 'sweetalert2'; // 알림 라이브러리 추가
import './css/register.css';

const RegisterPage = () => {
  const [activeTab, setActiveTab] = useState('A'); // 현재 활성화된 탭
  const [error, setError] = useState(null); // 에러 상태

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

      let result;
      const contentType = response.headers.get('Content-Type');

      // 서버 응답이 JSON 형식인 경우 JSON으로 파싱
      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
      } else {
        // JSON 형식이 아닌 경우 텍스트로 응답 처리
        const text = await response.text();
        result = { message: text }; // 기본 오류 메시지
      }

      if (response.ok) {
        // 성공 처리
        Swal.fire({
          icon: 'success',
          title: '회원가입 성공!',
          text: result.message || '회원가입이 완료되었습니다.',
        }).then(() => {
          setActiveTab('B'); // 탭을 'B'로 변경
        });
      } else {
        // 실패 처리
        Swal.fire({
          icon: 'error',
          title: '회원가입 실패',
          text: result.message || '회원가입 중 오류가 발생했습니다.',
        });
      }
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error);
      // 네트워크 오류 처리
      Swal.fire({
        icon: 'error',
        title: '회원가입 실패',
        text: '서버와의 연결에 문제가 발생했습니다.',
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
              disabled={activeTab === 'A'}
            >
              사용자
            </button>
            <button
              id="buttonB"
              className={`tab-button ${activeTab === 'B' ? 'active' : ''}`}
              onClick={() => showContent('B')}
              disabled={activeTab === 'B'}
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
