// components/forms/PetForm.js
import React, { useState } from 'react';
import Button from '../../common/Button';
import InputField from '../../common/InputField';
import RadioButton from '../../common/RadioButton';

const PetForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    petname: '',
    type: '',
    age: '',
    petgender: '',
    character: '',
    specialNotes: '',
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
    <form onSubmit={handleSubmit}>
      <InputField
        type="text"
        name="petname"
        id="petname"
        placeholder="이름"
        value={formData.petname}
        onChange={handleChange}
        required
        feedback="반려견 이름을 입력해주세요."
      />
      <InputField
        type="text"
        name="type"
        id="type"
        placeholder="견종"
        value={formData.type}
        onChange={handleChange}
        required
        feedback="견종을 입력해주세요."
      />
      <InputField
        type="text"
        name="age"
        id="petage"
        placeholder="나이"
        value={formData.age}
        onChange={handleChange}
      />
      <div className="mb-3">
        <label>성별</label>
        <div className="input-group">
          <RadioButton id="petmale" name="petgender" value="1" label="♂" onChange={handleChange} />
          <RadioButton id="petfemale" name="petgender" value="2" label="♀" onChange={handleChange} />
        </div>
      </div>
      <InputField
        type="text"
        name="character"
        id="character"
        placeholder="성격"
        value={formData.character}
        onChange={handleChange}
      />
      <div>
        <span>특이사항</span>
        <br />
        <InputField
          type="text"
          name="specialNotes"
          id="specialNotes"
          placeholder=""
          value={formData.specialNotes}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4" style={{ textAlign: 'center', padding: '3% 0' }}>
        <Button type="submit" className="btn btn-outline-warning" id="save-btn" disabled>
          가입하기
        </Button>
        <Button type="button" className="btn btn-outline-warning">메인</Button>
      </div>
    </form>
  );
};

export default PetForm;
