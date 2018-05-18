---
layout:  post
title: 오라클 over count
tags:
- database
- oracle
- count
---

COUNT(*) OVER () : 전체행 카운트


COUNT(*) OVER (PARTITION BY 컬럼) : 그룹단위로 나누어 카운트


MAX(컬럼) OVER() : 전체행 중에 최고값


MAX(컬럼) OVER(PARTITION BY 컬럼) : 그룹내 최고값


MIN(컬럼) OVER () : 전체행 중에 최소값


MIN(컬럼) OVER (PARTITION BY 컬럼) : 그룹내 최소값


SUM(컬럼) OVER () : 전체행 합


SUM(컬럼) OVER (PARTITION BY 컬럼) : 그룹내 합


AVG(컬럼) OVER () : 전체행 평균


AVG(컬럼) OVER (PARTITION BY 컬럼) : 그룹내 평균


STDDEV(컬럼) OVER () : 전체행 표준편차


STDDEV(컬럼) OVER (PARTITION BY 컬럼) : 그룹내 표준편차


RATIO_TO_REPORT(컬럼) OVER () : 현재행값/SUM(전체행값) 퍼센테이지로 나타낼경우 100곱하면 됩니다.


RATIO_TO_REPORT(컬럼) OVER (PARTITION BY 컬럼) : 현재행값 / SUM(그룹행값) 퍼센테이지로 나타낼경우 100곱하면 됩니다.
