---
layout:  post
title: 오라클 덤프
tags:
- oracle
- database
- dump
---

(11g -> 10g)

##### 순서
1. 기존에 있던 10g에서는 11g .dmp파일 import가 안되기 때문에 11g 설치

2. 설치된 11g 경로 `C:\oraclexe\app\oracle\product\11.2.0\server\bin`에서 imp 명령어 날리기

3. username을 새로만든 계정으로하니 아래와 같은 오류 발생.
```
Export file created by EXPORT:V11.02.00 via conventional path
IMP-00013: only a DBA can import a file exported by another DBA
IMP-00000: Import terminated unsuccessfully
```
import는 DBA만 가능하다길래 애초 imp할때 username을 system으로 함.

4. 다른부분은 default로 하고 .dmp파일은 절대주소 입력해도 못찾길래 bin폴더에 넣으니 인식함.
![](/assets/img/import1.png)

**import 중 오류발생**
```
ORA-12953: The request exceeds the maximum allowed database size of 11 GB
=> Express 버전은 용량이 11GB로 제한이 되어있음.
```

5. 11g에서 imp 완료했으니 exp는 10.2로 버전명시해주고 다시 export

6. 11g 오라클 삭제하고 10g에 import하기

7. 11g 에서 version=10.2 옵션을 붙여서 export 다시 받기


---

버전이 맞지 않아 발생한 오류(11g덤프파일 -> 10g에 넣을 때)
```
다음에 접속됨: Oracle Database 10g Enterprise Edition Release 10.2.0.3.0 - Production
With the Partitioning, OLAP and Data Mining options

IMP-00010: 엑스포트 파일이 유효하지 않고, 헤더가 검증에 실패했습니다
IMP-00000: 임포트가 실패로 끝났습니다
```

##### 오라클 버전 확인
1) system 게정으로 접속
`c:\> sqlplus "/as sysdba" `

2) 버전확인
`SQL> select * from v%version;`

<br>
cf) 오라클 11g express-edition download
[http://www.oracle.com/technetwork/database/database-technologies/express-edition/downloads/index.html](http://www.oracle.com/technetwork/database/database-technologies/express-edition/downloads/index.html)

