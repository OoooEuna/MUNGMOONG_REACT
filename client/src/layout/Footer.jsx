// Footer.js

import React from 'react';
import styles from './css/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerSection}>
        <h4>펫시터 멍뭉<br />(주) 멍뭉</h4>
        <p>
          사업자 등록번호 : 111-22-333333<br />
          통신판매업 신고번호 : 제 2024-인천부평-1205
        </p>
      </div>
      <div className={styles.footerSection}>
        <h4>회사</h4>
        <p>
          펫 양성교육<br />
          채팅상담<br />
          상담시간 평일 오전 10:00 ~ 18:00<br />
          주말 오전 10:00 ~ 18:00<br />
        </p>
      </div>
      <div className={styles.footerSection}>
        <h4>서비스</h4>
        <p>
          서비스 소개<br />
          이용약관<br />
          개인정보 처리방침
        </p>
      </div>
      <div className={styles.footerSection}>
      <a href="#"><img src="/img/kakao.png" alt="카카오톡" style={{ width: '30px', marginRight: '10px' }} /></a>
      <a href="#"><img src="/img/twitter.png" alt="트위터" style={{ width: '30px', marginRight: '10px' }} /></a>
      </div>
    </footer>
  );
};

export default Footer;
