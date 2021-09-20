---
title:  "[디버깅][Java Spring] 210725 javax.servlet.ServletException: Circular view path [project]: would dispatch back to the current handler URL [/project] again. Check your ViewResolver setup!"
excerpt: "Java Spring Boot로 Websocket과 Storm 활용하여 채팅을 개발하는 동안 발생한 오류 1"

toc: false
toc_sticky: false

categories:
  - Debug
tags:
  - Debug
  - Java
  - Spring
  - Websocket
last_modified_at: 2021-07-25T22:45:00
---

```
버전 정보
Java : 1.8
Spring Boot : 2.5.3
```

<br>
Spring Boot와 Vue를 이용하여 Websocket 기반 채팅 서비스를 개발하던 중 아래와 같은 오류가 발생했다.

<p class="error_msg">javax.servlet.ServletException: Circular view path [project]: would dispatch back to the current handler URL [/project] again. Check your ViewResolver setup! (Hint: This may be the result of an unspecified view, due to default view name generation.)</p>

검색 결과 Spring 2.2.x 버전부터 ftl이 아니라 ftlh 확장자를 지원한다고 하여 확장자명을 변경하는 것으로 해결했다.

참고 : <a href="https://stackoverflow.com/questions/42330870/spring-boot-unable-to-resolve-freemarker-view">https://stackoverflow.com/questions/42330870/spring-boot-unable-to-resolve-freemarker-view</a>