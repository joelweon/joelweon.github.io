---
layout:  post
title: 테이블 복제
tags:
- database
- oracle
- copy
- table
---

### 테이블 스키마 및 데이터 복제

```
CREATE TABLE 새로만들테이블명
AS SELECT * FROM 복사할테이블명
[WHERE]
```

### 테이블 스키마만 복사
```
CREATE TABLE 새로만들테이블명
AS SELECT * FROM 복사할테이블명 WHERE 1=2
-> WHERE 조건절을 거짓으로 만들면됨.
```

### 테이블 데이터만 복사
```
INSERT INTO 기존테이블
SELECT * FROM 복사할테이블명
[WHERE]
```


