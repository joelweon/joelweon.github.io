---
layout:  post
title: HTTP Request 정보
tags:
- http
- request
---

### HTTP method 확인
```
String method = request.getMethod();
```

### ContextPath
```
String cp = request.getContextPath();
//: /study
```

### 요청 URL
```
String url = request.getRequestURL().toString();
//http://localhost:9090/study/0222/test3_ok.jsp

String path = request.getScheme() + "://"
    +  request.getServerName() + ":"
    +  request.getServerPort()
    +  request.getContextPath(); //http://localhost:9090/study
```

### URL에서 스키마, 서버이름, 포트번호를 제외한 나머지 주소와 파라미터
```
String excludeHost = request.getRequestURI();
//: /study/0222/test3_ok.jsp
```

### 클라이언트의 ip 및 포트 정보
```
Remote IP: <%= request.getRemoteAddr()%>
Remote Host: <%= request.getRemoteHost()%>
Remote Port: <%= request.getRemotePort()%>
```

> https://noritersand.tistory.com/111