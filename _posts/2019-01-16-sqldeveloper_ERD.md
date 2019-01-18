---
layout:  post
title: SQLDeveloper
tags:
- sql
- sqldeveloper
---

### DB에서 ERD 뽑기

파일 > Data Modeler > 임포트 > 데이터 딕셔너리

->

접속되어있는 데이터베이스 선택후 다음 > 스키마체크 후 다음 > 테이블선택


## 저장된 ERD 익스포트

파일 > Data Modeler > 익스포트 > DataModeler 디자인으로 -> 해당모델 선택 -> 익스포트

## .dmd 파일 임포트하기

익스포트하면 .dmd파일과 같은이름의 폴더가 생성된다.  
같은 경로에 넣고 임포트는 다음과 같이 하면된다.

파일 > Data Modeler > 임포트 > Data Modeler 디자인 -> .dmd파일 선택

모델 관리는 보기 > Data DataModeler > 브라우저 -> 관계형모델 에서 관리.