---
layout:  post
title: Javascript 캘린더 설정(datepicker)
tags:
- jquery
- javascript
- calendar
---


### Javascript

#### 공통부분 js
```javascript

function toDatepicker(objId)
{

	$('#'+objId).datepicker({
		changeMonth: true,
		changeYear: true,
//		yearRange: '2000:'+(new Date()).getFullYear()
//		yearRange: 'c-100:c+5'
    yearRange: '-100:+5'
	});
}
function openDatepicker(objId)
{
	$('#'+objId).focus();
}
```
#### 해당페이지 js
```javascript
$(document).ready(function() {
	// 반복문일 경우 하단으로 설정
	<c:forEach items="${sereList}" varStatus="status">
		toDatepicker('termEndDay${status.count}');
	</c:forEach>
});
```

#### 해당페이지 jsp
```jsp
<input type="text" name="termEndDay${status.count}" id="termEndDay${status.count}" value="${result2.termEndDay}" readonly="true"/>
<a href="javascript:void(0);" onclick="openDatepicker('termEndDay${status.count}'); return false;" class="calendar_b" title="날짜조회"></a>
```
날짜 들어갈 input 태그에는 id넣어주면 됨(ready로 생성시켜준id).
a태그는 openDatepicker
