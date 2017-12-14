---
layout:  post
title: 스프링 bean & java
tags:
---

### 스프링에서 빈을 와이어링하는 간단한 예

XML 설정의 대안으로 **자바 기반** 설정을 제공하는 스프링
```java
@Configuration
public class KnightConfig {
  
  @Bean
  public Knight knight() {
    return new BraveKnight(quest());
  }
  
  @Bean
  public Quest quest() {
    return new SlayDragonQuest(System.out);
  }
```
==
XML 기반 설정
```xml
  <bean id="knight" class="spring.BraveKnight">
    <constructor-arg ref="quest" />
  </bean>
  
  <bean id="quest" class="spring.SlayDragonQuest">
    <constructor-arg value="#{T(System).out}" />
  </bean>
```

동일한 DI 이점.