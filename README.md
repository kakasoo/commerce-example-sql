# commerce-example-sql

create e-commerce tables and dummy data for MySQL

# 설치와 설정

학습을 쉽게 하기 위해 docker compose를 사용한다.  
23.07 기준으로 `docker-compose` 대신 `docker compose`라고 입력해야 한다.

```bash
# 아래 스크립트로 일단 docker를 설치한다.
sudo curl -L "https://github.com/docker/compose/releases/download/2.18.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

```bash
# 미리 작성한 docker-compose.yml 파일로 mysql 이미지를 실행시킨다.
# -d 옵션은 백그라운드에서 실행하게 하는 명령어다.
docker compose up -d

# mysql container와 해당 container의 id 확인
docker ps -a

docker restart real-mysql-study

# docker container 접속
docker exec -it real-mysql-study bash

# mysql 접속
mysql -u root -p
>Enter password : # 아무 입력없이 엔터


```

1. `datetime`과 `timestamp`의 차이는?
2. `GUEST` 테이블과 `USER` 테이블의 차이는?
