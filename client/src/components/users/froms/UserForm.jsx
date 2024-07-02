// components/forms/UserForm.js
import React, { useState } from 'react';
import Button from '../../common/Button';
import InputField from '../../common/InputField';
import RadioButton from '../../common/RadioButton';
import './css/UserForm.css'; // CSS import

const UserForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    userId: '',
    password: '',
    passwordChk: '',
    mail: '',
    phone: '',
    address2: '',
    address3: '',
    birth: '2000-01-01',
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordChkError, setPasswordChkError] = useState('');
  const [passwordMatchMessage, setPasswordMatchMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const validatePassword = (password) => {
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    if (password.length < 8) {
      return '비밀번호는 최소 8자 이상이어야 합니다.';
    }
    if (!hasSpecialChar) {
      return '비밀번호에는 특수문자가 포함되어야 합니다.';
    }
    return '';
  };

  const handlePasswordCheck = () => {
    let passwordError = '';
    let passwordChkError = '';
    let passwordMatchMessage = '';

    if (!formData.password || !formData.passwordChk) {
      passwordError = '비밀번호와 비밀번호 확인을 모두 입력해주세요.';
    } else {
      passwordError = validatePassword(formData.password);

      if (passwordError === '') {
        if (formData.password !== formData.passwordChk) {
          passwordChkError = '비밀번호가 일치하지 않습니다.';
        } else {
          passwordMatchMessage = '비밀번호가 일치합니다.';
        }
      }
    }

    setPasswordError(passwordError);
    setPasswordChkError(passwordChkError);
    setPasswordMatchMessage(passwordMatchMessage);
  };

  return (
    <form onSubmit={handleSubmit} id="form" method="post" action="/users/register/">
      <input type="hidden" name="_csrf" />
      <InputField
        type="text"
        name="name"
        id="name"
        placeholder="이름"
        value={formData.name}
        onChange={handleChange}
        required
        feedback="이름을 입력해주세요."
      />
      <div className="mb-3">
        <label>성별</label>
        <div className="input-group">
          <RadioButton id="male" name="gender" value="0" label="남자" onChange={handleChange} />
          <RadioButton id="female" name="gender" value="1" label="여자" onChange={handleChange} />
        </div>
      </div>
      <InputField
        type="text"
        name="userId"
        id="userId"
        placeholder="아이디"
        value={formData.userId}
        onChange={handleChange}
        required
        feedback="아이디를 입력해주세요."
      />
      <InputField
        type="password"
        name="password"
        id="password"
        placeholder="비밀번호"
        value={formData.password}
        onChange={handleChange}
        required
        feedback="비밀번호를 입력해주세요."
      />
      <div className="mb-3">
        <div className="input-group">
          <InputField
            type="password"
            name="passwordChk"
            id="passwordchk"
            placeholder="비밀번호 확인"
            value={formData.passwordChk}
            onChange={handleChange}
            required
            feedback="비밀번호 확인을 입력해주세요."
          />
          <Button type="button" className="btn btn-secondary" onClick={handlePasswordCheck}>
            확인
          </Button>
        </div>
        {passwordError && <div className="text-danger">{passwordError}</div>}
        {passwordChkError && <div className="text-danger">{passwordChkError}</div>}
        {passwordMatchMessage && <div className="text-success">{passwordMatchMessage}</div>}
      </div>
      <InputField
        type="email"
        name="mail"
        id="mail"
        placeholder="이메일"
        value={formData.mail}
        onChange={handleChange}
        required
      />
      <InputField
        type="phone"
        name="phone"
        id="phone"
        placeholder="전화"
        value={formData.phone}
        onChange={handleChange}
        required
        feedback="전화번호를 입력해주세요."
      />
      <InputField
        type="text"
        name="address2"
        id="address2"
        placeholder="주소"
        value={formData.address2}
        onChange={handleChange}
        required
        feedback="주소를 입력해주세요."
      />
      <InputField
        type="text"
        name="address3"
        id="address3"
        placeholder="상세주소"
        value={formData.address3}
        onChange={handleChange}
      />
      <InputField
        type="text"
        name="birth"
        id="birth"
        placeholder="생년월일"
        value={formData.birth}
        onChange={handleChange}
      />
      <div className="mb-4" style={{ textAlign: 'center', padding: '3% 0' }}>
        <Button type="submit" className="btn btn-outline-warning" id="save-btn" disabled>
          가입하기
        </Button>
        <Button type="button" className="btn btn-outline-warning">메인</Button>
      </div>
    </form>
  );
};

export default UserForm;
