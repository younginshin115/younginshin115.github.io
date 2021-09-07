---
title:  "[튜토리얼][Docker] 210907 Docker container 유지"
excerpt: "Docker container 유지하기"

toc: false
toc_sticky: false

categories:
  - Tutorial
tags:
  - Tutorial
  - Ubuntu
  - Docker
last_modified_at: 2021-09-07T20:15:00
---

Docker image를 다운받아 run으로 실행시키면 exit를 눌러 빠져나왔을 때 자동으로 컨테이너가 종료된다.
아래와 같은 방법으로 빠져나오고 나서도 컨테이너를 유지할 수 있다.

[1] 원하는 이미지를 다운로드 받는다.
```
docker pull 이미지명
```
<br>
[2] 다운로드 받은 이미지로 컨테이너를 만든다.
```
docker run -it --name 컨테이너명(자유) 이미지명 /bin/bash
```
<br>
[3] exit를 쳐서 만들어진 컨테이너를 빠져나온다.
<p class="code"><img src="/assets/images/21090705.png" /></p>

컨테이너 목록을 확인하면 아래처럼 컨테이너가 자동으로 종료된 것을 확인할 수 있다.
```
docker ps -a
```
<p class="code"><img src="/assets/images/21090706.png" /></p>
<br>
[4] docker start 명령어로 컨테이너를 외부에서 실행시킨다.
```
docker start 컨테이너명
```
<p class="code"><img src="/assets/images/21090707.png" /></p>

이렇게 실행시킨 컨테이너는 exit로 빠져나가도 종료되지 않는다.
<p class="code"><img src="/assets/images/21090708.png" /></p>

컨테이너에 진입할 때는 docker exec 명령어를 사용한다.
```
docker exec -it 컨테이너명 /bin/bash
```