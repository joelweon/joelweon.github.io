---
layout:  post
title: 웹표준, 접근성
tags:
- web
---

1. tltle 속성은 한번만 head안에 넣어야한다.

2. `<col width="5%"/>` 는 html5 이전 방식이다.

`<col style="width: 5%;"/>`  
또는  
`<col class="small-width"/>`  
이렇게 변경해야한다.

3. `<li>` 사이에 허용되지않는코드
```
   
&#160;(Html Entity) /  &nbsp;(Decimal Code)
```