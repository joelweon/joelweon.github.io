---
layout:  post
title: JavaScript Core(작성중)
tags:
- execution context
- javascript
---

## var vs let

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

## 실행 컨택스트(Execution Context)
- 코드의 실제 진행 상황을 추적하는데 필요한 정보들을 모아둔 구조
- 함수 실행에 대한 세부 정보를 담고 있는 내부 데이터 구조
- 제어 흐름의 현재 위치, 변수의 현재 값, this의 값 등 상세 내부 정보가 실행 컨텍스트에 저장됩니다.


## 렉시컬 환경(Lexical Environment)
렉시컬 환경은 특정 코드가 선언된 장소를 말한다.  
자바스크립트는 실행 중인 함수, 코드블록(`{}`), 스크립트 전체는 렉시컬 환경이라 불리는 내부 숨김 연관 객체(internal hidden associated object)를 갖는다.

렉시컬 환경 객체는 두 부분으로 구성된다.
1. 환경 레코드(Environment Record) = 특수내부객체
- 모든 지역 변수를 프로퍼티로 저장하고 있는 객체입니다.
- this 값과 같은 기타 정보도 여기에 저장됩니다.
- ’변수’는 특수 내부 객체인 환경 레코드의 프로퍼티일 뿐입니다.
- '변수를 가져오거나 변경’하는 것은 '환경 레코드의 프로퍼티를 가져오거나 변경’함을 의미합니다.

2. 외부 렉시컬 환경(Outer Lexical Environment) 에 대한 참조
- 외부 코드와 연관됨
- 아래 이미지는 전역으로 선언되었기 때문에 outer는 null이다.

### - 변수
![lexical_variable.png](/assets/img/lexical_variable.png)

우측의 네모 상자들은 코드가 한 줄, 한 줄 실행될 때마다 전역 렉시컬 환경이 어떻게 변화하는지 보여줍니다.
1. 스크립트가 시작되면 스크립트 내에서 선언한 변수 전체가 렉시컬 환경에 올라갑니다(pre-populated).
- 이때 변수의 상태는 특수 내부 상태(special internal state)인 `uninitialized`가 됩니다.
  자바스크립트 엔진은 `uninitialized` 상태의 변수를 인지하긴 하지만, `let`을 만나기 전까진 이 변수를 참조할 수 없습니다.
2. `let phrase`가 나타났네요. 아직 값을 할당하기 전이기 때문에 프로퍼티 값은 `undefined`입니다. `phrase`는 이 시점 이후부터 사용할 수 있습니다.
3. `phrase`에 값이 할당되었습니다.
4. `phrase`의 값이 변경되었습니다.

```
렉시컬 환경은 명세서에만 존재합니다.
'렉시컬 환경’은 명세서에서 자바스크립트가 어떻게 동작하는지 설명하는 데 쓰이는 ‘이론상의’ 객체입니다.
따라서 코드를 사용해 직접 렉시컬 환경을 얻거나 조작하는 것은 불가능합니다.

자바스크립트 엔진들은 명세서에 언급된 사항을 준수하면서 엔진 고유의 방법을 사용해 렉시컬 환경을 최적화합니다.
사용하지 않는 변수를 버려 메모리를 절약하거나 다양한 내부 트릭을 써서 말이죠.
```
### - 함수 선언문
- 함수는 변수와 마찬가지로 값이다.
- 다만 함수 선언문(function declaration)으로 선언한 함수는 일반 변수와는 달리 바로 초기화된다
- 함수 선언문으로 선언한 함수는 렉시컬 환경이 만들어지는 즉시 사용할 수 있다.
- 선언되기 전에도 함수를 사용할 수 있는 것은 바로 이 때문이다.

아래 그림은 스크립트에 함수를 추가했을 때 전역 렉시컬 환경 초기 상태가 어떻게 변하는지 보여줍니다.
![lexical_function.png](/assets/img/lexical_function.png)
- 단, `let func = function(name) {}`과 같이 함수를 변수에 할당한 함수 표현식은 해당 되지 않는다.

### - 함수를 반환하는 함수
![lexical_env_ref.png](/assets/img/lexical_env_ref.png)
- 모든 함수는 함수가 생성된 곳의 렉시컬 환경을 기억한다.
- 자신의 내부 슬롯인 `[[Environment]]` 에 자신이 정의된 환경, 상위 스코프의 참조를 저장한다.
- `[[Environment]]`는 함수가 생성될 때 딱 한 번 값이 세팅되고, 영원히 변하지 않는다.
- 함수가 자신이 태어난 곳을 기억하는 것은 `[[Environment]]` 프로퍼티 덕분이다.
- `count` 변수에 대한 참조
    - 먼저 익명함수 내부인 자체 렉시컬 환경에서 찾고(이미지에서 익명 내부의 렉시컬 환경은 empty이다-지역변수도 없음)
    - 없으면 outer(외부 렉시컬 환경)에서 찾아본다.


