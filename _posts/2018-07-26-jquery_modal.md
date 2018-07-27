---
layout:  post
title: Jquery 모달
tags:
- jquery
- javascript
---


### Javascript
```javascript
/****************************************************************
 *
 * 파일명 : Opinion.js
 * 설  명 : 의견부분 모달 JavaScript
 * **************************************************************/

var bbscttId;
var registerId;

/* 의견목록 불러오기 */
function fn_modal_contents(id1, id2) {
	$(".messege").children().remove();
	bbscttId = id1;
	registerId = id2;
	$.ajax({
		url     : "/home/OpinionList.do",
		method  : "GET",
		type    : "json",
		data    : {"bbscttId" : bbscttId},
		success : function(result) {
			$.each(result, function(index, item) {
				var modalHtml;
				/* 본인 의견일 경우 */
				if (item.registerId == registerId) {
					modalHtml =
						"<div id='opinion"+index+"' class='M p_t30'>"
						+ "<h3>"+item.userNm+"</h3>"
						+ "<span>"+item.rgsde+"</span>"
						+ "<div class='rightT'>"
						+ "<p>"+item.con+"</p>"
						+ "</div>"
						+ "<textarea id='"+item.opinionId+"' class='form-control textareaM modal_none' onfocus='resizeTextarea(this); return false;'>"+item.con+"</textarea>"
						+ "<input type='button' class='editBtn' value='수정' onclick='fn_modal_update_form(this); return false;'>"
						+ "</div>";
				} else {
					modalHtml =
						"<div id='opinion"+index+"' class='Y'>"
						+ "<h3>"+item.userNm+"</h3>"
						+ "<div class='leftT'>"
						+ "<p>"+item.con+"</p>"
						+ "</div>"
						+ "<span>"+item.rgsde+"</span>"
						+ "</div>";
				}

				$(".messege").append(modalHtml);
            });

			$(".wrapMessege").scrollTop($(".messege").height());
			location.href="#wrapModal";
			var nowScrollTop = $("html").scrollTop();
			$('.modalCont').css('top', nowScrollTop+256);
		}
	});
}

/* 업데이트 폼 호출 */
function fn_modal_update_form(self) {
	$(self).parent().find('textarea').attr("class","form-control textareaM modal_in_block");
	$(self).parent().find('.rightT').attr("class","rightT modal_none");
	var buttonHtml =
		"<div class='btnM'><input type='button' class='cancel' value='취소' onclick='fn_modal_cancel(this); return false;'>"
		+ "<span>|</span>"
		+ "<input type='button' class='save' value='저장' onclick='fn_modal_update(this); return false;'></div>"
	$(self).parent().append(buttonHtml);
	$(self).parent().find('textarea').focus();
	$(self).remove();
}
/* 업데이트 폼 취소 */
function fn_modal_cancel(self) {
	$(self).parent().parent().find('textarea').attr("class","form-control textareaM modal_none");
	$(self).parent().parent().find('.rightT').attr("class","rightT modal_in_block");
	$(self).parent().parent().append("<input type='button' class='editBtn' value='수정' onclick='fn_modal_update_form(this); return false;'>");
	$(self).parent().remove();
}

/* 신규 저장 */
function fn_modal_save() {
	var form = {
		"bbscttId" : bbscttId,
		"con" :  $("#newCon").val()
	};
	$.ajax({
		url  : "/home/addOpinion.do",
		method : "POST",
		type    : "json",
		contentType: "application/json",
		data : JSON.stringify(form),
		success : function(result) {
			if (result == "SUCCESS") {
				alert("저장완료");
			} else {
				alert("저장실패");
			}
			fn_modal_contents(bbscttId, registerId);
			$("#newCon").val("");
		}
	});
}

/* 업데이트 */
function fn_modal_update(self) {

	var form = {
		"opinionId" : $(self).parent().parent().find("textarea").attr("id"),
		"con" : $(self).parent().parent().find("textarea").val(),
	};
	$.ajax({
		url     : "/home/updateOpinion.do",
		method  : "POST",
		type    : "json",
		contentType: "application/json",
		data    : JSON.stringify(form),
		success : function(result) {
			if (result == "SUCCESS") {
				alert("수정완료");
			} else {
				alert("수정실패");
			}
			fn_modal_contents(bbscttId, registerId);
		}
	});
}

/* 닫기버튼 */
function fn_modal_exit() {
	location.href="#close";
	$("#modal_content").children().remove();
}

/* textarea 자동 높이조절 */
function resizeTextarea(obj) {
	obj.style.height = (12+obj.scrollHeight)+"px";
}
```

