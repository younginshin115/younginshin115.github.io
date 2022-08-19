---
title:  "[Debug][Pytorch] 211020 cannot import name 'SAVE_STATE_WARNING' from 'torch.optim.lr_scheduler'"
excerpt: "Pytorch 기반 Distil-KoBERT를 학습시킬 때 발생한 오류 해결"

toc: false
toc_sticky: false

categories:
  - Debug
tags:
  - Debug
  - Python
  - Pytorch
  - Distil-KoBERT
last_modified_at: 2021-10-20T11:10:00
---

Pytorch 기반 Distil-KoBERT를 학습시킬 때 아래와 같은 오류가 발생했다.

<p class="error_msg">cannot import name 'SAVE_STATE_WARNING' from 'torch.optim.lr_scheduler'</p>
<p class="code"><img src="/assets/images/21102001.jpg" /></p>

Torch 1.4.0 이후 버전에서 SAVE_STATE_WARNING 모듈이 삭제되어 발생한 오류로 Torch를 1.4.0 버전으로 다시 깔아주면 해결된다.

{% highlight shell linenos %}
pip install --user -q torch==1.4.0 -f https://download.pytorch.org/whl/cu111/torch_stable.html
{% endhighlight %}

> repository 주소에서 CUDA 버전을 잘 확인해야 한다.

이렇게 Torch를 재설치해주고 나면 아래처럼 제대로 실행되는 것을 확인할 수 있다.
<p class="code"><img src="/assets/images/21102002.png" /></p>
