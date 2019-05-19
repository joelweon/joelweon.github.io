---
layout:  post
title: Servlet & JSP
tags:
- java
---

## Servlet
- 자바를 사용하여 웹페이지를 동적으로 생성하는 서버 측 프로그램(사양)
- 기존에 요청 당 프로세스를 만드는 CGI에 반해 서블릿은 요청당 쓰레드를 사용
- 이 쓰레드는 만들거나 기존에 생성한 것을 사용한다.
자바 코드 안에 HTML이 포함되어 있다.

### 장점
- 빠르다
- 플랫폼 독립적
- 보안 좋음
- 이식성

### 구동 특징
- 최초요청 : Servlet 컴파일 -> 메모리 로드 -> 쓰레드 가동 -> 응답
- 이후 요청 : 쓰레드 가동 -> 응답
=> 최초 응답은 느리고 이후 응답은 빠르다.

### 동작 방식
요청(client의 url request)
-> 웹서버가 request, response 객체생성
-> Servlet 인스턴스와 Thread 생성
-> 쓰레드가 service() 메서드 호출
-> doGet()에서 response, request 객체를 인자로 호출
-> 메서드 호출 후 웹페이지를 생성하고 웹 컨테이너가 response

### Servlet Container(=Web container)
- 세션 관리
- 네트워크 서비스
- MIME 기반 메세지 인코딩 디코딩
- life cycle을 관리
- JVM, JRE 포함

### 생명주기
초기화 - 구동 - 해제

init() - service() - destroy()
service() => doGet() , doPut()

- => 요청   
- => 웹서버받음  
- => 컨테이너받음  
- => 생성자호출(생성시점)  
- => 메모리에 올리고(서블릿 인스턴스의 init() 메서드실행해서 초기화)
--이후 요청은 아래만 적용--   
- => 쓰레드 가동(서블릿 인스턴스의 service() 메서드 호출
service() 메서드는 HTTP Method에 따라 deGet() 등으로 처리 위임 
- => get,post따라 메서드 호출  

## JSP
HTML안에 JAVA 코드가 포함되어있다.

### 구동 특징
- 최초요청 : JSP -> Servlet 변환 -> Servlet 컴파일 -> 메모리 로드 -> 쓰레드 가동 -> 응답
- 이후 요청 : 쓰레드 가동 -> 응답
=> 최초 응답은 느리고 이후 응답은 빠르다.

***

## CGI
요청 -> 작업프로세스 할당(요청이 몰리면 부하)
## PHP, ASP
요청 -> 쓰레드 할당(변환, 연산 후) -> 응답(인터프리터 방식)