### JSP
```jsp
<link type="text/css" rel="stylesheet" href="<c:url value='/'/>css/common/modal.css"/>
<script type="text/javascript" src="<c:url value='/js/Opinion.js'/>" ></script>

<!-- 모달 -->
<a href="javascript:void(0);" onclick="fn_modal_exit(); return false;" class="wrapModal"  id="wrapModal"></a>
<div class="modalCont">
    <div class="modalTop">
        <h2 class="f_l"><c:out value="${mntnceReqVO.title}"/></h2>
        <button type="button" class="btn" onclick="fn_modal_exit(); return false;"><img src="/images/icon/close.png"></button>
    </div>
    <div class="wrapMessege">
        <!-- 의견목록 -->
        <div class="messege"></div>
    </div>
    <div class="sendT">
        <textarea id="newCon" class="sendMsg" placeholder="의견을 입력하세요." cols=" " rows="5"></textarea>
        <input type="button" value="등록" class="registBtn" onclick="fn_modal_save(); return false;">
    </div>
</div>
<!-- /모달 -->
```

### CSS
```css
@charset "utf-8";



/* 모달창 */
.modalLink{cursor: pointer; }

.wrapModal{
	position: fixed;
	top: 0;
	left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    opacity:0;

	-webkit-transition: opacity 400ms ease-in;
    -moz-transition: opacity 400ms ease-in;
    transition: opacity 400ms ease-in;

	visibility: hidden;
	z-index: 9999;
}
.wrapModal:target{
	opacity: 1;
    visibility: visible;
}
.modalCont{
	position: absolute;
	display: inline-block;
/* 	top: 20%; */
	left: 50%;
	width: 512px;
	height: auto;
	background-color: #fff;
	cursor: default;
	padding: 10px;

	visibility: hidden;
    z-index: 9999;

	-webkit-transition: opacity .5s, top .5s;
    -moz-transition: opacity .5s, top .5s;
	-webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
}
.wrapModal:target+.modalCont{
	opacity: 1;
    visibility: visible;
}

/* 모달 디자인 */
/*안의 내용 스크롤*/
.wrapMessege{
	min-height: 503px;
	max-height: 503px;
	overflow-x: hidden;
	overflow-y: auto;
}

/*모달 위 의견제목 및 버튼*/
.modalTop {padding: 16px 8px; display: inline-block; border-bottom: 1px solid #efefef;}
.modalTop h2{padding-left: 10px;}
.modalTop button {padding: 2px 5px; position:absolute; background: none; border: none; right: 10px; top: 10px}
.modalTop button:hover{background-color: #E0E0E0;}


/* 상대방 css */
.Y{padding: 8px;}
.Y h3{padding: 6px 0px; }
.leftT{
	width: 60%;
	border: 1px solid #bdb9b9;
	border-radius: 5px;
	padding: 8px;
	margin-top: 5px;
	height: auto;
	display: inline-block;
	vertical-align: bottom;  
}
.leftT p, .rightT p {
	word-break: break-all;
	line-height: 1.6em;
	white-space: pre-line;
}

/* 본인 css */
.M span, .Y span{margin-left: 5px; margin-right: 5px;}
.M{padding-right: 12px; text-align: right}
.M h3{padding: 6px 0px; }
.rightT{
	width: 60%;
	height: auto;
	border: 1px solid #bdb9b9;
	border-radius: 5px;
	padding: 8px;
	margin-top: 5px;
	display:inline-block;
	vertical-align: bottom;
	text-align: left;
}

/*수정버튼*/
.editBtn{margin-top: 5px; border: none; background: none; color: #db1b1b;  padding-right: 12px; width: 100%; text-align: right; cursor: pointer;}
/*수정 박스*/
/* .E{text-align: right; padding-right: 12px;} */
.E h3{padding: 6px 0px; }
.textareaM {
	width: 60%;
	height: auto;
	padding: 8px;
	margin-top: 5px;
	border: 1px solid #bdb9b9;
}

.modal_none {
	display: none;
}
.modal_in_block {
	display: inline-block;
}

/*텍스트 입력창 및 전송버튼*/
.sendT {padding-top: 10px; border-top: 1px solid #efefef;}
.sendT textarea{width: 75%; border: 1px solid #d2d2d2; padding: 5px;min-height: 100px;  vertical-align: bottom;}

/*저장 및 취소 버튼*/
.btnM{text-align: right; padding-right: 12px; width: 100%; display: inline-block; }
.btnM span{vertical-align: middle; font-size: 8pt;}
.save, .cancel{background: none; border: none; padding: 8px 12px; cursor: pointer;}
.save{color: #356ac2;}
```
