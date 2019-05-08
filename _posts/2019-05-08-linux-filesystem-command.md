---
layout:  post
title: linux 파일시스템 관련 명령어
tags:
- linux
- filesystem
- command
---

### 장착된 하드디스크 출력
sudo fdisk -l

### 마운트된 파일시스템 확인
df -T

### 포맷하기
mkfs.xfs -f /dev/sda1

### 마운트하기
mount /dev/sda1 /home

### 마운트해제
umount /dev/sda1