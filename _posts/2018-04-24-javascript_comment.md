---
layout:  post
title: javascript 주석 !--
tags:
- javascript
- comment
---




```javascript
<!-- //--> 는 HTML 주석입니다.

결국 일단은 브라우저가 HTML 주석으로 인식 합니다.

그런데 브라우저 내에 JavaScript(이하 js) 엔진이 내장된 경우에는 <script> 태그 안에 <!-- //--> 있는 내용을 다시 js 소스로 인식하게 됩니다.

결국 js 엔진이 없는 경우에 html 주석이 없으면 HTML 파서가 모르는 내용(function, for, if...)들로 인해 브라우저 오류가 발생하는데 이를 방지하기 위해 js 부분을 <!-- //--> 로 일단 HTML 주석 처리하는 겁니다.

하지만 현재 메이저급 브라우저는 모두 js 엔진을 내장하고 있기에 더 이상 <!-- //--> 으로 <script> 블럭 내부를 HTML 주석 처리할 필요가 없습니다.
```