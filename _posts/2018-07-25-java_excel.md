---
layout:  post
title: JAVA에서 Excel poi
tags:
- java
- excel
---


필요한 pom
eGOv 3.7.0에서는 통합으로 관리한다.
```xml
<repository>
    <id>mvn2</id>
    <url>http://repo1.maven.org/maven2/</url>
    <releases>
        <enabled>true</enabled>
    </releases>
    <snapshots>
        <enabled>true</enabled>
    </snapshots>
</repository>
<repository>
    <id>egovframe</id>
    <url>http://www.egovframe.go.kr/maven/</url>
    <releases>
        <enabled>true</enabled>
    </releases>
    <snapshots>
        <enabled>false</enabled>
    </snapshots>
</repository>
<repository>
    <id>egovframe2</id>
    <url>http://maven.egovframe.kr:8080/maven/</url>
    <releases>
        <enabled>true</enabled>
    </releases>
    <snapshots>
        <enabled>false</enabled>
    </snapshots>
</repository>

<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-compress</artifactId>
    <version>1.8.1</version>
</dependency>
```

org.apache.poi.ss.usermodel.Workbook  
-> 없는 경우

```xml
<repository>
    <id>mvn2</id>
    <url>http://repo1.maven.org/maven2/</url>
    <releases>
        <enabled>true</enabled>
    </releases>
    <snapshots>
        <enabled>true</enabled>
    </snapshots>
</repository>


<!-- 엑셀추가 -->
<dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi</artifactId>
    <version>3.10-FINAL</version>
</dependency>
```


***

#### Controller

```java
package egovframework.home.common.excel.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import egovframework.home.common.excel.service.ExcelService;

/**
 * @Class Name : ExcelController.java
 * @Description : Excel Controller class
 * @Modification Information
 *
 * @author wye
 * @since 2018.07.18
 * @version 1.0
 * @see
 *  
 *  Copyright (C)  All right reserved.
 */

@Controller
public class ExcelController {

    @Resource(name="excelService")    
    private ExcelService excelService;

    /**
	 * 엑셀다운
	 * @param
	 * @return void
	 * @exception Exception
	 */
    @RequestMapping("/common/excel/downloadExcel.do")
    public void downloadExcel(HttpServletRequest request, HttpServletResponse response, @RequestParam("excelId") String excelId) throws Exception {

    	Map<String, Object> map = new HashMap<String, Object>();
    	List<?> list = null;
    	String excelTitle = "";
    	String templateName = "";

    	if ("mntnceReq".equals(excelId)) {
    		list = excelService.selectMntnceReqExcel();
    		excelTitle = "제목";
    		templateName = "Template.xlsx";
    	}

    	map.put("list", list);

    	excelService.downloadExcel(request, response, map, excelTitle, templateName);
    }
}

```

#### serviceImpl
```java
package egovframework.home.common.excel.service.impl;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.stereotype.Service;

import egovframework.home.common.excel.service.ExcelService;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import net.sf.jxls.transformer.XLSTransformer;

/**
 * @Class Name : ExcelServiceImpl.java
 * @Description : Excel Business Implement class
 * @Modification Information
 *
 * @author wye
 * @since 2018.07.18
 * @version 1.0
 * @see
 *  
 *  Copyright (C)  All right reserved.
 */

@Service("excelService")
public class ExcelServiceImpl extends EgovAbstractServiceImpl implements ExcelService {

	@Resource(name="excelDAO")
    private ExcelDAO excelDAO;

	/* 엑셀 생성 */
    public void downloadExcel(HttpServletRequest request, HttpServletResponse response, Map<String , Object> beans, String filename, String templateFile) {
        String tempPath = request.getSession().getServletContext().getRealPath("/WEB-INF/template") ;

        try {

        	filename = URLEncoder.encode(get_Filename(filename), "UTF-8");

            InputStream is = new BufferedInputStream(new FileInputStream(tempPath + "\\" + templateFile));
            XLSTransformer transformer = new XLSTransformer();
            Workbook resultWorkbook = transformer.transformXLS(is, beans);
            response.setHeader("Content-Disposition", "attachment; filename=\"" + filename + ".xlsx\"");
            OutputStream os = response.getOutputStream();
            resultWorkbook.write(os);
            os.flush();
            os.close();

        } catch (Exception e) {
        	e.printStackTrace();
        }
    }

    /* 파일이름 생성 */
    public String get_Filename(String post) throws Exception {
        return String.format("%s_%s",get_Filename(), post);
    }
    public String get_Filename() throws Exception {
    	SimpleDateFormat ft = new SimpleDateFormat("yyyyMMddHHmm");
    	return ft.format(new Date());
    }

	/* 유지보수요청관리 리스트 추출 */
	@Override
	public List<?> selectMntnceReqExcel() {

		List<?> list = null;

		try {
			list = excelDAO.selectMntnceReqExcel();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
}

```

#### WEB-INF/template 폴더에 템플릿 엑셀 만들어서 넣을것.

|    아이디   |      이름     |
|:----------:|:------------:|
| ${list.id} | ${list.name} |




#### 에러
```
org.apache.poi.poifs.filesystem.OfficeXmlFileException: The supplied data appears to be in the Office 2007+ XML. You are calling the part of POI that deals with OLE2 Office Documents. You need to call a different part of POI to process this data (eg XSSF instead of HSSF)
```
=> HSSF 방식으로 해줘야함.
