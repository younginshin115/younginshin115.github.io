---
title:  "[Debug][Airflow] 220307 Airflow MySQL Connector 한글 사용법"
excerpt: "Airflow MySQL Connector 한글 사용법"

toc: false
toc_sticky: false

categories:
  - Debug
tags:
  - Debug
  - Airflow
  - MySQL Connector
  - Encoding
last_modified_at: 2022-03-07T22:37:00
---

Airflow에서 MySQL Connecotor를 연결하여 DB의 데이터를 읽어오는 데 한글이 깨지는 문제가 발생하였다.
시도한 해결방법은 아래와 같다.

1. Airflow 컨테이너에 locale 패키지를 설치하고 환경설정을 해주었다. 하지만 문제는 해결되지 않았다.
2. Python operator 코드에 encode, decode 함수를 추가했다. 하지만 문제는 해결되지 않았다.
3. 컨테이너의 문제도 아니고 Python의 문제도 아니라면 Airflow MySQL Connector의 문제일거라고 생각했다. <a href="https://airflow.apache.org/docs/apache-airflow-providers-mysql/stable/connections/mysql.html">공식 문서</a>를 확인했더니 아니나 다를까 charset 설정이 있었다. 아래와 같이 charset을 설정했더니 한글이 정상적으로 출력되었다.

<p><img src="/assets/images/22030704.png" /></p>