---
title:  "[Debug][Firestore] 230529 Celery로 비동기 작업할 때 Firestore 사용 시 Default app already exists 오류 해결"
excerpt: "Airflow 버전 업그레이드 시 Bad data 발생 오류 해결"

toc: false
toc_sticky: false

categories:
  - Debug
tags:
  - Debug
  - Celery
  - Firebase
last_modified_at: 2023-05-29T14:39:00
---

Celery에서 비동기 작업을 처리할 때 데이터베이스로 이용중인 Firebase에서 아래와 같은 오류 메시지가 발생했습니다.

<p><img src="/assets/images/23052901.png" /></p>

<p class="error_msg">
ValueError: The default Firebase app already exists. This means you called initialize_app() more than once without providing an app name as the second argument. In most cases you only need to call initialize_app() once. But if you do want to initialize multiple apps, pass a second argument to initialize_app() to give each app a unique name.
</p>

이미 생성한 Firebase 앱이 존재한다는 오류 메시지였습니다. 한 태스크가 종료될 것이라고 생각했기 때문에 태스크 시작 지점에 Firebase 앱을 초기화 하는 코드를 삽입했는데 이 부분에서 오류가 발생한 것이었습니다.

아래와 같이 기존 앱이 존재하는지 확인하는 코드를 삽입하여 문제를 해결했습니다.

{% highlight python linenos %}
if not firebase_admin._apps:
    cred = credentials.Certificate(cert_path)
    firebase_admin.initialize_app(cred)
else:
    firebase_admin.get_app()
self.db = firestore.client()
{% endhighlight %}

<p><img src="/assets/images/23052902.png" /></p>
