---
title:  "[Tutorial][Bazel-MediaPipe] 220811 Android Bazel MediaPipe 예제(2)"
excerpt: "Android에 머신러닝 탑재하기(6)"

toc: true
toc_sticky: true
published: false
categories:
  - Tutorial
tags:
  - Tutorial
  - Android
  - Bazel
  - Mediapipe
  - Helloworld
last_modified_at: 2022-08-11T20:18:00
---

Android에 머신러닝 탑재하기 다섯번째 시간으로 MediaPipe 공식 홈페이지에 나와있는 Hello world 예제를 하나하나 따라하여 Bazel 빌드까지 완료하는 것이 목표이다. MediaPipe 공식 홈페이지 Android용 튜토리얼은 아래 링크를 통해 확인할 수 있다.<br>
링크: <a href="https://google.github.io/mediapipe/getting_started/hello_world_android.html">https://google.github.io/mediapipe/getting_started/hello_world_android.html</a>

## (1) 프로젝트 준비 - 필요한 사항 점검하기

프로젝트를 진행하기 위해서 아래와 같이 환경이 구성되어 있어야 한다.
1. Bazel 설치(<a href="/tutorial/1-tutorial-bazel-windows-installation/">링크</a>)
2. MediaPipe 설치(<a href="/tutorial/1-tutorial-mediapipe-installation/">링크</a>)
3. Android SDK와 NDK 설치(<a href="/tutorial/1-tutorial-mediapipe-example/">링크</a>)

튜토리얼을 차례대로 따라왔다면 모두 설치되어있을 것이다.

## (2) Workspace 만들기

(2-1) 프로젝트 폴더를 만든다. 나는 폴더명을 "mediapipe-edge-detection"로 정했다.
<p><img src="/assets/images/22081101.png" /></p>

(2-2) 이전에 MediaPipe를 설치할 때 MediaPipe GitHub Repository를 클론해둔 곳으로 이동한다. Mediapipe는 Workspace 구성에 필요한 파일과 소스를 해당 Repository에서 제공한다. 아래 스크린샷에서 third_party 폴더부터 WORKSPACE 까지 모든 파일을 프로젝트 폴더로 옮긴다.

<p><img src="/assets/images/22010202.png" /></p>

(2-3) WORKSPACE 파일에서 파일 경로가 변경되어 제대로 실행이 안되는 경우가 있으므로 아래와 같이 수정이 필요하다.

(2-3-1) Tensorflow 경로 수정(2021.11 기준)

"Tensorflow repo should always go after the other external dependencies."라는 문장을 검색하면 아래와 같이 _TENSORFLOW_GIT_COMMIT과 _TENSORFLOW_SHA256 항목을 확인할 수 있다. 두 항목을 아래와 같이 수정해준다.

_TENSORFLOW_GIT_COMMIT<br>
수정 전: 18a1dc0ba806dc023808531f0373d9ec068e64bf<br>
수정 후: 52a2905cbc21034766c08041933053178c5d10e3

_TENSORFLOW_SHA256<br>
수정 전: 85b90416f7a11339327777bccd634de00ca0de2cf334f5f0727edcb11ff9289a<br>
수정 후: 06d4691bcdb700f3275fa0971a1585221c2b9f3dffe867963be565a6643d7f56

수정하면 아래와 같다.

<p><img src="/assets/images/22010211.png" /></p>

(2-3-2) SDK와 NDK 경로 삽입

"# iOS basic build deps."라는 문장을 검색 후 그 위에 Android SDK와 NDK 로컬 경로를 삽입한다.

```
# You may run setup_android.sh to install Android SDK and NDK.
android_sdk_repository(
    name = "androidsdk",
    path = "{로컬 SDK 경로}"
)

android_ndk_repository(
    name = "androidndk",
    path = "{로컬 NDK 경로}"
)
```
<p><img src="/assets/images/22010212.png" /></p>

## (3) 프로젝트 구조 만들기

(3-1) 프로젝트 폴더에 "app" 폴더를 만든다.

<p><img src="/assets/images/22081602.png" /></p>

(3-2) "app" 폴더 안에 "java" 폴더와 "res" 폴더를 생성한다.

<p><img src="/assets/images/22081603.png" /></p>

(3-3) "java" 폴더 안에는 "com/example/mediapipe/edgeDetection" 경로를 생성한다.

<p><img src="/assets/images/22081601.png" /></p>

