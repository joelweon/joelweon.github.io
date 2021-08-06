---
layout:  post
title: 엑셀 합계 계산해서 값 비교하기
tags:
- excel
- non-dev
---


### 한 컬럼(B3)에 있는 값과 합한값(SUM(C3:E3)) 비교하기
`=IF(B3=SUM(C3:E3), TRUE, FALSE)`


### 다른 시트에 있는 데이터 개수와 비교하기
`=IF(COUNTA(진행중!B:B)-1=C3, TRUE, FALSE)`

-> -1을 넣은 이유는 첫행이 헤더라서 뺌
