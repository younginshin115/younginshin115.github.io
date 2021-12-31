---
title:  "[Debug][Nginx] 210723 nginx upstream timed out (110 connection timed out)"
excerpt: "ML 기반 챗봇 Javas 개발기13"

toc: false
toc_sticky: false

categories:
  - Debug
tags:
  - Debug
  - Nginx
  - JavaScript
  - Javas
last_modified_at: 2021-07-23T20:29:00
---

라이브 방송의 채팅을 스크레이핑 한 뒤 ML 분석하여 서비스를 제공하는 ML 기반 챗봇 JAVAS를 개발하던 중 서비스가 갑자기 504 메시지와 함께 멈추는 이슈가 발생했다. Flask와 uWSGI의 로그를 확인했을 때는 별다른 메시지는 보이지 않았고 Nginx의 로그를 확인하니 아래와 같이 timed out 에러가 발생하는 것이 확인되었다.

<p style="background-color:black;"><img src="/assets/images/21092201.png" /></p>

라이브 방송의 연결이 끊기거나 방송이 종료되면 계속 읽기와 연결을 시도하다가 timed out이 발생하는 것이었다.

우선 방송 연결이 끊기더라도 5분까지는 재시도하도록 nginx.conf 파일을 아래와 같이 수정하여 Nginx의 프록시 서버의 응답시간을 늘려주었다.
<p style="background-color:black;"><img src="/assets/images/21092202.png" /></p>

방송이 종료되는 경우를 대비하여 ajax에 timeout 옵션을 설정했다. 일정 시간(사진에는 1분으로 되어있지만 추후 5분으로 늘려주었다.) 이상 연결되지 않으면 알림창을 띄운 뒤 홈화면으로 돌아가도록 설정하였다.

&nbsp;&nbsp;&nbsp;<img src="/assets/images/21092203.png" /><br>
(중략)<br>
<img src="/assets/images/21092204.png" /><br>
<br>
[참고] 경고창이 뜨는 모습<br>
<img src="/assets/images/21092205.png" />
