---
title:  "[디버깅][Linux] 210917 쉘 스크립트 파일(.sh)에서 not in a function이나 not found 에러가 계속 발생할 때"
excerpt: "Windows에서 WSL2로 쉘 스크립트 파일(.sh)를 실행시킬 때 발생한 오류 해결"

toc: false
toc_sticky: false

categories:
  - Debug
tags:
  - Debug
  - Shell
  - WSL2
  - Ubuntu
  - Linux
last_modified_at: 2021-09-17T22:20:00
---

Windows에서 WSL로 쉘 스크립트 파일(.sh)을 실행시킬 때 자꾸 아래와 같은 오류가 발생하였다.
<p class="code"><img src="/assets/images/21091701.png" /></p>

Windows에서 작성된 파일을 Unix에서 실행시키려고 하니까 발생한 오류였다.
아래와 같이 dos 형식을 unix 형식으로 바꿔주면 제대로 실행된다.

```
dos2unix 쉘스크립트파일명
```
<p class="code"><img src="/assets/images/21091702.png" /></p>