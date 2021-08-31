---
layout:  post
title: WSL에서 gitlab 설치하기
tags:
- git
- gitlab
- wsl
---

## install gitlab in WSL
> Ubuntu20.04LTS

`sudo apt-get update`  
`sudo apt-get install -y curl openssh-server ca-certificates`

### Gitlab repository 추가 후 설치
`curl https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.deb.sh | sudo bash`

`sudo EXTERNAL_URL="http://localhost:8888" apt-get install gitlab-ce`

### IP, PORT 설정(변경 필요시)
`sudo vi /etc/gitlab/gitlab.rb`

### gitlab.rb 변경 후 서비스 재시작
`sudo gitlab-ctl reconfigure`

> 설치시 발생 오류는 아래 확인(runsv 관련)

## 설치 후 작업

### gitlab 상태 확인
`sudo gitlab-ctl status`

### gitlab 중지
`sudo gitlab-ctl stop`

### gitlab 시작
`sudo gitlab-ctl start`

### gitlab 설정적용
`sudo gitlab-ctl reconfigure`

---
### gitlab-ctl 오류시 runsvdir-start & 실행
> warning: logrotate: unable to open supervise/ok: file does not exist`  
fail: logrotate: runsv not running

`sudo /opt/gitlab/embedded/bin/runsvdir-start &`

### 서비스 확인
```
> ps -ef
root     10871 10853  0 15:07 pts/3    00:00:00 sudo /opt/gitlab/embedded/bin/runsvdir-start
```

### localhost:8888 접속하면 초기 admin 계정 입력이 나옴

### 만약 안나오거나 패스워드 분실시  
`sudo gitlab-rake "gitlab:password:reset"`으로 초기화


---

### 아래는 확실하지 않음
### git 설정
```
git config --global user.name "이름"
git config --global user.email "이메일"

apt-get install libpcre3
gitlab-ctl reconfigure
gitlab-ctl status
gitlab-ctl restart
```

### gitlab-ctl 삭제
`sudo gitlab-ctl stop`

`sudo apt-get remove gitlab-ce`

`rm -rf /var/opt/gitlab`  
--kill all process live

`sudo pkill -f gitlab`  
-- Remove paths

`sudo rm -rf /opt/gitlab`  
`sudo rm -rf /etc/gitlab`  
`sudo rm -rf /var/opt/gitlab`


