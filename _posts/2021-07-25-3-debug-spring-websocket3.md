---
title:  "[Debug][Java Spring] 210725 Property 'spring.profiles.active' imported from location 'class path resource [application-local.yml]' is invalid in a profile specific resource [origin: class path resource [application-local.yml]"
excerpt: "Java Spring Boot로 Websocket과 Storm 활용하여 채팅을 개발하는 동안 발생한 오류 3"

toc: false
toc_sticky: false

categories:
  - Debug
tags:
  - Debug
  - Java
  - Spring
  - Websocket
last_modified_at: 2021-07-25T22:55:00
---

```
버전 정보
Java : 1.8
Spring Boot : 2.5.3
```

<br>
Spring Boot와 Vue를 이용하여 Websocket 기반 채팅 서비스를 개발하던 중이었다.
채팅방 정보, 입출입 기록 등을 저장하는 데 Redis를 사용하고자 했는데 개발 환경인 Windows에서는 Redis대신 embedded-redis를 사용하고자 했기 때문에 application.yml 파일을 local 환경과 server 환경으로 나누는 과정에서 아래의 오류가 발생했다.

<p class="error_msg">Property 'spring.profiles.active' imported from location 'class path resource [application-local.yml]' is invalid in a profile specific resource [origin: class path resource [application-local.yml]</p>

검색 결과 Spring Boot 2.4부터 application.yml 파일의 구동 방식이 변경되었기 때문에 발생한 오류였다.
아래와 같은 형식으로 마이그레이션해주었더니 오류가 해결되었다.

```
[수정전]
spring:
  profiles:
    active: local
```
```
[수정후]
spring:
  config:
    activate:
      on-profile: local
```

참고 : <a href="https://multifrontgarden.tistory.com/277">spring boot 2.4 application.yaml 구동방식 변경</a>
