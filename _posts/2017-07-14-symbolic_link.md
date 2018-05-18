---
layout:  post
title: 윈도우 심볼릭 링크
tags:
- symbolic link
---

```
> mklink /d C:\project\workspace\JAMS20\src\main\webapp\jams\upload C:\TmaxSoft\JEUS6.0\webhome\DESKTOP-G65KMCN_container1\jams2_0\jams2_0_war___\jams\upload
```
```
> mklink /d C:\project\workspace\JAMS20\src\main\webapp\jams\upload_img C:\TmaxSoft\JEUS6.0\webhome\DESKTOP-G65KMCN_container1\jams2_0\jams2_0_war___\jams\upload_img
```

```
> mklink /d "C:\TmaxSoft\JEUS6.0\webhome\DESKTOP-G65KMCN_container1\jams2_0\jams2_0_war___\jams\upload"  "C:/project/workspace/JAMS20/src/main/webapp/jams/upload/"
```

mklink "링크" "원본"

