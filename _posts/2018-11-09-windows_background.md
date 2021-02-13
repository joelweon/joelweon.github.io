---
layout:  post
title: Windows 잠금 화면 Windows 추천 사진 저장
tags:
- windows
- background
- image
---

1. 탐색기를 열고 상단의 주소 창에 아래의 경로를 복사 및 붙여넣기하고 Enter 키를 누릅니다.  
`%LocalAppData%\Packages\Microsoft.Windows.ContentDeliveryManager_cw5n1h2txyewy\LocalState\Assets`

2. 해당 경로로 이동되면 파일들을 모두 선택한 후 복사하여 임의의 경로에 붙여넣기합니다.  
(아래 예시에서는 내PC-사진폴더에서 spotlight 폴더를 생성하여 붙여넣기하였습니다.)

3. 복사한 파일을 모두 선택한 채로 탐색기 좌측 상단의 메뉴에서 [파일 - 명령 프롬프트 열기]를 클릭합니다.

4. 명령 프롬프트가 실행되면 아래의 명령을 입력하고 Enter 키를 누릅니다.  
(jpg 대신에 png 및 다른 이미지 파일 확장자를 입력하실 수도 있습니다.)
`ren * *.jpg`

5. 앞서 탐색기에서 선택했던 파일들의 확장자가 변경된 것을 확인하여 원하는 이미지를 사용합니다.

[참고]
탐색기의 보기 메뉴에서 아주 큰 아이콘으로 변경하시면, 사진 미리보기를 통해서 사진 파일을 확인하기에 용이합니다.  
또한, 사진 크기를 확인하시려면 열 부분(이름, 날짜, 유형, 크기 등이 표시되는 부분)을 마우스 오른쪽 버튼으로 클릭한 후 사진 크기 항목에 체크하시면, 파일의 사진 크기를 확인하기에 용이합니다.

> https://answers.microsoft.com/ko-kr/windows/forum/windows_10-desktop-winpc/%EC%9C%88%EB%8F%84%EC%9A%B010/f3394cca-dad7-4d00-ac24-329898fb736d