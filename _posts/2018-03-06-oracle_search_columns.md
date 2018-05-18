---
layout:  post
title: 오라클 컬럼명으로 테이블 조회
tags:
- database
- oracle
- columns
---

### 

``` sql
SELECT TABLE_NAME, COLUMN_NAME
FROM ALL_TAB_COLUMNS
WHERE COLUMN_NAME LIKE ' 컬럼명'
```

