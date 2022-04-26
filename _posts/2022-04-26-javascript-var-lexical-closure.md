---
layout:  post
title: javascript (var, lexical, closure)
tags:
- javascript
- var
- lexical
- closure
---


## var let

### 1. 변수 생성
- 선언 단계(Declaration phase): 변수 객체(Variable Object)에 등록한다. 이 변수 객체는 스코프에서 참조 가능하다.
- 초기화 단계(Initialization phase): 변수 객체(Variable Object)에 등록된 변수를 메모리에 할당하고, undefined로 초기화된다.
- 할당 단계(Assignment phase)

-> var 키워드로 선언된 변수는 선언 단계와 초기화 단계가 한번에 이루어진다. 즉, 스코프에 변수가 등록되고 변수는 메모리에 공간을 확보한 후 undefined로 초기화된다.
따라서 변수 선언문 이전에 변수에 접근하여도 Variable Object에 변수가 존재하기 때문에 에러가 발생하지 않는다. 다만 undefined를 반환한다.
이러한 현상을 변수 호이스팅(Variable Hoisting)이라한다.
-> let, const는 분리되어 이뤄진다.  
-> 변수의 초기화 전까지 구간을 TDZ(Temporal Dead Zone: 일시적 사각지대)라고 한다.

### 2. var는 블록 스코프가 없다.
- var로 선언한 변수의 스코프는 함수 스코프이거나 전역스코프다.
- if, for문 같은 코드 블록은 무시하고 전역 스코프에서 해당 var 변수에 접근 가능하다.
- function 함수에서는 해당 함수 레벨 변수가 되어 전역에서 참조 불가하다.


### 3. var 변수는 할당하기 전에 사용이 가능하다.
- 자바스크립트 엔진이 코드를 로드할 때 `실행 컨텍스트`를 생성하고, 그 안에 선언된 변수, 함수를 `실행 컨텍스트 최상단`으로 올린다. 이것이 `호이스팅`이다.
다시 말해 함수 실행이 시작 될 때 끌어 올려져(hoisted:끌어올리다) 처리되는 것이 호이스팅이다.
- var의 선언은 호이스팅 되지만, 할당은 실행 흐름이 해당 코드에 도달할 때 처리된다.
- 처음 실행 컨텍스트 때는 undefined로 정의 된다. (let, const는 오류 발생 - `Cannot access '변수명' before initialization`)

```javascript
function sayHi() {
  alert(phrase); // 2. 선언은 된 상태라 오류 없이 프로퍼티 값은 undefined
  phrase = "Hello"; // 3. 실행 흐름이 해당 코드에 도달할때 변수 할당이 이뤄진다.

  alert(phrase); // 4. Hello로 나온다

  var phrase; // 1. 실행 컨텍스트 최상단으로 올라간다
  //let phrase; // Cannot access 'phrase' before initialization
}
sayHi();
```


## 렉시컬 환경(Lexical Environment)
자바스크립트는 실행 중인 함수, 코드블록({}), 스크립트 전체는 렉시컬 환경이라 불리는 내부 숨김 연관 객체(internal hidden associated object)를 갖는다.

렉시컬 환경 객체는 두 부분으로 구성됩니다.
1. 환경 레코드(Environment Record) – 모든 지역 변수를 프로퍼티로 저장하고 있는 객체입니다. this 값과 같은 기타 정보도 여기에 저장됩니다.
- ’변수’는 특수 내부 객체인 환경 레코드의 프로퍼티일 뿐입니다. '변수를 가져오거나 변경’하는 것은 '환경 레코드의 프로퍼티를 가져오거나 변경’함을 의미합니다.

2. 외부 렉시컬 환경(Outer Lexical Environment) 에 대한 참조 – 외부 코드와 연관됨

![lexical.png](/assets/img/lexical.png)

## 클로저(closure)
클로저는 외부 변수를 기억하고 이 외부 변수에 접근할 수 있는 함수를 의미합니다.  
몇몇 언어에선 클로저를 구현하는 게 불가능하거나 특수한 방식으로 함수를 작성해야 클로저를 만들 수 있습니다.  
하지만 자바스크립트에선 모든 함수가 자연스럽게 클로저가 됩니다.

자바스크립트의 함수는 숨김 프로퍼티인 [[Environment]]를 이용해 자신이 어디서 만들어졌는지를 기억합니다.  
함수 본문에선 [[Environment]]를 사용해 외부 변수에 접근합니다.


---
> [자바스크립트는-왜-프로토타입을-선택했을까](https://medium.com/@limsungmook/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%8A%94-%EC%99%9C-%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85%EC%9D%84-%EC%84%A0%ED%83%9D%ED%96%88%EC%9D%84%EA%B9%8C-997f985adb42)  
> [오래된 'var'](https://ko.javascript.info/var)  
> [렉시컬 환경](https://ko.javascript.info/closure#ref-104)
> [변수-호이스팅](https://poiemaweb.com/js-data-type-variable#24-%EB%B3%80%EC%88%98-%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85variable-hoisting)
