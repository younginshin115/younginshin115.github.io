---
title:  "[Docker] How to grep docker log"
excerpt: "Docker log에 grep 명령어를 적용하는 방법"

toc: false
toc_sticky: false

categories:
  - Tutorial
tags:
  - Tutorial
  - Docker
last_modified_at: 2024-12-15T09:09:00
---

Docker로 프로세스를 돌리는 데 warning 메세지가 너무 많아 나와 로그에서 모니터링용으로 만든 메세지 찾기가 어려웠습니다. 해당 Warning 메세지는 log level을 조정하여 그 다음 로그부터는 같은 문제가 발생하지 않았지만 우선, 현재 로그에서 모니터링 메세지를 찾는게 문제였습니다.

평소처럼 `grep` 명령어를 사용하였으나 작동하지 않았습니다. 검색을 통해 아래 명령어로 `docker logs` 명령어에 `grep`을 적용할 수 있다는 사실을 알게 되었습니다. ([참고](https://gist.github.com/roylee0704/b5c8090e6cbfe1a9ae6c63062623a7cd?permalink_comment_id=4598402))

{% highlight bash linenos %}
docker logs {container name} 2>&1 | grep "{serch words}"
{% endhighlight %}

<p><img src="/assets/images/24121501/02.png" /></p>

문제를 해결하고 나니 왜 기존에는 `grep`이 적용이 안되었고 `2>&1` 옵션을 추가하고 나니 적용이 되는지 궁금했습니다.

`2>&1` 명령어는 리눅스 쉘에서 표준 에러 출력(stderr)을 표준 출력(stdout)으로 리디렉션하는 명령어입니다. 이 명령어에서 `1`은 표준 출력을, `2`는 표준 에러 출력(stderr)을 `>&`은 리디렉션을 의미합니다. 

`docker logs` 명령어는 일부 로그를 표준 에러 출력(stderr)에 출력합니다. `grep`은 표준 출력(stdout)만 처리하기 때문에 로그가 표준 에러 출력(stderr)에 출력되고 있다면 적용되지 않을 수 있습니다. 그러므로 표준 에러 출력(stderr)을 표준 출력(stdout)으로 병합하면 `grep` 명령어를 적용할 수 있는 것입니다.