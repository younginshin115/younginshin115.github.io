---
title:  "[디버깅][Java Spring] 210725 java.lang.IllegalArgumentException: When allowCredentials is true, allowedOrigins cannot contain the special value '*' since that cannot be set on the 'Access-Control-Allow-Origin' response header."
excerpt: "Java Spring Boot로 Websocket과 Storm 활용하여 채팅을 개발하는 동안 발생한 오류 2"

toc: false
toc_sticky: false

categories:
  - Debug
tags:
  - Debug
  - Java
  - Spring
  - Websocket
last_modified_at: 2021-08-23T22:50:00
---

```
버전 정보
Java : 1.8
Spring Boot : 2.5.3
```

<br>
Spring Boot와 Vue를 이용하여 Websocket 기반 채팅 서비스를 개발하던 중 아래와 같은 오류가 발생했다.

<p class="error_msg">java.lang.IllegalArgumentException: When allowCredentials is true, allowedOrigins cannot contain the special value "*" since that cannot be set on the "Access-Control-Allow-Origin" response header. To allow credentials to a set of origins, list them explicitly or consider using "allowedOriginPatterns" instead.</p>

'*' 대신 서비스 하는 호스트 이름을 적었더니 해결되었다.
```
[수정전]
registry.addEndpoint("/ws-stomp").setAllowedOrigins("*").withSockJS();
```
```
[수정후]
registry.addEndpoint("/ws-stomp").setAllowedOrigins("http://localhost:8080").withSockJS();
```

