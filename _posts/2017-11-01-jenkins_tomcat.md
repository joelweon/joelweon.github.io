---
layout:  post
title: Jenkins 톰캣에서 실행
tags:
- jenkins
- tomcat
---
#### 젠킨스
- 지속적인 통합(CI) 서버
- 자바기반의 오픈소스
	- 젠킨스는 웹 어플리케이션이다.
	- 서블릿 컨테이너(servlet container)가 필요.
- 플러그인 확장 가능
	- 400개 이상의 플러그인을 추가 가능


#### 젠킨스 기능

- **저장소와 통합(Integrate with repository)**
- **소스 코드 체크아웃(Checkout the codes)**
- 분산 빌드(Distributed Builds)
- **빌드 및 테스트(Build and test)**
- 테스트 보고서 생성(Generate test report)
- 실행 결과 통보(Notification)
- 산출물 저장소에 산출결과를 저장(Archive and stre in artifact repository)
- **배포 (Deploy)**


> https://www.slideshare.net/sunnykwak90/ss-59330863

***

- Windows 10 64bit
- apache-maven-3.5.0
- apache-tomcat-8.0.47
- Jenkins 2.73.2(LTS)
- jdk1.8.0_144
- eclipse egov 3.5.1


#### 1. Jenkins war 파일 [다운받기] https://jenkins.io/

#### 2. 경로는 `톰캣경로/webapp`

#### 3. 접속설정을 위해 `톰캣경로/conf` tomcat-users.xml 권한추가

```xml
<role rolename="manager-gui"/>
<role rolename="manager-script"/>
<role rolename="manager-status"/>
<user username="admin" password="1" roles="manager-gui,manager-script,manager-status"/>


<!--
role / user 삽입.
1. manager-gui : 톰캣에서 웹으로 제공하는 서비스 이용시 사용한다.
2. manager-status : "Server Status"페이지 접속시에만 사용한다.
3. manager-script : 스크립트를 이용한 배포시 사용하는 듯 하다.
4. manager-jmx : jmx 사용시 사용한다.
-->
```

#### 4. 포트변경(server.xml)
`C:\server\apache-tomcat-8.5.20\conf`

```xml
<Connector port="9999" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" />
<!-- 9999로 변경 -->
```

#### 5. 서버실행
`C:\server\apache-tomcat-8.0.47\bin\startup.bat`

#### 6. 젠킨스 접속
`http://localhost:9999/jenkins/`

[![](/assets/img/jenkins_pw.jpg)](/assets/img/jenkins_pw.jpg)

해당경로의 초기 패스워드 입력

#### 7. Install suggested plugins 클릭

[![](/assets/img/jenkins_install.jpg)](/assets/img/jenkins_install.jpg)
설치 중..

[![](/assets/img/jenkins_install2.jpg)](/assets/img/jenkins_install2.jpg)

#### 8. Svn을 연동 하여 톰캣으로 자동 빌드 배포 하기 위한 환경 설정을 해야 한다
(젠킨스 관리 > Global Tool Configration)
Install automatically을 체크하면 오라클 계정입력 후 자동으로 다운받아진다.
로컬에 있는 JDK를 사용할 것이기 때문에 체크해제.
Maven은 3.5.0으로 install
-> 작업 실행 시 그 때 자동으로 설치됨.

[![](/assets/img/jenkins.jpg)](/assets/img/jenkins.jpg)

#### 9. tomcat으로 배포 하기위한 플러그인을 설치
(젠킨스 관리 > Manage Plugins)
설치 가능 탭으로 이동 하여 deploy 검색 시 Deploy to container Plugin을 설치 해야 빌드 후 톰캣으로 배포할 수 있다

[![](/assets/img/jenkins_deploy.jpg)](/assets/img/jenkins_deploy.jpg)

#### 10. Jenkins 새로운 item

[![](/assets/img/jenkins_test1.jpg)](/assets/img/jenkins_test1.jpg)

#### 11. 소스 코드 관리

[![](/assets/img/jenkins_test2.jpg)](/assets/img/jenkins_test2.jpg)
  - URL 입력
  - Credentials -> Add 해당 아이디/패스워드 입력


#### 12. 빌드 유발

[![](/assets/img/jenkins_build.jpg)](/assets/img/jenkins_build.jpg)
Poll SCM : 언제 빌드가 수행될 것인가(사진은 10분)

#### 13. 빌드
1) Invoke top-level Maven targets 클릭
입력창에 Build 정보를 입력한다.
  - Maven Version 선택
  - Goals 입력 –> clean package
  - 고급 버튼을 누르고
  - POM 입력 – pom.xml  (pom.xml 위치 입력)
[![](/assets/img/jenkins_maven.jpg)](/assets/img/jenkins_maven_run.jpg)

2) Run with timeout
3분동안 빌드안될 경우 에러 내고 빌드 종료.
- Time-out strategt : Absolute
- Timout minutes : 3
- Build Step : Execute WIndows batch command
- Command에 아래 입력
```
cd C:\eGovFrame-3.5.1\bin\apache-tomcat-8.0.47\bin
cmd /c shutdown.bat
PING -n 10 127.0.0.1 1>nul
cmd /c startup.bat
```


#### 14. 빌드 후 조치

[![](/assets/img/jenkins_war.jpg)](/assets/img/jenkins_war.jpg)
빌드 후 WAS 컨테이너에 배포를 하기 위해 정보를 입력한다.
- 컨테이너 정보를 입력한다.
- tomcat에서 설정한 manager 정보를 입력한다.
- tomcat url을 설정한다.



> http://hjw1456.tistory.com/21