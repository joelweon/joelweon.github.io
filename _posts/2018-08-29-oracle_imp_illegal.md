---
layout:  post
title: 오라클 IMP 오류
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

`imp userid=jams001/1111 file='D:\dmpfile.dmp' fromuser=JAMS001 touser=JAMS001 tablespaces ='TS_JAMS01' tables=KCDD609 commit=y `