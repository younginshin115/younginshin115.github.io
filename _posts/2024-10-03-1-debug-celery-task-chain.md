---
title:  "[Celery] Celery task chain에서 발생하는 argument 관련 오류 해결"
excerpt: "Celery task chain 시 발생하는 takes 0 positional arguments but 1 was given 오류와 multiple values for argument 오류 해결"

toc: false
toc_sticky: false

categories:
  - Debug
tags:
  - Debug
  - Celery
  - Python
last_modified_at: 2024-10-03T19:01:00
---

Celery에는 Task를 [Chain](https://docs.celeryq.dev/en/stable/userguide/canvas.html#chains)해서 사용할 수 있는 기능이 있습니다. 여러 Task를 순차적으로 실행할 수 있는 기능입니다. Task를 Chain 해서 하던 중 argument와 관련된 오류가 발생하여 이를 해결한 경험을 공유하고 싶습니다.

## Takes 0 positional arguments but 1 was given

아무런 인자를 받지 않는 Task를 사용하여 Task Chain을 구성했습니다. 실행할 때 아래와 같은 오류가 발생했습니다.

<p><img src="/assets/images/24100301/01.png" /></p>

{% highlight shell linenos %}
Traceback (most recent call last):
  File "/usr/local/lib/python3.8/site-packages/celery/app/trace.py", line 513, in trace_task
    _chsig.apply_async(
  File "/usr/local/lib/python3.8/site-packages/celery/canvas.py", line 219, in apply_async
    return _apply(args, kwargs, **options)
  File "/usr/local/lib/python3.8/site-packages/celery/app/task.py", line 540, in apply_async
    check_arguments(*(args or ()), **(kwargs or {}))
TypeError: trigger_training_and_qa_process() takes 0 positional arguments but 1 was given
{% endhighlight %}

Task Chain은 앞 Task의 return 값을 다음 Task의 인자로 넘겨줍니다. 이전 Task의 Return 값을 지정해주지 않아도 None 값이 Return 되므로 다음 Task의 인자로 아무것도 정해주지 않으면 위와 같은 0개를 받기로 되어있는 데 1개만 받았다는 오류 메세지가 나타나게 됩니다.

해결할 수 있는 방법은 두가지가 있습니다. 우선, [.s() 대신 .si()를 사용하면 앞 함수의 Return 값을 넘겨받지 않도록 설정할 수 있습니다.](https://docs.celeryq.dev/en/stable/userguide/canvas.html#immutability) 두번째 방법은 사용하지 않더라도 *args로 앞 함수의 Return 값을 받아주는 것입니다.

저는 아래와 같이 두번째 방법을 사용해서 해결했습니다.

{% highlight python linenos %}
@celery.task()
def trigger_training_and_qa_process(*args, **kwargs):
    ...
{% endhighlight %}

## Multiple values for argument

이번에는 인자가 있는 Task를 Chain으로 수행하였을 때 아래와 같은 오류가 발생하였습니다.

<p><img src="/assets/images/24100301/02.png" /></p>

{% highlight shell linenos %}
Traceback (most recent call last):
  File "/usr/local/lib/python3.8/dist-packages/celery/app/trace.py", line 513, in trace_task
    _chsig.apply_async(
  File "/usr/local/lib/python3.8/dist-packages/celery/canvas.py", line 219, in apply_async
    return _apply(args, kwargs, **options)
  File "/usr/local/lib/python3.8/dist-packages/celery/app/task.py", line 540, in apply_async
    check_arguments(*(args or ()), **(kwargs or {}))
TypeError: train_model_task() got multiple values for argument 'model_name'
{% endhighlight %}

위와 같은 상황으로 첫번째 인자로 이전 Task의 Return 값을 받기 때문에 발생한 오류였습니다. 해결 방법은 위의 경우와 마찬가지로 두가지입니다. 첫번째는 .s() 대신 .si()를 사용하는 것입니다. 하지만 제 경우에는 위에 오류가 발생한 model_name이라는 인자가 해당 Chain에 있는 모든 Task에 공통적으로 해당하는 인자이기 때문에 이전 Task에서 해당 model_name을 return하고 다음 Task에서는 해당 값을 받아서 사용하는 식으로 수정하여 해결했습니다.

### 이전 Task에서 model_name(공통 인자)를 return 하도록 수정

<p><img src="/assets/images/24100301/03.png" /></p>

### Task chain에서 공통 인자는 이전 Task의 return 값을 받아서 사용할 수 있도록 첫번째 Task에서만 선언

수정 전: 첫번째 Task와 두번째 Task 모두 공통 인자(model_name)를 외부에서 인자로 받고 있음

<p><img src="/assets/images/24100301/04.png" /></p>

수정 후: 첫번째 Task만 공통 인자를 외부에서 받고 있음

<p style='width:600px;'><img src="/assets/images/24100301/05.png" /></p>
