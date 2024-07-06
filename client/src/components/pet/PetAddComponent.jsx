import React from 'react';
import { Link } from 'react-router-dom';
import '../../pages/users/css/Mypage.css'; // 정확한 경로로 CSS 파일 임포트

const PetAddComponent = ({ formData, handleChange, handleFileChange, handleSubmit }) => {
    return (
        <div className="container">
            <div className="inner">
                <h1 className="title">마이 펫 추가</h1>
                <div className="container-inner">
                    <div className="profile-header">
                        <img
                            src={formData.image ? URL.createObjectURL(formData.image) : '/path/to/default/image.jpg'}
                            id="profile-image"
                            alt="Profile"
                        />
                        <label htmlFor="upload-photo">사진업로드 ▼</label>
                        <input type="file" id="upload-photo" name="image" style={{ display: 'none' }} accept="image/*" onChange={handleFileChange} />
                    </div>
                    <form id="petForm" onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="petname">이름</label>
                                <input type="text" className="form-control" id="petname" name="petname" value={formData.petname} onChange={handleChange} required />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="age">나이</label>
                                <input type="number" className="form-control" id="age" name="age" value={formData.age} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="form-row">
                             <div className="form-group col-md-6">
                                <label htmlFor="type">견종</label>
                                <input type="text" className="form-control" id="type" name="type" value={formData.type} onChange={handleChange} required />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="character">성격</label>
                                <input type="text" className="form-control" id="character" name="character" value={formData.character} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label htmlFor="specialNotes">특이사항</label>
                                <input type="text" className="form-control" id="specialNotes" name="specialNotes" value={formData.specialNotes} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">성별</label>
                            <div className="form-check">
                                <input type="radio" className="form-check-input" id="male" name="petgender" value="0" onChange={handleChange} required />
                                <label className="form-check-label" htmlFor="male">♂</label>
                            </div>
                            <div className="form-check">
                                <input type="radio" className="form-check-input" id="female" name="petgender" value="1" onChange={handleChange} required />
                                <label className="form-check-label" htmlFor="female">♀</label>
                            </div>
                        </div>
                        <div className="btn-container">
                            <button type="submit" className="btn-custom">추가</button>
                            <Link to="/api/users/index" className="btn-custom">취소</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PetAddComponent;
