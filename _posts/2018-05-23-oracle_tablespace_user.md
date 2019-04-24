---
layout:  post
title: 오라클 tablespace, user, login, lang 조회 및 생성
tags:
- oracle
- tablespace
- user
- lang
---

### 관리자로그인
```sql
sqlplus "/as sysdba"
```


### DBA_TABLESPACES 테이블스페이스 목록
```sql
SELECT TABLESPACE_NAME, STATUS, CONTENTS
FROM DBA_TABLESPACES;
```

### DBA_DATA_FILES 테이블스페이스 파일 목록
```sql
SELECT FILE_NAME, BYTES, STATUS FROM DBA_DATA_FILES;
```



### DBA_FREE_SPACE 테이블스페이스 잔여 공간
```sql
SELECT TABLESPACE_NAME, BYTES, BLOCKS FROM DBA_FREE_SPACE;
```


### 테이블스페이스 생성 및 자동확장
```sql
CREATE TABLESPACE 테이블스페이스명
DATAFILE '/usr/oracle/app/oradata/orcl/data/FILENAME1.DBF'
SIZE 100M
AUTOEXTEND ON NEXT 10M MAXSIZE UNLIMITED;
```

UNLIMITED를 선언해도 내 경우에 32GB정도 담긴다.  
그래서 아래의 테이블스페이스 추가 확장이 필요하다.

> 32GB정도 되면 에러가 발생한다.
ORA-01653: user.table 테이블을 8192(으)로 FILENAME1 테이블스페이스에서 확장할 수 없습니다


### 테이블스페이스 추가 확장
```sql
ALTER TABLESPACE FILENAME1(기존 테이블스페이스명)
ADD DATAFILE '/usr/oracle/app/oradata/orcl/data/FILENAME2.DBF'
SIZE 200M
AUTOEXTEND ON NEXT 10M MAXSIZE UNLIMITED;
```

### 테이블스페이스 변경
```sql
ALTER USER 유저명 DEFAULT TABLESPACE 테이블스페이스명;
```

### 테이블스페이스 삭제
```sql
DROP TABLESPACE 테이블스페이스명
INCLUDING CONTENTS AND DATAFILES
CASCADE CONSTRAINTS;
```

### 유저 생성
```sql
CREATE USER 유저명
IDENTIFIED BY 패스워드
DEFAULT TABLESPACE 테이블스페이스명;
```

### 유저 패스워드 변경
```sql
ALTER USER 유저명 IDENTIFIED BY 패스워드
```

### 모든 권한주기
```sql
GRANT CONNECT, DBA, RESOURCE TO 유저명;
```

### 유저 삭제
```sql
DROP USER 유저명
```

### 언어 보기
```sql
select * from v$nls_parameters;
```
