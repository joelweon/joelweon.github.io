---
layout:  post
title: 이클립스 tartget 폴더 제외하기
tags:
- eclipse
- target
- folder
---

1) target 폴더 우측 클릭 -> properties -> Resource - Derived 체크

2) 프로젝트 폴더 우측 클릭 -> properties -> Resource -> Resource Filiters -> Add 클릭
- Exclude All 체크
- Folders 체크
- All children(recursive) 체크
- Name - matches 항목에 target 입력 후 Ok
