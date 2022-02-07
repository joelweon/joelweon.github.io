---
layout:  post
title: Jira with IntelliJ 
tags:
- jira
- intellij
---


## IntelliJ에서 Jira 이슈 연결 단축키
- Open Task : `Alt + Shift + N`
- Close Task: `Alt + Shift + W`

## 1. Jira에서 API 토큰 발급받기
https://id.atlassian.com/manage-profile/security/api-tokens

## 2. Jira 서버 연결하기 (configure servers)
![intellij_configure_servers.png](/assets/img/intellij_configure_servers.png)

## 3. Jira 서버 추가
![set_configure_servers.png](/assets/img/set_configure_servers.png)

## 4. 커밋메시지 바인딩 (설정 탭에서도 적용 가능)
![set_commit_msg.png](/assets/img/set_commit_msg.png)
- {summary} : 요약(이슈제목)
- {id} : 토큰 ID(이슈번호)
