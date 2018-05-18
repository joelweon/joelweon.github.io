---
layout:  post
title: JEUS webserver 설정
tags:
- database
- oracle
- listagg
---

```
[2018.01.30 10:47:04][1][b396] [container1-82] [WEB-3349] worker(webtob1-hth0(localhost:9900)-w02:null) : Connecting to WebtoB failed because of network error [java.net.ConnectException: Connection refused: connect]; Please check WebtoB, OS or network condition.
```

cmd 관리자권한 실행
`> cd C:\TmaxSoft\JEUS6.0\webserver\config`
`> C:\TmaxSoft\JEUS6.0\webserver\config>wscfl -i ws_engine.m`

wsconfig파일이 생성됨.

`listen port(8080) in use, we'll retry after 10 seconds`
에러발생 -> ws_engine.m 파일에서 8080포트 변경









#### WebtoB 서비스 등록


“srvinstall.exe” 가 위치한 %WEBTOBDIR% 아래 “bin” 디렉토리로 이동한다. (기본:    C:\TmaxSoft\WebtoB4.1\bin) “srvinstall.exe” 파일을 실행하면 Windows에 서비스로서  WebtoB 를 등록한다.


WebtoB를 윈도우 서비스로 등록하려면 다음과 같이 실행한다.


c:\TmaxSoft\WebtoB4.1\bin> srvinstall.exe

Webtob service installed



##### WebtoB 서비스 제거

서비스를 중지하기 위해서 Windows에서 시작->설정->제어판->관리 도구>서비스를    선택한다.

서비스를 영구히 제거하기 위하여 %WEBTOBDIR%\bin 디렉토리의 “srvremove.exe” 를 실행한다.


           c:\TmaxSoft\WebtoB4.1\bin> srvremove.exe

           Webtob service removed



> 출처: http://joke00.tistory.com/6 [Smile virus]