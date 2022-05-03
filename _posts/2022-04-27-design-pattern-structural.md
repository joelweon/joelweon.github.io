---
layout:  post
title: Design pattern(structural 구조적인 패턴)
tags:
- design_pattern
---

> 1. [Design pattern(creational 생성 패턴)](/2022/04/27/design-pattern-creational.html)
> 2. **[Design pattern(structural 구조적인 패턴)](/2022/04/27/design-pattern-structural.html)**
> 3. [Design pattern(behavioral 행동 패턴)](/2022/04/27/design-pattern-behavioral.html)


# 구조 패턴(structural patterns)
> [Structural_pattern-WIKI](https://en.wikipedia.org/wiki/Structural_pattern)

소프트웨어 엔지니어링에서 구조 설계 패턴 은 엔터티 간의 관계를 실현하는 간단한 방법을 식별하여 설계를 용이하게 하는 설계 패턴 입니다.


1. [어댑터 패턴](#어댑터adapter-패턴) 클래스에 대한 하나의 인터페이스를 클라이언트가 기대하는 인터페이스로 '적응'
2. [브리지 패턴](#브릿지bridge-패턴) 추상화를 구현에서 분리하여 두 가지가 독립적으로 변할 수 있도록 합니다.
3. [컴포짓 패턴](#컴포짓composite-패턴) 모든 객체가 동일한 인터페이스를 갖는 객체의 트리 구조
4. [데코레이터 패턴](#데코레이터decorator-패턴) 서브클래싱으로 인해 새 클래스가 기하급수적으로 증가하는 런타임 시 개체에 추가 기능 추가
5. [퍼사드 패턴](#퍼사드facade-패턴) 기존 인터페이스의 단순화된 인터페이스를 생성하여 일반적인 작업에 쉽게 사용할 수 있습니다.
6. [플라이웨이트 패턴](#플라이웨이트flyweight-패턴) 많은 양의 객체가 공간을 절약하기 위해 공통 속성 객체를 공유합니다.
7. [프록시 패턴](#프록시proxy-패턴) 다른 것에 대한 인터페이스 역할을 하는 클래스

---
## 어댑터(Adapter) 패턴
![pattern_adapter.png](/assets/img/pattern_adapter.png)
![pattern_adapter_example.png](/assets/img/pattern_adapter_example.png)
기존 코드를 클라이언트가 사용하는 인터페이스의 구현체로 바꿔주는 패턴
- 클라이언트가 사용하는 인터페이스를 따르지 않는 기존 코드를 재사용할 수 있게 해준다

클라이언트는 Target 인터페이스를 사용하고 있고, 새로운 객체들(Adaptee)을 사용하게 하기 위해 Adapter를 중간에 넣는다.

1. Target 인터페이스를 구현한 Adapter 클래스를 생성한다.
2. Adapter에서는 Adptee에 해당하는 클래스를 의존성 주입받고, 그 메서드를 사용한다.
3. 클라이언트, Target, Adaptee는 소스 변경없이 새로운 Adaptee 객체를 사용할 수 있다.
4. 만약 서드 파티 라이브러리가 아니라서 직접 Adaptee를 수정할 수 있다면  Adapter를 별도로 만들지 않고,
직접 Adaptee에 Target 인터페이스를 구현하도록 할 수 있다.  
-> 4번의 장점은 복잡도가 낮아진다는 것이고, 단점은 기존 소스를 수정해야한다는 것과 SRP(단일책임원칙)에 위배된 상태이다.
(뭐가 더 좋다고 말하기는 애매하고, 상황 따라 유연하게 적용할 필요가 있다.)

장점
- 기존 코드(Adaptee)를 변경하지 않고 원하는 인터페이스 구현체를 만들어 재사용할 수 있다.(OCP)
- 기존 코드가 하던 일과 특정 인터페이스 구현체로 변환하는 작업을 각기 다른 클래스로 분리하여 관리할 수 있다.(SRP)

단점
- 새 클래스가 생겨 복잡도가 증가할 수 있다.  
-> 경우에 따라서는 기존 코드가 해당 인터페이스를 구현하도록 수정하는 것이 좋은 선택이 될 수도 있다


---
## 브릿지(Bridge) 패턴
![pattern_bridge.png](/assets/img/pattern_bridge.png)
![pattern_bridge_example.png](/assets/img/pattern_bridge_example.png)
어댑터 패턴이 상이한 두 인터페이스를 연결하는 것이였다면, 브릿지 패턴은 `추상적인 것과 구체적인 것`을 **분리하여 연결**하는 패턴이다.  
(기능계층 vs 구현계층, 추상적 vs 구체적, 동작 vs 상태, front vs back) -> 하나의 계층구조가 아닌 다른 계층으로 분리하고 이를 연결하는 패턴.

Client -> Implementation을 직접 사용하지 않고, Abstraction을 사용함

Abstraction -> 상위 고차원의 추상적인 로직을 담고 있는 클래스

Abstraction 구현체(여러 하위클래스) -> 다양한 확장 가능 객체

Implementation(interface) -> 구체적인 상태, 액션, 플랫폼에 특화된 로직

Concrete Implementation -> Implementation을 구현

기존 로직은 하나의 계층구조로 다양한 특징들을 표현하려다 보니
계층 구조가 커지고 각자의 child 클래스들이 중복해서 만들어졌다.   

AS-IS) 기존 총 4개 클래스 생성 -> 동물이나 옷이 추가될때 유연하지 못함.
- 정장입은 강아지
- 정장입은 고양이
- 한복입은 강아지
- 한복입은 고양이

TO-BE) SRP, OCP 원칙 적용됨
- Abstraction: 동물 특징을 담고 있음
- Implementation: 옷의 특징을 담고 있음
- 옷입은 동물(동물이 옷 interface를 사용함)

-> 동물이라는 Abstraction을 생섷하고, 실제 동물들은 Refined Abstraction에 정의  
-> 옷이라는 Implementation interface를 생성하고 실제 옷은 Concrete Implementation에 구현

만약 토끼가 추가될 때 기존에는 정장토끼 한복토끼를 생성하고 토끼에 대한 세부 로직을 중복해서 구현해야 했지만,
지금은 토끼 클래스 하나만 생성하면 된다.  
옷은 클라이언트쪽에서 선택하거나 주입받아 사용하면 된다.  
실제 클라이언트는 동물이라는 추상 클래스만 사용한다.

-> 다른 계층 구조를 건드리지 않고 확장 가능

장점
- 추상적인 코드를 구체적인 코드 변경 없이도 독립적으로 확장할 수 있다.
- 추상적인 코드와 구체적인 코드를 분리하여 수 있다.

단점
- 계층 구조가 늘어나 복잡도가 증가할 수 있다.
- 분리하는 작업이 추가로 생긴다.


---
## 컴포짓(Composite) 패턴
![pattern_composite.png](/assets/img/pattern_composite.png)
![pattern_composite_example.png](/assets/img/pattern_composite_example.png)
그룹 전체와 개별 객체를 동일하게 처리할 수 있는 패턴.
- 클라이언트 입장에서는 ‘전체’나 ‘부분’이나 모두 동일한 컴포넌트로 인식할 수 있게 하는 것. (Part-Whole Hierarchy)
- 클라이언트는 동일한 인터페이스를 사용하고, 어떤 객체인지는 상관 없다.
- 트리구조로 구성해야 하는 경우만 해당된다.

- Leaf: primitive한 단위(가장 기본 단위)
- Composite: primitive한 타입을 그룹화한 컴포짓 객체(여러개의 컴포넌트를 배열, 리스트로 갖고 있음)  
-> 단, Composite 타입이 아니라 Component 타입이다.

장점
- 복잡한 트리 구조를 편리하게 사용할 수 있다.(어느 노드이던 상관없이 Component만 사용하면 된다.)
- 다형성과 재귀를 활용할 수 있다.
- 클라이언트 코드를 변경하지 않고 새로운 엘리먼트 타입을 추가할 수 있다.(leaf, composite이 추가되도 영향X) => OCP

단점
- 트리를 만들어야 하기 때문에 (공통된 인터페이스를 정의해야 하기 때문에) 지나치게 일반화 해야 하는 경우도 생길 수 있다
- 지나치게 일반화하면 로직상 타입을 체크해야만 하는 경우가 생길 수 있다.(지나친 패턴 적용 현상)


---
## 데코레이터(Decorator) 패턴
![pattern_decorator.png](/assets/img/pattern_decorator.png)
![pattern_decorator_example.png](/assets/img/pattern_decorator_example.png)
기존 코드를 변경하지 않고 부가 기능을 추가하는 구조적인 패턴
- 상속이 아닌 위임을 사용해서 런타임에 동적으로 부가 기능을 추가하는 것도 가능하다(static, compile 때가 아닌)
- 컴포짓 패턴과 유사하게 Component의 역할을 하는 인터페이스가 있고, ConcreteComponent, Decorator 둘 다 같은 기능의 operation을 구현하고 있다.
- 컴포짓과의 차이점은 여러개의 데코레이터를 갖는 컴포짓과 달리 데코레이터 패턴은 하나만 갖는다.
- 데코레이터는 딱 하나의 Component 타입으로 ConcreteDecorator를 감싼다.(wrapper) 

1. 공통된 operation을 갖는 Component 인터페이스를 정의한다.
2. Component 인터페이스를 구현하여 ConcreteComponent 에서 구체적인 일을 한다.
3. 세부 작업들을 추상화시킨 Decorator를 정의한다.
4. 만든 Decorator 안에서 Component를 참조하고, operation을 정의한다.
5. ConcreteDecorator는 Decorator를 상속하여 구체적인 로직을 처리한다.
   (Compoenet 타입으로  감싼다.)
```java
// 상속으로 해결하는 것이 아닌 데코레이터가 데코레리터를 감싸며 해결
CommentService commentService = new DefaultCommentService();
if (enabledSpamFilter) {
  commentService = new SpamFilteringCommentDecorator(commentService);
}
if (enabledTrimming) {
  commentService = new TrimmingCommentDecorator(commentService);
}
```

장점
- 새로운 클래스를 만들지 않고 기존 기능을 **조합**할 수 있다. (OCP & SRP)
- 컴파일 타임이 아닌 **런타임에 동적**으로 기능을 변경할 수 있다. (구체적인 클래스가 아닌 인터페이스를 사용하여 역전시키는 DIP)

단점
- 데코레이터를 조합하는 코드가 복잡할 수 있다.


---
## 퍼사드(Facade) 패턴
![pattern_facade.png](/assets/img/pattern_facade.png)
![pattern_facade_example.png](/assets/img/pattern_facade_example.png)
복잡한 서브 시스템 의존성을 최소화하는 방법.(loosely coupled)
- 클라이언트가 사용해야 하는 복잡한 서브 시스템 의존성을 간단한 인터페이스로 추상화 할 수 있다.
  (클라이언트는 라이브러리, 프레임워크를 알지 못하는 상태로 중간에 있는 Facade의 특정한 operation만 사용하도록 한다.)

장점
- 서브 시스템에 대한 의존성을 한 곳으로 모을 수 있다.
- client가 여럿일 경우 퍼사드를 재사용할 수 있다.
- Mockup을 하기가 더 쉽다.
- 퍼사드도 상위 인터페이스와 하위 default 클래스로 분리하여 더 유연하게 구현 가능하다.

단점
- 퍼사드 클래스가 서브 시스템에 대한 모든 의존성을 가지게 된다(의존성을 피할 순 없다.)


---
## 플라이웨이트(Flyweight) 패턴
![pattern_flyweight.png](/assets/img/pattern_flyweight.png)
![pattern_flyweight_example.png](/assets/img/pattern_flyweight_example.png)
객체를 가볍게 만들어 메모리 사용을 줄이는 패턴.
- 자주 변하는 속성(또는 외적인 속성, extrinsit)과 변하지 않는 속성(또는 내적인 속성, intrinsit)을 분리하고
재사용하여 메모리 사용을 줄일 수 있다.


---
## 프록시(Proxy) 패턴
![pattern_proxy.png](/assets/img/pattern_proxy.png)
![pattern_proxy_example.png](/assets/img/pattern_proxy_example.png)
특정 객체에 대한 접근을 제어하거나 기능을 추가할 수 있는 패턴.
- 초기화 지연, 접근 제어, 로깅, 캐싱 등 다양하게 응용해 사용 할 수 있다.





