---
layout:  post
title: PROCEDURE, FUNCTION 문자열 검색
tags:
- oracle
- procedure
- function
---

```sql
SELECT *
FROM USER_SOURCE
WHERE TEXT LIKE  '%REG_DT%'
-- AND TYPE = 'PROCEDURE'
-- AND TYPE = 'FUNCTION'
ORDER BY NAME, LINE
```