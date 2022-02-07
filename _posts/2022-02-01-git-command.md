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
### <-> add 취소하기
`git restore --staged <file>`

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
git ~~ `--dry-run`

### 태그 삭제
`git push --delete origin 태그명`

### 태그명 바꾸기
`git tag new old`  
`git tag -d old`  
`git push origin new :old`  

### 원격에 커밋 되돌리고 싶을때
`git reset --hard 리비젼`(로컬도 지울경우)  
`git push -f origin 브랜치명`(강제 push)  
-> 현재 로컬에 있는 브랜치로 remote로 변경된다.

### rebase 중 취소하고 싶을 때
`git rebase --abort`


---
### git pull vs git fetch
```
fetch: remote에서 merge 없이 로컬에 가져오기
pull: remote에서 가져온 후 자동으로 merge 작업을 실행

pull = fetch + merge
```
---

## stash
- Working Directory에서 add를 하면 track중인 상태가 된다.
- 이 파일들은 Index area에 있는 상태이고 이 Index area 에 있는 파일을 Stash area로 옮기는 것이다.
- 브랜치를 변경해야 하는데 미완료된 상태의 파일을 커밋하기는 애매할때 사용 

### 임시 저장하기
`git stash`

### stash 목록
`git stash list`

### stash 불러오고 삭제
`gir stash pop`

### stash 불러오기(이름 생략가능 - 최근 내용 불러옴)
`git stash apply <이름>`  
`예) git stash apply 0`

### stash 삭제
`git stash drop <이름>`


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
(-d는 이미 merge된 분기만 삭제한다.)

### remote 브랜치 삭제
`git push origin --delete branchName`  
`git push origin:branchName`

### 강제 삭제
`git branch -D branchName`  
(-D는 --delete --force이며 merge 상관없이 삭제한다.)
