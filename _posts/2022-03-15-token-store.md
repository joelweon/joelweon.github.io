---
layout:  post
title: token store(jwt & inMemory & jdbc)
tags:
- jwtTokenStore
- inMemoryTokenStore
- jdbcTokenStore
- token
---


## JwtTokenStore
> JwtTokenStore 는 토큰 관련 데이터를 토큰 자체로 인코딩합니다. 토큰을 영구적으로 만들지 않으며 JWT로 인코딩된 토큰과 OAuth 인증 정보 간의 변환기로 JwtAccessTokenConverter가 필요합니다. (Shameer Kunjumohamed, Hamidreza Sattari의 "Spring Essentials").

중요한 것은 토큰이 전혀 지속되지 않고 서명을 기반으로 "즉시" 검증된다는 것입니다.

> 한 가지 단점은 액세스 토큰을 쉽게 취소할 수 없기 때문에 일반적으로 짧은 만료로 부여되고 취소는 새로 고침 토큰에서 처리된다는 것입니다. 또 다른 단점은 토큰에 많은 사용자 자격 증명 정보를 저장하는 경우 토큰이 상당히 커질 수 있다는 것입니다. JwtTokenStore는 데이터를 유지하지 않는다는 점에서 실제로 "저장소"가 아닙니다.

## InMemoryTokenStore
InMemoryTokenStore 는 서버 메모리에 토큰을 저장하므로 다른 서버 간에 토큰을 공유하는 것이 거의 불가능합니다. 인증 서버를 다시 시작하면 InMemoryTokenStore의 모든 액세스 토큰이 손실됩니다. 프로덕션 환경이 아닌 개발 중에만 InMemoryTokenStore를 사용하는 것을 선호합니다.

> 기본 InMemoryTokenStore는 단일 서버에 완벽하게 적합합니다(즉, 트래픽이 적고 오류 발생 시 백업 서버로의 핫 스왑 없음). 대부분의 프로젝트는 여기에서 시작할 수 있으며 개발 모드에서 이러한 방식으로 작동하여 종속성 없이 서버를 쉽게 시작할 수 있습니다.

## JdbcTokenStore
> JdbcTokenStore 는 토큰 데이터를 관계형 데이터베이스에 저장하는 동일한 것의 JDBC 버전입니다 . 서버 간에 데이터베이스를 공유할 수 있는 경우 JDBC 버전을 사용합니다. 동일한 서버가 하나만 있는 경우 확장된 인스턴스이거나 여러 구성 요소가 있는 경우 권한 부여 및 리소스 서버입니다. JdbcTokenStore를 사용하려면 클래스 경로에 "spring-jdbc"가 필요합니다.

JdbcTokenStore의 경우 실제 데이터베이스에 토큰을 저장하고 있습니다. 따라서 Authorization 서비스가 다시 시작되는 경우에도 안전합니다. 토큰은 서버 간에 쉽게 공유되고 취소될 수도 있습니다. 그러나 데이터베이스에 대한 종속성이 더 많습니다.

> [OAuth 2 Developers Guide](https://projects.spring.io/spring-security-oauth/docs/oauth2.html)  
> 참고) https://stackoverflow.com/questions/39210683/how-inmemorytokenstore-works-with-spring-security-oauth2-and-is-this-the-safest

