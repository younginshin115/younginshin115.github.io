---
title: "[Airflow] DAG 중복 실행 방지"
excerpt: "이미 실행 중인 DAG이 있을 때 새 실행이 겹치지 않도록 막는 설정 - max_active_runs, concurrency, depends_on_past"

toc: true
toc_sticky: true

categories:
  - Tutorial
tags:
  - Tutorial
  - Airflow
  - Schedule
  - DAG
last_modified_at: 2025-10-15T11:32:00
---

Airflow를 운영하다 보면 흔히 겪는 문제 중 하나가 바로 중복 실행입니다. 대부분은 수행 시간을 고려하여 스케줄을 구성하지만 특정 시간에 트래픽이 많이 몰리거나 하면 이전 작업이 끝나기 전에 다음 작업이 시작되어 중복 실행되는 경우가 발생합니다. 실제로 Airflow 운영 초기에 한 DAG가 두번 겹쳐 돌아 리소스 부족으로 서버가 다운된 적이 있습니다. 

Airflow는 이러한 중복 실행을 방지하기 위해 여러가지 옵션을 제공합니다. 오늘은 그 옵션들에 대해 알아보겠습니다.

## 1. max_active_runs
- DAG 단위 옵션 
- 동시에 실행 가능한 DAG 인스턴스 수를 제한합니다.

```python
with DAG(
    dag_id="example_no_overlap", 
    start_date=datetime(2025, 9, 1), 
    schedule_interval="@hourly", 
    max_active_runs=1, # 동시에 1개만 실행 
) as dag: 
    ...
```

제가 현재 사용하고 있는 설정입니다. max_active_runs를 1개로 설정하면 DAG가 실행 중일 때 새 스케줄 시간이 와도 기존 DAG가 끝날 때까지 대기합니다.

## 2. concurrency
- DAG 단위 옵션 
- DAG 단위에서 동시에 실행될 수 있는 태스크 인스턴스 수를 제한합니다.

```python
with DAG( 
    dag_id="example_concurrency", 
    concurrency=5, # 한 번에 최대 5개 태스크만 
) as dag: 
    ...
```

DAG 안에 태스크가 많을 때, 동시에 실행되는 태스크 수를 제한할 수 있습니다. DAG 단위의 중복 실행 방지라기보다는 테스크 레벨에서 리소스가 한 번에 너무 많이 사용되는 것을 방지하는 옵션입니다.

## 3. max_active_tis_per_dag
- 태스크 단위 옵션 
- 특정 태스크가 동시에 여러 DAG run에서 실행되는 것을 제한합니다.

```python
PythonOperator( 
    task_id="heavy_task", 
    python_callable=some_func, 
    max_active_tis_per_dag=1, # 이 태스크는 한 번에 1개만 
)
```

같은 DAG가 여러번 실행되더라도 특정 태스크는 한번만 실행되게 하고 싶을 때 사용하는 방법입니다. 

## 4. depends_on_past
- 태스크 단위 옵션 
- 이전 DAG의 동일한 task가 성공한 경우에만 이번 task를 수행합니다.

```python
PythonOperator( 
    task_id="sequential_task", 
    python_callable=some_func, 
    depends_on_past=True, 
)
```

연속성이 중요한 적재/집계 파이프라인에서 데이터 누락이나 순서 꼬임을 방지할 때 씁니다. 예를 들어 10월 8일 적재가 실패했다면, 10월 9일 DAG가 돌더라도 해당 태스크는 기다리거나 스킵되어 순서를 건너뛰지 않게 됩니다.
