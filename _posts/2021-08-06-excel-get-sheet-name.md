---
layout:  post
title: 엑셀 시트명 가져오기
tags:
- excel
- non-dev
---

시트 복제 하더라도 현재 시트명으로 적용

`=MID(CELL("filename", A1), FIND("]", CELL("filename", A1)) +1, 10)`



