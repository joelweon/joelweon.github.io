---
layout:  post
title: MVIEW 수동실행
tags:
- oracle
- mview
---

```
BEGIN
DBMS_MVIEW.REFRESH('MV_JAMSINSI');
END;
```