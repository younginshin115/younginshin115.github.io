---
title:  "[Debug][Docker] 210704 could not load dynamic library libcudnn.so.8"
excerpt: "ML 기반 챗봇 Javas 개발기10 - Docker CUDA 오류 모음3"

toc: false
toc_sticky: false

categories:
  - Debug
tags:
  - Debug
  - CUDA
  - Docker
last_modified_at: 2021-07-04T09:29:00
---

Docker에서 CUDA 컨테이너를 구축할 때 아래와 같은 오류가 발생했다.

<p class="error_msg">could not load dynamic library libcudnn.so.8</p>

기본 이미지를 cudnn 포함한 이미지로 바꿨더니 해결되었다.

|||
|:---|:---|
|수정 전|FROM nvidia/cuda:11.0-runtime-ubuntu18.04|
|수정 후|FROM nvidia/cuda:11.0-<span style="color:blue">cudnn8</span>-runtime-ubuntu18.04|

