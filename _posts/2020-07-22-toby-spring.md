---
layout:  post
title: toby spring
tags:
- toby
- spring
- java
---

- 캡슐화
    - 객체의 데이터 부분 + 함수 부분을 하나로 모아서 캡슐화 한다는 개념.
    - 여러 약들을 모아 하나의 캡슐 알약으로 만드는 이치
    - 중요한건 데이터 + 함수가 서로 연관이 있어야 한다는 것이다.
    - 분석 단계에서 간단히 생각하는 추상화의 수단으로도 이용한다.
    - 객체의 속성, 함수 등의 세부 사항을 차후에 생각하고 객체라는 덩어리 단위로 개괄적으로 생각.
    - 이렇게 캡슐화된 정보는 필요에 따라 정보 은닉할 수도 있다. 

## 원칙과 패턴

- 개방 폐쇄 원칙(OCP: Open-Closed Principle)
    - 클래스나 모듈은 확장에는 열려 있어야 하고 변경에는 닫혀 있어야 한다.
    
- SOLID(객체지향 설계 원칙)
    - SRP(The Single Responsibility Principle): 단일 책임 원칙
    - OCP(The Open Closed Principle): 개방 폐쇄 원칙
    - LSP(The Liskov Substitution Principle) : 리스코프 치환 원칙
    - ISP(The Interface Segregation Principle): 인터페이스 분리 원칙
    - DIP(The Dependency Inversion Principle): 의존관계 역전 원칙

- 높은 응집도와 낮은 결합도(Higt conherence and Low coupling)
    - 높은 응집도: 변경이 일어날 때 모듈의 많은 부분이 함께 바뀌는 경우.  
    -> 어떤 부분이 바뀌어야 하는지 파악 + 변경으로 인한 사이드 이펙트 고려
    - 낮은 결합도: 하나의 오브젝트 변경이 일어날 때 관계를 맺고 있는 다른 오브젝트에게 요구하는 변화의 정도.
    -> 꼭 필요한 최소한의 방법만 간접적인 형태로 제공하는 느슨한 관계. 변화에 대응하는 속도가 높아지고 확장하기 편해진다.

- 전략 패턴
    - 필요한 알고리즘 인터페이스를 통해 통째로 외부로 분리시키고, 이를 구현한 구체적인 알고리즘 클래스를 필요에 따라 바꿔서 사용할 수 있게 하는 디자인 패턴.  
    -> 알고리즘: 여기서의 알고리즘은 독립적인 책임으로 분리가 가능한 기능.
    
- 팩토리 클래스
    - 이 클래스의 역할은 객체의 생성 방법을 결정하고 그렇게 만들어진 오브젝트를 돌려주는 것.(팩토리 메서드 패턴X)
- 팩토리 메소드 패턴
    - 서브클래스에서 오브젝트 생성 방법과 클래스를 결정할 수 있도록 미리 정의해둔 메소드.
    - 직접 만들지 않고 팩토리 클래스를 만들고 메소드를 호출하는 이유는 결합도를 낮취기 위해서다. 클래스에 변경이 생겼을 때 다른 클래스 영향을 덜 주기위함.

## 제어의 역전(IoC)

- 제어의 역전: 제어의 흐름이 뒤바뀐 것.
- 일반적인 흐름: main 시작 -> 사용할 오브젝트 결정 -> 오브젝트 생성 -> 오브젝트 메서드 호출 -> 다음 호출 ...
- 제어의 역전: 자신이 사용할 오브젝트 선택X, 생성X -> 다른 대상에게 제어 권한 위임하기 때문에 어떻게 만들어지는지 모른다.
    - 서블릿: 제어 권한을 컨테이너가 갖고 적절한 시점에 서블릿 클래스의 오브젝트를 만들고 그 안의 메소드를 호출한다. 개발자가 직접제어X
    
