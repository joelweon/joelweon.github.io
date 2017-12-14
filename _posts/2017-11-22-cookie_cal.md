---
layout:  post
title: 쿠키 
tags:
- cookie
---

```javascript
//layout
	function fnSysPopup(){
		
		var today = new Date();
		var yyyy = today.getFullYear();
		var mm = today.getMonth() + 1;
		var dd = today.getDate();
		var date = yyyy.toString() + mm.toString() + dd.toString();
		
		if(fnGetCookie('sysPopup' + date) == null || fnGetCookie('sysPopup' + date) == ''){
			
			var option = "resizable=yes, scrolbars=yes, toolbar=no, width=520px, height=360px, status=yes, location=no, directory=no, number=no";
			var win = window.open("", "systemPopup", option);
			win.focus();
			win.location.href = getContextPath() + "/systemPopup.html";
		} else {
			
		}
	}
	
	function fnSysTempPopup(){
		
		var today = new Date();
		var yyyy = today.getFullYear();
		var mm = today.getMonth() + 1;
		var dd = today.getDate();
		var date = yyyy.toString() + mm.toString() + dd.toString();
		if(fnGetCookie('sysTempPopup' + date) == null || fnGetCookie('sysTempPopup' + date) == ''){
			
			var option = "resizable=yes, scrolbars=yes, toolbar=no, width=520px, height=360px, status=yes, location=no, directory=no, number=no, top=100px, left=100px";
			var win = window.open("", "systemTempPopup", option);
			win.focus();
			win.location.href = getContextPath() + "/systemTempPopup.html";
		} else {
			
		}
	}
	
	window.onload=function(){
		
		var today = new Date();
		var yyyy = today.getFullYear();
		// 1월이 0부터 시작
		var mm = today.getMonth() + 1;
		// getDay는 요일을 리턴 /일요일:0
		var dd = today.getDate();
		var date = yyyy.toString() + mm.toString() + dd.toString();
		
		var endDate = 20171123;

		if (Number(date) <= endDate) {
			fnSysPopup();
			fnSysTempPopup();
		};
  };
```

```javascript
// 팝업
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<script type="text/javascript">
		
		function fnAbortSysPopup(){
			
			var today = new Date();
			var yyyy = today.getFullYear();
			var mm = today.getMonth() + 1;
			var dd = today.getDate();
			var name = 'sysPopup' + yyyy.toString() + mm.toString() + dd.toString();

			fnSetCookie(name, 'sysPopup', 1);
			window.close();
		}
		
		function fnPopClose(){
			window.close();
		}
	</script>
	
	<style type="text/css">
		<!--
		body {
			margin: 0 auto;
			padding: 0;font-family: "맑은 고딕", "Malgun Gothic", 돋움, Dotum, Tahoma, Geneva, sans-serif;
		}
		
		p, img, ul, li, div, a {padding:0; margin:0;}
		img { border:0;}
		ul,ol,li{list-style:none;}
		
		.check_wrap { width:500px; height:350px; background-image:url(/res/images/systemPopup2.gif); background-repeat:no-repeat; margin: 0 auto; margin-top: 5px;}
		.check1 { float:left; width:380px; margin-top: 25px; margin-left: 20px; height:40px; line-height:40px; font-size:18px; font-weight:bold; }
		.check2 { float:left; width:380px; margin-top: 25px; margin-left: 20px; height:40px; line-height:30px; font-size:16px; font-weight:bold; }
		.check3 { float:left; width:380px; margin:85px 60px 0 60px; height:40px; line-height:40px; font-size:18px; font-weight:bold; text-align:center; }
		.close{text-align: center; padding-top: 315px;}
		-->
	</style>
	
<title> 시스템 일시 중단 안내</title>
</head>
<body>
	<div class="check_wrap">
		<div class="check1">
			<ul>
				<li> 시스템 일시 중단 안내</li>
			</ul>
		</div>
		<div class="check2">
			<ul>
				<li>노후 네트워크와 서버 장비교체 및 장비설치 작업으로 인한 시스템 사용이 일시적으로 중단 됩니다.</li>
			</ul>
		</div>
	 	<div class="check3">
		    <ul>
		    	<li>작업일시 : 2016. 11. 25(금) 22:00 부터</li>
		    	<li>2016. 11. 27(일) 24:00 까지
		    </ul>
	    </div>
	    <div class="close">
			<a href="javascript:fnAbortSysPopup();">오늘하루 이창을 열지 않습니다.</a>
			<span style="margin-left: 10px; margin-right: 10px;">|</span>
			<a href="javascript:fnPopClose();"><span style="font-size: 18px;">⌧</span>닫기</a>
		</div>
	</div>
</body>
</html>
```

자바스크립트 날짜에서 new Date() getMonth는 0부터 1월임.  
getDate가 날짜 / getDat가 요일(일요일부터 0)