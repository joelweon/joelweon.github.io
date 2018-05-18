---
layout:  post
title: VO 복사 메서드
tags:
- database
- oracle
- count
---

import org.apache.commons.beanutils.BeanUtils;

BeanUtils.copyProperties(대상, 원본);

같은 변수명이면 자동으로 set됨.

copyProperties 를 두번 쓰면 덮어써지는지 add 되는지는 테스트 필요.