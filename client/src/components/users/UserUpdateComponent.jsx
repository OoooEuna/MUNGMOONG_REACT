import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../pages/users/css/UserUpdate.css'; // 정확한 경로로 CSS 파일 임포트

const UserUpdateComponent = ({ user, confirmPassword, handleChange, handleConfirmPasswordChange, handleSubmit }) => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container-outer">
      <h1 className="text-primary text-left">내 정보 수정</h1>
      <div className="container-inner">
        <div className="profile-header">
          <img src="path/to/profile_image.jpg" alt={user.name} />
          <label htmlFor="upload-photo">사진업로드 ▼</label>
          <input type="file" id="upload-photo" style={{ display: 'none' }} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="user-name">이름</label>
              <input
                type="text"
                className="form-control"
                id="user-name"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="birthday">생일</label>
              <input
                type="date"
                className="form-control"
                id="birthday"
                name="birth"
                value={user.birth}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="confirm-password">비밀번호 확인</label>
              <input
                type="password"
                className="form-control"
                id="confirm-password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="mail"
                value={user.mail}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="phone">전화번호</label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                value={user.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="address">주소</label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={user.address}
              onChange={handleChange}
            />
          </div>
          <div className="btn-container">
            <button type="submit" className="btn-custom">수정</button>
            <button type="button" className="btn-custom" onClick={() => navigate('/api/users/index')}>취소</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserUpdateComponent;
