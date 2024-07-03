import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate를 추가했습니다.
import Swal from 'sweetalert2';
import Button from '../../common/Button';
import InputField from '../../common/InputField';
import RadioButton from '../../common/RadioButton';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import './css/UserForm.css';

const DateSelector = ({ selectedDate, onChange }) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onChange}
      dateFormat="yyyy-MM-dd"
      className="form-control"
      showYearDropdown
      showMonthDropdown
      scrollableYearDropdown
      scrollableMonthDropdown
      dropdownMode="select"
    />
  );
};

const UserForm = ({ onSubmit }) => {
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState(0); // 탭 상태 정의
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    userId: '',
    password: '',
    passwordChk: '',
    email: '',
    phone: '',
    address2: '',
    address3: '',
    birth: new Date(), // 기본 생년월일을 현재 날짜로 설정
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordChkError, setPasswordChkError] = useState('');
  const [passwordMatchMessage, setPasswordMatchMessage] = useState('');
  const [emailVerificationStatus, setEmailVerificationStatus] = useState('');
  const [emailVerificationCode, setEmailVerificationCode] = useState('');
  const [userIdStatus, setUserIdStatus] = useState('');

  const navigate = useNavigate(); // useNavigate 추가

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, birth: date });
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

  const handleEmailVerification = async () => {
    try {
      const response = await fetch('/api/send-email-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      if (response.ok) {
        setEmailVerificationStatus('이메일 인증 코드가 전송되었습니다.');
      } else {
        setEmailVerificationStatus('이메일 인증에 실패했습니다.');
      }
    } catch (error) {
      console.error('이메일 인증 중 오류 발생:', error);
      setEmailVerificationStatus('이메일 인증에 실패했습니다.');
    }
  };

  const handleEmailVerificationCompletion = async () => {
    if (!emailVerificationCode.trim()) {
      setEmailVerificationStatus('인증 코드를 입력해주세요.');
      return;
    }

    try {
      const response = await fetch('/api/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: emailVerificationCode, email: formData.email }),
      });

      if (response.ok) {
        setEmailVerificationStatus('이메일 인증이 완료되었습니다.');
      } else {
        setEmailVerificationStatus('인증 코드가 일치하지 않습니다.');
      }
    } catch (error) {
      console.error('이메일 인증 완료 중 오류 발생:', error);
      setEmailVerificationStatus('이메일 인증에 실패했습니다.');
    }
  };

  const handleUserIdCheck = async () => {
    try {
      const response = await fetch(`/api/users/register/check/${formData.userId}`);
      if (response.ok) {
        const isAvailable = await response.json();
        setUserIdStatus(isAvailable ? '아이디를 사용할 수 있습니다.' : '아이디가 이미 사용 중입니다.');
      } else {
        setUserIdStatus('아이디 중복 확인 중 오류 발생');
      }
    } catch (error) {
      console.error('아이디 중복 확인 중 오류 발생:', error);
      setUserIdStatus('아이디 중복 확인 중 오류 발생');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    // 비밀번호 검증
    let passwordError = validatePassword(formData.password);
    setPasswordError(passwordError);
    
    if (passwordError) {
      return; // 비밀번호 오류가 있는 경우 제출하지 않음
    }

    if (formData.password !== formData.passwordChk) {
      setPasswordChkError('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 비밀번호 확인 오류가 없는 경우 제출
    setPasswordChkError('');
    
    // 주소를 합쳐서 하나의 필드로 설정
    const address = `${formData.address2} ${formData.address3}`;
    
    // 비밀번호 확인 필드를 제외한 데이터만 제출
    const { passwordChk, address2, address3, ...dataToSubmit } = formData;
    dataToSubmit.address = address;
    dataToSubmit.birth = format(formData.birth, 'yyyy-MM-dd'); // 날짜를 'yyyy-MM-dd' 형식으로 변환
    
    console.log('폼 데이터:', dataToSubmit); // 폼 데이터 확인

    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      let result;
      const contentType = response.headers.get('Content-Type');

      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
      } else {
        const text = await response.text();
        result = { message: text };
      }

      if (response.ok) {
        // 성공 시 상위 컴포넌트로 결과를 전달
        onSubmit(result);
      } else {
        // 실패 시 사용자에게 오류 메시지 표시
        Swal.fire({
          icon: 'error',
          title: '회원가입 실패',
          text: result.message || '회원가입 중 오류가 발생했습니다.',
        });
      }
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error);
      Swal.fire({
        icon: 'error',
        title: '회원가입 실패',
        text: '서버와의 연결에 문제가 발생했습니다.',
      });
    }
  };


  return (
    <form onSubmit={handleSubmit} id="form" method="Post" action="/api/users/register/">
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
      <div className="mb-3">
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
        <Button type="button" className="btn btn-secondary" onClick={handleUserIdCheck}>
          아이디 중복 확인
        </Button>
        {userIdStatus && (
          <div className={userIdStatus.includes('오류') || userIdStatus.includes('중입니다.') ? 'text-error' : 'text-success'}>
            {userIdStatus}
          </div>
        )}
      </div>
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
        {passwordError && <div className="text-error">{passwordError}</div>}
        {passwordChkError && <div className="text-error">{passwordChkError}</div>}
        {passwordMatchMessage && <div className="text-success">{passwordMatchMessage}</div>}
      </div>
      <div className="mb-3">
        <div className="input-group">
          <InputField
            type="email"
            name="email"
            id="email"
            placeholder="이메일"
            value={formData.mail}
            onChange={handleChange}
            required
          />
          <Button type="button" className="btn btn-secondary" onClick={handleEmailVerification}>
            인증하기
          </Button>
        </div>
        {emailVerificationStatus && (
          <div className={emailVerificationStatus.includes('실패') || emailVerificationStatus.includes('일치하지 않습니다.') ? 'text-error' : 'text-success'}>
            {emailVerificationStatus}
          </div>
        )}
      </div>
      <div className="mb-3">
        <InputField
          type="text"
          name="emailVerificationCode"
          id="emailVerificationCode"
          placeholder="인증 코드"
          value={emailVerificationCode}
          onChange={(e) => setEmailVerificationCode(e.target.value)}
          required
        />
        <Button type="button" className="btn btn-secondary" onClick={handleEmailVerificationCompletion}>
          인증 완료
        </Button>
      </div>
      <InputField
        type="text"
        name="phone"
        id="phone"
        placeholder="전화"
        value={formData.phone}
        onChange={handleChange}
        required
        feedback="전화번호를 입력해주세요."
      />
      <div className="mb-3">
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
      </div>
      <div className="mb-3">
        <label htmlFor="birth">생년월일</label>
        <DateSelector
          selectedDate={formData.birth}
          onChange={handleDateChange}
        />
      </div>
      <div className="mb-4" style={{ textAlign: 'center', padding: '3% 0' }}>
        <Button type="submit" className="btn btn-outline-warning" id="save-btn">
          가입하기
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
