import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './css/Header.module.css'; // CSS 모듈을 import합니다.

const CustomHeader = () => {
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAnonymous = true; // 예시로 익명 사용자 상태를 설정합니다.
  const isAuthenticated = false; // 예시로 인증된 사용자 상태를 설정합니다.
  const userRole = 1; // 예시로 사용자 역할을 설정합니다.
  const userId = 123; // 예시로 사용자 ID를 설정합니다.
  const csrfToken = 'your_csrf_token_here'; // 예시로 CSRF 토큰을 설정합니다.

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const trainerConfirm = () => {
    // 훈련사 승인 관련 처리를 하는 함수입니다. 필요한 경우 작성하세요.
  };

  return (
    <header className={styles.header}>
      <div className={styles.topRow}>
        <div className={styles.logo}>
          <Link to="/">
            <img src="/img/logo.png" style={{ width: '130px' }} alt="댕댕이" />
          </Link>
        </div>

        <div className={styles.nav}>
          <Link to="/introduce">소개</Link>
          <Link to="/products">훈련사</Link>
          <Link to="/QnA/list">문의</Link>
          <Link to="/board/list">공지사항</Link>
        </div>

        <div className={styles.auth}>
          {/* 인증 상태에 따라 다르게 표시 */}
          {isAnonymous && (
            <React.Fragment>
              <Link to="/users/login" className="btn btn-outline-secondary mx-1">로그인</Link>
              <Link to="/users/register" className="btn btn-outline-secondary mx-1">회원가입</Link>
            </React.Fragment>
          )}
          {isAuthenticated && (
            <React.Fragment>
              {/* 사용자 역할에 따라 다르게 표시 */}
              {userRole === 0 && <Link to="/trainer/join_data" className={`${styles.btn} ${styles.btnOutlineSuccess} mx-1`}>훈련사 등록</Link>}
              {userRole === 1 && <Link to="#" className={`${styles.btn} ${styles.btnOutlineSuccess} mx-1`} onClick={trainerConfirm}>훈련사 승인중</Link>}
              {userRole === 2 && <Link to={`/trainer/info?userId=${userId}`} className={`${styles.btn} ${styles.btnOutlineSuccess} mx-1`}>훈련사</Link>}
              {userRole === 3 && <Link to="/admin/admin_info" className={`${styles.btn} ${styles.btnOutlineSuccess} mx-1`}>관리자</Link>}
              
              <Link to="/users/index" className={`${styles.btn} ${styles.btnOutlineSecondary} mx-1`}>마이페이지</Link>
              <form action="/logout" method="post" className="d-inline">
                {/* CSRF TOKEN */}
                <input type="hidden" name="_csrf" value={csrfToken} />
                <button type="submit" className={`${styles.btn} ${styles.btnOutlineSecondary} mx-1`} style={{ padding: '6px 12px', border: '1px solid #6c757d' }}>로그아웃</button>
              </form>
            </React.Fragment>
          )}
        </div>

        <div className={styles.hamburger} onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>

       {/* 모바일 메뉴 */}
       <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.active : ''}`}>
          <nav>
            <Link to="/introduce">소개</Link>
            <Link to="/trainer">훈련사</Link>
            <Link to="#">문의</Link>
            <Link to="#">공지사항</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default CustomHeader;
