---
layout:  post
title: 제우스와 톰캣 JSP로드 차이(에러)
tags:
- jeus
- webtob
- path
- error
- command
---

톰캣환경에서 dispatcher-servlet.xml 에서 mvc:default-servlet-handler(`<mvc:default-servlet-handler />`) 는 dispatcher-servlet이 처리하지 못한 요청을 서블릿 컨테이너의 DefaultServlet에게 넘겨주는 역할을 하는 핸들러이다.


web.xml
```xml
  <servlet>
    <servlet-name>action</servlet-name>
    <servlet-class>
      org.springframework.web.servlet.DispatcherServlet
    </servlet-class>
    <init-param>
      <param-name>contextConfigLocation</param-name>
      <param-value>
        /WEB-INF/config/egovframework/springmvc/dispatcher-servlet.xml,
        /WEB-INF/config/egovframework/springmvc/urlfilename-servlet.xml
      </param-value>
    </init-param>
    <load-on-startup>1</load-on-startup>
  </servlet>

  <servlet-mapping>
    <servlet-name>action</servlet-name>
    <url-pattern>/</url-pattern>
  </servlet-mapping>
```
-> servlet url-pattern 을 루트로 주면 DispatcherServlet이 다 받는다. 그래서 @Controller에 맵핑된 애들은 거기로 가고 아닌 js,png 같은 맵핑되지 않은 파일들은 dispatcher-servlet.xml의 `<mvc:default-servlet-handler />`에 존재하는 내부 DefaultServletHttpRequestHandler로 간다. 이 핸들러는 스프링에서 처리하지 못한 것들을 받는다. 즉 Dispatcher에서 받지 못한 요청을 WAS로 넘긴다.

web.xml(web.xml은 WAS설정이다) url-pattern에 *.do로 설정하면 *.do를 제외한 것들은 Dispatcher로 안보낸다. 나머지는 다 WAS에서 처리한다.

반면에 web.xml(WAS설정) url-pattern을 / 로 주면 뭐가 서블릿인지 모르기 때문에 Dispatcher는 자기가 핸들링할 수 있는 서블릿과 JSP forwarding 이외의 것들은 not found를 떨군다.

그래서 url-pattern 을 / 로 줄때는 web.xml에 확장자를 다 명시해 줘야한다. /res/js/a.js,  /res/css/b.css 이렇게 구체적으로 명시하면 WAS는 web.xml을 읽어서 우선순위에 따라 해당 경로에서 먼저 찾고, 없으면 Dispatcher로 보낸다. 그래서 여러 확장자를 컨트롤하려면 web.xml을 만져야하는데 그러다 보면 소스가 더러워진다.

다시 돌아가서 `<mvc:default-servlet-handler />` 의 역할은 Dispatcher 에서 처리 못한 것을 WAS에게 넘긴다. WAS에도 png 등이 없으면 404에러.

참고로 모든 WAS에는 기본적인 servlet handler 와 jsp handler 가 있고 임의로 이름을 줄 수 있는데 이건 web.xml 에 보면 servlet-name 에서 지정되어 있다.
톰캣은 기본적인 servlet handler 이름이 default 이고 spring mvc tag 내에 이미 들어 있으므로 그냥 <mvc:default-servlet-handler /> 게 써도 적용되지만 이름을 다른 걸로 바꾼 경우 `<mvc:default-servlet-handler default-servlet-name="서블릿네임" />` 이렇게 줘야 한다.

결론 JEUS에서는 `<mvc:default-servlet-handler default-servlet-name="WorkerServlet" />`default-servlet-name 줘야한다.
톰캣은 `<mvc:default-servlet-handler />` 만해도 된다.

> 참고 http://bigzero37.tistory.com/22
> http://stove99.tistory.com/101

※ was 별 default servlet name
Tomcat : default
Resin : resin-file
Weblogic :  FileServlet
WebSphere : SimpleFileServlet
jetty : default
jboss : default
jeus : WorkerServlet
