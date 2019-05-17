---
layout:  post
title: cookie와 session 차이
tags:
- cookie
- session
---

### cookie
1. 클라이언트에 저장(서버 부하가 없음)
2. 만료시간을 정할 수 있음.(일주일간 보지 않음 팝업,id저장)
3. 쿠키탈취, 쿠키변조의 위험이 있어 보안에 취약
4. 작성방법 복잡

#### 쿠키에는 2종류가 있다.
- Session cookie  
브라우저를 종료하면 자동으로 날아감
- Permanent cookie  
Max-Age 또는 Expires를 설정하면 해당하는 시간만큼 살아있는다.
    - Max-Age : 현재 시간부터 얼만큼 살아 있을지
    - Expires : 절대적인 시간(설정한 시간 이후는 만료)

#### Secure를 위한 전용 쿠키가 있다.
웹서버가 https(SSL)로 통신할 때만 쿠키를 전송한다.
`cookiename=value; Secure`
#### HttpOnly
javascript에서는 보이지 않게 설정 가능(웹서버와 통신할 때만 발행)
`cookiename=value; HttpOnly`
### path 해당 경로부터 하위 경로까지 cookie 유효

### session
1. 서버에 저장(서버에 부하가 있음- 세션사용자가 많으면)
2. 세션유효시간 설정가능(web.xml)
3. 쿠키에 비해 보안 우수
4. 쿠키보다 작성방법 쉬움
`session.setAttribute();session.getAttribute;session.invalidate()`
