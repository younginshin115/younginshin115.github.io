---
title:  "[디버깅][Java Spring] 210620 404 에러"
excerpt: "ML 기반 챗봇 개발기 - Java Spring으로 채팅을 개발하는 동안 발생한 오류"

toc: false
toc_sticky: false

categories:
  - Debug
tags:
  - Debug
  - Java
  - Spring
  - Websocket
last_modified_at: 2021-06-20T10:11:00
---

```
버전 정보
Java : 1.8
IDE : 이클립스
```

<br>
산학프로젝트에서 ML 기반 챗봇을 개발하게 되었다.
처음에는 채팅 서비스부터 개발하는 줄 알고 Spring MVC와 JSP를 사용하여 Websocket 기반 채팅 서비스를 개발하다가 우리가 개발하는 챗봇이 기존 플랫폼의 채팅을 가져와서 사용하는 방식임을 알게되어 채팅 서비스 개발은 무산되었다. 하지만 그 개발 과정에서 발생한 오류는 기록으로 남겨보고자 한다. 

채팅 서비스 개발 중 404 오류가 발생했다.

확인 결과 세군데의 경로 설정이 일치하지 않아서 발생한 문제였다.

[1] Tomcat의 Web Modules
<img src="/assets/images/21091301.png" /> <br>
스크린샷에 적힌 번호 대로 따라가면 해당 설정을 찾을 수 있다.

[2] Tomcat의 server.xml
<img src="/assets/images/21091302.png" />

[3] 프로젝트 Propreties의 Web Project Settings
<img src="/assets/images/21091303.png" /> <br>
우선 프로젝트를 우클릭하고 Properties를 클릭한다.

<img src="/assets/images/21091304.png" /> <br>
Web Project Settings를 클릭하면 경로를 확인할 수 있다. <br>
나같은 경우 이 곳이 /로 되어있어서 경로가 일치하지 않아서 오류가 발생했다.