---
title:  "[튜토리얼][WSL] 210917 WSL 버전 바꾸는 법"
excerpt: "Windows에서 WSL 버전을 바꾸는 방법"

toc: false
toc_sticky: false

categories:
  - Debug
tags:
  - Tutorial
  - WSL2
  - WSL1
  - Windows
last_modified_at: 2021-09-17T23:11:00
---

아래의 명령어로 WSL 버전을 변경할 수 있다.<br>
WSL1에서 WSL2로 업그레이드하거나<br>
WSL2에서 WSL1으로 다운그레이드할 때 사용할 수 있다.<br>
```
wsl --set-version {바꾸고싶은 WSL 이름} 버전
```
<img width="600px" src="/assets/images/21091704.png" />

WSL 이름은 아래 명령어로 확인할 수 있다.
```
wsl -l -v
```
<img width="600px" src="/assets/images/21091705.png" />
