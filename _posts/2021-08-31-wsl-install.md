---
layout:  post
title: install WSL 
tags:
- wsl
- linux
- windows
---

## WSL 설치하기


### powershell 관리자권한 실행
`dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart`  
`dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart`

```
배포 이미지 서비스 및 관리 도구
버전: 10.0.19041.844

이미지 버전: 10.0.19042.1165

기능을 사용하도록 설정하는 중
[==========================100.0%==========================]
작업을 완료했습니다.
```

### 다운로드 Linux 커널 업데이트 패키지 다운로드
[https://docs.microsoft.com/ko-kr/windows/wsl/install-win10#step-4---download-the-linux-kernel-update-package](https://docs.microsoft.com/ko-kr/windows/wsl/install-win10#step-4---download-the-linux-kernel-update-package)

### 실행 후 WSL 버전2로 기본 세팅
`wsl --set-default-version 2`

### microsoft Store에서 ubuntu 설치

### 설치 후 cmd창을 다시 열어서 버전 확인 후 version이 1인경우 아래 진행

```
C:\Users\joel>wsl -l -v
  NAME            STATE           VERSION
* Ubuntu-20.04    Running         1

C:\Users\joel>wsl --set-version Ubuntu-20.04 2
변환이 진행 중입니다. 몇 분 정도 걸릴 수 있습니다...
WSL 2와의 주요 차이점에 대한 자세한 내용은 https://aka.ms/wsl2를 참조하세요
```

### 바뀐 버전 확인
```
C:\Users\joel>wsl -l -v
  NAME            STATE           VERSION
* Ubuntu-20.04    Stopped         2
```

### 리눅스 접속
```
C:\Users\joel>wsl
To run a command as administrator (user "root"), use "sudo <command>".
See "man sudo_root" for details.

joel@YOEL-PC:/mnt/c/Users/joel$
```

### wsl 종료(windows cmd창에서)
`wsl --shutdown`

### wsl에서 netstat 사용하기(명령어 2개 사용)
`echo "alias netstat='/mnt/c/Windows/System32/NETSTAT.EXE'" >>$HOME/.profile`

`. $HOME/.profile`
