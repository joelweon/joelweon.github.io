---
layout:  post
title: 오라클 컬럽합치기
tags:
- database
- oracle
- listagg
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

```sql
(SELECT LISTAGG(CODE_NM,'/ ') WITHIN GROUP(ORDER BY CODE_NM)
FROM (SELECT CODE_NM
    FROM vo vo
    INNER JOIN LETTCCMMNDETAILCODE DCODE
        ON vo.INSTT_ID = #insttId#
        AND DCODE.CODE_ID = '001'
        AND vo.PCKAGE_CODE = DCODE.CODE
    GROUP BY
        CODE_NM))                                                             AS pckageCodeAll
```