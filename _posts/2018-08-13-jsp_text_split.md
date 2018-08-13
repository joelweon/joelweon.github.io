---
layout:  post
title: jsp 리스트에서 글씨 자르기
tags:
- oracle
- ibatis
- iterate
---

#### 초과되는 숫자 ... 으로 처리하기

title에 전체 텍스트 설정하여 마우스 하버 시 전체 텍스트가 나오게 한다.

```html
<td>
  <a href="javascript:void(0);" title="${ noticeVO.title }"><c:out value="${ fn:substring(noticeVO.title, 0, 30) }"/><c:if test='${ fn:length(noticeVO.title) > 35 }'><c:out value="..."/></c:if>
  </a>
</td>
```
