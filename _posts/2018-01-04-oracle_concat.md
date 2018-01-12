---
layout:  post
title: 테이블 복제
tags:
- database
- table
---

```sql
SELECT
	RPAD(SUBSTR(column),1,4),7,'0')
FROM DUAL;
```

```sql
SELECT
	LISTAGG(여러열컬럼명,' &amp; ') WITHIN GROUP(ORDER BY 여러열컬럼명)
FROM DUAL;
```