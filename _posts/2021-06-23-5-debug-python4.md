---
title:  "[Python] Python signals: ValueError: signal only works in main thread"
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
ML 기반 챗봇을 개발 중이었습니다.
웹 프레임워크로는 Python 기반의 Flask를 선택하였고 Youtube 채팅을 Youtube Streaming API를 사용하여 스크레이핑해오는 구조였습니다.
LiveChat 함수를 사용하던 중 아래와 같은 오류가 발생하였습니다.

<p class="error_msg">Python signals: ValueError: signal only works in main thread</p>

LiveChat 함수에 interruptable=False 파라메터를 추가하여 해결하였습니다.

<img src="/assets/images/21092001.png" />
