---
layout:  post
title: egov validator
tags:
- egov
- xml
---

resources/egovframework/spring/context-validator.xml  
-> xml 위치 설정
resources/egovframework/validator/com-rules.xml & validator-rules.xml  
-> valid 체크 xml 커스터마이징 하면 쉽게 쓸 수 있음.  
name과 메세지
```sql
<formset>
  <form name = "">
```
폼 네임.

jsp에서 스프링 폼태그 사용, 서버단에서 beanvalidator 어노테이션 사용(클래스,에러메세지만 담김)

제약조건 => jsp에서 폼 하나만 인식을 한다.