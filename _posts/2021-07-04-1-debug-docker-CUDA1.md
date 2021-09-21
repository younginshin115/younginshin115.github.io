---
title:  "[디버깅][Docker] 210704 Could not load dynamic library 'libcuda.so.1'; dlerror: libcuda.so.1: cannot open shared object file: No such file or directory;"
excerpt: "ML 기반 챗봇 Javas 개발기8 - Docker CUDA 오류 모음1"

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

<p class="error_msg">[2021-07-04 09:29:38.418389: W tensorflow/stream_executor/platform/default/dso_loader.cc:64] Could not load dynamic library 'libcuda.so.1'; dlerror: libcuda.so.1: cannot open shared object file: No such file or directory;</p>

libcuda.so.1 파일을 찾지 못해서 발생한 문제로 path를 추가해준다.

[1] 컨테이너에서 해당 파일의 위치를 찾는다.
```
find /usr/ | grep libcuda.so.1
```

<p style="background-color:black;"><img src="/assets/images/21092102.png" /></p>

[2] Dockerfile에서 LIBRARY_PATH를 추가한다.
```
ENV LD_LIBRARY_PATH ${LD_LIBRARY_PATH}:/usr/local/cuda/lib64/stubs:/usr/local/cuda/compat
```

<p style="background-color:black;"><img src="/assets/images/21092103.png" /></p>