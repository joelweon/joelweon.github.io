---
layout:  post
title: selectBox 복제하기
tags:
- select
- javascript
- sql
---

### selectBox 복제

#### javascript
```javascript
/* select 복제 */
var list = new Array();

function fn_clone(currentCode, selectName, tdId) {
	// 선택 눌렀을 때 제거
	if (currentCode.value == "") {
		currentCode.remove();
		return;
	}

	// 중복체크
	$("select[name='"+selectName+"'] option:selected").each(function() {
		if (this.value != "") {
			list.push(this.value);
		}
	})
	list.splice(list.indexOf(currentCode.value),1);

	// 마지막 select가 빈값인지 여부 체크
	var lastSelectVal = $("select[name='"+selectName+"']:last").val();

	for (var i in list) {
		if (currentCode.value == list[i]) {
			alert("중복된 값은 선택할 수 없습니다.");
			if (lastSelectVal == "") {
				currentCode.remove();
			} else {
				currentCode.value = "";
			}
			list = [];
			return;
		}
	}
	if (lastSelectVal != "") {
		$("select[name='"+selectName+"']:last").clone().appendTo($("#"+tdId+""));
	}
	list = [];
}
```

#### html
```html
<td colspan="3" id="selectPckageCode">
    <c:forTokens var="pckageCodeNmOne" items="${VO.pckageCodeNm}" delims=",">
        <select name="pckageCode" class="w_150" onchange="fn_clone(this,'pckageCode','selectPckageCode'); return false;">
            <option value="">선택</option>
            <c:forEach var="result" items="${code_001}" varStatus="status">
                <option value="${result.code}" <c:if test="${result.codeNm eq pckageCodeNmOne}">selected</c:if>><c:out value="${result.codeNm}"/></option>
            </c:forEach>
        </select>
     </c:forTokens>
     <select name="pckageCode" class="w_150" onchange="fn_clone(this,'pckageCode','selectPckageCode'); return false;">
        <option value="">선택</option>
        <c:forEach var="result" items="${code_001}" varStatus="status">
            <option value="${result.code}"><c:out value="${result.codeNm}"/></option>
        </c:forEach>
    </select>
</td>
```


### 콤마로 들어간 데이터 ID 넣고 값 받아오기

#### sql
```sql
(
SELECT wm_concat ((SELECT IDCODE.CODE_NM FROM LETTCCMMNDETAILCODE IDCODE WHERE IDCODE.CODE_ID = '001' AND IDCODE.CODE = txt))
FROM (
    SELECT TRIM (REGEXP_SUBSTR ((SELECT T.PCKAGE_CODE FROM 테이블 T WHERE T.유니크id = #유니크id#), '[^' || ',' || ']+', 1, LEVEL)) AS txt, LEVEL
    FROM dual
    CONNECT BY INSTR ((SELECT T.PCKAGE_CODE FROM 테이블 T WHERE T.유니크id = #유니크id#), ',', 1, LEVEL - 1) > 0)
)                                                                                                AS CodeNm
```
