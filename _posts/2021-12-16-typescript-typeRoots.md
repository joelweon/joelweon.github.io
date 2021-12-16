---
layout:  post
title: Typescript typeRoots
tags:
- typescript
- frontend
---


## typeRoots를 설정하면 해당 폴더의 하위 패키지만 컴파일에 포함된다

```json
"typeRoots": [
  "node_modules/@types"
]
```

## 기본적으로는 모든 `@types` 패키지가 컴파일에 포함된다.


 > https://typescript-kr.github.io/pages/tsconfig.json.html
