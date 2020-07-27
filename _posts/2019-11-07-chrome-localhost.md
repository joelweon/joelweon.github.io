---
layout:  post
title: 크롬 로컬에서 붙기(localhost)
tags:
- chrome
- localhost
---

### 바로가기 -> 대상

`"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir="C:\Users\joel\AppData\Local\Google\Chrome\User Data"`

### 새로 업뎃한 경우 빈 디렉토리 변경

`"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --args --disable-web-security --ignore-certificate-errors --user-data-dir="C:\Users\joel\AppData\Local\Google\Chrome\User Data2"`


###  bookmark 파일
`C:\Users\joel\AppData\Local\Google\Chrome\User Data\default`