---
layout:  post
title: input 필수값 설정 및 데이터 넘기기
tags:
- error
- input
---


```html
<input type="checkbox" checked="true" disabled />
<input type="hidden" value="A" id="a1" name="artiTitl" 
  <c:if test='${fn:indexOf(accnReguVO.artiTitl,"A") > -1 || fn:indexOf(accnReguVO.artiTitl,"C") > -1}'>checked="true"
  </c:if>
```

value 값이 있을 경우 바로 disabled로 설정하면 value 값이 넘어가지 않는다.  
-> hidden으로 input 하나 생성.