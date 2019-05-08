---
layout:  post
title: linux jdk 설치
tags:
- linux
- jdk
- install
---

### JDK 설치 및 심볼릭링크 설정(path)

### 심볼릭링크 수동모드및 확인(--config) 
1. 공홈에서 tar파일 받기
2. sudo update-alternatives --install /usr/bin/java java /home/oelo/dev/jdk/jdk-11.0.2/bin/java 1
3. sudo update-alternatives --config java
4. sudo update-alternatives --install /usr/bin/javac javac /home/oelo/dev/jdk/jdk-11.0.2/bin/javac 1
5. sudo update-alternatives --config javac


### 삭제 : 
`update-alternatives --remove <name> 경로명/파일명`
### 심볼릭링크 목록 확인( --display) : 
`update-alternatives --display <name>`