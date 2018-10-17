---
layout:  post
title: 제우스 명령어 및 에러
tags:
- jeus
- webtob
- path
- error
- command
---

### jeus 버전 확인
`> jeusadmin -version`

### jeus 풀버전 확인
`> jeusadmin -fullversion`

### 라이센스 확인 방법
`> jeusadmin -licensedue`

### webtob 버전 확인
`> wscfl -version`

## 환경변수 설정
변수 : JEUS_HOME
값 : C:\TmaxSoft\JEUS6.0
변수 : WEBTOBDIR
값 : C:\TmaxSoft\WebtoB4.1

PATH:  
%WEBTOBDIR%\bin  
%WEBTOBDIR%\lib  
%JEUS_HOME%\bin  

## WEBTOB 기동
wsboot
## WEBTOB 종료
wsdown

## wsconfig 컴파일
`> cd C:\TmaxSoft\WebtoB4.1\config`
`> wscfl -i http.m`

## 제우스 기본명령어(제우스 접속 후)
### [제우스 접속]
`> jeusadmin 호스트명 -Uadministrator -Pjeusadmin`
### [기동중인 컨테이너 목록]
`$ conlist`
### [컨테이너 종료]
`$ downcon 컨테이너명`
### [컨테이너 기동]
`$ startcon 컨테이너명`
### [엔진 부팅확인]
`$ allenglist`


## 컨테이너 강제종료
### [pid 리스트]
`$ pidlist`
### [pid 종료]
`$ kill -9 [PID번호]`

## command 창에서 바로 명령어
### [컨테이너 종료]
`jeusadmin 호스트명 -U관리자id -P암호 downcon 컨테이너명`
### [컨테이너 기동]
`jeusadmin 호스트명 -Uadministrator -Pqwer1212 startcon dohun-PC_container1`

### JEUS 종료
`> jeusadmin HOSTNAME  -U관리자id -P암호 jeusexit`  
또는  
```
DESKTOP-G65KMCN> down
Do you really want to shutdown the node [DESKTOP-G65KMCN]? (y : n):>y
The JEUS node [DESKTOP-G65KMCN] is down.
```

### JEUS MANAGER 종료
DESKTOP-G65KMCN> jeusexit
jeusexit successful

## JEUS 컴퓨터 부팅 시 자동 START
windows의 경우 jeusStart.vbs파일 생성 후
```vbs
Set WinScriptHost = CreateObject( "WScript.shell" )
WinScriptHost.Run Chr(34) & "C:\TmaxSoft\JEUS6.0\bin\jeus.cmd" & Chr(34), 0
Set WinScriptHost = Nothing
```
코드 작성 후 시작프로그램에 파일 이동시키면된다.



## 컨테이너에 배포된 war 지우려면
1. JEUSMain.xml 에서 해당컨테이너 삭제.
```xml
<application>
  <name>jams2portal</name>
  <path>C:\TmaxSoft\JEUS6.0\webhome\app_home\***.war</path>
  <deployment-type>COMPONENT</deployment-type>
  <web-component>
     <context-root>/</context-root>
  </web-component>
  <deployment-target>
    <target>
      <engine-container-name>DESKTOP-G65KMCN_container2</engine-container-name>
      <web-context-group>
        <name>MyGroup</name>
      </web-context-group>
    </target>
  </deployment-target>
</application>
```

2. `C:\TmaxSoft\JEUS6.0\webhome\DESKTOP-G65KMCN_container2`
해당컨테이너로 들어가서 캐시된 _generated_ 폴더와 해당 프로젝트폴더도 삭제


## 1. JEUS 기동시 에러(session-config)
```
[ERROR] 'session-config' element does not contain 'cookie-config' child element.
[2018.10.17 09:43:35][0][b396] [container2-22] [MGR-0058] failed to unmarshal XML descriptor : WEB-INF\web.xml
class org.xml.sax.SAXParseException :
cvc-complex-type.2.4.a: Invalid content was found starting with element 'cookie-config'. One of '{"http://java.sun.com/xml/ns/javaee":session-timeout}' is expected.
```
-> 해당war web.xml에서 아래코드 주석처리
```xml
web.xml
   <session-config>
      <session-timeout>60</session-timeout>
      <!-- <cookie-config>
      	<http-only>true</http-only>
      	<secure>true</secure>
      </cookie-config> -->
   </session-config> 
```

## 2. JEUS 기동시 에러(java.io.FileNotFoundException)
소스 web.xml에서 lib에 추가되어있는 개별 jar 파일들의 문제다.  
디펜던시 로컬 경로로 추가하면 된다.
이렇게하면 이클립스에서 bild path - Web App Libraries 따로 추가 안해도 된다.
```xml
pom.xml

<properties>
	<webcontent-dir>${basedir}\src\main\webapp\WEB-INF\lib</webcontent-dir>
</properties>

<dependencies>
    <dependency>
	    <groupId>webapp.xercesImpl</groupId>
	    <artifactId>xercesImpl</artifactId>
	    <version>0</version>
	    <scope>system</scope>
	    <systemPath>${webcontent-dir}\xercesImpl.jar</systemPath>
    </dependency>
</dependencies>

```


## 3. JEUS 기동시 에러(defaultServletName)
java.lang.IllegalStateException: Unable to locate the default servlet for serving static content. Please set the 'defaultServletName' property explicitly.
```xml
dispatcher-servlet.xml

<mvc:default-servlet-handler/>
->
<mvc:default-servlet-handler default-servlet-name="WorkerServlet"/>

name추가
```
