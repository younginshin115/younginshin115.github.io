---
title:  "[Debug][Python] 210623 startJVM() got an unexpected keyword argument 'convertStrings'"
excerpt: "ML 기반 챗봇 Javas 개발기2"

toc: false
toc_sticky: false

categories:
  - Debug
tags:
  - Debug
  - Python
  - Konlpy
  - Javas
last_modified_at: 2021-06-23T10:36:00
---

<br>
ML 기반 챗봇을 개발하던 중 채팅 메시지를 분석하기 위해 한글 토큰화 모듈인 Konlpy를 설치했다. 
사용하려고 했더니 아래와 같은 오류가 발생했다.

<p class="error_msg">startJVM() got an unexpected keyword argument 'convertStrings'</p>

Lib\site-packages\konlpy 폴더의 jvm.py 파일에서 convertString=True 를 주석처리 한다.
해당 파일의 위치는 개발 환경마다 다를 수 있다.
나는 Windows 환경에서 가상환경을 사용하였고 아래 경로에서 발견하여 수정했다.

<p class="error_msg">venv\Lib\site-packages\konlpy\jvm.py</p>
