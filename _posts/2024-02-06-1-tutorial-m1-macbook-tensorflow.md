---
title:  "[Tutorial][Tensorflow] 240206 M1 MacBook에서 Tensorflow 사용"
excerpt: "M1 MacBook에서 Tensorflow 사용"

toc: true
toc_sticky: true

categories:
  - Tutorial
tags:
  - Tutorial
  - M1 MacBook
  - Tensorflow
last_modified_at: 2024-02-06T20:37:00
---

M1 MacBook에서 Tensorflow를 사용하기 위한 방법을 설명하겠습니다.

# 1. Miniforge 설치

[Miniforge](https://github.com/conda-forge/miniforge)란 다양한 언어의 패키지, 종속성을 관리하는 [Conda](https://docs.conda.io/en/latest/)의 기초적인 설치를 위한 오픈소스로 다양한 CPU 아키텍처 지원에 중점을 두고 있습니다. 특히 ARM 아키텍처를 지원하기 때문에 Miniforge를 사용하여 Tensorflow를 설치해보도록 하겠습니다. 아래 명령어로 Miniforge를 설치합니다.

{% highlight bash linenos %}
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install miniforge
{% endhighlight %}

<p class="mac_terminal"><img src="/assets/images/240206/01.png" /></p>
<p class="mac_terminal"><img src="/assets/images/240206/02.png" /></p>
<p class="mac_terminal"><img src="/assets/images/240206/03.png" /></p>

# 2 Conda 환경 생성 & 활성화

## 2.1 다른 conda가 설치되어있지 않은 경우

아래 명령어로 tensorflow를 설치할 Conda 환경을 생성하고 활성화합니다.

{% highlight bash linenos %}
conda create —name tflite_env python=3.8
conda activate tflite_env
{% endhighlight %}

<p class="mac_terminal"><img src="/assets/images/240206/04.png" /></p>
<p class="mac_terminal"><img src="/assets/images/240206/05.png" /></p>

## 2.2 다른 conda가 설치되어 있는 경우

이 경우 두가지 방법이 있습니다. conda 명령어를 Miniforge로 연결하는 방법과 Miniforge의 경로를 찾아 직접 호출하는 방법입니다. 저는 다른 Conda 환경을 주로 사용하고 있기 때문에 Miniforge의 Conda 직접 호출하기로 했습니다. Homebrew를 사용해 설치했다면 Miniforge는 아래 경로에 있을 것입니다. 없다면 위치를 찾은 뒤 아래 경로를 해당 위치로 바꿔주세요. Miniforge의 Conda 직접 호출하여 Conda 환경을 생성합니다.

{% highlight bash linenos %}
/opt/homebrew/Caskroom/miniforge/base/bin/conda create --name tflite_env python=3.8 
{% endhighlight %}

<p class="mac_terminal"><img src="/assets/images/240206/06.png" /></p>

아래 명령어로 Conda 환경 목록을 살펴보면 Miniforge 기반의 tflite_env 환경이 추가되어있는 것을 확인할 수 있습니다.

{% highlight bash linenos %}
conda env list
{% endhighlight %}

<p class="mac_terminal"><img src="/assets/images/240206/08.png" /></p>

이제 이 개발환경을 활성화합니다.

{% highlight bash linenos %}
/opt/homebrew/Caskroom/miniforge/base/bin/conda activate tflite_env
{% endhighlight %}

<p class="mac_terminal"><img src="/assets/images/240206/07.png" /></p>

# 3. tensorflow-deps 패키지 설치

Miniforge를 이용해 Tensorflow를 설치하기 위해선 tensorflow-deps 패키지가 필요합니다. 아래 명령어로 tensorflow-deps 패키지를 설치해줍니다.

## 3.1 다른 conda가 설치되어있지 않은 경우

{% highlight bash linenos %}
conda install -c apple tensorflow-deps
{% endhighlight %}

## 3.2 다른 conda가 설치되어 있는 경우

{% highlight bash linenos %}
/opt/homebrew/Caskroom/miniforge/base/bin/conda install -c apple tensorflow-deps
{% endhighlight %}

<p class="mac_terminal"><img src="/assets/images/240206/09.png" /></p>

# 4. Tensorflow 설치

pip를 사용해 tensorflow-macos와 tensorflow-metal을 설치합니다. [tensorflow-metal](https://developer.apple.com/metal/tensorflow-plugin/)이란 Apple에서 개발한 플러그인으로 Metal API를 사용하여 M1 GPU를 가속할 수 있습니다. 기존에 다른 Conda가 설치되어있는 지 여부와 관계 없이 아래 명령어로 두 패키지를 설치할 수 있습니다. 반드시 Conda 환경이 활성화 된 상태에서 설치해야합니다.

{% highlight bash linenos %}
pip install tensorflow-macos
pip install tensorflow-metal
{% endhighlight %}

<p class="mac_terminal"><img src="/assets/images/240206/10.png" /></p>

이렇게 하면 M1 MacBook에서 Tensorflow를 사용할 수 있습니다.

# 5. (선택) 기존에 사용하던 Jupyter Notebook에서 Tensorflow 사용

저는 Tensorflow를 설치한 것에서 더 나아가 기존에 노트북에서 사용하던 Jupyter Notebook에 방금 만든 Conda 환경을 연결하여 Tensorflow를 사용해보고자 합니다. 우선 nb_conda_kernels 패키지를 설치합니다. [nb_conda_kernels](https://github.com/Anaconda-Platform/nb_conda_kernels)는 Jupyter Notebook에서 사용할 수 있는 Conda 환경을 자동으로 감지하여 Notebook의 커널로 사용할 수 있게 해주는 패키지입니다.

{% highlight bash linenos %}
/opt/homebrew/Caskroom/miniforge/base/bin/conda install -n tflite_env nb_conda_kernels
{% endhighlight %}

<p class="mac_terminal"><img src="/assets/images/240206/11.png" /></p>

패키지 설치가 완료되면 기존에 사용하던 Jupter Notebook에서 Tensorflow가 설치되어있는 Conda 환경을 사용할 수 있게 됩니다.

<p class="mac_terminal"><img src="/assets/images/240206/12.png" /></p>

# 6. Tensorflow 설치 확인

마지막으로 Tensorflow가 제대로 설치되었는지 확인하기 위해 [Tensorflow 공식 문서에 나와있는 예제](https://www.tensorflow.org/overview?hl=ko)를 실행시켜 보겠습니다. 위에서 설정한 Jupyter Notebook에서 실행해도 좋고, terminal에서 직접 실행해도 좋습니다. 

{% highlight python linenos %}
import tensorflow as tf
mnist = tf.keras.datasets.mnist

(x_train, y_train),(x_test, y_test) = mnist.load_data()
x_train, x_test = x_train / 255.0, x_test / 255.0

model = tf.keras.models.Sequential([
  tf.keras.layers.Flatten(input_shape=(28, 28)),
  tf.keras.layers.Dense(128, activation='relu'),
  tf.keras.layers.Dropout(0.2),
  tf.keras.layers.Dense(10, activation='softmax')
])

model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

model.fit(x_train, y_train, epochs=5)
model.evaluate(x_test, y_test)
{% endhighlight %}

아래처럼 코드가 정상적으로 실행된다면 제대로 설치가 된 것입니다.

<p class="mac_terminal"><img src="/assets/images/240206/13.png" /></p>
