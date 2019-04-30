 ---
layout:  post
title: 오라클 IMP 오류(illegal lob length marker 65535)
tags:
- oracle
- imp
---

### IMP 오류
`imp` 명령어로 했을 때 에러가 났다.

```cmd
. . 테이블                      "TABLE01"(를)을 임포트 중
 illegal lob length marker 65535
 bytesread = 00000000000
 TABLE = TABLE01
``

`imp userid=아이디/패스워드 file='D:\dmpfile.dmp' fromuser=유저명 touser=유저명 tablespaces ='테이블스페이스명' tables=테이블 commit=y `