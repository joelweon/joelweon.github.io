---
layout:  post
title: 스프링 시큐리티 인증&권한부여
tags:
- spring
- security
---


`(package org.springframework.security.access.hierarchicalroles;)`
public class RoleHierarchyImpl implements RoleHierarchy {}

클래스에서 

```java
	// SEC-863
	private void addReachableRoles(Set<GrantedAuthority> reachableRoles,
			GrantedAuthority authority) {

		for (GrantedAuthority testAuthority : reachableRoles) {
			String testKey = testAuthority.getAuthority();
			if ((testKey != null) && (testKey.equals(authority.getAuthority()))) {
				return;
			}
		}
		reachableRoles.add(authority);
	}
```
여기에서 admin일 경우 admin의 하위(ROLE_USER, ROLE_ANONYMOUS)를 자동으로 세팅해준다. 유저는 롤유저, 롤어나니머스.

어드민일 경우 자동으로 다른권한을 가져오도록 세팅할 수 있는지는 의문!

권한관련해서는 메뉴별로 관리해주면 해결은 가능


* * *


eGov 에서는 유저 정보를 DB에서 관리할 수 있도록 따로 상속받아 구현함.
```java
public class EgovJdbcUserDetailsManager extends JdbcUserDetailsManager {

...


/**
* JdbcDaoImpl 클래스의 loadUsersByUsername 메소드 재정의.
* 사용자명(또는 ID)로 EgovUserDetails의 정보를 조회한다.
* 
* @param username
* @return
* @throws UsernameNotFoundException
* @throws DataAccessException
*/
@Override
public EgovUserDetails loadUserByUsername(String username)
    throws UsernameNotFoundException, DataAccessException {

List<UserDetails> users = loadUsersByUsername(username);

if (users.size() == 0) {
    LOGGER.debug("Query returned no results for user '{}'", username);

    throw new UsernameNotFoundException(messages.getMessage("EgovJdbcUserDetailsManager.notFound", new Object[] { username }, "Username {0} not found"));
}

UserDetails obj = users.get(0);
this.userDetails = (EgovUserDetails) obj;

Set<GrantedAuthority> dbAuthsSet = new HashSet<GrantedAuthority>();

dbAuthsSet.addAll(loadUserAuthorities(this.userDetails.getUsername()));

List<GrantedAuthority> dbAuths = new ArrayList<GrantedAuthority>(dbAuthsSet);

addCustomAuthorities(this.userDetails.getUsername(), dbAuths);

if (dbAuths.size() == 0) {
    throw new UsernameNotFoundException(messages.getMessage("EgovJdbcUserDetailsManager.noAuthority", new Object[] { username }, "User {0} has no GrantedAuthority"));
}

// RoleHierarchyImpl 에서 저장한 Role Hierarchy 정보가 저장된다.
Collection<? extends GrantedAuthority> authorities = roleHierarchy.getReachableGrantedAuthorities(dbAuths);

// JdbcDaoImpl 클래스의 createUserDetails 메소드 재정의
return new EgovUserDetails(this.userDetails.getUsername(),
    this.userDetails.getPassword(), this.userDetails.isEnabled(), true,
    true, true, authorities, this.userDetails.getEgovUserVO());
}

```

`(package org.springframework.security.access;)`




http://blog.naver.com/PostView.nhn?blogId=tmondev&logNo=220310743818