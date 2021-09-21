---
title:  "[디버깅][Docker] 210704 cannot dlopen some gpu libraries"
excerpt: "ML 기반 챗봇 Javas 개발기11 - Docker CUDA 오류 모음4"

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

<p class="error_msg">cannot dlopen some gpu libraries</p>

호스트의 CUDA 버전과 동일한 버전의 이미지를 설치했더니 문제가 해결되었다.
CUDA 버전은 nvcc -V 명령어로 확인할 수 있다.

<p style="background-color:black;"><img src="/assets/images/21092105.png" /></p>

|||
|:---|:---|
|수정 전|FROM nvidia/cuda:<span style="color:blue">11.0</span>-cudnn8-runtime-ubuntu18.04|
|수정 후|FROM nvidia/cuda:<span style="color:blue">11.1</span>-cudnn8-runtime-ubuntu18.04|

