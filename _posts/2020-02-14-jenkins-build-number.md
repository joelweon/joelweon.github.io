---
layout:  post
title: Jenkins 빌드번호 고정
tags:
- jenkins
- build number
---

### Jenkins 관리 > 스크립트 콘솔(Script Console)
Jenkins.instance.getItemByFullName("Branches_1").updateNextBuildNumber(198)