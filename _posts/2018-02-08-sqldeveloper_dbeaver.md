---
layout:  post
title: DBMS_OUTPUT.PUT_LINE 차이점
tags:
- database
- dao
- oracle
- ibatis
---

### SQL_DEVELOPER

```
set serveroutput on format wrapped
EXEC PROCEDURENAME();
```
쿼리호출전 앞에 SET설정을 명시하고 같이 실행
스크립트 출력 탭에 나옴.



### DBEAVER

프로시저 상에서  
`DBMS_OUTPUT.ENABLE;`  
만 넣으면 

메뉴 Output에 나옴.

프로시저 실행 : CALL PROCEDURENAME();