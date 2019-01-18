---
layout:  post
title: WebtoB 리스너, Thread Pool 설명
tags:
- webtob
- thread
- listener
---

### WebtoB 리스너
WebtoB는 JEUS 웹 애플리케이션 서버의 기본 웹 서버다. WebtoB는 static 페이지 전송, CGI, SSI, PHP
등 기본적인 웹 서버 기능들을 모두 지원한다. JEUS 웹 컨테이너와 인터페이스할 때에는 Servlet/JSP 서
비스도 제공한다.

WebtoB 리스너는 위에서 언급한 리스너와 조금 다른 종류의 리스너라고 할 수 있다. WebtoB 리스너는
다른 리스너와 달리 리스너가 WebtoB 서버의 위치를 찾아서, 접속하고자 하는 특징을 가진다. 그러므로,
WebtoB 리스너를 사용할 때에는 WebtoB 서버가 리스닝 모드로 대기를 하고, WebtoB 리스너(즉, 웹 컨테
이너)가 연결을 시도한다. 이러한 연결 방식을 Reverse Connection Pooling이라 한다.

참고
위 문장은 WebtoB 서버가 웹 컨테이너보다 먼저 구동 중에 있어야 한다는 것을 의미한다.


### 4.2.2. Worker Thread와 Worker Thread Pool
웹 서버 리스너와 연관된 중요한 개념 중 하나가 “Worker Thread”에 관한 것이다.
각 리스너에는 Pool(Worker Thread Pool)이라는 것이 포함되어 있다. 이것은 Worker Thread들을 관리한
다.

리스너의 포트로 요청이 도착했을 때 1개의 Worker Thread가 이 Pool에서 꺼내지고, 요청을 처리하기 위해 지정받은 후 응답을 만들어 낸다. 여기에서의 “처리”라는 개념은 static content를 가져오는 것에부터
JSP나 Servlet을 실행하는 것까지 모두를 포함한다.

“Worker Thread”라는 개념은 이 문서의 많은 부분에서 거론된다. 예를 들어 Context Group의 ActiveManagement 설정은 직접적으로 이 Worker Thread Pool에 연관되어 있다. 그러므로, “Thread Pool 포트” 또는 “Thread Pool 주소”라는 개념이 사용될 때에는 Worker Thread를 주관하는 리스너의 포트 번호와 IP 주소를 의미한다(그리고 간접적으로 Worker Thread도 의미한다). “Worker Thread Pool” 대신에 “Thread Pool”을 사용하기도 한다.

웹 서버 리스너를 설정할 때에는 Thread Pool의 일정한 사양도 같이 설정해야 한다

참고: TmaxSoft
