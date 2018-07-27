---
layout:  post
title: iBatis iterate
tags:
- oracle
- ibatis
- iterate
---

#### SELECT WHERE 조건
```xml
<iterate prepend="PCKAGE_CODE IN" open="(" conjunction="," close=")" property="pckageCodeSearch">
    #pckageCodeSearch[]#
</iterate>
```

#### 다중 INSERT (오라클)
```
<insert id="ofcDAO.insertOfc" parameterClass="ofcVO">
    INSERT ALL
		<iterate property="membIdList">
			INTO KCDD501 (
        INSTT_ID
		  , MEMB_ID
			) VALUES (
				#insttId#
      , #membIdList[]#
			)
  	</iterate>
  	SELECT * FROM DUAL
</insert>
```
