---
layout:  post
title: linux wine 설치(+kakaoTalk)
tags:
- linux
- wine
- kakao
- install
---

`sudo dpkg --add-architecture i386`

`sudo wget -nc https://dl.winehq.org/wine-builds/Release.key`  
`sudo apt-key add Release.key`

### 버전에 따라 저장소 다르게 추가
Ubuntu 19.04  
`sudo apt-add-repository 'deb https://dl.winehq.org/wine-builds/ubuntu/ disco main'`  
Ubuntu 18.10  
`sudo apt-add-repository 'deb https://dl.winehq.org/wine-builds/ubuntu/ cosmic main'`  
#### Ubuntu 18.04(Linux Mint 19.x)  
`sudo apt-add-repository 'deb https://dl.winehq.org/wine-builds/ubuntu/ bionic main'`  
Ubuntu 16.04(Linux Mint 18.x)  
`sudo apt-add-repository 'deb https://dl.winehq.org/wine-builds/ubuntu/ xenial main'`  

`sudo apt update`

### 안정화 버전으로 설치

#### Stable branch  
`sudo apt install --install-recommends winehq-stable`  
Development branch  
`sudo apt install --install-recommends winehq-devel`  
Staging branch  
`sudo apt install --install-recommends winehq-staging`

### 카카오톡 설치
`sudo apt-get install fonts-nanum*`

`sudo apt-get install --install-recommends winehq-stable`

### 설치 확인
`which wine`  
`wine --version`

#### home 폴더에 ./wine 폴더 생성
`WINEARCH=win32 winecfg`

#### winetricks 설치, DLL과 라이브러리 설치
`sudo apt-get install winetricks`    
`winetricks gdiplus wmp9 riched20`

#### 카카오 실행
`wine KakaoTalk_Setup.exe`

### 방화벽 차단문제는 위 라이브러리를 설치 안해서 나오는 것이니 라이브러리 설치 할 것.