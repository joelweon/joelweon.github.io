---
layout:  post
title: linux vscode 설치
tags:
- linux
- vscode
- install
---

#### 1. 마이크로소프트 GPG 키를 다운로드하여 /etc/apt/trusted.gpg.d/ 경로에 복사해줍니다.
$ `sudo sh -c 'curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > /etc/apt/trusted.gpg.d/microsoft.gpg'`

#### 2. Visual Studio Code를 다운로드 받기 위한 저장소를 추가합니다.
$ `sudo sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main" > /etc/apt/sources.list.d/vscode.list'`

#### 3. 추가한 저장소로부터 패키지 목록을 가져옵니다.
$ `sudo apt-get update`

#### 4. Visual Studio Code를 설치합니다.
$ `sudo apt-get install code`

#### 5. 터미널 또는 데스크톱 환경에서 실행할 수 있습니다.
$ `code`