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

filebeat.yml 파일은 승인되지 않은 사용자가 파일을 수정하는 것을 방지하기 위해 사용자 제한이 필요합니다. 공식 문서의 [Config File Ownership and Permissions](https://www.elastic.co/guide/en/beats/libbeat/5.3/config-file-permissions.html)를 참조하시면 됩니다. 아래 명령어로 filebeat.yml의 유저와 권한을 바꿔준 후에 filebeat를 재기동하면 문제가 해결됩니다.

{% highlight shell linenos %}
sudo chown root ./filebeat/filebeat.yml
sudo chmod go-w ./filebeat/filebeat.yml
{% endhighlight %}

정상적으로 구동되면 아래와 같이 로그가 출력됩니다.

<p><img src="/assets/images/23112003.png" /></p>
