---
layout:  post
title: 오라클 테이블 이름, 컬럼명 조회
tags:
- oracle
- sql
---

#### 테이블명 보기
```SQL
SELECT *
FROM ALL_TAB_COMMENTS
WHERE TABLE_NAME = '테이블명';
```


#### 컬럼명 보기
```SQL
SELECT *
FROM ALL_COL_COMMENTS
WHERE TABLE_NAME = '테이블명';
```

#### 테이블 컬럼정보 보기
```SQL
SELECT *
FROM ALL_TAB_COLUMNS
WHERE TABLE_NAME = '테이블명';
```
