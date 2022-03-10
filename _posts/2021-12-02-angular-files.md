---
layout:  post
title: Angular 기본 파일 설명
tags:
- angular
- frontend
---

### app.component.{ts, html, css, spec.ts}
모든 컴포넌트의 부모 컴포넌트인 루트 컴포넌트를 구성하는 컴포넌트 클래스, 템플릿, CSS, 유닛 테스트용 스펙 파일이다.

### app.module.ts
Angular 구성요소를 등록하는 루트 모듈이다.

### assets/
이미지나 폰트와 같은 정적 파일을 위한 폴더이다.

### environments
프로젝트 빌드 시에 사용될 프로덕션용/개발용 환경 설정 파일이 담겨 있는 폴더이다.

### browserslist
`Autoprefixer`, `babel`과 같은 프런트엔드 도구 간에 적용 대상 브라우저를 공유하는 [browserslist](https://github.com/browserslist/browserslist)
라이브러리 설정 파일이다.

### index.html
웹 애플리케이션에 방문시 처음으로 로딩되는 디폴트 페이지이다. 루트 컴포넌트(`/src/app/app.component.*`)의 셀렉터인 `<app-root>`에 의해
루트 컴포넌트의 뷰가 로드되어 브라우저에 표시된다.
빌드 시에는 번들링된 자바스크립트 파일이 자동 추가된 `index.html`이 `/dist` 폴더에 생성된다.

### karma.conf.js
[Karma test runner](https://karma-runner.github.io/latest/index.html)를 위한 설정 파일이다. `ng test` 명령어 실행 시 참조된다.

### main.ts
프로젝트 메인 진입점이다. 루트 모듈(`AppModule`)을 사용하여 애플리케이션을 부트스트랩(기동) 한다.

### polyfills.ts
크로스 부라우징을 위한 폴리필들을 임포트 하는 역할을 한다.
자세한 내용은 [Browser support](https://angular.kr/guide/browser-support)를 참조.

### styles.css
애플리케이션 전역에 적용되는 글로벌 CSS 파일이다.

### test.ts
유닛 테스트를 위한 메인 진입점이다.

### tsconfig.{app|spec}.json
TypeScript 컴파일 옵션 설정 파일이다.

### typings.d.ts
TypeScript를 위한 타입 선언 파일이다.

### e2e/
e2e(end-to-end) 테스트 관련 파일을 위한 폴더이다. e2e 테스트를 위해 [Protractor](https://protractor.angular.io/)가 사용하는
설정 파일인 `protractor.conf.js`가 담겨 있다. `ng e2e` 명령어 실행 시 참조된다.

### node_modules
package.json에 등록된 의존 모듈이 패키지 매니저에 의해 설치되는 의존 모듈 저장소이다.

### .editorconfig
코드 에디터 기본 설정 파일이다. 상세한 내용은 [editorconfig](https://editorconfig.org/) 참조.

### angular.json
Angular CLI를 위한 설정 파일이다. 상세한 내용은 [Angular-JSON](https://angular.kr/guide/workspace-config) 참조.

### package.json
의존 모듈 관리를 위해 패키지 매니저가 사용하는 모듈 관리 파일이다.

### README.md
프로젝트의 개요를 기술한 README 파일이다. Angular CLI가 기본적인 내용을 자동 생성한다.

### tsconfig.json
TypeScript 컴파일 옵션 설정 파일이다.

### tslint.json
TSLint가 사용하는 linting(구문 체크) 설정 파일이다. `ng lint`명령어 실행시 참조된다.

> 참고: [Angular Essentials](http://www.yes24.com/Product/Goods/62063090)
