---
layout:  post
title: 오라클 잡(job) 조회
tags:
- oracle
- job
---

#### JOB 조회
`SELECT * FROM USER_JOBS;`

`SELECT * FROM DBA_JOBS;`

#### JOB 다음 실행 시간 변경
`CALL DBMS_JOB.NEXT_DATE(JOB_NO, SYSDATE + 12/24 + 24/1440);`
```
'sysdate + 7'                          : 일주일에 1회 실행
'sysdate + 1'                          : 하루에 1회 실행
'next_day(sysdate, ''TUESDAY'')' : 매주 화요일에 실행
'null'                                     : 1회 실행
'sysdate + 1/24'                      : 1시간에 1회 실행
'sysdate + 1/24/60'                 : 1분에 1회 실행
'trunc(sysdate+1) + 2/24'     : 다음날 2시에 1회 실행
TRUNC(SYSDATE + 1) + 3/24 + 20/1440 : 다음달 3시20분
```

#### JOB 실행 주기 변경
`CALL DBMS_JOB.INTERVAL(JOB_NO, '시간');`

시간예: `CALL DBMS_JOB.INTERVAL(930, 'TRUNC(SYSDATE) + 1 + 1/24 + 40/1440');`

#### BROKEN 해제
```
BEGIN
	DBMS_JOB.BROKEN(JOB_NO, FALSE);
END;
```