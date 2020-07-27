---
layout:  post
title: PostgreSQL
tags:
- postgresql
- enum
---

su - postgres

psql --port 포트 -d DB명

또는 

sudo -u postgres -i psql -p 포트 -d DB명

#### 테이블 보기
\d

#### 쿼리 실행
\g

### DB Lock 확인
```sql
select *
from pg_catalog.pg_stat_activity
where wait_event_type = 'Lock'
order by query

select locktype, relation, "mode", transactionid, pid, "granted" from pg_locks

select * from pg_locks l
join pg_stat_activity s
on l.pid = s.pid
```

### Sequence 초기화
ALTER SEQUENCE 시퀀스이름 RESTART WITH 1

### DB_enum_type 추가
ALTER type en_sub_type ADD value IF NOT EXISTS 'UPLOAD_FILE';

### DB_enum_type 삭제
delete from pg_enum
where enumlabel = 'UPLOAD_FILE'

DELETE FROM pg_enum
WHERE enumlabel = 'UPLOAD_FILE'
  AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'en_task_type');


### json_array
SELECT json_array_elements(i_filter::json)