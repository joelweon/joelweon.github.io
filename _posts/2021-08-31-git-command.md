---
layout:  post
title: Git 명령어
tags:
- git
- command
- tag
---

### git 1개의 history 보기
`git log -n 1`

### 변경내역 인덱스에 추가
`git add ./*`

### 변경내역 인덱스에 추가
`git commit -m "주석"`  
-> Head에 반영

### 원격 저장소 url 확인
`git remote -v`

### 기존 원격 저장소 url 변경하기
`git remote set-url origin https://1.1.1.1/project`

### remote/origin이 없다면 추가
`git remote add origin https://1.1.1.1/project`

### 변경된 원격 저장소에 push
`git push -u origin master`

### 명령실행없이 결과만 확인하기
`git ~~~--dry-run`

### 태그 삭제
`git push --delete origin 태그명`

---

## 브랜치

### 현재 사용하는 브랜치 조회
`git branch -v`

### 모든 브랜치 마지막 revision 보기
`git show-branch -a`

### 로컬 브랜치 조회
`git branch`

### 원격 브랜치 조회
`git branch -r`

### 모든 브랜치 조회
`git branch -a`

### 특정 브랜치 pull
`git pull origin branchName`

### 브랜치 기준으로 clone
```
git clone -b 브랜치명 --single-branch 저장소URL  
-> git clone -b branch1 --single-branch https://1.1.1.1/project
```

### 브랜치 생성/전환
`git checkout -b branchName`

### remote와 연동
`git branch --set-upstream-to origin/branchName`

### 브랜치 remote 생성(local도 같이 생김)
`git push origin branchName`

### 브랜치 삭제
`git branch -d branchName`

### remote 브랜치 삭제
`git push origin --delete branchName`  
`git push origin:branchName`

### 강제 삭제
`git branch -D branchName`
