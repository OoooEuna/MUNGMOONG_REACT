import React from 'react';

const Join = ({ userInfo, handleSubmit, careerList, addCareerInput, handleCareerChange, certificateList, addCertificateInput, handleCertificateChange, content, handleContentChange, handleThumbnailChange }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="container">
      <div className="inner">
        <h1 className="title">훈련사 정보 등록</h1>
        <h6 className="sub_text">정보 확인 및 훈련사 인증 자료를 올려주세요.</h6>

        <form onSubmit={handleSubmit}>
          <div className="info">
            <table className="table table-bordered">
              <thead className="thead-light">
                <tr className="first_tr">
                  <th>목록</th>
                  <th>내용</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center-content">
                  <td>아이디</td>
                  <td className="text-start">
                    <input type="text" name="userId" defaultValue={userInfo.userId} readOnly />
                  </td>
                </tr>
                <tr className="text-center-content">
                  <td>이름</td>
                  <td className="text-start">
                    <input type="text" name="name" defaultValue={userInfo.name} placeholder="훈련사 이름을 입력하세요" />
                  </td>
                </tr>
                <tr className="text-center-content">
                  <td>생년월일</td>
                  <td className="text-start">
                    <input type="date" name="birth" defaultValue={formatDate(userInfo.birth)} placeholder="생년월일을 입력하세요" />
                  </td>
                </tr>
                <tr className="text-center-content">
                  <td>성별</td>
                  <td className="text-start">
                    <select name="gender" defaultValue={userInfo.gender}>
                      <option value="M">남자</option>
                      <option value="F">여자</option>
                    </select>
                  </td>
                </tr>
                <tr className="text-center-content">
                  <td>주소</td>
                  <td className="text-start">
                    <input type="text" name="address" defaultValue={userInfo.address} placeholder="주소를 입력하세요" />
                  </td>
                </tr>
                <tr className="text-center-content">
                  <td>전화</td>
                  <td className="text-start">
                    <input type="text" name="phone" defaultValue={userInfo.phone} placeholder="전화번호를 입력하세요" />
                  </td>
                </tr>
                <tr className="text-center-content">
                  <td>이메일</td>
                  <td className="text-start">
                    <input type="text" name="email" defaultValue={userInfo.email} placeholder="이메일을 입력하세요" />
                  </td>
                </tr>
                <tr className="text-center-content">
                  <td>경력</td>
                  <td className="text-start">
                    {careerList.map((career, index) => (
                      <input
                        key={index}
                        type="text"
                        className="form-control mb-1"
                        value={career}
                        onChange={(e) => handleCareerChange(index, e.target.value)}
                        placeholder="경력을 입력해주세요."
                      />
                    ))}
                    <div className="text-center">
                      <button type="button" className="btn btn-custom5" onClick={addCareerInput}>
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="text-center-content">
                  <td>소개</td>
                  <td className="text-start">
                    <input type="file" id="thumbnail" className="thumbnail" name="thumbnail" onChange={handleThumbnailChange} />
                    <textarea className="form-control mt-1" name="content" rows="3" value={content} onChange={handleContentChange} placeholder="자기소개를 입력하세요"></textarea>
                  </td>
                </tr>
                <tr className="text-center-content">
                  <td>자격증</td>
                  <td className="text-start">
                    {certificateList.map((certificate, index) => (
                      <div key={index} className="d-flex mb-1">
                        <input
                          className="form-control"
                          type="text"
                          value={certificate.name}
                          onChange={(e) => handleCertificateChange(index, 'name', e.target.value)}
                          placeholder="자격명"
                        />
                        <input
                          className="form-control"
                          type="file"
                          onChange={(e) => handleCertificateChange(index, 'file', e.target.files[0])}
                        />
                      </div>
                    ))}
                    <div className="text-center">
                      <button type="button" className="btn btn-custom5" onClick={addCertificateInput}>
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="bottom-btn text-end">
              <button type="submit" className="btn btn-lg btn-custom4">
                훈련사 인증
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Join;
