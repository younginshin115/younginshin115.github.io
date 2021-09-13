---
title:  "[디버깅][Python] 210623 Microsoft Visual C++ 14.0 or greater is required. Get it with 'Microsoft C++ Build Tools'"
excerpt: "ML 기반 챗봇 Javas 개발기1"

toc: false
toc_sticky: false

categories:
  - Debug
tags:
  - Debug
  - Python
  - pip
  - Javas
last_modified_at: 2021-06-23T09:45:00
---

<br>
ML 기반 챗봇을 개발하며 필요한 모듈을 설치하던 중 아래와 같은 오류가 발생했다.

<p class="error_msg">error: Microsoft Visual C++ 14.0 or greater is required. Get it with "Microsoft C++ Build Tools"</p>
<img src="/assets/images/21091305.png" />

Windows는 C++ 패키지를 포함하는 Visual studio 2017를 설치한다.<br>
Linux는 gcc++를 설치한다.