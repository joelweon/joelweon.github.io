---
layout:  post
title: Jenkins 서비스에서 실행
tags:
- jenkins
---

개발 환경
- Windows 10 64bit
- apache-maven-3.2.1
- apache-tomcat-8.0.47(x64)
- Jenkins 2.73.2(LTS)
- jdk1.7.0_80(x64)
- eclipse egov 3.5.1

#### **1. Jenkins war 파일 [다운받기] https://jenkins.io/**

#### **2. cmd 관리자 권한으로 실행.**
`java -jar jenkins경로\jenkins.war --httpPort=8090`

#### **3. localhost:8090 접속**
해당경로의 초기 패스워드 입력
[![](/assets/img/jenkins_pw.jpg)](/assets/img/jenkins_pw.jpg)
Install suggested plugins
[![](/assets/img/jenkins_install.jpg)](/assets/img/jenkins_install.jpg)
[![](/assets/img/jenkins_install2.jpg)](/assets/img/jenkins_install2.jpg)


#### **4. 포트 변경**
`C:\Users\user이름\.jenkins\jenkins.xml`

```xml
<arguments>-Xrs -Xmx256m -Dhudson.lifecycle=hudson.lifecycle.WindowsServiceLifecycle -jar "%BASE%\jenkins.war" --httpPort=9999 --webroot="%BASE%\war"</arguments>
```

#### **5. Jenkins 서비스 설치**

- 젠킨스관리 > Install as Windows Service 이동
- 경로는 초기 default로 하면된다. (.jenkins 설치된 곳)
[![](/assets/img/jenkins_install_service.jpg)](/assets/img/jenkins_install_service.jpg)
- 서비스에서 jenkins 이름 확인.
[![](/assets/img/jenkins_service.jpg)](/assets/img/jenkins_service.jpg)
서비스 등록이 완료되면 cmd관리자권한으로 실행한 jenkins는 종료됨.

#### **6. service 쪽 Jenkins**
`localhost:9999`

#### **7. Svn을 연동 하여 톰캣으로 자동 빌드 배포 하기 위한 환경 설정을 해야 한다**
(젠킨스 관리 > Global Tool Configration)  
기존에 받은 jdk, maven 경로 설정

[![](/assets/img/jenkins.jpg)](/assets/img/jenkins.jpg)

#### **8. tomcat으로 배포 하기위한 플러그인을 설치**
(젠킨스 관리 > Manage Plugins)  
설치 가능 탭으로 이동 하여 deploy 검색 시 Deploy to container Plugin을 설치 해야 빌드 후 톰캣으로 배포할 수 있다

[![](/assets/img/jenkins_deploy.jpg)](/assets/img/jenkins_deploy.jpg)

#### **9. Jenkins 새로운 item**

[![](/assets/img/jenkins_test1.jpg)](/assets/img/jenkins_test1.jpg)

#### **10. 소스 코드 관리**

[![](/assets/img/jenkins_test2.jpg)](/assets/img/jenkins_test2.jpg)
  - URL 입력
  - Credentials -> Add 해당 아이디/패스워드 입력


#### **11. 빌드 유발**

[![](/assets/img/jenkins_build.jpg)](/assets/img/jenkins_build.jpg)
Poll SCM : 언제 빌드가 수행될 것인가(사진은 10분)

#### **12. 빌드**
1) Invoke top-level Maven targets 클릭
입력창에 Build 정보를 입력한다.
  - Maven Version 선택
  - Goals 입력 –> clean package
  - 고급 버튼을 누르고
  - POM 입력 – pom.xml  (pom.xml 위치 입력)
[![](/assets/img/jenkins_maven_run.jpg)](/assets/img/jenkins_maven_run.jpg)

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


#### **13. 빌드 후 조치**

[![](/assets/img/jenkins_war.jpg)](/assets/img/jenkins_war.jpg)
빌드 후 WAS 컨테이너에 배포를 하기 위해 정보를 입력한다.
- 컨테이너 정보를 입력한다.
- tomcat에서 설정한 manager 정보를 입력한다.
- tomcat url을 설정한다.



***
## issue
1) 젠킨스는 빌드 시 빌드가 종료되는 시점에 빌드 진행 중 발생한 자식 프로세스(child process)를 종료(kill) 시킴.
없던 에러인데 갑자기 생김.
```
경고: Process leaked file descriptors. See https://jenkins.io/redirect/troubleshooting/process-leaked-file-descriptors for more information

젠킨스관리 > 시스템설정 > Global properties
환경변수 추가
- 이름 : BUILD_ID
- 값   : dontkillme

JVM 파라미터 값 설정하라고 했는데 하진 않음.
-Dhudson.util.ProcessTree.disable=true
```

2) 톰캣 서버 재시작 하기 전 delay 시키기
```
timeout 5
오류: 입력 리디렉션이 지원되지 않습니다. 프로세스를 즉시 끝냅니다.

PING -n 5 127.0.0.1 1>nul
변경
```

> http://hanuli7.tistory.com/entry/JENKINS-HUDSON%EC%97%90%EC%84%9C-%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4-%EC%A2%85%EB%A3%8C%ED%95%98%EC%A7%80-%EC%95%8A%EA%B3%A0-%EA%B3%84%EC%86%8D-%EC%8B%A4%ED%96%89%EC%8B%9C%ED%82%A4%EA%B8%B0