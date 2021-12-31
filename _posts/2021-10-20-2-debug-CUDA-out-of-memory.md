---
title:  "[Debug][CUDA] 211020 CUDA out of memory."
excerpt: "Pytorch 기반 KoBERT를 학습시킬 때 발생한 오류 해결"

toc: false
toc_sticky: false

categories:
  - Debug
tags:
  - Debug
  - Python
  - Pytorch
  - KoBERT
  - CUDA
last_modified_at: 2021-10-20T15:42:00
---

KoBERT를 학습시킬 때 CUDA out of memory 오류가 발생했다.

<p class="error_msg">CUDA out of memory. Tried to allocate 20.00 MiB (GPU 0; 4.00 GibB total capacity; 2.92 GiB already allocated; 0 bytes free; 3.12 GiB reserved in total by PyTorch)</p>
<p class="code"><img src="/assets/images/21102003.png" /></p>

## 시도 1

아래 명령어로 CUDA의 메모리 캐시를 비우려고 시도했다.
```python
import torch
torch.cuda.empty_cache()
```

하지만 메모리 캐시가 지워지지 않아 실패했다.

## 시도 2

가비지 콜렉트를 먼저 한 뒤 캐시를 비우려고 시도했다.

```python
import torch, gc
gc.collect()
torch.cuda.empty_cache()
```

첫번째 시도와 마찬가지로 아무런 일도 일어나지 않아서 실패했다.

## 시도 3

Nvidia-smi 명령어로 현재 실행되고 있는 process를 확인한 뒤 강제 종료하는 방법을 시도했다.<br>
하지만 현재 실행되고 있는 process 중 메모리를 사용하고 있는 것이 없어서 강제 종료할 수 없었다.<br><br>
이 방법도 실패였다.

## 시도 4

현재 실행되고 있는 CUDA를 종료했다가 다시 켜는 방법을 시도했다.

```python
from numba import cuda
cuda.select_device(0)
cuda.close()
cuda.select_device(0)
```

이 방법을 사용하니까 메모리를 비울 수 있었다. 사용 중인 메모리가 90%에서 4%로 줄었지만 여전히 Out of memory 오류가 발생했다. 기존 코드가 아니라 새로 시도한 코드가 메모리를 많이 사용하기 때문에 발생한 오류라는 걸 깨달았다.

## 시도 5

그래서 메모리 사용량을 줄이기 위해 Batch를 기존 32에서 16으로 줄여서 학습을 시도했다.<br>
그랬더니 코드가 제대로 실행되었다.

## 참고

GPU 사용랑은 아래 코드로 확인할 수 있다.

```python
from GPUtil import showUtilization as gpu_usage
gpu_usage() 
```
<img src="/assets/images/21102004.png" />