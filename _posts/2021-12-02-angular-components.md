---
layout:  post
title: Angular 구성 요소
tags:
- angular
- frontend
---

## Angular는 CBD(컴포넌트 기반)이다.

### 컴포넌트(Component)
컴포넌트는 템플릿과 메타데이터, 컴포넌트 클래스로 구성되며 데이터 바인딩에 의해 연결된다.
컴포넌트는 화면을 구성하는 뷰(View)를 생성하고 관리하는 것이 주된 역할이며
화면은 1개이상의 컴포넌트를 조립하여 구성한다.

### 디렉티브(Directive)
애플리케이션 전역에서 사용할 수 있는 뷰에 관련한 공통 관심사를 컴포넌트에서 분리하여
구현한 것으로 컴포넌트의 복잡도를 낮추고 가독성을 높인다. 구조 디렉티브(structual directive)와
어트리뷰트 디렉티브(attribute directive)로 구분할 수 있으며 큰 틀에서 컴포넌트 또한 디렉티브로
구분할 수 있따.

### 서비스(Service)
다양한 목적의 애플리케이션 공통 로직을 담당한다. 컴포넌트에서 애플리케이션 전역 관심사를
분리하기 위해 사용하며 의존성 주입이 가능한 클래스로 작성된다.

### 라우터(Router)
컴포넌트를 교체하는 방법으로 뷰를 전환하여 화면 간 이동을 구현한다.

### 모듈(Module)
기능적으로 관련된 구성요소를 하나의 단위로 묶는 매커니즘을 말한다.
모듈은 관련이 있는 기능들이 응집된 기능 블록으로 애플리케이션을 구성하는 하나의 단위를 만든다.
모듈은 다른 모듈과 결합할 수 있으며 Angular는 여러 모듈을 조합하여 애플리케이션을 구성한다.
컴포넌트, 디렉티브, 파이프, 서비스 등의 Angular 구성요소는 모듈에 등록되어야 사용할 수 있다.

### 데코레이터 종류
- 클래스 데코레이터: `@Component`, `@NgModule`, `@Directive`, `@Injectable`, `@Pipe` 
- 프로퍼티 데코레이터: `@HostBinding`, `@Input`, `@Output`, `@ViewChild`, `@ViewChildren`, `@ComponentChild`, `@ComponentChildren`
- 메소드 데코레이터: `@HostListener` 
- 파라미터 데코레이터: `@Inject`

> Angular Essentials 참고
