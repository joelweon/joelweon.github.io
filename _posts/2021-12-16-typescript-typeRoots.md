---
layout:  post
title: Typescript typeRoots
tags:
- typescript
- frontend
---


## typeRoots를 설정하면 해당 폴더의 패키지만 컴파일에 포함된다

```json
"typeRoots": [
  "node_modules/@types/!(node)"
],
```

 > https://typescript-kr.github.io/pages/tsconfig.json.html
