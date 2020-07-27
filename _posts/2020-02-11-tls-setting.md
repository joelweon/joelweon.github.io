---
layout:  post
title: TLS 설정값 변경
tags:
- tls
- setting
---

### 주석처리하면 1, 1.1, 1.2 지원함

haproxy/conf/haproxy-lbagent.cfg
-> ssl-default-bind-options, ssl-default-bind-ciphers 주석처리

haproxy/conf/haproxy-lbdist-https.cfg
-> ssl-default-bind-options, ssl-default-bind-ciphers 있으면 주석처리

### 지원하는 지 확인
openssl s_client -connect localhost:8804 -ssl3
openssl s_client -connect localhost:8804 -dtls1
openssl s_client -connect localhost:8804 -tls1
openssl s_client -connect localhost:8804 -tls1_1
openssl s_client -connect localhost:8804 -tls1_2

### tomcat TLS 확인

tomcat/conf/server.xml
`<Connector port="8808" protocol="HTTP/1.1" maxThreads="256" SSLEnabled="true" scheme="https" secure="true" clientAuth="false" SSLProtocol="TLSv1.2" keystoreFile="/opt/" keystorePass="" keystoreType="" />`

---

1. SSL 통신 시 방법
SSL 통신 시 서버 측에서 TLS 알고리즘 버전을 제한하는 경우가 있다.

이런경우 클라이언트에서는 서버에 맞는 알고리즘을 선택하여 통신을 해야한다. 이 때 HttpComponentsClientHttpRequestFactory와 HttpClient를 이용하여 TLS 알고리즘을 설정할 수 있다.

TLS 알고리즘 설정 예제
```java
SSLContext ssl = SSLContexts.custom().useProtocol("TLSv1.2").build(); //TLS 알고리즘 설정
HttpClient client = HttpClientBuilder.create().setSSLContext(ssl).build(); // HttpClient 생성

HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
factory.setHttpClient(client); //HttpClient 설정

RestTemplate template = new RestTemplate(factory); //RestTemplate 생성 시 factory 설정
// HttpComponentsClientHttpRequestFactory는 Apache의 httpcomponents 를 의존하고 있으므로 라이브러리에 포함되어 있어야 한다.
```