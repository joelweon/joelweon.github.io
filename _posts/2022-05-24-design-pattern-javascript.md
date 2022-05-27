---
layout:  post
title: Design pattern(structural 구조적인 패턴) with JavaScript(작성중)
tags:
- design_pattern
- javascript
---

1. [Constructor Pattern]
2. [Module Pattern]
3. [Revealing Module Pattern]
4. [Singleton Pattern]
5. [Observer Pattern]
6. [Mediator Pattern]
7. [Prototype Pattern]
8. [Command Pattern]
9. [Facade Pattern]
10. [Factory Pattern] 
11. [Mixin Pattern] 
12. [Decorator Pattern]
13. [Flyweight Pattern]

---
## 생성자(Constructor) 패턴
ES6부터 생성자로 클래스를 생성하는 구문이 도입되었다.
- constructor를 사용하면 다른 모든 메서드 호출보다 앞선 시점인, 인스턴스 객체를 초기화할 때 수행할 초기화 코드를 정의할 수 있다.
- 사실 JavaScript에서 거의 모든 것이 객체이고, 클래스는 상속에 대한 JavaScript의 프로토타입 접근 방식을 위한 구문 설탕이다.

```javascript
class Polygon {
  constructor() {
    this.name = 'Polygon';
  }
}

const poly1 = new Polygon();

console.log(poly1.name);
```
> [constructor-MDN(ko)](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes/constructor)

개체 만드는 법
```javascript
const newObject1 = {};
const newObject2 = Object.create(Object.prototype);
const newObject3 = new Object();
```
