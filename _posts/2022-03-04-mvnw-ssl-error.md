---
layout:  post
title: spring boot .\mvnw 실행 오류(SSL, PKIX)
tags:
- spring
- mvn
- ssl
- pkix
- error
---

### spring boot `.\mvnw` 실행 오류
```shell
> .\mvnw
Exception in thread "main" javax.net.ssl.SSLHandshakeException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
```

```shell
> curl -O https://gist.githubusercontent.com/lesstif/cd26f57b7cfd2cd55241b20e05b5cd93/raw/InstallCert.java
> javac InstallCert.java

> java -cp ./ InstallCert  repo.maven.apache.org
  1 -> 눌러서 quit
  Added certificate to keystore 'jssecacerts' using alias 'repo.spring.io-1' -> 결과 확인

인증서 추출
> keytool -exportcert -keystore  jssecacerts -storepass changeit -file mavenoutput2.cert -alias repo.maven.apache.org-1
인증서 비밀번호 : changeit 

인증서 Import
> keytool -importcert -keystore "%JAVA_HOME%\lib\security\cacerts" -storepass changeit -file mavenoutput2.cert -alias repo.maven.apache.org-1

> .\mvnw
```

> 참고) https://young7935.tistory.com/12
