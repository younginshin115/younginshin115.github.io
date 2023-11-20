---
title:  "[Debug][Filebeat] 231120 Filebeat 구동 시 발생한 권한 문제 해결"
excerpt: "Filebeat 구동 시 발생한 권한 문제 해결"

toc: false
toc_sticky: false

categories:
  - Debug
tags:
  - Debug
  - ELK
  - Filebeat
last_modified_at: 2023-11-20T20:48:00
---

Filebeat 구동 시 아래와 같은 권한 문제가 발생했습니다.

<p><img src="/assets/images/23112001.png" /></p>

<p class="error_msg">
Exiting: error loading config file: config file ("filebeat.yml") must be owned by the beat user (uid=0) or root
</p>

filebeat.yml 파일은 사용자를 제한해야하는 데 모두가 사용할 수 있도록 권한을 설정해두었기 때문에 발생한 이슈였습니다.
스크린샷은 못 찍었지만 오류 메시지에서 해결 방법을 제시하고 있습니다. 오류 메시지의 안내대로 아래 명령어로 filebeat.yml 권한을 바꿔준 후에 filebeat를 재기동하면 문제가 해결됩니다.

{% highlight shell linenos %}
sudo chmod go-w filebeat/filebeat.yml
{% endhighlight %}

정상적으로 구동되면 아래와 같이 로그가 출력됩니다.

<p><img src="/assets/images/23112003.png" /></p>
