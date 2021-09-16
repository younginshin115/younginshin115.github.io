---
title:  "[디버깅][Python] 210916 ERROR: Could not install packages due to an EnvironmentError: [Errno 13] Permission denied"
excerpt: "pip install 과정에서 발생한 오류 해결"

toc: false
toc_sticky: false

categories:
  - Debug
tags:
  - Debug
  - Python
last_modified_at: 2021-09-16T22:36:00
---

pip로 package를 설치하던 중 아래와 같은 오류 메시지가 발생했다.
<p class="error_msg">
ERROR: Could not install packages due to an EnvironmentError: [Errno 13] Permission denied: '/home/adminuser/voicefilter/.venv/lib/python3.8/site-packages/tqdm-4.62.2.dist-info'
Consider using the `--user` option or check the permissions.
</p>
<p class="code"><img src="/assets/images/21091601.png" /></p>

pyvenv.cfg 파일의 include-system-site-packages 옵션을 True로 설정해서 해결했다.
pyvenv.cfg 파일은 venv 환경을 사용하는 경우 해당 폴더에서 확인할 수 있다.
<p style="background-color: black;"><img src="/assets/images/21091602.png" /></p>

[수정 전]
<p style="background-color: black;"><img src="/assets/images/21091603.png" /></p>

[수정 후]
<p style="background-color: black;"><img src="/assets/images/21091604.png" /></p>

이렇게 수정해 준 뒤 다시 시도하면 아래와 같이 성공적으로 설치되는 것을 확인할 수 있다.
<p class="code"><img src="/assets/images/21091605.png" /></p>

