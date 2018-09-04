---
layout:  post
title: 오라클 characterset
tags:
- oracle
- characterset
---

### 문자셋 확인

```sql
[ 문자셋 확인 ]
   SELECT name, value$
   FROM sys.props$
   WHERE name = 'NLS_CHARACTERSET';

   SELECT name, value$
   FROM sys.props$
   WHERE name = 'NLS_NCHAR_CHARACTERSET';

[ 언어셋 확인 ]
   SELECT name, value$
   FROM sys.props$
   WHERE name = 'NLS_LANGUAGE';
```

### 문자셋 변경

```sql
[ 문자셋 변경 ]
   UPDATE sys.props$
   SET value$ = '[ 변경을 원하는 문자셋 (KO16KSC5601, AL32UTF8 등)]'
   WHERE name = 'NLS_CHARACTERSET';

   UPDATE sys.props$
   SET value$ = '[ 변경을 원하는 문자셋 (KO16KSC5601, AL32UTF8 등)]'
   WHERE name = 'NLS_NCHAR_CHARACTERSET';

[ 언어셋 변경 ]
   UPDATE sys.props$
   SET value$ = '[ 변경을 원하는 문자셋 (AMERICAN_AMERICA.KO16KSC5601, AMERICAN_AMERICA.AL32UTF8등)]'
   WHERE name = 'NLS_LANGUAGE'';
```


> http://blog.naver.com/PostView.nhn?blogId=idtong&logNo=130062721498&redirect=Dlog&widgetTypeCall=true