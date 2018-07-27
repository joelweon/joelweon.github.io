---
layout:  post
title: JAVA Excel HSSFWorkbook
tags:
- java
- excel
---


## HSSFWorkbook은 xls 형식(2007)으로 지원한다.

### Controller
```java
/**
 * 통계현황 엑셀다운로드
 * @param VO
 * @param response
 * @throws Exception
 */
@RequestMapping("/common/excelDownload.do")
public void excelDownload (
    @ModelAttribute("VO") VO vo,
    HttpServletResponse response) throws Exception {

  List<?> list = service.selectList(VO);

  // 엑셀파일 저장
  MakeExcelFile excel = new MakeExcelFile();
  String fileNm = "통계.xls";
  String SheetNm = "통계";
  String titleNm = "통계";

  String headerNm[] = { "성명", "전화번호", "이메일", "소속기관명" };
  int colSize[] = { 20, 20, 20, 20 };
  int align[] = { 1, 1, 3, 3 };

  excel.makeExcel(statsList, response, fileNm, titleNm, SheetNm, align, headerNm, colSize);

}
```

### Service
#### makeExcel
```java
import java.io.IOException;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;
import java.util.Set;
import java.util.StringTokenizer;
import java.util.Vector;

import javax.naming.NamingException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.usermodel.contrib.HSSFCellUtil;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.hssf.util.Region;

public void makeExcel(List DataList, HttpServletResponse response, String fileNm, String titleNm, String sheetNm, int[] range, String[] headerNm, int[] colSize) throws NamingException, IOException {

    ServletOutputStream servletoutputstream = null;
    Calendar cal = Calendar.getInstance();
    String var = "[" + String.valueOf(cal.get(Calendar.YEAR));
    int mon = cal.get(Calendar.MONTH) + 1;
    int day = cal.get(Calendar.DAY_OF_MONTH);
    String convMon = String.format("%02d", mon); // %d -> 숫자 / 0-> 빈칸을 0으로 채움 / 2-> 자릿수
    String ConvDay = String.format("%02d", day);

    var += convMon + ConvDay + "]";
    response.reset(); // IE 8 Problem - not find page
    response.setContentType("application/vnd.ms-excel;charset=euc-kr");


    //response.setHeader("Content-disposition", "attachment;filename=" + var + new String(java.net.URLDecoder.decode(fileNm).getBytes(), "ISO8859_1")); //파일명
    response.setHeader("Content-disposition", "attachment;filename=" + var + new String((fileNm).getBytes("KSC5601"), "ISO8859_1"));
    servletoutputstream = response.getOutputStream();

    String paramName = "";
    String paramValue = "";
    Hashtable h = new Hashtable();
    try {

        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        //wb.setSheetName(0, java.net.URLDecoder.decode(sheetNm)); // Sheet Name Setting
        wb.setSheetName(0, sheetNm); // Sheet Name Setting
        sheet.setDefaultColumnWidth((short) 20); // Sheet default Width setting

        // 엑셀파일 생성
        if (DataList.size() > 0)
            MakeExcelDetail(wb, sheet, DataList, titleNm, range, headerNm, colSize);
        wb.write(servletoutputstream);
    } catch (Exception ex) {
        log.debug("makeExcel Exception : " + ex.getMessage());
    }
}
```
#### MakeExcelDetail
```java
// 세부 엑셀파일 내용 기록
private void MakeExcelDetail(HSSFWorkbook wb, HSSFSheet sheet, List list, String titleNm, int[] range, String[] headerNm, int[] colSize) throws NamingException, IOException {

    LoginVO loginVO = new LoginVO();
    Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
    if(isAuthenticated) {
        loginVO = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
    } else {
        loginVO.setMberId("guest");
        loginVO.setMberNm("손님");
    }

    HSSFRow row;
    HSSFCell cell;

    // Title Cell Style 정의
    HSSFCellStyle cellStyleTitle = wb.createCellStyle();
    cellStyleTitle.setWrapText(true);
    cellStyleTitle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
    cellStyleTitle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
    cellStyleTitle.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
    cellStyleTitle.setFillBackgroundColor(HSSFColor.GREY_25_PERCENT.index);
    cellStyleTitle.setFillForegroundColor(HSSFColor.GREY_40_PERCENT.index);

    cellStyleTitle.setBorderBottom(HSSFCellStyle.BORDER_THIN);
    cellStyleTitle.setBorderLeft(HSSFCellStyle.BORDER_THIN);
    cellStyleTitle.setBorderTop(HSSFCellStyle.BORDER_THIN);
    cellStyleTitle.setBorderRight(HSSFCellStyle.BORDER_THIN);

    // Value Cell Style 정의
    HSSFCellStyle cellStyleValue = wb.createCellStyle();
    cellStyleValue.setWrapText(true);
    cellStyleValue.setAlignment(HSSFCellStyle.ALIGN_CENTER);
    cellStyleValue.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
    cellStyleValue.setBorderBottom(HSSFCellStyle.BORDER_THIN);
    cellStyleValue.setBorderLeft(HSSFCellStyle.BORDER_THIN);
    cellStyleValue.setBorderTop(HSSFCellStyle.BORDER_THIN);
    cellStyleValue.setBorderRight(HSSFCellStyle.BORDER_THIN);

    Calendar cal = Calendar.getInstance();
    String var = String.valueOf(cal.get(Calendar.YEAR)) + "년 ";
    var += String.valueOf(cal.get(Calendar.MONTH) + 1) + "월 ";
    var += String.valueOf(cal.get(Calendar.DAY_OF_MONTH)) + "일 ";
    String[] subTitle = { titleNm };
    Vector titleVector = new Vector();
    titleVector.add(subTitle);

    // Title 생성
    int i = 0, k = 0;
    String[] tmp = null;

    String s = "";
    String temp_header = "";
    String temp_header_key = "";

    HashMap rMap1 = (HashMap) list.get(0);
    Set set = rMap1.entrySet();
    Iterator key1 = set.iterator();

    while (key1.hasNext()) {
        Entry entry = (Entry) key1.next();
        temp_header += (String) entry.getKey() + ",";

    }
    tmp = filedDiv(temp_header, ",");
    makeTitle(sheet, titleVector, wb, headerNm.length); //상단 타이틀

    String id = loginVO.getMberId();
    String nm = loginVO.getMberNm();

    String subTitle2 = "다운로드 받은 사람( 이름: " + nm + " 아이디: " + id + " )/ 자료생성일 : " + var;
    makeTitle_sub(sheet, subTitle2, wb, headerNm.length); //상단 타이틀 서브
    row = sheet.createRow((short) 2); //행추가
    for (i = 0; i < headerNm.length; i++) { // 헤더명 사이즈 만큼 loop
        cell = row.createCell((short) i);
        cell.setCellType(HSSFCell.CELL_TYPE_STRING);
        sheet.setColumnWidth(i, (short) ((colSize[i]) * 256)); //칼럼 싸이즈 조정
        for (int l = 0; l < tmp.length; l++) //DB hashMap 에서 같은 칼럼명의 데이터와 매핑
        {
            if (headerNm[i].equals(tmp[l]))
                cell.setCellValue(tmp[l]);
        }
        cell.setCellStyle(cellStyleTitle);
    }

    // 내용 생성
    try {
        for (int j = 0; j < list.size(); j++) {

            HashMap rMap2 = (HashMap) list.get(j);

            HSSFRow rowOut = sheet.createRow((short) (j + 3));

            for (i = 0; i < headerNm.length; i++) {
                cell = rowOut.createCell((short) i);
                cell.setCellValue(makeExcelMutiLine(rMap2.get(headerNm[i]) == null ? "" : rMap2.get(headerNm[i]) + ""));
                cell.setCellStyle(cellStyleValue);
                HSSFCellUtil.setAlignment(cell, wb, (short) range[i]); //정렬
            }
        }

    } catch (Exception e1) {
        e1.getMessage();
    }

}
```
#### filedDiv
```java
// 컴마(,) String -> String [] 변환
public String[] filedDiv(String strValue, String tmp) throws IOException {
    StringTokenizer token = new StringTokenizer(strValue, tmp);
    String s[] = new String[token.countTokens()];
    int i = 0;

    while (token.hasMoreTokens()) {
        s[i] = token.nextToken();
        i++;
    }
    return s;
}
```
#### makeTitle
```java
public static void makeTitle(HSSFSheet sheet, Vector title, HSSFWorkbook wb, int size) throws IOException, NamingException {
    HSSFRow row;
    HSSFCell cell;
    Region region = new Region(0, (short) 0, 0, (short) (size - 1)); // 0번째 줄의 0칼럼부터 헤더 사이즈 만큼 merge 함
    sheet.addMergedRegion(region);
    HSSFFont font = wb.createFont();
    font.setFontHeight((short) 600); //글짜 크기를 800 으로 함
    HSSFCellStyle cellStyleTitle1 = wb.createCellStyle();
    cellStyleTitle1.setWrapText(true);
    cellStyleTitle1.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
    cellStyleTitle1.setAlignment(HSSFCellStyle.ALIGN_CENTER);
    cellStyleTitle1.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
    cellStyleTitle1.setFillBackgroundColor(HSSFColor.WHITE.index);
    cellStyleTitle1.setFillForegroundColor(HSSFColor.WHITE.index);
    cellStyleTitle1.setFont(font);

    for (int i = 0; i < title.size(); i++) {
        String t[] = (String[]) title.get(i);

        row = sheet.createRow((short) 0); // 0번째 줄 추가
        row.setHeight((short) 1200); // 엑셀의 높이를 1200으로 함

        for (int j = 0; j < t.length; j++) {
            cell = row.createCell((short) j);
            if (j == 0) {
                cell.setCellType(HSSFCell.CELL_TYPE_STRING);

                cell.setCellValue(t[j]);
                cell.setCellStyle(cellStyleTitle1);
            } else if (j != 0 && !t[j].equals("")) {
                cell.setCellValue(t[j]);
                HSSFCellUtil.setAlignment(cell, wb, (short) 3);
            }
        }
    }
}
```
#### makeTitle_sub
```java
public static void makeTitle_sub(HSSFSheet sheet, String title, HSSFWorkbook wb, int size) throws IOException, NamingException {
    HSSFRow row;
    HSSFCell cell = null;
    Region region = new Region(1, (short) 0, 1, (short) (size - 1)); // 0번째 줄의 0칼럼부터 헤더 사이즈 만큼 merge 함
    sheet.addMergedRegion(region);
    HSSFFont font = wb.createFont();
    font.setFontHeight((short) 180);
    HSSFCellStyle cellStyleTitle1 = wb.createCellStyle();
    cellStyleTitle1.setWrapText(true);
    cellStyleTitle1.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
    cellStyleTitle1.setAlignment(HSSFCellStyle.ALIGN_RIGHT);
    cellStyleTitle1.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
    cellStyleTitle1.setFillBackgroundColor(HSSFColor.WHITE.index);
    cellStyleTitle1.setFillForegroundColor(HSSFColor.WHITE.index);
    cellStyleTitle1.setFont(font);

    row = sheet.createRow((short) 1); // 1번째 줄 추가
    row.setHeight((short) 300); // 엑셀의 높이를 100으로 함
    cell = row.createCell((short) 0);
    cell.setCellType(HSSFCell.CELL_TYPE_STRING);

    cell.setCellValue(title);
    cell.setCellStyle(cellStyleTitle1);
}
```
#### makeExcelMutiLine
```java
public static String makeExcelMutiLine(String in) {
    if (in == null || in.trim().equals("")) {
        return in;
    }
    String out = in.replaceAll("\r\n", "\n");
    return out;
}
```

### XML alias로 생성시킬 엑셀 컬럼이름과 동일하게 지정.
```xml
<select id="DAO.excelDownlosd" parameterClass="String" resultClass="java.util.HashMap">
    SELECT
    name   AS "성명"
    telNo  AS "전화번호"
    email  AS "이메일"
    posiNm AS "직장명"
    FROM TABLE
<select>
```

### Javascript
```javascript
function fncExcelSubmit() {
	document.acForm.action = "/common/excelDownlosd.do";
	document.acForm.submit();
}
```
