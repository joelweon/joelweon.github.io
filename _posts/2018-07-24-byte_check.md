---
layout:  post
title: javascript byte 체크
tags:
- javascript
- byte
---

### javascript로 한글 바이트 체크

바이트 보이는 input

```jsp
<input type="text" name="cretExhiConeLength" size="4" readonly="true">&nbsp;Bytes
```

바이트 체크할 textarea
```jsp
<textarea rows="5" cols="68" name="cretExhiCone" onkeyup="fnByteCheck(this); return false;"></textarea>
```

```javasscript
// 바이트 체크
function fnByteCheck(input) {
    var max_byte  = 4000;

    if(getByteLength(input) > max_byte){
        alert("4000 Byte "+ "<c:out value='${W107}' default='문자수를 초과하셨습니다.!'/>");
        checkByteLen(input, 0, max_byte);
        input.focus();
    }

    $("input[name=" + input.name + "Length" + "]").val(getByteLength(input));
    }

/**
 * 문자열 Byte 길이 체크
 * 한글: 3Byte, 이외 2Byte, 1Byte, 줄바꿈: 2Byte
 */
function getByteLength(input) {
	
	var stringByteLength = 0;
	
	stringByteLength = (function(s,b,i,c){
		//한글: 3Byte, 기타: 2Byte, 1Byte
	    //for(b=i=0;c=s.charCodeAt(i++);b+=c>>11?3:c>>7?2:1);
		//한글: 3yte, 기타: 2Btye, 1Byte, 줄바꿈: 2Byte
		for(b = i = 0; c = s.charCodeAt(i++); b += c>>11 ? 3 : c>>7 ? 2 : c>>4 ? 1 : c == 10 ? 2 : 1);
	    return b
	})(input.value);
	
	return stringByteLength;
}

function checkByteLen(inputObj, min, max){
	var dataLen = getByteLength(inputObj);
	var returnBoolean = dataLen >= min && dataLen <= max;
	if(!returnBoolean){
		inputObj.value = subStringChar(inputObj.value, max);
	}
	
	return returnBoolean;
}
```
