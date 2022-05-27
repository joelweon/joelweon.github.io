---
layout:  post
title: Design pattern(behavioral 행동 패턴) with Java
tags:
- design_pattern
- java
---

> 1. [Design pattern(creational 생성 패턴)](/2022/04/27/design-pattern-creational.html)
> 2. [Design pattern(structural 구조적인 패턴)](/2022/04/27/design-pattern-structural.html)
> 3. **[Design pattern(behavioral 행동 패턴)](/2022/04/27/design-pattern-behavioral.html)**


# 행동 패턴(Behavioral pattern)
> [Behavioral_pattern-WIKI](https://en.wikipedia.org/wiki/Behavioral_pattern)

소프트웨어 엔지니어링에서 행동 디자인 패턴은 객체 간의 일반적인 통신 패턴을 식별하는 디자인 패턴 입니다.
그렇게 함으로써, 이러한 패턴은 의사소통을 수행할 때 유연성을 증가시킵니다.  
주로 책임을 분산하고 의존성 decoupling 하여 구조 개선


1. [책임 연쇄 패턴](#책임-연쇄-패턴chain-of-responsibility-패턴) 명령 개체는 논리를 포함하는 처리 개체에 의해 처리되거나 다른 개체에 전달됩니다.
2. [커맨드 패턴](#커맨드command-패턴) 명령 개체는 작업 및 해당 매개변수를 캡슐화합니다.
3. [인터프리터 패턴](#인터프리터interpreter-패턴) 특정 문제 집합을 신속하게 해결하기 위해 특수 컴퓨터 언어를 구현합니다.
4. [이터레이터 패턴](#이터레이터iterator-패턴) 반복자는 기본 표현을 노출하지 않고 집계 개체의 요소에 순차적으로 액세스하는 데 사용됩니다.
5. [중재자 패턴](#중재자mediator-패턴) 하위 시스템의 인터페이스 집합에 대한 통합 인터페이스를 제공합니다.
6. [메멘토 패턴](#메멘토memento-패턴) 객체를 이전 상태로 복원(롤백)하는 기능 제공
7. [옵저버 패턴](#옵저버observer-패턴) 발행/구독 또는 이벤트 리스너라고도 합니다. 객체는 다른 객체에 의해 발생할 수 있는 이벤트를 관찰하기 위해 등록됩니다.
8. [상태 패턴](#상태state-패턴) 런타임에 개체가 부분적으로 유형을 변경하는 깔끔한 방법
9. [전략 패턴](#전략strategy-패턴) 합성을 사용하여 알고리즘을 즉석에서 선택할 수 있습니다.
10. [템플릿 메소드 패턴](#템플릿-메소드template-method-패턴) 프로그램 의 골격 을 설명합니다. 알고리즘은 상속을 사용하여 즉석에서 선택할 수 있습니다.
11. [템플릿 콜백 패턴](#템플릿-콜백template-callback-패턴) 콜백으로 상속 대신 위임을 사용하는 템플릿 패턴.
12. [방문자 패턴](#방문자visitor-패턴) 객체와 알고리즘을 분리하는 방법

---
## 책임 연쇄 패턴(Chain of Responsibility) 패턴
![pattern_chain_of_responsibility.png](/assets/img/pattern_chain_of_responsibility.png)
![pattern_chain_of_responsibility_example.png](/assets/img/pattern_chain_of_responsibility_example.png)
요청을 보내는 쪽(sender)과 요청을 처리하는 쪽(receiver)의 분리하는 패턴
- 핸들러 체인을 사용해서 요청을 처리한다.
- 클라이언트가 구체적인 핸들러를 선택해서 사용하지 않고, 모른 상태로 추상 클래스 핸들러만 사용한다. 

장점
- 클라이언트 코드를 변경하지 않고 새로운 핸들러를 체인에 추가할 수 있다.
- 각각의 체인은 자신이 해야하는 일만 한다.
- 체인을 다양한 방법으로 구성할 수 있다. (전, 후처리 등)

단점
- 디버깅이 조금 어렵다.(흐름이 많아 번거로움)

자바
- 서블릿 필터

스프링
- 스프링 시큐리티 필터
![servlet_security_filter.png](/assets/img/servlet_security_filter.png)

---
## 커맨드(Command) 패턴
![pattern_command.png](/assets/img/pattern_command.png)
![pattern_command_example.png](/assets/img/pattern_command_example.png)
요청을 캡슐화 하여 호출자(invoker)와 수신자(receiver)를 분리하는 패턴.
- 요청을 처리하는 방법이 바뀌더라도, 호출자의 코드는 변경되지 않는다.
(커맨드는 리시버를 구체적으로 알고 있어야하는 클래스라 커맨드 클래스는 바뀌어야 한다.)

장점
- 기존 코드를 변경하지 않고 새로운 커맨드를 만들 수 있다. (OCP)
- 수신자의 코드가 변경되어도 호출자의 코드는 변경되지 않는다.
- 커맨드 객체를 로깅, DB에 저장, 네트워크로 전송 하는 등 다양한 방법으로 활용할 수도 있다.

단점
- 코드가 복잡하고 클래스가 많아진다

---
## 인터프리터(Interpreter) 패턴
![pattern_interpreter.png](/assets/img/pattern_interpreter.png)
![pattern_interpreter_example.png](/assets/img/pattern_interpreter_example.png)
자주 등장하는 문제를 간단한 언어로 정의하고 재사용하는 패턴.
- 반복되는 문제 패턴을 언어 또는 문법으로 정의하고 확장할 수 있다
- Expression 트리 구조는 컴포짓 패턴과 유사

- Context: 모든 Expression에서 사용하는 공통된 정보가 있는 곳(global한 값)
- Expression: Context를 참조하여 실제 표현하는 문법을 나타내는 것
- TerminalExpression: 그 자체로 종료되는 expression
- NonTerminalExpression: 다른 expression들을 참조하는 expression(재규적으로)

장점
- 자주 등장하는 문제 패턴을 언어와 문법으로 정의할 수 있다.
- 기존 코드를 변경하지 않고 새로운 Expression을 추가할 수 있다.

단점
- 복잡한 문법을 표현하려면 Expression과 Parser가 복잡해진다

=> 구현에 드는 비용, 패턴을 적용할 만큼 자주 쓸 정도의 문제인가 고민해 봐야 함(ROI-Return On Investment)


---
## 이터레이터(Iterator) 패턴
![pattern_iterator.png](/assets/img/pattern_iterator.png)
![pattern_iterator_example.png](/assets/img/pattern_iterator_example.png)
집합 객체 내부 구조를 노출시키지 않고 순회 하는 방법을 제공하는 패턴.
- 집합 객체를 순회하는 클라이언트 코드를 변경하지 않고 다양한 순회 방법을 제공할 수 있다.

장점
- 집합 객체가 가지고 있는 객체들에 손쉽게 접근할 수 있다.
  - Client는 집합 객체가 제공하는 Iterator만 알면 되고, 집합 객체 내부(ConcreteAggregate)는 몰라도 된다.
- 일관된 인터페이스를 사용해 여러 형태의 집합 구조를 순회할 수 있다.
- 집합 객체가 변경되어도 Client에서는 숨겨져 있기 때문에 유연하다.

단점
- 클래스가 늘어나고 복잡도가 증가한다


---
## 중재자(Mediator) 패턴
![pattern_mediator.png](/assets/img/pattern_mediator.png)
![pattern_mediator_example.png](/assets/img/pattern_mediator_example.png)
여러 객체들이 소통하는 방법을 캡슐화하는 패턴.
- 여러 컴포넌트간의 결합도를 중재자를 통해 낮출 수 있다

장점
- 컴포넌트 코드를 변경하지 않고 새로운 중재자를 만들어 사용할 수 있다.
- 각각의 컴포넌트 코드를 보다 간결하게 유지할 수 있다.

단점
- 중재자 역할을 하는 클래스의 복잡도와 결합도가 증가한다
---
## 메멘토(Memento) 패턴
![pattern_memento.png](/assets/img/pattern_memento.png)
![pattern_memento_example.png](/assets/img/pattern_memento_example.png)
캡슐화를 유지하면서 객체 내부 상태를 외부에 저장하는 방법.
- 객체 상태를 외부에 저장했다가 해당 상태로 다시 복구할 수 있다

장점
- 캡슐화를 지키면서 상태 객체 상태 스냅샷을 만들 수 있다.
- 객체 상태 저장하고 또는 복원하는 역할을 CareTaker에게 위임할 수 있다.
- 객체 상태가 바뀌어도 클라이언트 코드는 변경되지 않는다.

단점
- 많은 정보를 저장하는 Memento를 자주 생성하는 경우 메모리 사용량에 많은 영향을 줄 수 있다

---
## 옵저버(Observer) 패턴
![pattern_observer.png](/assets/img/pattern_observer.png)
![pattern_observer_example.png](/assets/img/pattern_observer_example.png)
다수의 객체가 특정 객체 상태 변화를 감지하고 알림을 받는 패턴.
- 발행(publish)-구독(subscribe) 패턴을 구현할 수 있다

장점
- 상태를 변경하는 객체(publisher)와 변경을 감지하는 객체(subscriber)의 관계를 느슨하게 유지할 수 있다.
- Subject의 상태 변경을 주기적으로 조회하지 않고 자동으로 감지할 수 있다.
- 런타임에 옵저버를 추가하거나 제거할 수 있다.

단점
- 복잡도가 증가한다.
- 다수의 Observer 객체를 등록 후 해지 하지 않으면 memory leak이 발생할 수도 있다

---
## 상태(State) 패턴
![pattern_state.png](/assets/img/pattern_state.png)
![pattern_state_example.png](/assets/img/pattern_state_example.png)
객체 내부 상태 변경에 따라 객체의 행동이 달라지는 패턴.
- 상태에 특화된 행동들을 분리해 낼 수 있으며, 새로운 행동을 추가하더라도 다른 행동에 영향을 주지 않는다
- if 문이나 switch 문에 상태에 따라 구분 했던 로직을 분리한다. 

장점
- 상태에 따른 동작을 개별 클래스로 옮겨서 관리할 수 있다.
- 기존의 특정 상태에 따른 동작을 변경하지 않고 새로운 상태에 다른 동작을 추가할 수 있다.
- 코드 복잡도를 줄일 수 있다.

단점
- 복잡도가 증가한다


---
## 전략(Strategy) 패턴
![pattern_strategy.png](/assets/img/pattern_strategy.png)
![pattern_strategy_example.png](/assets/img/pattern_strategy_example.png)
여러 알고리즘을 캡슐화하고 상호 교환 가능하게 만드는 패턴.
- 컨텍스트에서 사용할 알고리즘을 클라이언트 선택한다.

장점
- 새로운 전략을 추가하더라도 기존 코드를 변경하지 않는다.
- 상속 대신 위임을 사용할 수 있다.
- 런타임에 전략을 변경할 수 있다.
 
단점
- 복잡도가 증가한다.
- 클라이언트 코드가 구체적인 전략을 알아야 한다


---
## 템플릿 메소드(Template method) 패턴
![pattern_template_method.png](/assets/img/pattern_template_method.png)
![pattern_template_method_example.png](/assets/img/pattern_template_method_example.png)
알고리즘 구조를 서브 클래스가 확장할 수 있도록 템플릿으로 제공하는 방법.
- 추상 클래스는 템플릿을 제공하고 하위 클래스는 구체적인 알고리즘을 제공한다

장점
- 템플릿 코드를 재사용하고 중복 코드를 줄일 수 있다.
- 템플릿 코드를 변경하지 않고 상속을 받아서 구체적인 알고리듬만 변경할 수 있다.
 
단점
- 리스코프 치환 원칙을 위반할 수도 있다.
  - 템플릿 메소드에 final 키워드를 붙이면 LISKOV 위반을 일부 막을 수 있다.
- 알고리듬 구조가 복잡할 수록 템플릿을 유지하기 어려워진다


---
## 템플릿 콜백(Template Callback) 패턴
![pattern_template_callback.png](/assets/img/pattern_template_callback.png)
콜백으로 상속 대신 위임을 사용하는 템플릿 패턴.
- 상속 대신 익명 내부 클래스 또는 람다 표현식을 활용할 수 있다 (간결, 상속보다는 위임)
- 전략 패턴처럼 하나의 메서드를 interface로 빼서 바꿔 끼도록 하는 것.
- 그러나 전략패턴은 여러 메서드를 갖을 수 있지만 템플릿 콜백은 하나의 메서드만 정의한다.
- GoF에는 없는 패턴

---
## 방문자(Visitor) 패턴
![pattern_visitor.png](/assets/img/pattern_visitor.png)
기존 코드를 변경하지 않고 새로운 기능을 추가하는 방법.
- 더블 디스패치 (Double Dispatch)를 활용할 수 있다

장점
- 기존 코드를 변경하지 않고 새로운 코드를 추가할 수 있다.
- 추가 기능을 한 곳에 모아둘 수 있다.
 
단점
- 복잡하다.
- 새로운 Element를 추가하거나 제거할 때 모든 Visitor 코드를 변경해야 한다


> 참고: [코딩으로 학습하는 GoF의 디자인 패턴](https://www.inflearn.com/course/%EB%94%94%EC%9E%90%EC%9D%B8-%ED%8C%A8%ED%84%B4#curriculum)
