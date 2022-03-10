---
layout:  post
title: ngForm in angular
tags:
- ngForm
- angular
---

## ngForm 디렉티브
템플릿 기반 폼 전체를 관리하는 디렉티브이다.  
루트 모듈에 `FormsModule`을 추가하면 NgForm 디렉티브를 따로 선언하지 않아도  
모든 `<form`>요소는 NgForm 디렉티브가 자동으로 적용되어 템플릿 기반 폼으로 동작한다.  
그러면 `HTML 표준폼`이 제공하는 유효성 검증 대신 `템플릿 기반 폼`이 제공하는 유효성 검증을 한다.

### HTML 표준폼 비활성화
- 템플릿 기반 폼이 제공하는 유효성 검증을 사용할 것임으로 `novalidate`추가
```html
<form novalidate></form>
```
### 템플릿 기반 폼 비활성화
- `FormsModule`을 추가함으로 자동 적용되는 `NgForm 디렉티브` 적용 취소(HTML 표준폼으로 동작)
```html
<form ngNoForm></form>
```

HTML 표준폼은 `submit`버튼을 클릭하면 폼 데이터를 서버로 전송하고 페이지를 새로고침한다.  
반면 `NgForm 디렉티브`가 적용된 `템플릿 기반 폼`은 `submit`이벤트를 인터셉트하여 폼 데이터를 전송하고 페이지 전환 기본 동작을 막는다.  
따라서 템플릿 기반 폼에서는 `submit` 이벤트 대신 `NgForm` 디렉티브가 방출하는 ngSubmit 이벤트를 사용한다.
```angular2html
<form #userForm="ngForm" (ngSubmit)="onNgSubmit(userForm)" novalidate></form>
```
`네이티브 DOM`이 아닌 `NgForm 인스턴스`를 `userForm` 참조 변수에 할당하여 `onNgSubmit()` 호출

> 참고: [Angular Essentials](http://www.yes24.com/Product/Goods/62063090)
