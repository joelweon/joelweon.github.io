---
layout:  post
title: git-svn을 이용한 마이그레이션
tags:
- svn
- git
- migration
---

# SVN to GIT migration in WSL

> svn에서 git으로 이관하면서 기존 svn 커밋 이력을 가져오기 위함

gti scm 설치 - wsl에서 하려면 설치 필요 없음  
[http://git-scm.com/download/win](http://git-scm.com/download/win)

### 1. 테스트를 위해 svn repository copy본 생성 후 진행
#### visualSVN server tool에서
- repository 선택 후 backup 클릭
- 메인 메뉴 선택 후 백업파일 restore 진행

### 2. 커밋 메시지 매핑을 위한 author 설정
`users.txt` 생성  
`svn계정명 = git계정명 <이메일>`  
`joel = git_joel <joelweon@email.com>`  
> 퇴사자는 기존 계정으로 대체해도 됨

기존에 커밋한 svn 계정은 `tortoiseSVN`에서 확인  
`show log > Statistics > commits by author`

[![](/assets/img/svn_commit_author.png)](/assets/img/svn_commit_author.png)

### 3. svn to git clone하기
`git svn clone https://1.1.1.1/svn/project --no-metadata -A /mnt/c/Users/joel/dev/users.txt ./project-git`

> users.txt가 오류 발생할 경우  
`Author: VisualSVN Server not defined in users.txt file`  
`users.txt`파일 상단에 `VisualSVN Server = Visual SVN Server <joelweon@confitech.co.kr>`추가

### 최종 users.txt
```
VisualSVN Server = Visual SVN Server <joelweon@confitech.co.kr>
joel = git_joel <joelweon@email.com>
joel2 = git_joel2 <joel2@email.com>
...
```

### git svn오류
아마 버전 문제 같은데 아래 오류가 해결이 되지 않아 `wsl`에서 subversion 설치 후 진행
```
Can't load '/usr/lib/perl5/vendor_perl/auto/SVN/_Core/_Core.dll' for module SVN::_Core: No such file or directory at /usr/lib/perl5/core_perl/DynaLoader.pm line 193.
 at /usr/lib/perl5/vendor_perl/SVN/Base.pm line 59.
BEGIN failed--compilation aborted at /usr/lib/perl5/vendor_perl/SVN/Core.pm line 5.
Compilation failed in require at C:/Program Files/Git/mingw64/share/perl5/Git/SVN/Utils.pm line 6.
BEGIN failed--compilation aborted at C:/Program Files/Git/mingw64/share/perl5/Git/SVN/Utils.pm line 6.
Compilation failed in require at C:/Program Files/Git/mingw64/share/perl5/Git/SVN.pm line 32.
BEGIN failed--compilation aborted at C:/Program Files/Git/mingw64/share/perl5/Git/SVN.pm line 32.
Compilation failed in require at C:/Program Files/Git/mingw64/libexec/git-core\git-svn line 64.
BEGIN failed--compilation aborted at C:/Program Files/Git/mingw64/libexec/git-core\git-svn line 64.
```

---
# wsl에서 svn 설치
`sudo apt-get install subversion git ruby git-svn`

`git svn --version`으로 설치 확인

> 이번에는 svn 인증 오류
```
Error validating server certificate for 'https://1.1.1.1/project':
 - The certificate is not issued by a trusted authority. Use the
   fingerprint to validate the certificate manually!
 - The certificate hostname does not match.
Certificate information:
 - Hostname: DESKTOP-***
 - Valid: from Jan 30 05:58:53 2018 GMT until Jan 28 05:58:53 2028 GMT
 - Issuer: DESKTOP-***
 - Fingerprint: 98:**:
Certificate problem.
(R)eject, accept (t)emporarily or accept (p)ermanently?
```
#### => p입력 후 진행

#### 연결 테스트
`svn list https://1.1.1.1/project`


