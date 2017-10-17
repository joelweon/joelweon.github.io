---
layout:  post
title: JSP include
comments: true
tags:
- jsp
- include
---

## JSP Include

##### 인클루드 3가지 방식


```
<%@ include file="" %> 
=> 정적으로 해당 jsp파일이 컴파일 될 때 포함됩니다
<jsp:include> 
=> 동적으로 해당 jsp가 실행 될 때 포함됩니다 
<c:import>
=> jsp가 실행 될 때 url로 명기된 해당페이지를 text로 읽어와 해당 페이지에 합칩니다.
```

