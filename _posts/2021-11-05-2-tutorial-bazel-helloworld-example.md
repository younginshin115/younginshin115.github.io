---
title:  "[Tutorial][Bazel] 211105 Android Bazel Hello World 예제"
excerpt: "Android에 머신러닝 탑재하기(4)"

toc: true
toc_sticky: true

categories:
  - Tutorial
tags:
  - Tutorial
  - Bazel
last_modified_at: 2021-11-05T16:28:00
---

Bazel 도전기 세번째 시간으로 프로젝트를 만들어서 Hello World를 Android App에 띄워보는 것이 목표이다.

## (1) 프로젝트 준비 - Workspace 만들기

(1-1) 우선 프로젝트 폴더를 만든다.<br>
평소 Android 프로젝트를 만들던 폴더에 새로운 폴더를 만든다.
나는 폴더 명을 "bazel-android-hello-world"로 정했다.

<p><img src="/assets/images/21123128.png" /></p>

(1-2) CMD로 만들어둔 폴더로 이동해서 WORKSPACE 파일을 만든다. 대소문자에 주의하자.

<p class="code"><img src="/assets/images/21123129.png" /></p>

<p><img src="/assets/images/21123130.png" /></p>

(1-3) CMD 창에 아래 명령어를 입력한다. 아래 이미지처럼 표시된다면 Bazel 프로젝트를 시작할 준비가 되었다는 뜻이다.

```
bazel info workspace
```

<p class="code"><img src="/assets/images/21123131.png" /></p>

## (2) Android Studio에서 프로젝트 열기

(2-1) Android Studio를 연다.

(2-2) File에서 Import Bazel Porject 버튼을 누른다.

<p><img src="/assets/images/21123132.png" /></p>

(2-3) ... 버튼을 눌러 Workspace 경로를 선택한다. 

<p><img src="/assets/images/21123133.png" /></p>

(2-4) 아까 WORKSPACE 파일을 만들어뒀던 디렉토리로 설정하고 OK 버튼을 누른다.

<p><img src="/assets/images/21123134.png" /></p>

(2-5) 경로 설정이 완료되었다면 Next 버튼을 누른다.

<p><img src="/assets/images/21123135.png" /></p>

(2-6) 프로젝트 생성 방법으로는 여러가지가 있지만 이번에는 제일 위에 있는 "Create from scratch"를 선택한다.

<p><img src="/assets/images/21123136.png" /></p>

(2-7) Finish를 눌러 Bazel 프로젝트 Import를 마무리한다.

<p><img src="/assets/images/21123137.png" /></p>

## (3) WORKSPACE 파일 작성하기

(3-1) WORKSPACE는 간단히 말하면 Bazel의 빌드 규칙을 정하는 문서라고 할 수 있다.<br>
WORKSPACE 파일을 메모장이나 워드패드 등 문서 수정이 가능한 툴로 연다.

(3-2) 빌드 규칙을 아래와 같이 작성하여 저장한다.

```
android_sdk_repository(
    name = "androidsdk",
    path = "{Android Sdk 경로}",
)

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")
http_archive(
    name = "rules_java",
    sha256 = "220b87d8cfabd22d1c6d8e3cdb4249abd4c93dcc152e0667db061fb1b957ee68",
    url = "https://github.com/bazelbuild/rules_java/releases/download/0.1.1/rules_java-0.1.1.tar.gz",
)
load("@rules_java//java:repositories.bzl", "rules_java_dependencies", "rules_java_toolchains")
rules_java_dependencies()
rules_java_toolchains()
```

<p><img src="/assets/images/21123138.png" /></p>

## (4) 프로젝트 구조 생성

(4-1) WORKSPACE가 있는 폴더에 "app" 폴더를 생성한다.

<p><img src="/assets/images/21123139.png" /></p>

(4-2) "app" 폴더 안에 "java" 폴더와 "res" 폴더를 생성한다.

<p><img src="/assets/images/21123140.png" /></p>

(4-3) "java" 폴더 안에는 "com/example/helloworld" 경로를 생성한다.

<p><img src="/assets/images/21123141.png" /></p>

(4-4) "res" 폴더 안에는 "layout" 폴더를 생성한다.

<p><img src="/assets/images/21123142.png" /></p>

## (5) 소스 코드 작성

(5-1) 메모장이나 워드패드에 아래 코드를 작성한 후 "app/java/com/example/helloworld" 경로 안에 "MainActivity.java"라는 이름으로 저장한다.

```java
package com.example.helloworld;

import android.app.Activity;
import android.os.Bundle;

public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }
}
```
<p><img src="/assets/images/21123143.png" /></p>
<p><img src="/assets/images/21123144.png" /></p>

(5-2) 아래 코드를 작성한 뒤 "app/res/layout" 경로 안에 "activity_main.xml"라는 이름으로 저장한다.

```xml
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:id="@+id/text"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:text="Hello World!" />

</FrameLayout>
```

<p><img src="/assets/images/21123145.png" /></p>
<p><img src="/assets/images/21123146.png" /></p>

(5-3) 아래 코드를 작성한 뒤 "app" 경로 안에 "AndroidManifest.xml"라는 이름으로 저장한다.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.helloworld">
   
    <application android:label="Bazel Android Hello World">
        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
    
    <uses-sdk
        android:minSdkVersion="21"
        android:targetSdkVersion="29" />

</manifest>
```

<p><img src="/assets/images/21123147.png" /></p>
<p><img src="/assets/images/21123148.png" /></p>

## (6) BUILD 파일 작성

(6-1) 아래 코드를 작성한 뒤 "app" 경로 안에 "BUILD"라는 이름으로 저장한다. "BUILD" 파일은 빌드 시 타겟을 명시해주는 파일이다.

```
android_binary(
    name = "app",
    custom_package = "com.example.helloworld",
    manifest = "AndroidManifest.xml",
    srcs = ["java/com/example/helloworld/MainActivity.java"],
    resource_files = glob(["res/**"]),
)
```

<p><img src="/assets/images/21123149.png" /></p>
<p><img src="/assets/images/21123150.png" /></p>

## (7) 앱 빌드

(7-1) CMD 창으로 "bazel-android-hello-world" 디렉토리로 이동한다.

(7-2) 아래 명령어로 프로젝트를 빌드한다.<br>Mediapipe 설치하기를 통해 관련 패키지들을 설치해야 제대로 실행된다.

```
bazel build //app:app
```

<p class="code"><img src="/assets/images/22010126.png" /></p>

(7-3) 이제 빌드 완료된 앱을 모바일 디바이스에서 실행시킬 차례이다.<br>
아래 명렁어로 모바일 디바이스에 앱을 설치한다.

```
bazel mobile-install //app:app
```

<p class="code"><img src="/assets/images/22010127.png" /></p>

(7-4) 설치가 완료되면 아래와 같이 모바일 디바이스에 app이 설치된 것을 확인할 수 있고 실행해보면 정상적으로 실행되는 것을 확인할 수 있다.

<img width="30%" src="/assets/images/22010128.jpg" /> <img width="30%" src="/assets/images/22010129.jpg" />