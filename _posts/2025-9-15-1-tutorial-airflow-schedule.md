---
title: "[Tutorial][Airflow] 250915 Airflow Schedule 설정 방법"
excerpt: "Airflow Schedule 설정 방법 - @ 규칙과 Cron 문법"

toc: true
toc_sticky: true

categories:
  - Tutorial
tags:
  - Tutorial
  - Airflow
  - Schedule
  - Cron
last_modified_at: 2025-09-15T20:54:00
---

저는 데이터 마트 구축 같은 배치 파이프라인부터 점심/저녁 메뉴 스레드 열기 같은 소소한 자동화까지 다양한 분야에서 Airflow를 사용하고 있습니다. Airflow는 여러 작업을 어떤 순서와 주기로 실행할지 정의하고 관리해주는 오픈소스 스케줄러인데요, 예를 들어 위에 언급한 두가지 외에도 정기적으로 백업을 실행하는 등 다방면으로 활용할 수 있습니다.

이렇게나 편리한 Airflow지만 Airflow를 처음 사용할 때 가장 어려웠던 부분은 바로 스케줄링이었습니다. 특히 cron 문법과 UTC 기반의 스케줄링에 익숙하지 않아서 초반에는 설정 먼저 해보고, 돌려보면서 몸으로 익히는 과정을 거쳐야 했습니다.

저도 참고하고, 저와 같이 Airflow 스케줄링 방법이 헷갈리는 분들도 참고하실 수 있게 관련 내용을 정리해보고자 합니다. 더 자세한 내용은 [Airflow 공식 문서](https://airflow.apache.org/docs/apache-airflow/stable/authoring-and-scheduling/cron.html)를 참조해주세요.

# Airflow Schedule 설정 방법

Airflow에서는 어떤 작업을 어떤 순서로 실행할지를 정의하기 위해 DAG(Directed Acyclic Graph)라는 단위를 사용합니다. DAG는 보통 파이썬 파일에 다음과 같은 형태로 작성합니다.

```python
from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime

def print_hello():
    print("Hello Airflow!")

with DAG(
    dag_id="example_dag",
    start_date=datetime(2025, 9, 1),
    schedule="@daily",
    catchup=False
) as dag:

    hello_task = PythonOperator(
        task_id="hello_task",
        python_callable=print_hello,
    )

```

이 DAG를 생성할 때 `schedule` 파라미터 (구, `schedule_interval`) 사용해 실행 주기를 설정합니다. Airflow는 `schedule`을 설정할 때 크게 세 가지 방식을 지원합니다.

## datetime.timedelta

Airflow는 `schedule`에 `datetime.timedelta`를 지원합니다. 몇 분마다, 몇 시간마다 처럼 고정된 시간 간격으로 반복 실행할 때 사용합니다. 하루의 어느 시점과 같은 특정 시점 기반 실행은 불가능합니다.

```python
from datetime import timedelta

with DAG(
    dag_id="example_timedelta",
    start_date=datetime(2025, 9, 1),
    schedule=timedelta(minutes=10),  # 10분마다 실행
    catchup=False,
) as dag:
    ...
```

### `datetime.timedelta` 자주 쓰는 예시  

| 설정 값                           | 실행 주기     |
|----------------------------------|---------------|
| `timedelta(seconds=1)`           | 1초마다       |
| `timedelta(minutes=1)`           | 1분마다       |
| `timedelta(hours=1)`             | 1시간마다     |
| `timedelta(days=1)`              | 1일마다      |
| `timedelta(weeks=1)`             | 1주마다       |
| `timedelta(hours=1, minutes=30)` | 1시간 30분마다 |

## Cron Preset (@ 규칙)

Airflow는 `schedule`에 자주 쓰이는 실행 주기를 간단히 표현할 수 있는 **Cron Preset**을 지원합니다.  
특정 시점 기반 실행을 빠르게 지정할 수 있지만, 세밀한 제어(예: 매일 09:30)는 불가능합니다.  

```python
with DAG(
    dag_id="example_preset",
    start_date=datetime(2025, 9, 1),
    schedule="@daily",  # 매일 자정 실행
    catchup=False,
) as dag:
    ...
```

### Preset 자주 쓰는 예시  

| 설정 값      | 실행 주기                                  |
|--------------|-------------------------------------------|
| `None`       | 스케줄 없음, 외부에서 트리거할 때만 실행   |
| `@once`      | 한 번만 실행                               |
| `@hourly`    | 매시간 정각                                |
| `@daily`     | 매일 00:00                                 |
| `@weekly`    | 매주 일요일 00:00                          |
| `@monthly`   | 매달 1일 00:00                             |
| `@quarterly` | 매 분기 첫 달 1일 00:00                    |
| `@yearly`    | 매년 1월 1일 00:00                         |
| `@annually`  | 매년 1월 1일 00:00                         |

## Cron Expression (Cron 표현식)

Airflow는 리눅스/유닉스에서 사용하는 **Cron 표현식**을 그대로 지원합니다. `datetime.timedelta`나 `Cron Preset(@ 규칙)`보다 훨씬 세밀하게 특정 시점 기반 실행을 지정할 수 있습니다.  

```python
with DAG(
    dag_id="example_cron",
    start_date=datetime(2025, 9, 1),
    schedule="0 9 * * *",  # 매일 오전 9시 실행
    catchup=False,
) as dag:
    ...
```

Cron 표현식이란 특정 시각이나 주기를 정의하기 위해 사용되는 문자열 패턴으로 분/시/일/월/요일 5개의 필드로 구성됩니다. 숫자로 특정 시점을 표현하며 *은 모든 값을 나타냅니다. 예를 들어 0 9 * * *는 "매일 오전 9시"를 의미합니다.

<p><img src="/assets/images/250915/01.png" /></p>

### Cron 표현식 자주 쓰는 예시

| 표현            | 실행 주기                |
|-----------------|-------------------------|
| `* * * * *`     | 매 분                    |
| `0 * * * *`     | 매시간 정각              |
| `1 9 * * *`     | 매일 09:01               |
| `30 2 * * 1-5`  | 평일 02:30               |
| `0 */6 * * *`   | 6시간마다(00,06,12,18)   |
| `15 10 1 * *`   | 매월 1일 10:15           |
| `0 0 1 1 *`     | 매년 1월 1일 00:00       |
| `0 9 1,15 * *`  | 매월 1일/15일 09:00      |

### Cron 표현식 연산자

Cron 표현식은 아래와 같은 연산자를 지원합니다. 연산자를 활용하면 좀 더 세밀한 일정 지정이 가능합니다.

| 표기         | 의미                                       | 예시                         |
|--------------|--------------------------------------------|------------------------------|
| `*`          | 모든 값                                    | `* * * * *` (매 분)          |
| `a,b,c`      | 나열(리스트)                                | `0,15,30,45 * * * *`         |
| `x-y`        | 범위                                       | `0-5` (0~5)                  |
| `*/n`        | 간격(스텝)                                 | `*/10` (10 단위마다)         |
| `x-y/n`      | 범위+간격                                  | `10-50/10` (10,20,30,40,50)  |
| 이름(월/요일) | 월/요일을 글자표기로                       | `JAN`, `MON-FRI`             |
