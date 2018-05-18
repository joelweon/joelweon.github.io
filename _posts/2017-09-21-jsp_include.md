---
layout:  post
title: JSP include
comments: true
tags:
- jsp
- include
---


##### 인클루드 3가지 방식

1) `<%@ include file="" %>`
```
=> 정적으로 해당 jsp파일이 컴파일 될 때 포함됩니다.
   include할 파일을 먼저 합치고 컴파일.
   기존파일과 include할 파일은 하나의 파일로 인식되고,
   사용하고자 하는 변수 공유가 가능하다.
   page Directive(<%@ page ... %>)를 생략한다는 점입니다. 두 파일
   을 합쳐 컴파일하게 되므로 page Directive가 두 번 있게 되어 오류가 나게 됩니다.


동일  있어 오류발생
```

2) `<jsp:include page="">`
```
=> 동적으로 해당 jsp가 실행 될 때 포함됩니다
   jsp action을 이용하는 구문으로 각각의 파일이 컴파일 된 후 합쳐친다.
```

3) `<c:import>`
```
=> jsp가 실행 될 때 url로 명기된 해당페이지를 text로 읽어와 해당 페이지에 합칩니다.
<jsp:include> 보다 강력한 기능으로 컴파일되고 동장하는 방식이 같다.
<jsp:include> 와 구분되는 특징은 외부 웹사이트나 웹 어플리케이션에서 콘텐츠를 가져올 수 있다.
```
```java
<c:import url="aa.jsp" charEncoding="UTF-8">
  <c:param name="" value="${}"></c:param>
</c:import>
```

