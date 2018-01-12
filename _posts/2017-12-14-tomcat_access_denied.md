---
layout:  post
title: java.security.AccessControlException - access denied
tags:
- tomcat
- error
---

***
내가 한 해결..
2-0 해결 방법(0)
이클립스에있는 서버 삭제하고
C:\project\workspace\.metadata\.plugins\org.eclipse.wst.server.core
server.core 날리고
다시 서버 설정
-> 해결됨.
***


1.배경

어제까지 문제없이 작동하던 Tomcat이 오늘 아침 갑자기 이슈를 발생시켰다. 보안과 관련된 이슈인데, 난생 처음 겪어보는거라 당혹스러웠다. 일단 개발 환경은 다음과 같다.



OS : Windows 7

WAS : Tomcat 7.0

JAVA : 1.8



2-1 해결 방법(1)

https://tomcat.apache.org/tomcat-7.0-doc/security-manager-howto.html

위 URL에서 제공하는 가이드를 바탕으로 tomcat 설정에서 해결을 도모했다.



..\apache-tomcat-7.0.77\conf 루트에 가보면 catalina.PROPERTIES 라는 파일이 존재한다.

이 파일을 실행하면 grant { } 영역에 여러 permission 들이 존재하는데, 발생한 이슈에 대한 permission을 추가해주면 된다.

```
grant {
    permission java.lang.RuntimePermission "accessDeclaredMembers";
}
```

2-2 해결 방법(2)

안타깝게도 1번 방법으로 해결되지 않았다. 그래서 이번에는 Tomcat이 아닌 java에 직접 접근하여 권한을 수정해보기로 했다.



..\Java\jdk1.8.0_91\jre\lib\security 루트로 접근해서 

java.POLICY를 열면 방법1과 마찬가지로 grant { } 영역에 여러 permission들이 존재하는데, 

마찬가지로 해당 영역에 권한을 추가해주면 된다.

귀찮을 때는 아래처럼 모두 허가하는 것도...

```
permission java.security.AllPermission;
```

> https://blog.naver.com/onblack_/221003113886