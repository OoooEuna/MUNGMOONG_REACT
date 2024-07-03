-- Active: 1717721626738@@127.0.0.1@3306@mypet

-- 👩‍💼 USERS  --

-- 기존 테이블 존재하면 삭제
DROP TABLE IF EXISTS user_auth;
DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS pet;

-- users : 회원 테이블
CREATE TABLE `users` (
  `no` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `name` varchar(100) NOT NULL,
  `birth` date DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `reg_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `upd_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `enabled` int DEFAULT 1,
  `role` int DEFAULT 0,
  `gender` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`no`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`)
) COMMENT='회원';

-- user_auth : 사용자 권한 테이블
CREATE TABLE `user_auth` (
  `user_id` varchar(100) NOT NULL,
  `auth` varchar(100) NOT NULL,
  PRIMARY KEY (`user_id`, `auth`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE
) COMMENT='사용자 권한';

-- BCryptPasswordEncoder - 암호화 시
-- 사용자
INSERT INTO users (user_id, password, name, birth, address, email, phone, reg_date, upd_date, enabled, role, gender)
VALUES ('user', '$2a$12$TrN..KcVjciCiz.5Vj96YOBljeVTTGJ9AUKmtfbGpgc9hmC7BxQ92', '사용자', '1990-01-01', '서울시 강남구', 'user_bcrypt@mail.com', '010-1234-5678', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 0, 'M');

-- 관리자
INSERT INTO users (user_id, password, name, birth, address, email, phone, reg_date, upd_date, enabled, role, gender)
VALUES ('admin', '$2a$12$TrN..KcVjciCiz.5Vj96YOBljeVTTGJ9AUKmtfbGpgc9hmC7BxQ92', '관리자', '1985-05-15', '서울시 강북구', 'admin_bcrypt@mail.com', '010-8765-4321', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1, 'F');

-- 권한 데이터 삽입
-- 사용자 권한

-- BCrypt 사용자 권한
INSERT INTO user_auth (user_id, auth)
VALUES ('user', 'ROLE_USER');

-- BCrypt 관리자 권한
INSERT INTO user_auth (user_id, auth)
VALUES ('admin', 'ROLE_ADMIN');

CREATE TABLE Pet (
    petNo INT AUTO_INCREMENT PRIMARY KEY,  -- 기본키이며 자동 증가하는 정수형 필드
    petname VARCHAR(255) NOT NULL,         -- 애완동물의 이름
    type VARCHAR(50) NOT NULL,             -- 애완동물의 종류
    age INT NOT NULL,                      -- 애완동물의 나이
    petgender CHAR(1) NOT NULL,            -- 애완동물의 성별 (단일 문자 'M' 또는 'F')
    petcharacter TEXT,                    -- 애완동물의 성격
    reg_date DATETIME DEFAULT CURRENT_TIMESTAMP, -- 등록 날짜를 저장하는 날짜 및 시간 필드, 기본값은 현재 시간
    upd_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- 수정 날짜
    user_id VARCHAR(255) NOT NULL,          -- 사용자 ID를 저장하는 문자열 필드
    specialNotes TEXT                     -- 추가적인 메모를 저장하는 텍스트 필드
);