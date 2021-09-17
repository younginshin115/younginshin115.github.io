---
title:  "[디버깅][Linux] 210917 쉘 스크립트 파일(.sh)에서 Syntax error: Bad for loop variable 에러가 발생할 때"
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
last_modified_at: 2021-09-17T23:09:00
---

Windows에서 WSL로 쉘 스크립트 파일(.sh)을 실행시킬 때 자꾸 아래와 같은 오류가 발생하였다.
<p class="error_msg">Syntax error: Bad for loop variable</p>

sh에서는 for(()) 형식을 지원하지 않는데 이 형식을 사용한 쉘 스크립트 파일이 sh로 실행되면서 발생한 오류였다.
bash로 명시해주면 문제가 해결된다.

<p class="code"><img src="/assets/images/21091703.png" /></p>