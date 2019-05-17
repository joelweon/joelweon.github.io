---
layout:  post
title: forward와 redirect 차이
tags:
- forward
- redirect
---

### forward
1. URL이 바뀌지 않음
2. 요청객체와 응답객체가 유지됨.
3. 속도가 빠름

요청이 들어오면 Servlet이 받고, 요청에 맞는 페이지를 찾아 응답.
`RequestDispatcher rd
rd.forward;
`

### redirect
1. URL이 바뀜(북마크 가능)
2. request, response 객체 유지 되지 않음.
3. 속도가 느림

`response.sendRedirect(page);`