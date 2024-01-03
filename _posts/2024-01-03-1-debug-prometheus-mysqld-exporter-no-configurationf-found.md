---
title:  "[Debug][Prometheus] 240103 Prometheus Mysqld-exporter 구동 시 발생한 No configuration found 이슈 해결"
excerpt: "Prometheus Mysqld-exporter 구동 시 발생한 No configuration found 이슈 해결"

toc: false
toc_sticky: false

categories:
  - Debug
tags:
  - Debug
  - Docker
  - Docker-compose
  - Prometheus
  - Mysqld-exporter
last_modified_at: 2024-01-03T21:24:00
---

Prometheus로 MySQL 서버를 모니터링 하기 위해 Docker-compose 환경에 Mysqld-exporter를 설치했습니다. 실행하자 아래와 같은 오류가 발생했습니다.

<p><img src="/assets/images/24010301.png" /></p>

<p class="error_msg">
ts=2023-10-05T00:28:13.492Z caller=mysqld_exporter.go:220 level=info msg="Starting mysqld_exporter" version="(version=0.15.0, branch=HEAD, revision=6ca2a42f97f3403c7788ff4f374430aa267a6b6b)"
ts=2023-10-05T00:28:13.492Z caller=mysqld_exporter.go:221 level=info msg="Build context" build_context="(go=go1.20.5, platform=linux/amd64, user=root@c4fca471a5b1, date=20230624-04:09:04, tags=netgo)"
ts=2023-10-05T00:28:13.492Z caller=config.go:150 level=error msg="failed to validate config" section=client err="no user specified in section or parent"
ts=2023-10-05T00:28:13.492Z caller=mysqld_exporter.go:225 level=info msg="Error parsing host config" file=.my.cnf err="no configuration found"
</p>

기존에는 docker-compose.yml 파일에 Mysqld-exporter의 [Docker hub 문서](https://hub.docker.com/r/prom/mysqld-exporter/)를 따라 아래와 같이 environment에 Data source명을 명시습니다.

{% highlight yaml linenos %}
  mysqld-exporter:
    image: quay.io/prometheus/mysqld-exporter
    container_name: mysqld-exporter
    environment:
      - DATA_SOURCE_NAME=exporter:exporter@(mysqld:3306)/
{% endhighlight %}

마지막에 붙는 /를 붙이거나 떼보라는 조언도 있었지만 효과가 없었습니다. 그래서 docker-compose.yml 파일에 environment로 명시하는 것이 아닌 command로 바로 전달하기로 했습니다. 수정한 코드는 아래와 같습니다.

{% highlight yaml linenos %}
  mysqld-exporter:
    image: quay.io/prometheus/mysqld-exporter
    container_name: mysqld-exporter
    command:
     - "—mysqld.username=user:password"
     - "—mysqld.address=host:port"
{% endhighlight %}

설정을 변경한 후 컨테이너를 재시작하였더니 정상적으로 구동되었습니다.