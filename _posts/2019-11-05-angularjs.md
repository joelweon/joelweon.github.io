---
layout:  post
title: angularjs directive & x2js & ng-bind
tags:
- angularjs
- directive
- x2js
- ng-bind-html
---

### directive 옵션(restrict:'AE')

A - 속성명이 일치 할 때만 사용

E - 요소명이 일치 할 때만 사용

C - 클래스명이 일치 할 때만 사용

M - 코멘트가 일치 할 때만 사용

---

x2js.xml_str2json(base64Util.decode(body));

bower install angular-x2js --save


### You can use all functions available in x2js:

x2js.xml2json - Convert XML specified as DOM Object to JSON

x2js.json2xml - Convert JSON to XML DOM Object

x2js.xml_str2json - Convert XML specified as string to JSON

x2js.json2xml_str - Convert JSON to XML string

x2js.asArray - Utility function for working with JSON field always in array form

x2js.asDateTime - Utility function for convert the specified parameter from XML DateTime to JS Date

x2js.asXmlDateTime - Utility function for convert the specified parameter to XML DateTime from JS Date or timestamp

---

<ng-bind-html ng-bind-html="'TW'|translate"></ng-bind-html>

<span ng-bind-html="msg.ING"></span>

<i translate ="TW" translate-values="{ product_name: ''}"></i>