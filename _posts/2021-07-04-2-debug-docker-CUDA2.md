---
title:  "[디버깅][Docker] 210704 failed call to cuInit: UNKNOWN ERROR (303)"
excerpt: "ML 기반 챗봇 Javas 개발기9 - Docker CUDA 오류 모음2"

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

<p class="error_msg">[2021-07-04 09:29:38.418506: W tensorflow/stream_executor/cuda/cuda_driver.cc:326] failed call to cuInit: UNKNOWN ERROR (303)</p>

dockerfile에 nvidia-modprobe를 설치하는 문구를 추가한다.

<p style="background-color:black;"><img src="/assets/images/21092104.png" /></p>
