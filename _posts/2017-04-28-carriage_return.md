---
layout:  post
title: 개행문자 에러
tags:
- error
- carriage return
---


Javascript 특성상 개행문자(\r\n)를 넣으면 오류가 발생한다.

해결방법

1안) 처음 자바스크립트에 담을 때 개행문자를 `<br>`태그로 바꿔주고 `TextArea`에 넣을 것이기 때문에 `<br>`태그를 다시 개행문자로 바꿔준다.

2안) DB에서 값을 가져오기

1안으로 해결.

```java
<!-- 개행 문자 치환 -->
<% pageContext.setAttribute("crlf","\r\n");%>
<% pageContext.setAttribute("lf","");%>

<a href="#" onclick="fncMsgAdd('${fn:replace(list.poolCont,crlf,'<br/>') }');"></a>
```
```javascript
function fncMsgAdd(content){
	var regex = /<br\s*[\/]?>/gi;
	content = content.replace(regex,"\r\n");
	window.opener.document.getElementById("mesgCone").value = content;
	window.close();
}
```
정규식을 사용해 `<br>` 태그 처리.