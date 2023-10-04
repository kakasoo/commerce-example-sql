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
>Enter password : # 'password'가 password이므로 그대로 칠 것

# 더미 데이터 생성
source /var/lib/dummy/init.sql

```

# 도커 생성 간 에러 발생 시

```bash
# 도커 이미지가 잘못 빌드된 경우로 인한 에러
docker compose down --rmi all
```

1. `datetime`과 `timestamp`의 차이는?

   - `createdAt`, `updatedAt`, `deletedAt`의 의미는?

2. `GUEST` 테이블과 `USER` 테이블의 차이는?

   - GUEST 테이블은 서비스에 방문한 세션을 의미하며, 회원가입하지 않은 유저를 의미한다.

   - 방문하지 않고 회원가입할 수는 없기 때문에 유저는 최소한 1개 이상의 GUEST row를 가진다.

   - 유저는 게스트를 여러 개 가질 수 있고, GUEST의 user_id는 유저가 회원가입하기 전까지는 알 수 없다. 즉, NULL 이다.

3. 아래 문제를 풀어라.

   - 1. 전체 유저의 수를 구하라.

   ```sql
    -- 아래에 SQL을 작성하라. --
   SELECT COUNT(*) FROM USER;
   ```

   - 2. 1번 방문했음에도 (유저의 GUEST 조인 결과가 row 1개일 때를 의미한다.) 바로 회원가입한 유저의 수를 구하라.

   ```sql
    -- 아래에 SQL을 작성하라. --

   	-- 아래와 같이 작성할 경우 너무 많기 때문에 과부하가 걸린다. --
   -- SELECT COUNT(*) FROM USER AS U WHERE (SELECT COUNT(*) FROM GUEST AS G WHERE G.user_id = U.id) = 1;--

    SELECT G.user_id, COUNT(*) FROM GUEST AS G GROUP BY G.user_id HAVING COUNT(*) = 1;
   ```

   - 3. 1번 방문한 유저를 포함하여, 한 유저가 가입하기까지 평균적으로 몇 회 이상 방문했는지를 구하라.

   ```sql
    -- 아래에 SQL을 작성하라. --

   ```

   - 4. 1번 방문한 유저를 제외할 경우, 한 유저가 가입하기 까지 평균적으로 몇 회 이상 방문했는지를 구하라.

   ```sql
    -- 아래에 SQL을 작성하라. --

   ```
