---
layout:  post
title: 오라클10g 설치&삭제
tags:
- oracle
- 설치
- 삭제
---

# 오라클 10g

#### 설치
전체 데이터베이스 이름 -> orcl(sid이름)
아이디: system
비밀번호: orcl11

설치 완료 후
![](/assets/img/oracle1.jpg)


#### 삭제 순서

1. 내 컴퓨터 마우스 우측 -> 관리 -> 서비스 -> oracle로 시작하는 서비스 상태 중지로 만들기
![](/assets/img/oracle2.png)

2. 메뉴에서 orcle - Oracle Installation Products – universal Installer - 제품설치해제
![](/assets/img/oracle3.png)

3. 레지스트리 정리
시작 – 실행 – regedit
![](/assets/img/oracle4.png)

4. D or C 드라이브 oracle 폴더 삭제

5. C:\Program Files (x86) -> oracle 폴더 삭제

6. 시작에서 oracle 빈 폴더 삭제.

7. 삭제 잘 됐나 확인 => 서비스로 다시 가서 refresh 하고 oracle 관련 5개 없나 확인.
