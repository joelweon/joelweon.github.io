---
layout:  post
title: 트리거 제약조건 에러
tags:
- database
- oracle
- unique
---

### SQL_DEVELOPER

``` JAVA
에러
SQL Error [1] [23000]: ORA-00001: unique constraint (유저.테이블_HISTORY_PK) violated
ORA-06512: at "유저.TRG_테이블_HISTORY", line 66
ORA-04088: error during execution of trigger '유저.TRG_테이블_HISTORY'
```

에러 1) 널 들어갈수없다.
`SELECT MAX(D612_SUBM_VERSION) + 1`
->
`SELECT NVL(MAX(D612_SUBM_VERSION),0)  + 1`
MAX값이 null 이면 에러발생. (NVL처리)

에러 2) 제약조건

- 에러 확인을 위해 dbms output을 사용.
```
DBMS_OUTPUT.ENABLE;
DBMS_OUTPUT.PUT_LINE(:OLD.M549_INSI_ID);
```

```sql
-- 이력테이블에 없는 정보 넣기
 ...
 SELECT COUNT(*) INTO CNT
 FROM 테이블_HISTORY
 WHERE ID = :NEW.ID;
 IF CNT < 1
 INSERT INTO 테이블_HISTORY
VALUES(
:OLD.ID                  ,
 ...
 
```

새로 넣으려는 값이 HISTORY 테이블에 없을 경우 먼저 INSERT를 시켜주고(원본데이터) 변경한 데이터를 INSERT 한다.  
그 이유는 이력테이블인데 바로 INSERT시키면 기존데이터에서 어떤 변경사항이 있는지 모르기때문에 기존데이터 한번 넣어준다.
에러가 발생한 이유은 A라는 회원의 데이터를 B로 옮기려는데 조건에서 B(NEW_ID)로는 CNT가 당연히 0이라 INSERT를 한다.
그러나 OLD(A회원데이터) 값을 HISTORY에 넣으려고 하니 이미 데이터가 있어 제약조건 에러가 났다.

=> 해결방안

조건 하나 더 추가 NEW 값도 0이고 OLD 값도 0일때 저렇게 조건 타도록 변경해준다.


