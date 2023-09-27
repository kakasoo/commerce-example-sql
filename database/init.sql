--학습 전 더미 데이터 삽입--

CREATE DATABASE COMMERCE;

USE COMMERCE;

DROP TABLE IF EXISTS GUEST;
DROP TABLE IF EXISTS USER;

-- 만약 USER 테이블이 없다면 아래와 같이 생성하게 한다--
CREATE TABLE IF NOT EXISTS USER (
	id VARCHAR(36) DEFAULT (UUID()) PRIMARY KEY,
	email VARCHAR(255) NOT NULL,
	username VARCHAR(255) NOT NULL,
	password_hash VARCHAR(255) NOT NULL,
	created_at DATETIME DEFAULT NOW(),
	updated_at DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	deleted_at DATETIME
);

CREATE TABLE IF NOT EXISTS GUEST (
	id VARCHAR(36) DEFAULT (UUID()) PRIMARY KEY,
	created_at TIMESTAMP DEFAULT NOW(),
	user_id VARCHAR(36)
);

ALTER TABLE GUEST ADD CONSTRAINT FK_GUEST_USER_ID FOREIGN KEY (user_id) REFERENCES USER (id);