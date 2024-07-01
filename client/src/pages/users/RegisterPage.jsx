// pages/RegisterPage.js
import './css/register.css';
import React, { useState } from 'react';
import UserForm from '../../components/froms/UserForm';
import PetForm from '../../components/froms/PetForm';


const RegisterPage = () => {
  const [activeTab, setActiveTab] = useState('A');

  const showContent = (tab) => {
    setActiveTab(tab);
  };

  const handleUserFormSubmit = (data) => {
    console.log('User Data:', data);
    // Handle user form submission
  };

  const handlePetFormSubmit = (data) => {
    console.log('Pet Data:', data);
    // Handle pet form submission
  };

  return (
    <div className="container-sm reserve" style={{ padding: '3%', width: '50%', borderRadius: '15px', margin: '0 auto', marginTop: '30px', marginBottom: '4%', background: '#fff4d5' }}>
      <div className="input-form-backgroud row">
        <div className="input-form col-md-12 mx-auto">
          <h4 className="mb-3">회원가입</h4>
          <div className="button-container">
            <button id="buttonA" className={activeTab === 'A' ? 'active' : ''} onClick={() => showContent('A')}>
              사용자
            </button>
            <button id="buttonB" className={activeTab === 'B' ? 'active' : ''} onClick={() => showContent('B')}>
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
