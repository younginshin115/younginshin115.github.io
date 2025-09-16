---
title:  "[Celery] Celery Task 완료 후에도 GPU 메모리를 계속 점유하는 문제 해결"
excerpt: "Celery Task 완료 후에도 GPU 메모리를 계속 점유 하는 문제 해결"

toc: true
toc_sticky: true

categories:
  - Debug
tags:
  - Debug
  - Celery
  - Tensorflow
last_modified_at: 2025-3-3T12:10:00
---

Fast API와 Celery를 사용하여 Tensorflow 모델을 배포하고 배포한 모델로 예측하는 서버를 구축하는 프로젝트를 진행했습니다. 해당 서버를 통해 요청한 예측 Task가 요청이 종료된 이후에도 GPU를 점유하는 문제가 발생했습니다. 일정 시간이 지나면 GPU가 해제되긴 했지만 해당 Fast API + Celery 서버는 로컬 서버에 구현되어 있었는데 그 로컬 서버에 GPU를 사용하는 다른 서비스가 공존하고 있었기 때문에 이렇게 길게 GPU를 점유하면 충돌 문제가 발생할 수 있다는 판단을 했습니다. 따라서 저는 Task 종료와 동시에 GPU 메모리도 해제되기를 원했습니다.

# 첫번째 방법: 메모리 동적 관리

Tensorflow에서 메모리 관련 문제가 발생했을 때 흔하게 사용되는 방법은 GPU 메모리를 필요한 만큼만 동적으로 할당하는 방법입니다. Tensorflow는 기본적으로 메모리를 크게 점유하고 세션을 닫아도 즉시 반환하지 않기 때문입니다. 이를 방지하기 위해 메모리를 동적으로 관리하는 방법을 자주 사용합니다.

{% highlight bash python %}
import tensorflow as tf

gpus = tf.config.experimental.list_physical_devices('GPU')
if gpus:
    try:
        for gpu in gpus:
            tf.config.experimental.set_memory_growth(gpu, True)
    except RuntimeError as e:
        print(e)
{% endhighlight %}

하지만 해당 예측 서버의 요구 사항은 최대한 짧은 시간에 최대한 많은 양의 데이터를 예측 하여 그 예측 값을 반환하는 것이기 때문에 GPU를 full로 사용할 수 밖에 없었습니다. 그래서 이 방법은 시도하지 않았습니다.

# 두번째 방법: 세션 초기화

모델의 Framework가 Tensorflow이기 때문에 우선 Task 종료 시점에 세션 초기화를 시도했습니다. 물론, Tensorflow 2 버전 부터는 별도로 Session_clear를 선언할 필요가 없으나 비동기로 여러개의 모델을 load하고 사용하는 상황이었기 때문에 혹시 몰라서 우선적으로 시도했습니다.

{% highlight bash python %}
from tensorflow.keras import backend as K
K.clear_session()
{% endhighlight %}

하지만 Task 완료 후 GPU를 점유하고 있는 문제는 해결되지 않았습니다.

# 세번째 방법: 세션 초기화 + Garbage Collector 명시적 사용

Clear_session 후에 명시적으로 GC를 호출하여 메모리를 강제 회수하는 방법도 시도하였습니다.

{% highlight bash python %}
from tensorflow.keras import backend as K
import gc
K.clear_session()
gc.collect()
{% endhighlight %}

# 네번째 방법: Celery pool type을 solo로 변경

이번 시도부터는 Tensorflow가 아니라 Celery 측면에서 접근하기로 했습니다. Celery는 prefork (멀티 프로세싱), threads (하나의 프로세스 내 멀티 스레딩), solo (멀티 프로세싱 비활성화) 등의 여러가지 pool type을 지원합니다. Celery의 pool type을 기본값인 prefork에서 solo로 변경하여 실행했습니다.

{% highlight bash linenos %}
celery -A tasks worker —pool=solo —loglevel=info
{% endhighlight %}

이 방법도 GPU 점유 문제를 해결하지 못했고 Solo로 해놓을 경우 worker가 작동하지 않는 경우 비활성화 상태로 표시되기 때문에 실제 문제가 생겨 비활성화된 워커와 구분이 어려워 prefork로 재변경하였습니다.

# 다섯번째 방법: Celery Max tasks per child를 1로 설정 (문제 해결)

Celery에는 [--max-tasks-per-child](https://docs.celeryq.dev/en/stable/reference/cli.html#cmdoption-celery-worker-max-tasks-per-child)라는 옵션이 있습니다. child별로 최대 실행 task 수를 설정하여 해당 숫자 이상의 task를 실행하면 프로세스를 재 시작하는 옵션입니다. 아래와 같이 --max-tasks-per-child 옵션을 1로 설정하여 1개의 테스크가 끝날 때 마다 프로세스를 재시작하게 하였습니다.

{% highlight bash linenos %}
celery -A tasks worker —max-tasks-per-child=1 —loglevel=info
{% endhighlight %}

GPU 메모리 사용량을 모니터링한 결과 프로세스를 완전히 재시작하면서 기존 프로세스에서 사용하던 GPU 메모리를 완전히 해제하는 걸 확인할 수 있었습니다. 