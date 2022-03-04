---
title:  "[Debug][Docker] 220304 ConnectionRefusedError: [Errno 111] Connection refused"
excerpt: "Docker 환경에서 Airflow와 InfluxDB를 연결할 때 생긴 네트워크 오류 해결"

toc: false
toc_sticky: false

categories:
  - Debug
tags:
  - Debug
  - Docker
  - Airflow
  - InfluxDB
  - Network
last_modified_at: 2022-03-04T19:55:00
---

Docker 환경에서 Airflow와 InfluxDB를 연결하다가 아래와 같은 오류가 발생했다.

<p class="error_msg">
Traceback (most recent call last):<br>
  File "/opt/bitnami/airflow/venv/lib/python3.8/site-packages/urllib3/connection.py", line 174, in _new_conn<br>
    conn = connection.create_connection(<br>
  File "/opt/bitnami/airflow/venv/lib/python3.8/site-packages/urllib3/util/connection.py", line 95, in create_connection
    raise err<br>
  File "/opt/bitnami/airflow/venv/lib/python3.8/site-packages/urllib3/util/connection.py", line 85, in create_connection<br>
    sock.connect(sa)<br>
ConnectionRefusedError: [Errno 111] Connection refused
</p>

<p class="code"><img src="/assets/images/22030401.png" /></p>

에러번호를 기반으로 검색한 결과 연결 URI에 문제가 있을 때 발생하는 오류라는 것을 알 수 있었다.
scheme와 host, port, qurey를 모두 변경해가며 원인을 파악하였다. 문제는 port에 있었다. 

Docker 환경에서 두 개의 InfluxDB를 사용하고 있기 때문에 한 DB는 InfluxDB의 기본 port 번호인 8086으로 설정하고 다른 한 DB는 아래 이미지 처럼 외부 연결 port를 8087로 우회하여 연결해둔 상태였다. 

<p class="code"><img width=400px src="/assets/images/22030404.png" /></p>

문제는 8087 InfluxDB와 연결하던 중에 발생했다. Docker-compose 환경 내에 8086을 사용하고 있는 컨테이너가 이미 있으므로 당연히 컨테이너 바깥에 노출되는 왼쪽 port와 내부에서 사용하는 오른쪽 port 중 왼쪽 8087 port를 사용해야 한다고 생각했다. 그래서 Airflow Connections에서 port를 아래와 같이 8087설정해 두었다.

<p class="code"><img src="/assets/images/22030403.png" /></p>

하지만 Docker 네트워크 내부에서는 서로의 컨테이너 명이 host가 되기 때문에 굳이 내부에서 port를 구분하여 쓸 필요가 없다는 것을 깨달았다. Docker Network를 통해 외부로 연결할 때는 같은 호스트를 사용하므로 이때 구분하기 위해서 외부 port가 필요했던 것이다. 

아래와 같이 port를 내부 port로 변경했더니 해결되였다.

<p class="code"><img src="/assets/images/22030402.png" /></p>