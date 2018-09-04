---
layout:  post
title: 오라클 11g 삭제
tags:
- oracle
- delete
- 11g
---

### 1. 배치파일을 이용해서 삭제

`C:\app_new\product\11.2.0\dbhome_1\deinstall`  
deinstall.bat 을 실행한다.  
다 엔터누르고 ASM | FS 나오면 대문자로 FS 입력한다.

### 2. 서비스삭제

명령프롬프트에서 `rededit` 실행한다.
-> oracle로 시작하는 것들 삭제

### 3. 서비스 삭제 확인

[윈도우검색 - 서비스] 실행한다.  
oracle로 시작하는 서비스 제대로 지워졌는지 확인한다.  
만약 안 지워 졌으면 콘솔로 삭제한다.

cmd 관리자권한으로 실행한다.  
`sc delete 서비스명`

#### 삭제 에러
```cmd
C:\WINDOWS\system32>sc delete "oracle orcl vss writer service"
[SC] OpenService 실패 1060:

지정된 서비스가 설치된 서비스로는 없습니다.
```

-> 이런 에러가 뜨면 이름이 다른 거라 이름 먼저 확인 후 삭제해야 한다.

```cmd
C:\WINDOWS\system32>sc getkeyname "oracle orcl vss writer service"
[SC] GetServiceKeyName 성공
이름 = OracleVssWriterORCL

C:\WINDOWS\system32>sc delete OracleVssWriterORCL
[SC] DeleteService 성공
```