## 클로저(closure)
클로저는 외부 변수를 기억하고 이 외부 변수에 접근할 수 있는 함수를 의미합니다.  
몇몇 언어에선 클로저를 구현하는 게 불가능하거나 특수한 방식으로 함수를 작성해야 클로저를 만들 수 있습니다.  
하지만 자바스크립트에선 모든 함수가 자연스럽게 클로저가 됩니다.
- 함수 + 함수가 선언된 렉시컬 환경
- 함수의 생명 주기가 끝나더라도 렉시컬 환경에 남아있다.
- 렉시컬 환경에 남아 있는 변수를 참조하므로 은닉과 메모리 절약에 유리하다.

## 콜 스택
- 콜 스택은 실행 컨텍스트를 추적하기 위한 구조체이다.
- 자바스크립트 엔진은 콜 스택의 `top`을 통해 현재 실행중인 실행 컨텍스트를 알 수 있다.
- 함수를 호출하면 새로운 실행 컨택스트가 생성되고, 콜 스택에도 `push`되고, 함수가 종료되면 `pop`된다.
- 가장 하단에는 전역 컨택스트(GC)가 있다.

## 스코프(scope)
- 식별자(변수)가 유효한 범위를 말한다.
- 자바스크립트 엔진은 스코프를 통해 어떤 변수를 참조해야 할 것인지 결정한다.
- 따라서 스코프란 자바스크립트 엔진이 식별자를 검색할 때 사용하는 규칙이라고도 할 수 있다.

변수 접근시
- 내부 렉시컬 환경에서 검색
- 없다면, 내부 렉시컬이 참조하는 외부 렉시컬 환경에서 검색한다.(스코프 체인)
- 외부 렉시컬 환경이 null일 때까지 반복하고 없으면 에러 발생

렉시컬 스코프
- 어디서 호출했는지가 아닌 어디서 정의했는지에 따라 함수의 상위 스코프를 결정하는 것
- 정적 스코프 = 렉시컬 스코프

렉시컬 환경의 "외부렉시컬 환경에 대한 참조"에 저장할 참조값, 즉 상위 스코프에 대한
참조는 함수정의가 평가되는 시점에 함수가 정의된 환경에 의해 결정된다

## 자바스크립트 엔진
- 콜 스택과 힙(heap)으로 구성된다.
- 실행 컨텍스트는 힙 메모리에 저장된 객체를 참조한다.
- 객체는 원시 값과는 달리 크기가 정해져 있지 않으므로 할당해야 할 메모리 공간의 크기를 런타임에 결정(동적 할당)해야 한다.
- 따라서 객체가 저장되는 메모리 공간인 힙은 구조화되어 있지 않다는 특징이 있다.

## 브라우저 측 실행 흐름
### 매크로태스크 큐(=태스크큐(흔히 말하는 큐), 이벤트큐, 콜백큐)
- 비동기 함수의 콜백 함수나 이벤트 핸들러가 일시적으로 보관되는 영역이다.
- 엔진이 특정 태스크를 처리하는 동안엔 렌더링이 일어나지 않는다.
### 마이크로태스크 큐(=PromiseJobs, 잡큐-ES6)
- Promise 후 처리 메서드의 콜백 함수가 일시적으로 보관되는 영역이다.
- 태스크 큐보다 우선순위가 높다.
- 프라미스(`.then/catch/finally`) 핸들링은 항상 비동기로 처리된다.
### 이벤트 루프
- 콜스택에 실행 중인 실행 컨택스트가 있는지 확인
- 태스크 큐에 대기 중인 함수가 있는지 확인
- 콜스택이 비어 있으면 태스크 큐에 대기 중인 함수를 콜스택으로 옮겨서 실행

동기적으로 로직 수행  
-> 비동기 함수 만나면   
-> 브라우저로 위임 후(웹 API) 비동기 함수는 콜스택에서 pop
-> 동기함수 계속 실행 + 브라우저 작업 끝나면 태스크큐로 콜백함수 enqueue (둘은 병렬 처리)  
-> 동기함수 끝나면 태스크큐에 있던 콜백함수 콜스택으로 push 후 실행

#### `queueMicrotask`  
직접 만든 함수를 현재 코드 실행이 끝난 후,
새로운 이벤트 핸들러가 처리되기 전이면서 렌더링이 실행되기 전에
비동기적으로 실행해야 하는 경우에는 `queueMicrotask`를 사용해 커스텀 함수를 스케줄링할 수 있다.



---
> [event loop - spec](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)
> [실행 컨텍스트와 스택](https://ko.javascript.info/recursion#ref-810)
> [NHN FORWARD 2021-YOUTUBE](https://www.youtube.com/watch?v=HoqMPUkzMSA)
> [자바스크립트는-왜-프로토타입을-선택했을까](https://medium.com/@limsungmook/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%8A%94-%EC%99%9C-%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85%EC%9D%84-%EC%84%A0%ED%83%9D%ED%96%88%EC%9D%84%EA%B9%8C-997f985adb42)  
> [오래된 'var'](https://ko.javascript.info/var)  
> [렉시컬 환경](https://ko.javascript.info/closure#ref-501)  
> [변수-호이스팅](https://poiemaweb.com/js-data-type-variable#24-%EB%B3%80%EC%88%98-%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85variable-hoisting)
> [JS-핸드북](https://github.com/junh0328/prepare_frontend_interview/blob/main/js.md)