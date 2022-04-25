---
layout:  post
title: Design pattern
tags:
- design_pattern
---

## 싱글톤 패턴(Singleton)
인스턴스를 하나만 생성해야할 경우 사용하는 패턴

시스템 런타임, 환경 세팅에 대한 정보 등, 인스턴스가 여러개 일 때 문제가 생길 수 있는 경우가 있다.  
인스턴스를 오직 한개만 만들어 제공하는 클래스가 필요하다

### 1. private 생성자에 static 메소드
-> 멀티쓰레드 환경에서 안전하지 않은 단점 존재

```java
public class SingletonBasic {
  SingletonBasic instance;

  private SingletonBasic() {}

  public static SingletonBasic getInstance() {
    if (instance == null) {
      instance = new SingletonBasic();
    }
    return instance;
  }
}
```

### 2. 동기화(synchronized)를 사용해 멀티쓰레드 환경에 안전하게 만드는 방법
-> 장점: 하나의 쓰레드만 허용하므로 1번의 문제는 해결 되었으나  
-> 단점: 메서드 호출 시마다 동기화 락이 걸려 약간의 부하가 생기는 것이 단점

```java
public class SingletonSync {
  private static SingletonSync instance;

  private SingletonSync() {}

  public static synchronized SingletonSync getInstance() {
    if (instance == null) {
      instance = new SingletonSync();
    }
    return instance;
  }
}
```

### 3. 이른 초기화 (eager initialization)을 사용하는 방법
-> 장점: SingletonEager class가 로딩되는 시점에 인스턴스가 만들어지기 때문에 thread safe 함.  
-> 단점: 이 인스턴스를 만드는데 메모리도 많이 사용하고 오래 걸리는 작업인데 쓰지 않는다면 불필요한 작업이 됨.

```java
public class SingletonEager {
  private static final SingletonEager INSTANCE = new SingletonEager();
  private SingletonEager() {}
  
  public static SingletonEager getInstance() {
    return INSTANCE;
  }
}
```

### 4. double checked locking으로 효율적인 동기화 블럭 만들기
-> 장점
- Thread safe
- synchronize가 다 걸리지 않아 성능 유리, 필요한 시점에 생성(lazy)

-> 단점
- jdk 1.5 버전부터 가능
- 복잡한 volatile 개념이 들어감.

```java
public class SingletonDoubleCheck {
  private static volatile SingletonDoubleCheck instance;
  private SingletonDoubleCheck() {}
  
  public static SingletonDoubleCheck getInstance() {
    if (instance == null) {
      synchronized (SingletonDoubleCheck.class) { // class를 lock으로 쓰기
        if (instance == null) {
          instance = new SingletonDoubleCheck();
        }
      }
    }
  return instance;
  }
}
```

### 5. static inner 클래스를 사용하는 방법
-> 장점
- Thread safe함.
- getInstance가 호출 될떄 SingletonInnerHolder 클래스가 로딩되고 그때 인스턴스를 만듦

-> 단점: 리플렉션(SingletonInner.class.getDeclaredConstructor())이나 직렬화 과정이 추가 된다면 싱글톤을 강제할 수 없다.

```java
public class SingletonInner {
  private SingletonInner() {}
  
  private static class SingletonInnerHolder {
    private static final SingletonInner INSTANCE = new SingletonInner();
  }
  
  public static SingletonInner getInstance() {
    return SingletonInnerHolder.INSTANCE;
  }
}
```

### 6. enum을 사용하는 방법
-> 장점  
- Thread safe함
- 리플랙션에도 안전함
- 기본적으로 Serialize를 구현하고 있음

-> 단점
- 미리 만들어짐(eager)
- 클래스이기 때문에 단일 상속 한계가 있다.

```java
public enum SingletonEnum {
  INSTANCE;
}
```

---
## 팩토리 메서드 패턴(Factory method)
어떤 객체(인스턴스)를 생성하는 것을 구체적인 클래스(concrete class)가 아닌 추상적인 인터페이스의 메서드로 감싸는 것

1. factory 역할을 할 인터페이스 생성(Creator)
2. 인터페이스에 바뀌지 않을 구현부는 작성하고, 바뀌는 부분은 추상메서드로 생성
- default 메서드(java8), private 메서드(java9)로 구성 가능
3. 구체적인 클래스(하위 클래스)에서 구체적인 메서드 구현
4. factory에서 만든 오브젝트의 타입인 Product를 다양하게 만들 수 있다.
5. concreteCreator 와 마찬가지로 ConcreteProduct도 여러개를 갖을 수 있다.

![factory_method.png](/assets/img/factory_method.png)
[Creator - ShipFactory]----> [Product - Ship]
[ConcreteCreator -WhiteshipFactory]


장점
- OCP 원칙을 지켜낸 방식이다.(기존 로직을 수정하지 않고 새로운 객체를 만들 수 있다.)
- 새로운 인스턴스를 다른 방법으로 확장 구현이 가능하다.
- Creator - Product 간에 결합도를 낮아져 유연해졌다.

단점
- 클래스가 늘어나고, 복잡도가 증가함

---
## 추상 팩토리(Abstract factory)
팩토리를 추상화된 형태로 제공하는 것(인터페이스 or 추상클래스)  
구체적인 팩토리에서 구체적인 인스턴스를 만드는 과정은 팩토리 메서드 패턴과 유사함.  
그러나 초점이 팩토리를 사용하는 클라이언트에 맞춰져 있으면 추상 팩토리 메서드 패턴이다.

바꾸는 것 없이 제품군을 늘려가는 방법

![abstract_factory.png](/assets/img/abstract_factory.png)





















