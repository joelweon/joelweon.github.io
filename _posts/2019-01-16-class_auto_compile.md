---
layout:  post
title: 서버 재기동 없이 클래스 파일 자동 컴파일
tags:
- sql
- sqldeveloper
---

### springloaded jar 다운로드
`https://mvnrepository.com/artifact/org.springframework/springloaded`
나는 maven 공홈에서 다운받았다.


### 서버 설정에서 VM arguments 설정

`-javaagent:C:\project\workspace\**\src\main\webapp\WEB-INF\lib\springloaded-1.2.6.RELEASE.jar -noverify`

다운받은 lib 경로를 서버에 설정에준다.
