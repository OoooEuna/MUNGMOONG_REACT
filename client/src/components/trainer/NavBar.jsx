import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ trainerNo, userId }) => (
  <nav className="navbar navbar-expand-lg navbar-light">
    <div className="collapse navbar-collapse justify-content-start">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="tab-button" to={`/info/${userId}`}>훈련사 정보</Link>
        </li>
        <li className="nav-item">
          <Link className="tab-button" to="/schedule">스케쥴 관리</Link>
        </li>
        <li className="nav-item">
          <Link className="tab-button" to="/deposit">입금 내역서</Link>
        </li>
        <li className="nav-item">
          <Link className="tab-button active" to={`/orders/${trainerNo}`}>예약</Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default NavBar;
