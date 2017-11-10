---
layout:  post
title: Jenkins jeus 실행
tags:
- jenkins
- jeus
---

- JEUS port확인  
`C:\TmaxSoft\JEUS6.0\config\호스트네임\호스트네임_servlet_engine1\WEBMain.xml`

- WebtoB4.1 port 확인  
`C:\TmaxSoft\WebtoB4.1\config\http.m`

- 로그확인  
`C:\TmaxSoft\JEUS6.0\logs\DESKTOP-48DOM4R\JeusServer.log`

1) size 오류
```
jsp 를 호출할때는 session manager is null 이라는 로그찍힘.
해결책은 JVM 튜닝!
프로젝트의 class 파일이 많아서 -XX:PermSize=128M -XX:MaxPermSize=256M 로 이미 JVM 튜닝을 한 상태였다.
RUNTIME에 프레임워크에서 생성하는 인스턴스들이 많다보니 PermSize 설정도 해준것인데 또 하나의 설정이 더 필요하게 된 것이다.
JVM 옵션중에 -Xss<Size> 옵션이 있다. 이 옵션은 한 Thread 에 할당되는 stack size 를 지정하는 옵션이다. -Xss 값이 작을 수록 많은 스레드를 띄울 수있는 반면 값이 너무 작으면 애플리케이션 로직을 수행할 수 없다. 또한 값이 클수록 동시에 수행할 수 있는 스레드의 수는 줄어들게 된다.

내 경우 디폴트로 지정된 -Xss 값보다 많은 stack size 를 요구하는 경우가 생겼기 때문에 컨테이너가 제대로 뜨지 않았던 것이다. 분명한건 내가 짠 소스에서 발생한 문제는 아니라는거다.

-> -Xss10m 추가
<command-option>-Xss10m -Xms256m -Xmx512m -XX:MaxPermSize=512m</command-option>
```

2) 버전오류

```
Unsupported major.minor version 51.0
테스트했던 jdk는 1.7이라 테스트 프로젝트 다시만듦
```