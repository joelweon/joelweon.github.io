---
layout:  post
title: jenkins with JEUS
tags:
- jenkins
- jeus
---

https://192.168.---.--/svn/----2.0/----20

- jdk1.5.0_22(x86)
- maven 3.0.4
- JEUS6 FIX#9(x86)
- VisualSVN-Server-2.7.4
- jenkins 설치 시 jre8 자동 설치됨.

#### **1. Jenkins war 파일 [다운받기] https://jenkins.io/**

#### **2. cmd 관리자 권한으로 실행.**
`java -jar jenkins경로\jenkins.war --httpPort=8090`

#### **3. localhost:8090 접속**
해당경로의 초기 패스워드 입력(커맨드창에도 패스워드뜸)
[![](/assets/img/jenkins_pw.jpg)](/assets/img/jenkins_pw.jpg)
Install suggested plugins
[![](/assets/img/jenkins_install.jpg)](/assets/img/jenkins_install.jpg)
[![](/assets/img/jenkins_install2.jpg)](/assets/img/jenkins_install2.jpg)


#### **4. 9999포트 변경**
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
`localhost:9999 접속`

#### **7. Svn을 연동 하여 톰캣으로 자동 빌드 배포 하기 위한 환경 설정을 해야 한다**
(젠킨스 관리 > Global Tool Configration)  
기존에 받은 jdk, maven 경로 설정(jdk1.5.0_22(x86)/maven 3.0.4)

[![](/assets/img/jenkins.jpg)](/assets/img/jenkins.jpg)

#### **8. Jenkins 새로운 item**

[![](/assets/img/jenkins_test1.jpg)](/assets/img/jenkins_test1.jpg)

#### **9. 소스 코드 관리**

[![](/assets/img/jenkins_test2.jpg)](/assets/img/jenkins_test2.jpg)
  - URL 입력
  - Credentials -> Add 해당 아이디/패스워드 입력

#### **10. 빌드유발**

[![](/assets/img/jenkins_build.jpg)](/assets/img/jenkins_build.jpg)
Poll SCM : 언제 빌드가 수행될 것인가(사진은 10분)  
2분으로 설정해 줄것. `H/2 * * * *`  
하단에 나타난 시간 잘 맞는지 확인.

#### **9. JEUS 연결**

1) Invoke top-level Maven targets 클릭 입력창에 Build 정보를 입력한다.

Maven Version 선택  
Goals 입력 –> clean package  
고급 버튼을 누르고  
POM 입력 – pom.xml (pom.xml 위치 입력)

[![](/assets/img/20171213_150400.jpg)](/assets/img/20171213_150400.jpg)

2) Run with timeout 3분동안 빌드안될 경우 에러 내고 빌드 종료.

Time-out strategt : Absolute  
Timout minutes : 3  
Build Step : Execute WIndows batch command  
Command에 아래 입력

```
C:\TmaxSoft\JEUS6.0\bin 경로에 start.bat 생성
jeusadmin DESKTOP-0000000 -Uadministrator -Pjeusadmin startcon DESKTOP-0000000_container1

C:\TmaxSoft\JEUS6.0\bin 경로에 down.bat 생성
jeusadmin DESKTOP-G65KMCN -Uadministrator -Pjeusadmin downcon DESKTOP-G65KMCN_container1
```


```
cd C:\Users\Owner\.jenkins\workspace\projectName\target
copy projectName.war C:\TmaxSoft\JEUS6.0\webhome\app_home

cd C:\TmaxSoft\JEUS6.0\bin
cmd /c down.bat
cmd /c PING -n 10 127.0.0.1 1>nul
cmd /c start.bat
```




***
### \<기타사항\>

#### JENKINS에서 maven 빌드를 위해 pom.xml 수정(Web app libraries 추가)
webapp 안에 있는 라이브러리는 가져오지못합.

```xml
<properties>
	...
  // 추가
  <webcontent-dir>${basedir}\src\main\webapp\WEB-INF\lib</webcontent-dir>
</properties>
...
	  <!-- JENKINS를 위한 Web app libraries 추가 -->
    <dependency>
      <groupId>webapp.commons</groupId>
      <artifactId>codec</artifactId>
      <version>1.3</version>
      <scope>system</scope>
      <systemPath>${webcontent-dir}\commons-codec-1.3.jar</systemPath>
    </dependency>
    ...
```
