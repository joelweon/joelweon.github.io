---
layout:  post
title: Design pattern(behavioral 행동 패턴)
tags:
- design_pattern
---

> 1. [Design pattern(creational 생성 패턴)](/2022/04/27/design-pattern-creational.html)
> 2. [Design pattern(structural 구조적인 패턴)](/2022/04/27/design-pattern-structural.html)
> 3. **[Design pattern(behavioral 행동 패턴)](/2022/04/27/design-pattern-behavioral.html)**


# 행동 패턴(Behavioral pattern)
> [Behavioral_pattern-WIKI](https://en.wikipedia.org/wiki/Behavioral_pattern)

소프트웨어 엔지니어링에서 행동 디자인 패턴은 객체 간의 일반적인 통신 패턴을 식별하는 디자인 패턴 입니다.
그렇게 함으로써, 이러한 패턴은 의사소통을 수행할 때 유연성을 증가시킵니다.


1. [책임 연쇄 패턴](#책임-연쇄-패턴chain-of-responsibility-패턴) 명령 개체는 논리를 포함하는 처리 개체에 의해 처리되거나 다른 개체에 전달됩니다.
2. [커맨드 패턴](#커맨드command-패턴) 명령 개체는 작업 및 해당 매개변수를 캡슐화합니다.
3. [인터프리터 패턴](#인터프리터interpreter-패턴) 특정 문제 집합을 신속하게 해결하기 위해 특수 컴퓨터 언어를 구현합니다.
4. [이터레이터 패턴](#이터레이터interator-패턴) 반복자는 기본 표현을 노출하지 않고 집계 개체의 요소에 순차적으로 액세스하는 데 사용됩니다.
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


---
## 커맨드(Command) 패턴
![pattern_command.png](/assets/img/pattern_command.png)
![pattern_command_example.png](/assets/img/pattern_command_example.png)
요청을 캡슐화 하여 호출자(invoker)와 수신자(receiver)를 분리하는 패턴.
- 요청을 처리하는 방법이 바뀌더라도, 호출자의 코드는 변경되지 않는다.

---
## 인터프리터(Interpreter) 패턴
![pattern_interpreter.png](/assets/img/pattern_interpreter.png)
![pattern_interpreter_example.png](/assets/img/pattern_interpreter_example.png)
자주 등장하는 문제를 간단한 언어로 정의하고 재사용하는 패턴.
- 반복되는 문제 패턴을 언어 또는 문법으로 정의하고 확장할 수 있다

---
## 이터레이터(Interator) 패턴
![pattern_iterator.png](/assets/img/pattern_iterator.png)
![pattern_iterator_example.png](/assets/img/pattern_iterator_example.png)
집합 객체 내부 구조를 노출시키지 않고 순회 하는 방법을 제공하는 패턴.
- 집합 객체를 순회하는 클라이언트 코드를 변경하지 않고 다양한 순회 방법을 제공할 수 있다.

---
## 중재자(Mediator) 패턴
![pattern_mediator.png](/assets/img/pattern_mediator.png)
![pattern_mediator_example.png](/assets/img/pattern_mediator_example.png)
여러 객체들이 소통하는 방법을 캡슐화하는 패턴.
- 여러 컴포넌트간의 결합도를 중재자를 통해 낮출 수 있다

---
## 메멘토(Memento) 패턴
![pattern_memento.png](/assets/img/pattern_memento.png)
![pattern_memento_example.png](/assets/img/pattern_memento_example.png)
캡슐화를 유지하면서 객체 내부 상태를 외부에 저장하는 방법.
- 객체 상태를 외부에 저장했다가 해당 상태로 다시 복구할 수 있다

---
## 옵저버(Observer) 패턴
![pattern_observer.png](/assets/img/pattern_observer.png)
![pattern_observer_example.png](/assets/img/pattern_observer_example.png)
다수의 객체가 특정 객체 상태 변화를 감지하고 알림을 받는 패턴.
- 발행(publish)-구독(subscribe) 패턴을 구현할 수 있다

---
## 상태(State) 패턴
![pattern_state.png](/assets/img/pattern_state.png)
![pattern_state_example.png](/assets/img/pattern_state_example.png)
객체 내부 상태 변경에 따라 객체의 행동이 달라지는 패턴.
- 상태에 특화된 행동들을 분리해 낼 수 있으며, 새로운 행동을 추가하더라도 다른 행동에 영
향을 주지 않는다

---
## 전략(Strategy) 패턴
![pattern_strategy.png](/assets/img/pattern_strategy.png)
![pattern_strategy_example.png](/assets/img/pattern_strategy_example.png)
여러 알고리즘을 캡슐화하고 상호 교환 가능하게 만드는 패턴.
- 컨텍스트에서 사용할 알고리즘을 클라이언트 선택한다.

---
## 템플릿 메소드(Template method) 패턴
![pattern_template_method.png](/assets/img/pattern_template_method.png)
![pattern_template_method_example.png](/assets/img/pattern_template_method_example.png)
알고리즘 구조를 서브 클래스가 확장할 수 있도록 템플릿으로 제공하는 방법.
- 추상 클래스는 템플릿을 제공하고 하위 클래스는 구체적인 알고리즘을 제공한다

---
## 템플릿 콜백(Template Callback) 패턴
![pattern_template_callback.png](/assets/img/pattern_template_callback.png)
콜백으로 상속 대신 위임을 사용하는 템플릿 패턴.
- 상속 대신 익명 내부 클래스 또는 람다 표현식을 활용할 수 있다

---
## 방문자(Visitor) 패턴
![pattern_visitor.png](/assets/img/pattern_visitor.png)
기존 코드를 변경하지 않고 새로운 기능을 추가하는 방법.
- 더블 디스패치 (Double Dispatch)를 활용할 수 있다
