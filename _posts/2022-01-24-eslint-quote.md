---
layout:  post
title: single VS double quotation 사용 비율 in javascript
tags:
- statistics
- quotation
---


기존에 javascript quotation은 sigle을 쓰는 것이 일반적이라고 생각했다.

그러나 eslint를 적용하면서 기본값을 double로 사용하는 것을 보고 찾아봤다.

대부분의 javascript 프로젝트들은 single을 많이 사용한다.

|프로젝트|single 비율|
|---|---|
|lodash|99% of quotes|
|chalk|100% of quotes|
|react|90% of quotes|
|request|97% of quotes|
|commander.js|97% of quotes|
|moment|90% of quotes|
|express|92% of quotes|
|tslib|100% of quotes|
|debug|97% of quotes|


[prettier](https://prettier.io/) 는 기본적으로 `"double"`를 선호  
[gjslint](https://developers.google.com/closure/utilities/) (Google Closure Linter) 는 `'single'` 를 선호  
[standard](https://www.npmjs.com/package/standard) (NPM 패키지) `'single'` 선호  
[jslint](https://www.jslint.com/) 는 기본적으로 `"double"`를 선호
[eslint](https://eslint.org/) 는 기본적으로 `"double"`를 선호  
[TypeScript Contributors Coding Guidelines](https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines) 은  `"double"` 를 선호

> 참고 https://bytearcher.com/articles/single-or-double-quotes-strings-javascript/