- `템플릿 메소드 패턴`: 제어권을 상위 템플릿 메소드에 넘기고 자신은 필요할 때 호출되어 사용되도록 한다는, 제어의 역전 개념
    - 변하지 않는 기능은 슈퍼클래스에 만들고 자주 변경되며 확장할 기능은 서브클래스에 만들도록 하는 기법.
    - 슈퍼클래스에 미리 추상 메소드 또는 오버라이드 가능한 메소드를 정의해두고 이를 활용해 텔플릿 메소드를 만든다.
    - ```java
      protected void hookMethod() {} // 선택적으로 오버라이드 가능한 훅 메소드
      public abstract void abstractMethod(); // 서브클래스에서 반드시 구현해야 하는 추상 메소드
      ```
    - 즉, 공통적인 부분은 부모 클래스에서 구현하고 나머지 필요한 부분은 자식 클래스에서 구현하도록 하는 것.
- `라이브러리`: 애플리케이션 흐름을 직접 제어한다. 필요한 기능이 있을 때 능동적으로 라이브러리를 사용한다.
- `프레임워크`: 반대로 애플리케이션 코드가 프레임워크에 의해 사용된다. 프레임워크가 흐름을 주도하는 중에 개발자가 만든 코드를 사용하도록 만드는 방식이다.


## 빈(bean)
- 스프링이 제어권을 가지고 직접 만들고 관계를 부여하는 오브젝트 = 스프링이 IoC방식으로 관리하는 오브젝트
- 오브젝트 단위의 매플리케이션 컴포넌트
- 스프링 빈은 스프링 컨테이너가 생성과 관계설정, 사용 등을 제어해주는 제어의 역전이 적용된 오브젝트이다.

## 빈 팩토리(bean factory)
- 빈을 생성하고 관계를 설정 하는 등의 제어를 담당하는 IoC 오브젝트

## 애플리케이션 컨텍스트(application context)
- IoC 방식을 따라 만든 일종의 빈 팩토리라고 생각하면 된다.
- 애플리케이션 전반에 걸쳐 모든 구성요소의 제어 작업을 담당하는 IoC 엔진
- 빈 팩토리와 애플리케이션은 거의 동일하다고 봐도 된다.
- BeanFactory 인터페이스를 상속한 인터페이스

## DaoFactory를 사용하는 Application Context
### DaoFactory.java
- @Configuration, @Bean 추가

```java
@Configuration
public class DaoFactory {
  @Bean
  public UserDao myUserDao() {
    return new UserDao(connectionMaker());
  }
}
```

### Client.java
- ApplicationContext에 등록된 빈의 이름(myUserDao)으로 꺼내기
- java5 이상의 제네릭 메소드 방식을 사용해서 getBean 두번째 파라미터에 리턴 타입을 주면 캐스팅 코드를 따로 작성하지 않아도 된다

```java
ApplicationContext applicationContext = new AnnotationConfigApplicationContext(DaoFactory.class);
applicationContext.getBean("myUserDao", UserDao.class);
```
- ApplicationContext는 DaoFactory 클래스를 설정정보로 등록해두고 @Bean이 붙은 메서드의 이름을 가져와 빈 목록을 만든다
- client가 ApplicationContext에 UserDao를 요청하면
- ApplicationContext는 자신이 관리하는 빈 목록을 조회한다.
- 있다면 메서드를 호출해서 오브젝트 생성 후 클라이언트에 돌려준다.

### debug log
```shell
[main] DEBUG org.springframework.context.annotation.AnnotationConfigApplicationContext - Refreshing org.springframework.context.annotation.AnnotationConfigApplicationContext@453da22c
[main] DEBUG org.springframework.beans.factory.support.DefaultListableBeanFactory - Creating shared instance of singleton bean 'daoFactory'
[main] DEBUG org.springframework.beans.factory.support.DefaultListableBeanFactory - Creating shared instance of singleton bean 'myUserDao'
```

## ApplicationContext를 사용시 장점
- 클라이언트는 구체적인 팩토리 클래스를 알 필요가 없다
- 종합 IoC 서비스를 제공해준다
  - 오브젝트가 만들어지는 방식, 시점, 전략의 다양성
  - 자동생성
  - 오브젝트에 대한 후처리
  - 정보의 조합
  - 설정방식의 다변화
  - 인터셉팅
  - 컨테이너 차원에서 제공하는 외부 시스템과의 연동
- 애플리케이션 컨텍스트는 빈을 검색하는 다양한 방법을 제공한다
  - getBean() 메서드처럼 빈의 이름으로 빈 검색
  - 타입으로 빈 검색
  - 특별한 애노테이션 설정이 되어 있는 빈 검색