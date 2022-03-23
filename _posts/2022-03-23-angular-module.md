---
layout:  post
title: Angular Module
tags:
- angular
- module
---

| 모듈    | 개요                                                                                   | 대상                                        |
|-------|--------------------------------------------------------------------------------------|-------------------------------------------|
| 핵심 모듈 | 애플리케이션 전역에서 공통으로 사용할 구성요소들로 구성한 모듈로서 루트 모듈에 등록한다.<br/>핵심 모듈은 루트 모듈에 등록하여 싱글톤으로 사용한다. | 애플리케이션 전역에서 사용하는 데이터 서비스, 인증 서비스, 인증 가드 등 |
| 공유 모듈 | 애플리케이션 전역에서 공유할 구성요소들로 구성한 모듈로서 기능 모듈에 의해 임포트 된다.                                    | 애플리케이션 전역에서 사용하는 컴포넌트, 디렉티브, 파이프 등        |
| 기능 모듈 | 관심사가 유사한 구성요소로 구성한 모델                                                                | 특정 화면을 구성하는 구성 요소                         |

## 핵심 모듈(core.module)
- 루트 모듈에 등록한다.
- 공유 모듈과 유사하지만 싱글톤으로 사용한다. (공유 모듈은 기능 모듈에 의해 사용된다.)
- 독립적인 요소로 간결하게 관리할 목적으로 구성한 모듈이다.
- user.service.ts와 같은 전역에서 사용하는 서비스 등(service는 providers에 등록)

## 공유 모듈(shared.module)
- 주로 기능 모듈에서 공통적으로 사용하는 구성요소로 구성


## 기능 모듈(**.module)
- 일반적으로 특정 화면 단위를 기준으로 구성

### 루트 모듈은 여러 기능 모듈을 import하고, 핵심모듈을 import한다.
### 공유 모듈은 루트 모듈에 import되지 않고, 기능 모듈에 의해 import 되어 사용된다. 
### 기능 모듈들은 공유 모듈을 import한다.

### shared.module에 HeaderComponent를 declaration, exports한다.
### 홈 모듈은 imports: CommonModule, SharedModule, declarations: HomeComponent, exports: HomeComponent  

imports
- 의존 관계에 있는 Angular library module
- 기능 모듈(feature module)이라 불리는 하위 모듈
- 라우팅 모듈
- 서드 파티 모듈 선언

providers
- 주입 가능한 객체(injectable object)인 서비스의 리스트를 선언한다.
- 루트 모듈에 선언된 서비스는 애플리케이션 전역에서 사용할 수 있다.

declarations
- 컴포넌트
- 디렉티브
- 파이프의 리스트를 선언한다.
- 모듈에 선언된 구성요소는 모듈에서 사용할 수 있다.

bootstrap
- 루트 모듈에서 사용하는 프로퍼티로서 애플리케이션의 진입점(entry point)인 루트 컴포넌트를 선언한다.

> 참고: [Angular Essentials](http://www.yes24.com/Product/Goods/62063090)
