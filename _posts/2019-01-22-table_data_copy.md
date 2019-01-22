---
layout:  post
title: 한 테이블에 있는 데이터 다른 컬럼으로 복사
tags:
- oracle
- data
- table
- column
---

#### SECR_UPD_DT 컬럼을 REG_DT 컬럼에 데이터 복사하기

```sql
UPDATE
(
SELECT REG_DT, SECR_UPD_DT FROM 테이블명 B
WHERE INSI_ID = B.INSI_ID
AND MEMB_ID = B.MEMB_ID
)
SET SECR_UPD_DT = REG_DT

```