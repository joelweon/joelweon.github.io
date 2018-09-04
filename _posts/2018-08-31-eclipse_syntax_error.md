---
layout:  post
title: 이클립스 syntax error on tokens 에러 해결
tags:
- eclipse
- error
- systax
---

1) 프로젝트 우클릭한다.
2) properties -> JavaScript -> Include Path -> Source
3) 소스폴더 열고 Excluded 더블클릭
4) Exclusion patterns: -> Add
**/res/js/jquery/jquery*.min.js
**/res/js/payplus_test_un.js
**/res/mobile/js/jquery.js

등 해당하는 에러 소스를 추가해주면 된다.
