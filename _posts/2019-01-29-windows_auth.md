---
layout:  post
title: Windows에서 명령어로 권한부여(icacls)
tags:
- windows
- icacls
---

`icacls "폴더명" /grant 유저명:F`

`icacls "C:\Users\wye\Desktop" /grant Administrator:F`

마지막에 붙이는 권한명
F: 모든권한
M: 수정권한
RX: 읽기 실행권한
R: 읽기권한
W: 쓰기권한
D: 삭제권한
N: 권한없음

/deny 권한해제