(3-4) "res" 폴더 안에는 "layout" 폴더와 "values" 폴더를 생성한다.

<p><img src="/assets/images/22081604.png" /></p>

## (4) 소스 코드 작성

이번 프로젝트는 지난 번에 했던 Hello world 프로젝트(<a href="/tutorial/1-tutorial-mediapipe-example/">링크</a>)를 확장하는 식으로 진행된다.

(4-1) AndroidManifest.xml

{% highlight python linenos %}
print(hello)
{% endhighlight %}


(4-1) 메모장이나 워드패드에 아래 코드를 작성한 후 "app/java/com/example/mediapipe/helloworld" 경로 안에 "MainActivity.java"라는 이름으로 저장한다.

```java
package com.example.mediapipe.helloworld;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
  }
}
```

(4-2) 아래 코드를 작성한 뒤 "app/res/layout" 경로 안에 "activity_main.xml"라는 이름으로 저장한다.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

  <TextView
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Hello World!"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintLeft_toLeftOf="parent"
    app:layout_constraintRight_toRightOf="parent"
    app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

(4-3) 아래 코드를 작성한 뒤 "app" 경로 안에 "AndroidManifest.xml"라는 이름으로 저장한다.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.mediapipe.helloworld">

  <uses-sdk
      android:minSdkVersion="19"
      android:targetSdkVersion="31" />

  <application
      android:allowBackup="true"
      android:label="${appName}"
      android:supportsRtl="true"
      android:theme="@style/AppTheme">
      <activity
          android:name="${mainActivity}"
          android:exported="true"
          android:screenOrientation="portrait">
          <intent-filter>
              <action android:name="android.intent.action.MAIN" />
              <category android:name="android.intent.category.LAUNCHER" />
          </intent-filter>
      </activity>
  </application>

</manifest>
```

(4-4) 아래 코드를 작성한 뒤 "app" 경로 안에 "BUILD"라는 이름으로 저장한다. "BUILD" 파일은 빌드 시 타겟을 명시해주는 파일이다.

```
android_library(
    name = "basic_lib",
    custom_package = "com.example.mediapipe.helloworld",
    srcs = ["java/com/example/mediapipe/helloworld/MainActivity.java"],
    manifest = "AndroidManifest.xml",
    resource_files = glob(["res/**"]),
    deps = [
        "//third_party:androidx_constraint_layout",
        "//third_party:androidx_appcompat",
    ],
)

android_binary(
    name = "helloworld",
    custom_package = "com.example.mediapipe.helloworld",
    manifest = "AndroidManifest.xml",
    manifest_values = {
        "appName": "MediaPipe Hello World",
        "mainActivity": ".MainActivity",
    },
    multidex = "native",
    deps = [
        ":basic_lib",
    ],
)
```

(4-5) 마지막으로 아래 두 파일을 "app/res/values" 디렉토리에 생성한다.

colors.xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="colorPrimary">#008577</color>
    <color name="colorPrimaryDark">#00574B</color>
    <color name="colorAccent">#D81B60</color>
</resources>
```

styles.xml
```xml
<resources>

    <!-- Base application theme. -->
    <style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
        <!-- Customize your theme here. -->
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
        <item name="colorAccent">@color/colorAccent</item>
    </style>

</resources>
```

## (5) 앱 빌드

(5-1) CMD 창에서 아래와 같이 명령어를 입력하여 앱을 빌드한다.

```
bazel build -c opt --define MEDAPIPE_DISABLE_GPU=1 --action_env PYTHON_BIN_PATH="{Python 경로}" //app:helloworld
```

<p><img src="/assets/images/22010218.png" /></p>

## (6) 앱 설치

(6-1) 프로젝트 폴더에 "bazel-bin/app" 경로로 들어가면 helloworld.apk 파일을 확인할 수 있다.

<p><img src="/assets/images/22010219.png" /></p>

(6-2) CMD 창에서 bazel-bin/app 폴더로 이동한 뒤 아래 명령어로 모바일 디바이스에 앱을 설치한다.

```
adb install helloworld.apk
```

<p class="code"><img src="/assets/images/22010220.png" /></p>

(6-3) 아래처럼 BUILD 파일에 설정한 이름대로 앱이 설치된 것을 확인할 수 있고 설치된 앱을 실행해보면 Hellow World가 정상적으로 출력되는 것 또한 확인할 수 있다.

<img width="30%" src="/assets/images/22010221.jpg" /> <img width="30%" src="/assets/images/22010222.jpg" />