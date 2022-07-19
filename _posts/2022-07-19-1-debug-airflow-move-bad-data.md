---
title:  "[Debug][Airflow] 220719 Airflow 버전 업그레이드 시 Bad data 발생 오류 해결"
excerpt: "Airflow 버전 업그레이드 시 Bad data 발생 오류 해결"

toc: false
toc_sticky: false

categories:
  - Debug
tags:
  - Debug
  - Airflow
  - Version upgrade
last_modified_at: 2022-07-19T19:39:00
---

Airflow 버전을 2.2에서 2.3으로 업그레이드하던 중 아래와 같은 오류 메시지가 발생했습니다.
<p><img src="/assets/images/22071901.jpg" /></p>

버전 업그레이드를 통해 새로운 제약이 적용되면서 기존 데이터와 충돌을 일으킨 것입니다.
Upgrading 버튼을 누르면 나타나는 <a href="https://airflow.apache.org/docs/apache-airflow/2.3.2/installation/upgrading.html"> Airflow 공식 문서</a>를 확인했더니 해당 데이터를 포함하는 테이블을 삭제하면 해결할 수 있다고 되어있었습니다. 문서의 가이드라인에 따라 우선 python 터미널을 열어 Airflow 설정 세션을 연결했습니다.

```python
from airflow.settings import Session
session = Session()
```

<p><img src="/assets/images/22071902.jpg" /></p>

해당 세션을 통해 위 경고창에 명시된 문제가 발생한 Table를 Drop했습니다.
```python
session.execute("DROP TABLE _airflow_moved__2_2__task_instance")
session.commit()
```

<p><img src="/assets/images/22071903.jpg" /></p>

그러자 경고메시지가 사라지고 정상적인 사용이 가능해졌습니다.
<p><img src="/assets/images/22071904.jpg" /></p>
