---
layout:  post
title: 오라클 클라이언트 삭제
tags:
- oracle
- client
- delete
---

### 테이블을 통해 인덱스 조회

https://www.oracle.com/technetwork/database/enterprise-edition/downloads/112010-win64soft-094461.html

1. 해당하는 De-install 파일 다운로드
Oracle De-install Utility (11.2.0.1.0) for Microsoft Windows (x64)

2.  CMD 관리자 권한으로 실행하여 deinstall.bat 가 위치한 폴더로 이동.

3.  오라클 경로 선언
set ORACLE_HOME = C:\app\계정명\product\11.2.0\client_1

4.  제거 명령어 실행
deinstall -home C:\app\계정명\product\11.2.0\client_1

5.  Y 선택해서 deinstall 프로세스 진행

6.  오라클 폴더 삭제

7.  레지스트리에서 oracle 관련 설정값 전부 삭제

