---
layout:  post
title: String 연결 정리
tags:
- string
- java
---

### String 연결 정리

구분자를 포함하는 경우는 String.join 사용

멀티스레드 환경은 StringBuffer

일반적인 경우는 + 로 연결 -> java1.5부터 +로 해도 컴파일 시점에 StringBuilder로 변경.

loop를 돌거나 많은 데이터를 다룰때는 StringBuilder
  
    

