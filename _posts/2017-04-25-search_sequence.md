---
layout:  post
title: 검색&ID시퀀스
tags:
- search
- sequence
- egov
---


### 1. 검색

![](/assets/img/egov_search.jpg)

&nbsp; 1) 검색조건(id,name)을 (name,description)으로 변경

&nbsp; 2) 사용여부 Y/N에 대한 검색 조건 추가

&nbsp; 3) 전체 검색은 name or description으로 설정

&nbsp; 4) default 페이지는 where 조건절을 실행 안하게 쿼리 변경.

&nbsp; 5) searchKeyword(검색내용)가 있을 경우만 where 절 실행

<br>
**[[CDATA]]** 는 특수기호를 사용할 때 사용. 하지만 안에 다이나믹쿼리는 사용불가.

DB 스키마를 만들 때 default 값을 만들어 주는 게 좋다.

보통 검색에서 Equal Y(USE_YN == Y) 와 NotEqual Y (USE_YN != Y) 로 만든다.
그 이유는 Y와 그 외의 경우를 나타내기 위함. 만일 공백일 경우에 검색이 아예되지 않는 경우가 발생한다.

```sql
SELECT A.ID, A.NAME, A.DESCRIPTION, A.USE_YN, A.REG_USER
FROM
  (SELECT  ROWNUM RNUM, S.*
  FROM
    (SELECT ID, NAME, DESCRIPTION, USE_YN, REG_USER, ROWNUM
    FROM SAMPLE
	  <dynamic prepend="WHERE">
	    <isEqual prepend="AND" property="searchUseBox" compareValue="Y">
	      USE_YN = 'Y'
	    </isEqual>
	    <isEqual prepend="AND" property="searchUseBox" compareValue="N">
	      USE_YN != 'Y'
	    </isEqual>

	    <isNotEmpty property="searchKeyword">
	      <isEqual prepend="AND" property="searchCondition" compareValue="0">
	        NAME LIKE '%' || #searchKeyword# || '%' or DESCRIPTION LIKE '%' || #searchKeyword# || '%'
	      </isEqual>
	      <isEqual prepend="AND" property="searchCondition" compareValue="1">
	        NAME LIKE '%' || #searchKeyword# || '%'
	      </isEqual>
	      <isEqual prepend="AND" property="searchCondition" compareValue="2">
	        DESCRIPTION LIKE '%' || #searchKeyword# || '%'
	      </isEqual>
	    </isNotEmpty>
	  </dynamic>
	  ORDER BY ID DESC
	  ) S
  ) A
```

```html
<form:select path="searchCondition" cssClass="use">
	<form:option value="0"label="전체" />
	<form:option value="1" label="제목" />
	<form:option value="2" label="내용" />
</form:select>
<form:select path="searchUseBox" cssClass="useBox">
	<form:option value="." label="사용여부" />
	<form:option value="Y" label="사용" />
	<form:option value="N" label="미사용" />
</form:select>

```


### 2. ID 시퀀스
오라클은 MySQL의 Autoincrement가 없다. 보통 시퀀스를 이용해 ID 값 증가.

![](/assets/img/sequence.jpg)

NAME 설정 – start/min 설정 – max는 999999999999 (9천억)으로 설정.

eGov ID는 SAMPLE-숫자 형식이라 이에 맞게 변경해줌.

&nbsp; 1) 12자를 맞추기 위해 기존에 있던 카테고리ID 변경

```sql
UPDATE SAMPLE A
SET (ID) =
  (SELECT SUBSTR(ID, 0, 7) || LPAD(SUBSTR(ID,8,5),9,'0') AS ID 
   FROM SAMPLE B
   WHERE A.ID=B.ID
  )
```
=> LPAD(첫 번째 값, 전체개수, 왼쪽을 어떤 거로 채울지)
   기존 것을 그대로 놓고 앞에 0만 붙여야하기 때문에 LPAD(SUBSTR(ID,8,5),9,'0') 설정.

&nbsp; 2) insert를 하기 전 시퀀스를 select로 먼저 실행. 왜냐하면 한 개의 ID 값을 가지고 다른 테이블에서 사용해야 할 경우가 있기 때문.

쿼리문은 다음과 같다.
```sql
<select id="sampleDAO.categorySequence" resultClass="String">
  <![CDATA[
    SELECT 'SAMPLE-' || LPAD(CATEGORY_SEQUENCE.NEXTVAL,9,'0') AS ID 
    FROM DUAL
  ]]>
</select>
```

**에러 쿼리에서 FROM SAMPLE로 해서 결과값이 많아 에러가 발생**



=> 임시테이블 DUAL을 사용해 해당 하는 값 하나만 SELECT.

### 디버깅
디버깅을 할 때 `return (String)insert("sampleDAO.insertSample_S", vo);`
처럼 리턴 값을 저렇게 넣으면 왜 에러가 났는지 알 수 없다.  
(디버깅하면 에러페이지로 넘어감)  
그래서

```java
String resultString = null;

try {
    resultString = (String)getSqlMapClientTemplate().queryForObject("sampleDAO.categorySequence");
} catch(Exception e) {
  e.printStackTrace();
}

return resultString;
```

try catch 문으로 묶고 디버깅!