---
layout:  post
title: 테이블 복제
tags:
- database
- table
---

```sql
CREATE TABLE 새로만들테이블명 
AS SELECT * FROM 복사할테이블명 [WHERE 절]
```

CREATE ==
AS SELECT 
WHERE 해당날짜

해당 날짜를 조건절에 넣으면 그 날짜 데이터 바로 넣음.