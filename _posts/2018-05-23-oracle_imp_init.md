---
layout:  post
title: 오라클 tablespace 등 imp
tags:
- oracle
- imp
- tablespace
- user
---


### DBA_TABLESPACES 테이블스페이스 목록
```
SELECT TABLESPACE_NAME, STATUS, CONTENTS
FROM DBA_TABLESPACES;
```

### DBA_DATA_FILES 테이블스페이스 파일 목록
```
SELECT FILE_NAME, BYTES, STATUS FROM DBA_DATA_FILES;
```



### DBA_FREE_SPACE 테이블스페이스 잔여 공간
```
SELECT TABLESPACE_NAME, BYTES, BLOCKS FROM DBA_FREE_SPACE;
```


### 테이블스페이스 생성 및 자동확장
```
CREATE TABLESPACE 테이블스페이스명
DATAFILE '/usr/oracle/app/oradata/orcl/data/FILENAME.DBF'
SIZE 100M
AUTOEXTEND ON NEXT 10M MAXSIZE UNLIMITED;
```

### 테이블스페이스 변경
```
ALTER USER 유저명 DEFAULT TABLESPACE 테이블스페이스명;
```

### 테이블스페이스 삭제
```
DROP TABLESPACE 테이블스페이스명
INCLUDING CONTENTS AND DATAFILES
CASCADE CONSTRAINTS;
```

### 유저 생성
```
CREATE USER 유저명
IDENTIFIED BY 패스워드
DEFAULT TABLESPACE 테이블스페이스명;
```

### 유저 패스워드 변경
```
ALTER USER 유저명 IDENTIFIED BY 패스워드
```

### 모든 권한주기
```
GRANT CONNECT, DBA, RESOURCE TO 유저명;
```

### 유저 삭제
```
DROP USER 유저명
```


