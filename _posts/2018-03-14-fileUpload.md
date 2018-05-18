---
layout:  post
title: 파일 업로드
tags:
- database
- oracle
- count
---

```javascript
<%-- 파일 다운로드 --%>
  function fncFileIframe(orteFileId)
  {
    ifrmFile.location.href="<c:url value='/co/download/popup/poDownload.kci'/>?orteFileId="+orteFileId;
  }
```

```jsp
<form:form commandName="" name="" method="post" enctype="multipart/form-data">

<%-- enctype 지정해줘야함 --%>

<c:if test="${VO.orteFileId ne null}">
  <c:out value="${VO.orteFileNm}"/>
  <a href="javascript:fncFileIframe('<c:out value="${VO.orteFileId}"/>');">
    <img src="<c:url value='/res/images/btnDownload.gif'/>" width="71" height="19" style="border:0px;cursor:hand" align="absmiddle"/>
  </a>
</c:if>
</form:form>
```

```javascript
<iframe name="ifrmFile" src="" width="0"  height="0" frameborder="0" marginheight="0" marginwidth="0" style="background-color:#FFFFFF;"></iframe>
```