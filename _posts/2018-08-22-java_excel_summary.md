---
layout:  post
title: java Excel 정리(HSSF)
tags:
- oracle
- ibatis
- iterate
---

#### 파일 입출력을 위한 소스
```
ServletOutputStream servletoutputstream = response.getOutputStream();
```
브라우저에 출력할 때 ServletOutputStream을 이용한다.

`response.reset();`
응답이 아직 커밋되지 않은 경우 ServletResponse.reset()을 사용하여 버퍼링된 응답 데이터, 상태 코드, 응답 헤더를 지울 수 있습니다. Servlet 3.1 기능을 사용 중인 경우 이 메소드는 이전에 호출된 ServletResonse.getWriter() 또는 ServletResponse.getOutputStream()의 레코드도 모두 지웁니다. 즉 버퍼에 있는 데이터를 지웁니다.


```
response.reset(); // IE 8 Problem - not find page
response.setContentType("application/vnd.ms-excel;charset=euc-kr");
response.setHeader("Content-disposition", "attachment;filename=" + new String(("파일명.xls").getBytes("KSC5601"), "ISO8859_1"));
```

```
워크북생성
HSSFWorkbook wb = new HSSFWorkbook();
시트생성
HSSFSheet sheet = wb.createSheet();
시트이름 설정한다.
wb.setSheetName(sheetNumber, sheetNm);
```