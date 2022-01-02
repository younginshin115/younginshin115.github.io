---
title:  "[Debug][Bazel] 220102 Compiling Java headers app/libbasic_lib-hjar.jar (1 source file) failed: failed to delete output files before executing action"
excerpt: "Bazel Build 시 발생한 오류 해결"

toc: false
toc_sticky: false

categories:
  - Debug
tags:
  - Debug
  - Bazel
  - Android
last_modified_at: 2022-01-02T17:37:00
---

Bazel Build 명령어를 실행하자 아래와 같은 오류가 발생하였다.

<p class="error_msg">
Compiling Java headers app/libbasic_lib-hjar.jar (1 source file) failed: failed to delete output files before executing action<br>
Target //app:helloworld failed to build<br>
Use --verbose_failures to see the command lines of failed build steps.<br>
INFO: Elapsed time: 0.955s, Critical Path: 0.03s<br>
INFO: 3 processes: 3 internal.<br>
FAILED: Build did NOT complete successfully
</p>

<p class="code"><img src="/assets/images/22010223.png" /></p>

Bazel clean 명령어를 실행한 후 다시 시도하였더니 정상적으로 실행되었다.

<p class="code"><img src="/assets/images/22010224.png" /></p>

<p class="code"><img src="/assets/images/22010225.png" /></p>
