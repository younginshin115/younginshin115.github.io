---
title:  "[디버깅][Python] 210623 Python signals: ValueError: signal only works in main thread"
excerpt: "ML 기반 챗봇 Javas 개발기4"

toc: false
toc_sticky: false

categories:
  - Debug
tags:
  - Debug
  - Python
  - LiveChat
  - Javas
  - Google Youtube Streaming API
last_modified_at: 2021-06-23T18:39:00
---

<br>
ML 기반 챗봇을 개발 중이었다.
웹 프레임워크로는 Python 기반의 Flask를 선택했고 Youtube 채팅을 Youtube Streaming API를 사용하여 스크레이핑해오는 구조였다.
LiveChat 함수를 사용하던 중 아래와 같은 오류가 발생했다.

<p class="error_msg">Python signals: ValueError: signal only works in main thread</p>

LiveChat 함수에 interruptable=False 파라메터 추가해서 해결했다.

<img src="/assets/images/21092001.png" />
