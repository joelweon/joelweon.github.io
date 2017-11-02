---
layout:  post
title: 토드에서 테이블스페이스 생성
tags:
- toad
- tablespace
- user
- role
---
### 토드에서 테이블스페이스 생성

Database > Create > Tablespace

[![](/assets/img/toad_dump1.jpg)](/assets/img/toad_dump1.jpg)
Data Files 탭 클릭

[![](/assets/img/toad_dump2.jpg)](/assets/img/toad_dump2.jpg)
Find/Copy 누르고 USERS로 선택  
-> 이름명에서 뒤에 USERS를 만들 이름으로 변경하여 저장.  
Datafile size: 1GB 변경  
Auto Extend: 선택 후 1GB
[![](/assets/img/toad_dump3.jpg)](/assets/img/toad_dump3.jpg)

***

### IMPORT를 위한 계정 생성 및 권한설정
[![](/assets/img/toad_dump3.jpg)](/assets/img/toad_dump3.jpg)

Database > Create > USER  
유저이름, 패스워드 입력  
Tablespace로 이동 -> 테이블스페이스 설정

**권한부여**  
Roles -> Grant All  
System Privileges -> Grant All

#### import

Import users

Add 클릭 후 Next >

[![](/assets/img/toad_dump5.jpg)](/assets/img/toad_dump5.jpg)


