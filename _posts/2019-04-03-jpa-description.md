---
layout:  post
title: JPA 관련 팁
tags:
- jpa
- entity
- joincolumn
---

### hibernate.hbm2ddl.auto 속성 : p127 (persistence.xml)
카멜표기, 언더스코어 표기 - 이름 매핑전략 : p128

시퀀스 증가 allocationSize 기본값50 주의점 : p138


### Entity 설정
- @ID : 주키
- @GeneratedValue : 자동증가
    - AUTO 전략이 기본값.(p.142)
- @Temporal(TemporalType.TIMESTAMP) : DATE, TIME, TIMESTAMP 3가지.
- @Lob : type이 String이면 CLOB, byte[]면 BLOB
- @Transient : 이 필드는 매핑하지 않는다.(객체에 임시 보관용일 경우 사용)
- @Column : default가 (nullable = true) 이다.
    - @Column을 생략하면 not null 자동 추가
    - not null이 필요한 조건 추가해 줘야한다. @Column(nullable = false)

>
WARNNING 참고URL : https://kingbbode.tistory.com/27  WARN 4664 --- [  restartedMain] aWebConfiguration$JpaWebMvcConfiguration : spring.jpa.open-in-view is enabled by default


`@JoinTable(name = "MEMBER_ROLE", joinColumns = @JoinColumn(name = "membSeq"), inverseJoinColumns = @JoinColumn(name = "roleSeq"))`
@JoinTable
- joinColumns : 현재 엔티티를 참조하는 외래키  
- inverseJoinColumns : 반대방향 엔티티를 참조하는 외래 키

### 복합키 식별관련
@IdClass vs @EmbeddedId  
식별자 클래스를 구현해야하고 다음과 같은 조건을 만족해야한다.  
1. Serializable 인터페이스 구현
2. equals, hashCode 구현
3. 기본 생성자가 있어야함.
4. 식별자 클래스는 public이어야 함.
5-1.(@IdClass) 식별자클래스의 속성명 = 엔티티의 식별자 속성명
같아야 한다.
5-2 (@EmbeddedId) @EmbeddedId 를 식별자 클래스에 적용해야 하고,
식별자 클래스에 기본키를 매핑한다.

@IdClass 는 데이터베이스에 맞춘 방법이고  
@EmbeddedId는 좀 더 객체지향적인 방법이다.  
장단점이 있고 편한 방법으로 일관되게 사용하면 된다.  
참고로 @EmbeddedId는 쿼리가 약간 길어 질 수 있다.  

#### @JoinColumn 생략하면?
기본 전략을 사용한다.
```java
//예)

@ManyToOne
private Team team;
```
- 필드명_참조하는테이블의 컬럼명 
    ==> team_TEAM_ID 외래키를 사용.