---
layout:  post
title: Refactoring ch1
tags:
- javascript
- refactoring
---

> 리팩토링2 책을 보고 정리하는 개인 공부용 정리글입니다.

# Refactoring_v2 by Martin Fowler

다양한 연극을 외주로 받아서 공연하는 극단이 있다.

연극의 장르와 관객 규모를 기초로 비용을 책정한다.  
현재는 비극(tragedy)과 희극(comedy)만 공연한다.

공연료와 별개로 포인트를 지급해서 다음번 의뢰 시 공연료를 할인 받을 수 있다.

## 함수 추출하기(6.1)
amountFor()
***
## 임시 변수를 질의 함수로 바꾸기(7.4)
## 변수 인라인 처리(6.4)
### play 변수 제거
play 변수를 제거하고 인라인 처리 playFor() 한다.  
amountFor()의 매개변수 play는 개별 공연(aPerformance)에서 얻기 때문에 애초에 매개변수로 전달할 필요가 없다.  
그냥 amountFor() 안에서 다시 계산하면 된다. 임시 변수들은 함수르르 잘게 쪼갤 때 복잡하게 하는 요소다.

### thisAmount 변수 제거
thisAmount 변수를 제거하고 인라인 처리 amountFor(perf) 한다.

공연 조회 loop 당 1회 -> loop 당 3회  
성능 큰영향x, 리팩터링된 코드는 성능 개선이 훨씬 쉬워진다.  
=> 추출 작업 전 지역변수를 먼저 없앤다. - 신경써야할 유효범위가 준다.
***
