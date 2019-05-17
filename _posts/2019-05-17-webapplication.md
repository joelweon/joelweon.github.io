 ---
layout:  post
title: 웹 어플리케이션
tags:
- web
- spring
---

서버 구동
- web application이 실행되면 was가 web.xml을 로딩한다.
- web.xml에 등록된 ContextLoaderListener 클래스
(ServletContextListener 인터페이스 구현)가 생성된다.
- ContextLoaderListener 클래스는 ApplicationContext를 생성한다.
- ContextLoaderListener 클래스는 applicationContext.xml에
등록된 스프링 container를 구동한다.(Service,VO등)

클라이언트 요청
- 요청이 오면 frontController의 역할을 하는 DispatcherServlet이
요청이 온 메세지를 분석하고(요청이 multiPart타입인지 등)
dispatcher 에 설정된 HandlerMapping()

스프링 IoC 컨테이너는 Bean 설정 파일이 필요하다.  
application.xml  
```xml
<bean id="bookService" class="package.service.BookService">
    <property name="bookRepository" ref="bookRepository"/>
</bean>

<bean id="bookRepository" class="package.service.BookRepository"/>
```


```xml
<context:component-scan base-package="package.service"></component-scan>
```
