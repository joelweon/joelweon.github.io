---
layout:  post
title: windows 명령어(tasklist)
tags:
- cmd
- command
- java
- windows
---

### zip 만들기(-force 덮어쓰기)
`powershell Compress-Archive <대상> <위치> -force`

### unzip
`powershell expand-archive **.zip D:\deployments\FileName`

### 이동
`move 대상이름 위치이름`

### 디렉토리 생성
`mkdir 폴더명`

### 삭제
`rmdir /S /Q 파일명` 또는 `rmdir /S /Q 폴더명`

### java 백그라운드 실행
`javaw -jar 이름`

### 실행중인 javaw 확인
`tasklist /svc | findstr javaw`

### javaw 종료
/IM -> 이미지 이름  
/F -> 강제종료  
`taskkill /f /im javaw.exe`

### 명령어 한줄로 하기 (&)
`cd a & cd b`
