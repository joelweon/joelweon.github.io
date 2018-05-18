---
layout:  post
title: 오라클 ASCII CHR
tags:
- database
- oracle
---

- 쌍따옴표
```sql
SELECT CHR(34)
FROM DUAL;
```

- 홑따옴표
```sql
SELECT CHR(39)
FROM DUAL;
```

SELECT CHR(34) FROM DUAL; --  '||CHR(34)||'   -> "
SELECT CHR(39) FROM DUAL; --  '||CHR(39)||'   -> '

‘ 
-> grave(어퍼스트로피와 다름)
’  “  ”