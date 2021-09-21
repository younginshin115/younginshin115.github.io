---
title:  "[디버깅][Spark] 210629 current committed offsets current available offsets"
excerpt: "ML 기반 챗봇 Javas 개발기7"

toc: false
toc_sticky: false

categories:
  - Debug
tags:
  - Debug
  - Spark
  - Kafka
  - Javas
last_modified_at: 2021-06-29T12:59:00
---

<br>
Spark에 연결된 Kafka의 토픽을 바꾸자 아래와 같은 오류가 발생했다.
<p class="code"><img src="/assets/images/21092101.png" /></p>

Checkpoint에 저장된 토픽과 현재 토픽이 달라서 발생하는 문제이므로 
Checkpoint 폴더를 삭제 후 재 생성하거나 위치를 변경하면 해결된다.