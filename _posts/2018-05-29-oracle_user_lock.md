---
layout:  post
title: 오라클 USER lock해제
tags:
- oracle
- imp
---

```
account is locked
```

### USER 상태확인
```
SELECT * FROM DBA_USERS;
```

### DBA_DATA_FILES 테이블스페이스 파일 목록
```
ALTER USER 유저명 ACCOUNT UNLOCK;
```

### 계정이 EXPIRED 되었다면 패스워드 재생성
```
ALTER USER scott IDENTIFIED BY 패스워드;
```