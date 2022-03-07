---
title:  "[Tutorial][InfluxDB-Grafana] 220307 Grafana InfluxDB flux 문법에서 Alias/Label 적용하기"
excerpt: "Grafana에서 InfluxDB 2.0 이상 버전을 시각화 할 때 사용하는 Flux 문법에서 데이터에 Alias/Label 적용하는 방법"

toc: false
toc_sticky: false

categories:
  - Tutorial
tags:
  - Tutorial
  - Grafana
  - InfluxDB
  - Flux
last_modified_at: 2022-03-07T22:17:00
---

Airflow는 InfluxDB 2.0부터 연결이 가능하기 때문에 기존에 사용하던 InfluxDB 1.8 버전을 2.1 버전으로 업데이트하였다.<br>
InfluxDB 1.x 버전은 MySQL과 비슷한 InfluxQL을 지원하지만 2.X 버전 부터는 지원하지 않아 flux 문법을 사용해야 한다.<br>
Flux 문법에서는 Alias를 지원하지 않아 불필요한 정보가 그래프에 노출되는 경우가 발생한다. <br>
검색을 통해 한 개발자가 올려놓은 <a href="https://stackoverflow.com/questions/68122202/grafana-influxdb-2-label-alias-data">해결 방법</a>을 발견할 수 있었다. 이 방법을 공유하기 위해 글을 작성한다.<br>

<p><img src="/assets/images/22030701.png" /></p>

위 사진처럼 Flux 문법을 사용하면 범례에 불필요한 정보(Tag 등)가 노출되는 경우가 발생한다.<br>
위 링크의 개발자는 아래 모드의 마지막 줄처럼 map 함수를 사용하여 field 명을 재명명하는 방법을 제안했다.<br>
value만 추출할 경우 시간 값이 사라져서 시계열을 기준으로 시각화하기 어려워지므로 시간값도 같이 추출한다.<br>

```c
from(bucket: "telegraf")
  |> range(start: v.timeRangeStart, stop:v.timeRangeStop)
  |> filter(fn: (r) =>
    r._measurement == "mysql" and
    r._field == "aborted_clients"
  )
  |> difference()
  |> map(fn: (r) => ({ _value:r._value, _time:r._time, _field:"Aborted clients" }))
```

map 함수를 적용하면 아래 사진과 같이 Alias/Label이 적용되는 것을 확인할 수 있다.

<p><img src="/assets/images/22030703.png" /></p>