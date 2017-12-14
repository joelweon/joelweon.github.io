---
layout:  post
title: 제우스 서비스 등록이 되지않아 컴 재부팅시 제우스 자동실행설정
tags: 
- vbs
- jeus
---

#### 시작폴더에 실행파일 놓기.
C:\ProgramData\Microsoft\Windows\Start Menu\Programs\StartUp

`jeusStart.vbs` 파일 생성.
하단 소스 넣기.

```vbs
Set WinScriptHost = CreateObject( "WScript.shell" )
WinScriptHost.Run Chr(34) & "C:\TmaxSoft\JEUS6.0\bin\jeus.cmd" & Chr(34), 0
Set WinScriptHost = Nothing
```