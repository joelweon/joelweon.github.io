---
layout:  post
title: 전자정부프레임워크 Test 프로젝트 만들기
tags:
- egov
- project
---

**1. 프로젝트 생성 - New eGovFrame Web Project**

![](/assets/img/test_project1.jpg)

Next->

![](/assets/img/test_project2.jpg)
Generate 체크(v) 한 후 Finish

**2. 기존에 있는 db 오라클로 변경(datasource)** (C:\workspace\test\src\main\resources\egovframework\spring\context-datasource.xml)

```xml
<bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
  <property name="driverClassName" value="oracle.jdbc.driver.OracleDriver"/>
  <property name="url" value="jdbc:oracle:thin:@192.168.***.**:1521:orcl"/>
  <property name="username" value="system"/>
  <property name="password" value="orcl11"/>
</bean>
```

**3. pom.xml에서 db 연결을 위해 ojdbc 넣기.**

&nbsp; 1) repository 넣기

```xml
<repository>
  <id>mesir-repo</id>
  <url>http://mesir.googlecode.com/svn/trunk/mavenrepo</url>
</repository>
```

&nbsp; 2) dependency 넣기
```xml
<dependency>
  <groupId>com.oracle</groupId>
  <artifactId>ojdbc14</artifactId>
  <version>10.2.0.4.0</version>
</dependency>
```






