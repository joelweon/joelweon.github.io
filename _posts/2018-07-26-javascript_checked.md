---
layout:  post
title: javascript checked 여부
tags:
- javascript
---

```javascript
/* 글 수정 function */
function fn_egov_update() {
	frm = document.getElementById("voForm");

	/* 메일발송 */
	if ($("#emailSndngAt").is(":checked")) {
		if ($("input[name='emailAdres']").val() != "") {
			$("#emailSndngAt").val("1");
		} else {
			alert("받는사람 이메일이 존재하지 않습니다.");
			$("#emailSndngAt").prop("checked",false);
			return;
		}
	} else {
		$("#emailSndngAt").val("0");
	}

	// 유효성 검사
 	if (!validateMntnceReqVO(frm)) {
		return;
	} else {
		if (confirm("<spring:message code='common.save.msg' />")) {
		  	frm.action = "<c:url value='/home/updateMntnceReq.do'/>";
		    frm.submit();
		}
	}
}
```
