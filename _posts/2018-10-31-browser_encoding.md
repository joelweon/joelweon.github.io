---
layout:  post
title: 한글 다운로드 인코딩
tags:
- encoding
---

한글 다운로드 시에 한글 깨짐 현상을 피하기 위해서 
브라우저 별로 서로 다른 대응이 필요로 하다.

먼저 브라우저를 분류하기 위해서는 다음과 같은 로직을 필요로 한다.

```
private String getBrowser(HttpServletRequestrequest) {

      String header =request.getHeader("User-Agent");

      if (header.contains("MSIE")) {

             return "MSIE";

      } else if(header.contains("Chrome")) {

             return "Chrome";

      } else if(header.contains("Opera")) {

             return "Opera";

      }

      return "Firefox";

}
```

request를 파라미터로 전달해주면 해당하는 브라우저를 반환해주게 된다.

반환된 브라우저별로 다시 분기를 하여 파일명을 지정하는 작업을 한다.
```
String header = getBrowser(request);

if (header.contains("MSIE")) {

   String docName = URLEncoder.encode(fileName,"UTF-8").replaceAll("\\+", "%20");

   response.setHeader("Content-Disposition", "attachment;filename=" + docName + ";");

} else if (header.contains("Firefox")) {

    String docName = new String(fileName.getBytes("UTF-8"), "ISO-8859-1");

    response.setHeader("Content-Disposition", "attachment; filename=\"" + docName + "\"");

} else if (header.contains("Opera")) {

    String docName = new String(fileName.getBytes("UTF-8"), "ISO-8859-1");

    response.setHeader("Content-Disposition", "attachment; filename=\"" + docName + "\"");

} else if (header.contains("Chrome")) {

    String docName = new String(fileName.getBytes("UTF-8"), "ISO-8859-1");

    response.setHeader("Content-Disposition", "attachment; filename=\"" + docName + "\"");

}

response.setHeader("Content-Type", "application/octet-stream");

response.setContentLength((int)file.getSize());

response.setHeader("Content-Transfer-Encoding", "binary;");

response.setHeader("Pragma", "no-cache;");

response.setHeader("Expires", "-1;");
```