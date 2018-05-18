---
layout:  post
title: queryForList, queryForObject 차이점
tags:
- database
- dao
- oracle
- ibatis
---


### queryForObject

DB로부터 1개의 레코드를 가져와 자바 객체에 저장한다.  
오직 한 개의 레코드만 반환되는 여부를 검사하는 메소드 이므로 하나이상의 레코드가 반환되는 경우 예외처리됨.
그리고 값이없을경우는 null을 반환
** Map, int, String 으로만 리턴받을 수 있음
즉 단일 객체 받아올때 사용


### queryForList


DB로부터 1개이상의 레코드를 가져온다
자바 객체의 List(로 받는다)를 만드는데 사용한다
** Map, list 모두 리턴 가능함(리스트형식)
전자정부는 그냥 list로 호출하는 것과 같음


### getSqlMapClientTemplate.insert()
요청한 insert를 즉시 실행하여 바로 트랜잭션 완료 처리(commit)
전자정부에서 insert()호출하는 것과 같음

### getSqlMapClient.insert()
사용자가 명시적으로 최종 트랜잭션 처리를 할 때 까지는 트랜잭션 완료 처리가 되지 않음. 이를 로컬 트랜잭션(Local Transaction)이라 하고 일괄처리(Batch Processing) 기법이라 한다.


```
(Integer) getSqlMapClientTemplate().queryForObject("",);
insert("",);
```

getSqlMapClientTemplate().insert() / update() / delete() 사용 시 return

- insert : 성공 -> return null(자동증가 pk가 없는경우)
                -> return pk(자동증가 pk가 있는경우)
           실패 -> error
- update,delete : 성공 -> return 1
                  실패 -> return 0
insert() 할 때도 update() 함수를 호출하여 성공, 실패 여부를 리턴받을 수 있다. insert() 함수보다 update() 함수를 쓰는게 낫다.

```

getSqlMapClientTemplate() 이 즉시 commit을 할지는 모르겠지만 일반적으로 Spring 사용시 TransactionManager를 이용하기 때문에 이로 인해 즉시 commit이 발생하지는 않습니다..AOP가 됐든 @Transactional이 됐든 둘중 하나라도 사용하게 되면 즉시 commit이 되질 않죠..

이 둘의 차이점은 세세한 동작에서 봐야 할 사항은 아닙니다..
getSqlMapClientTemplate()은 그냥 사용할 수 있는게 아니라 클래스가 SqlMapClientDaoSupport 클래스를 상속받아야 사용이 가능합니다..
만약 DAO가 하나의 DB만 사용한다면 상관없지만 둘 이상의 DB를 사용할 경우 이 메소드를 사용할 수 없습니다..왜냐면 자바는 다중상속을 지원하지 않기 때문이죠..
이런 문제는 ibatis의 배치모드를 사용할 수 없는 문제도 발생하게 됩니다..
DB는 하나를 사용하고 있지만 ibatis의 batch 모드를 사용할려면 ibatis 설정에서 작업을 해주어야 하는데 이럴 경우 batch 설정이 되어 있는 것과 그렇지 않은 것을 각각 하나씩 만들어서 사용하게 됩니다..
그러나 DAO에서 배치를 사용하는 것과 그렇지 않은 것 모두 있을 경우 SqlMapClientDaoSupport 클래스는 하나뿐이 상속 못받기 때문에 DAO 하나에서 배치잡을 돌리는데 문제가 발생하죠..

그래서 개인적으로는 SqlMapClientDaoSupport를 상속받아 하는 것 보단 

@Autowired
private SqlMapClientTemplate sqlMapClientTemplate;

이렇게 Injection 받아서 하는 것을 추천합니다..
이 방법을 사용하면 위에서 예를 들은 batch 작업도 하나의 DAO에서 가능합니다..
batch 작업을 하는 SqlMapClientTemplate 과 그렇지 않은 SqlMapClientTemplate 을 모두 Injection 받으면 되기 때문이죠..
```

```
다양하고 새로운 트랜잭션 관리 기법을 활용할 수 있는 상황에서 너무 단편적이고 기초적인 게시물을 작성하여 조금은 관점이 다르게 보였던 것 같습니다.
말씀하신 내용들이 모두 도움이 되었습니다. 제가 단순히 트랜잭션에 대해 설명하려고 했던 주제 보다는 보다 광범위하게 설명해 주신 것 같습니다.
트랜잭션 처리를 위해 Spring AOP단의 트랜잭션 처리(TransactionManager)나 보통 DB자체의 Transaction을 많이 활용합니다.

그리고 하나의 DAO에 하나의 DB만 접근하여 SqlMapClientDaoSupport 상속을 통한 구현에 큰 문제가 없었던 저였는데, 
(여러 DB접근 필요시, DB링크를 사용하거나, SqlMapConfig의 다중DB정의 후, DAO에서 extends하여 구현.)
말씀하신대로 다중DB접속을 DAO하나로 처리하여야 하는 상황이 새로 주어진다면 추천해주신 방법으로 구현해보도록 하겠습니다.
```
