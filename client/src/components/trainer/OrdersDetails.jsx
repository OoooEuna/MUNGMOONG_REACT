import React from 'react';
import NavBarContainer from '../../containers/trainer/NavBarContainer';

const OrderDetails = ({ pet, orders }) => {
  return (
    <div className="container">
      <div className="inner">
        <h1 className="title">예약요청 반려동물</h1>
        <NavBarContainer />
        <div className="user_info">
          <div className="row">
            <div className="col-md-4">
              <img src="/img/pet/강아지3.jpg" className="img-fluid" alt="반려견 이미지" />
            </div>
            <div className="col-md-8">
              <ul>
                <li>
                  <label className="dog_label" htmlFor="name">이름</label>
                  <input type="text" name="name" id="name" value={pet.petname} readOnly />
                </li>
                <li>
                  <label className="dog_label" htmlFor="age">나이</label>
                  <input type="text" name="age" id="age" value={pet.age} readOnly />
                </li>
                <li>
                  <label className="dog_label" htmlFor="petgender">성별</label>
                  <input type="text" name="petgender" id="petgender" value={pet.petgender === 'M' ? '♂' : (pet.petgender === 'F' ? '♀' : '')} readOnly />
                </li>
                <li>
                  <label className="dog_label" htmlFor="character">성격</label>
                  <input type="text" name="character" id="character" value={pet.petcharacter} readOnly />
                  <input type="text" name="petcharacter" id="petcharacter" value={pet.petcharacter} readOnly />
                </li>
                <li>
                  <label className="dog_label" htmlFor="type">견종</label>
                  <input type="text" name="type" id="type" value={pet.type} readOnly />
                </li>
                <li>
                  <label className="dog_label" htmlFor="address">주소</label>
                  <input type="text" name="address" id="address" value={orders.address} readOnly />
                </li>
                <li>
                  <label className="dog_label" htmlFor="title">예약한 훈련</label>
                  <input type="text" name="title" id="title" value={orders.title} readOnly />
                </li>
                <li>
                  <label className="dog_label" htmlFor="price">금액</label>
                  <input type="text" name="price" id="price" value={orders.price ? `${orders.price.toLocaleString()} 원` : ''} readOnly />
                </li>
                <li>
                  <label className="dog_label" htmlFor="resDate">예약 날짜</label>
                  <input type="text" name="resDate" id="resDate" value={orders.resDate ? new Date(orders.resDate).toLocaleString() : ''} readOnly />
                </li>
                <li>
                  <label className="dog_label" htmlFor="memo">요청사항</label>
                  <input type="text" name="memo" id="memo" value={orders.memo} readOnly />
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderDetails;
