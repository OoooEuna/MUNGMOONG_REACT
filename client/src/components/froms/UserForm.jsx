// components/forms/UserForm.js
import React, { useState } from 'react';
import Button from '../common/Button';
import InputField from '../common/InputField';
import RadioButton from '../common/RadioButton';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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
