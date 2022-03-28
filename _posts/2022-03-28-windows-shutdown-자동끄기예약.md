---
layout:  post
title: windows shutdown 자동끄기
tags:
- windows
- shutdown
- command
---

### 1시간 후 끄기
`shutdown -s -t 3600`


### 예약 취소하기
`shutdown -a`

---
만약 windows 업데이트처럼 재기동이 반복적으로 이뤄지고 이 후 shutdown이 필요한 경우 아래 진행

### 1. bat 파일 실행할 파일 만들기(startCmd.vbs)
```shell
Set WinScriptHost = CreateObject( "WScript.shell" )
WinScriptHost.Run Chr(34) & "c:\USERS\%USERNAME%\Desktop\shutdown.cmd" & Chr(34), 0
Set WinScriptHost = Nothing
```

### 2. 아래 시작폴더에 실행파일 놓기.
`C:\ProgramData\Microsoft\Windows\Start Menu\Programs\StartUp`

### 3. 바탕화면에 shutdown.cmd 만들기
`shutdown -s -t 3600`
