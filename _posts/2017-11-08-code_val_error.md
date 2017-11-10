---
layout:  post
title: 코드값에러
tags:
- 

---

```xml
<!-- 추가시 일련번호(회원구분)  조회 -->
<select id="baseConfDAO.retrieveBaseConfMembGubnSeq" resultClass="String" parameterClass="baseConfVO">
	SELECT CASE WHEN #orderSeq# = '0'
				THEN SUBSTR (NVL (MAX (C550_CD_VAL), '0000'), 0, 2) || SUBSTR (LPAD (NVL (MAX (C550_CD_VAL) + 1, '0000'), 4, 0), 3, 2)
				WHEN #orderSeq# = '1'
				THEN SUBSTR (NVL (MAX (C550_CD_VAL), '0100'), 0, 2) || SUBSTR (LPAD (NVL (MAX (C550_CD_VAL) + 1, '0100'), 4, 0), 3, 2)
			END AS cdValue
	  FROM KCDC550
	 WHERE M549_INSI_ID = #insiId#
	   AND C550_CD_DIV_CD = #divCode#
	   AND C550_ORDER_SEQ = #orderSeq#
	   AND C550_CD_VAL != '9999'
</select>
```

회원구분 일련번호
개인회원 -> 00 + 01~99
단체회원 -> 01 + 01~99

일부에서는 정렬을 위해 c550_order_seq 를 사용한다.
0 -> 개인회원
1 -> 단체회원

issue)
개인회원은 0001 ~ 0099 가 전체 코드인데
0100 이라는 잘못된 값이 들어가있다.
(이유는 모름)
order_seq는 1
그래서 단체회원을 insert 할때 에러 발생.
단체회원은 nvl 0100 이 초기값이라 값넣으려고하는데 이미 개인회원이 갖고있음.

해결)
우선 0100~ 시작하면서 order_seq가 0 인 데이터 찾아서 변경



```sql
SELECT * FROM (
SELECT '0001' AS A FROM DUAL
UNION ALL
SELECT '0002' FROM DUAL
UNION ALL
SELECT '0101' FROM DUAL
UNION ALL
SELECT '0102' FROM DUAL
)
--WHERE SUBSTR(A, 1, 2) = '00'
WHERE SUBSTR(A, 1, 2) = '01'
```
