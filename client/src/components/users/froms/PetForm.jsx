import React, { useState, useEffect } from 'react';
import Button from '../../common/Button';
import InputField from '../../common/InputField';
import RadioButton from '../../common/RadioButton';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const PetForm = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    petname: '',
    type: '',
    age: '',
    petgender: '', // 성별을 문자열로 처리 ('M' 또는 'F')
    petcharacter: '',
    specialNotes: '',
  });

  // userId를 로컬 스토리지에서 가져오는 useEffect
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setFormData(prevData => ({ ...prevData, userId: storedUserId }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 성별을 문자열로 처리 ('M' 또는 'F')
    const genderMap = {
      'M': 'M', // 남자
      'F': 'F', // 여자
    };

    const transformedFormData = {
      ...formData,
      petgender: genderMap[formData.petgender] || '', // 성별 값 변환
    };

    try {
      await onSubmit(transformedFormData); // 폼 데이터를 제출하는 함수 호출
      Swal.fire({
        title: '펫이 등록되었습니다!',
        text: '로그인 페이지로 이동합니다.',
        icon: 'success',
        confirmButtonText: '확인',
      }).then(() => {
        navigate('/api/login'); // SweetAlert2의 확인 버튼 클릭 후 로그인 페이지로 이동
      });
    } catch (error) {
      Swal.fire({
        title: '오류',
        text: '펫 등록 중 문제가 발생했습니다.',
        icon: 'error',
        confirmButtonText: '확인',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} id="form" method="POST" action="/api/pets/add">
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
          <RadioButton id="petmale" name="petgender" value="M" label="♂" onChange={handleChange} />
          <RadioButton id="petfemale" name="petgender" value="F" label="♀" onChange={handleChange} />
        </div>
      </div>
      <InputField
        type="text"
        name="petcharacter"
        id="petcharacter"
        placeholder="성격"
        value={formData.petcharacter}
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
        <Button type="submit" className="btn btn-outline-warning" id="save-btn">
          가입하기
        </Button>
        <Button type="button" className="btn btn-outline-warning" onClick={() => navigate('/')}>
          메인
        </Button>
      </div>
    </form>
  );
};

export default PetForm;
