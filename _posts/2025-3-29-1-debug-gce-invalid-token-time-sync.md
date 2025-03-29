---
title:  "[Debug][GCE] 250329 GCE Google Login Invalid Token 문제 해결결"
excerpt: "Google Compute Engine 기반 서버에서 Google Login 사용 중에 Invalid Token이라며 인증이 되지 않는 문제 해결"

toc: false
toc_sticky: false

categories:
  - Debug
tags:
  - Debug
  - Google Login
  - GCE
last_modified_at: 2025-3-29T15:44:00
---

Google Cloud의 Compute Engine (이하 GCE) 기반 서버에서 갑자기 Google Login이 제대로 되지 않는 문제가 발생했습니다. 서버에서 반환하는 오류 코드는 `403 token is invalid` 이었습니다. 코드에 변경점도 없었고, 다른 GCE 기반의 개발 서버에서는 정상적으로 작동하기 떄문에 처음에는 원인을 파악하기 어려웠습니다. 짐작이 가는 원인은 직전에 서버를 한 번 재부팅 했던 것 뿐이었습니다.

서버의 로그를 확인하니 아래와 같은 오류가 발생하고 있었습니다.

{% highlight shell linenos %}
Traceback (most recent call last):
  File "/app/core/auth_utils.py", line 20, in verify_google_token
    id_info = id_token.verify_oauth2_token(token, requests.Request())
  File "/usr/local/lib/python3.9/site-packages/google/oauth2/id_token.py", line 178, in verify_oauth2_token
    idinfo = verify_token(
  File "/usr/local/lib/python3.9/site-packages/google/oauth2/id_token.py", line 150, in verify_token
    return jwt.decode(
  File "/usr/local/lib/python3.9/site-packages/google/auth/jwt.py", line 302, in decode
    _verify_iat_and_exp(payload, clock_skew_in_seconds)
  File "/usr/local/lib/python3.9/site-packages/google/auth/jwt.py", line 216, in _verify_iat_and_exp
    raise exceptions.InvalidValue(
google.auth.exceptions.InvalidValue: Token used too early, 1742968216 < 1742968218. Check that your computer's clock is set correctly.

Token used too early, 1742968216 < 1742968218. Check that your computer's clock is set correctly.
{% endhighlight %}

<p><img src="/assets/images/250329/01.png" /></p>

서버의 시간이 인증 서버의 시간보다 더 빨라서 발생한 문제였습니다. 클라우드 기반의 서비스라 발생할 것이라고 생각해 본적 없는 문제여서 당황했습니다. 아래 명령어로 서버의 시간을 확인했습니다. `timedatectl`는 리눅스 서버의 시스템 시간과 관련 설정을 확인하는 명령어입니다.

{% highlight shell linenos %}
timedatectl status
{% endhighlight %}

<p><img src="/assets/images/250329/02.png" /></p>

위와 같이 `System clock synchronized`가 no로 설정되어있는 것을 확인할 수 있었습니다. 해당 옵션은 yes로 설정해 놓으면 자동으로 시간을 동기화해줍니다. 아래 명령어로 자동 시간 동기화를 활성화하려고 시도했습니다. Devian 기반 서버이기 때문에 systemd-timesyncd를 호출했습니다. 

{% highlight shell linenos %}
systemctl status systemd-timesyncd
{% endhighlight %}

하지만 `chronyd was not met`이라는 메세지와 함께 실패하였습니다. 

{% highlight shell linenos %}
systemctl status systemd-timesyncd
● systemd-timesyncd.service - Network Time Synchronization
   Loaded: loaded (/lib/systemd/system/systemd-timesyncd.service; enabled; vendor preset: enabled)
  Drop-In: /usr/lib/systemd/system/systemd-timesyncd.service.d
           └─disable-with-time-daemon.conf
   Active: inactive (dead)
Condition: start condition failed at Wed 2025-03-26 05:57:32 UTC; 6s ago
           └─ ConditionFileIsExecutable=!/usr/sbin/chronyd was not met
     Docs: man:systemd-timesyncd.service(8)
{% endhighlight %}

<p><img src="/assets/images/250329/04.png" /></p>

chronyd가 이미 깔려있었기 떄문에 systemd-timesyncd를 사용할 수 없는 것이었습니다. GCE이기 떄문에 이미 chronyd가 깔려있는 것으로 추측됩니다. 그래서 아래 명령어로 chronyd를 활성화해서 시간 동기화를 하려고 시도했습니다.

{% highlight shell linenos %}
sudo systemctl enable chronyd --now
{% endhighlight %}

하지만 `Failed to enable unit: Too many levels of symbolic links` 메세지와 함께 실패했습니다. 그래서 아래 명령어로 현재 실행중인지를 먼저 확인하고자 했습니다.

{% highlight shell linenos %}
chronyc tracking
{% endhighlight %}

<p><img src="/assets/images/250329/05.png" /></p>

하지만 `506 Cannot talk to daemon` 메세지와 함께 실패했습니다. chronyd가 실행 중이 아니라서 실패했다는 메세지였습니다. chronyd가 켜져 있지 않고, 오류로 인해 켤 수 있는 방법도 없으므로 제가 선택할 수 있는 방법은 chronyd를 삭제했다가 재설치해보는 방법 뿐이었습니다.

{% highlight shell linenos %}
sudo apt purge chrony -y
sudo apt install chrony -y
{% endhighlight %}

<p><img src="/assets/images/250329/07.png" /></p>

그 이후에 `chronyc tracking` 명령어를 실행하자 아래와 같이 정상적으로 작동하고 있는 것을 확인할 수 있었습니다.

{% highlight shell linenos %}
chronyc tracking
{% endhighlight %}

<p><img src="/assets/images/250329/08.png" /></p>

`timedatectl status` 명령어로 확인했을 때도 `System clock synchronized`가 yes로 표시되고 있는 것을 확인할 수 있었습니다.

{% highlight shell linenos %}
timedatectl status
{% endhighlight %}

<p><img src="/assets/images/250329/09.png" /></p>

시스템 시간이 정상적으로 동기화 되자 구글 로그인도 정상적으로 잘 작동하는 것을 확인할 수 있었습니다.