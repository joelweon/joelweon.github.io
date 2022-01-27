---
layout:  post
title: prettier(eslint) 호환되게 intellij code style 수정
tags:
- prettier
- eslint
- formatter
- intellij
---

자동 정렬을 하면 인텔리제이에서 적용한 formatter로 변경 된다.
> 에디터 위치: Settings | Editor | Code Style | TypeScript

### Fix ESLint 후 자동정렬(`Ctrl + Alt + L`) 했을 때 충돌나지 않도록 하기


## 1. 자동정렬해도 기존대로 `{}`하기
![code_style1.png](/assets/img/code_style1.png)
#### Fix하면 `{}`이렇게 된다. -> 자동정렬하면 아래 처럼 된다. -> 위에 설정으로 기존 공백 유지하기
```javascript
export class PrivateDataAccLogModule {
}
```

## 2. import braces 공백 / Object 공백 넣기
![code_style2.png](/assets/img/code_style2.png)

## 3. import 문 길면 아래로 짜르기(Chop down if long)
![code_style3.png](/assets/img/code_style3.png)
