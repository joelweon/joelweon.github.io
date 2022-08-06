---
layout:  post
title: JavaScript 원본 배열 변경 여부 함수
tags:
- javascript
- array
---

## 원본 배열 변경 X
- `Array.isArray` - boolean 반환
- `Array.prototype.concat` - 추가된 새로운 배열 반환
- `Array.prototype.every` - 주어진 조건이 모두 통과하는지 여부 boolean 반환
- `Array.prototype.forEach` - undefined 반환
- `Array.prototype.filter` - 조건에 맞는 요소들의 새로운 배열 반환
- `Array.prototype.includes` - boolean 반환
- `Array.prototype.indexOf` - 있으면 해당 index 없으면 -1 반환
- `Array.prototype.map` - 함수 호출 결과를 반환
- `Array.prototype.slice` - 어떤 배열의 begin부터 end까지(end 미포함)에 대한 얕은 복사본을 새로운 배열 객체로 반환
- `Array.prototype.some` - 하나라도 조건 통과하면 true. boolean 반환
- `[...Array]`

## 원본 배열 변경 O
- `Array.prototype.fill` - (value, ?start, ?end) value 채운 배열로 반환
- `Array.prototype.join` - 합쳐서 string으로 반환("1,2,3")
- `Array.prototype.pop` - 마지막 요소를 제거하고 그 요소를 반환
- `Array.prototype.push` - 끝에 하나 이상의 요소를 추가하고, 배열의 새로운 길이를 반환
- `Array.prototype.reverse` - 순서 반전한 배열 반환
- `Array.prototype.shift` - 첫 번째 요소를 제거하고, 제거된 요소를 반환
- `Array.prototype.splice` - 제거한 경우 제거한 요소를 담은 배열, 제거하는게 없으면 빈 배열 반환
- `Array.prototype.unshift` - 배열 첫번째에 추가 후 length 반환
