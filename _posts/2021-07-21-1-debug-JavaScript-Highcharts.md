---
title:  "[Debug][JavaScript] 210721 cannot read property series of undefined"
excerpt: "ML 기반 챗봇 Javas 개발기12 - JavaScript Highcharts"

toc: false
toc_sticky: false

categories:
  - Debug
tags:
  - Debug
  - JavaScript
  - Highcharts
last_modified_at: 2021-07-21T13:36:00
---

JavaScript의 Highcharts를 사용해서 실시간 그래프를 개발하던 중 아래와 같은 오류가 발생했다.

<p class="error_msg">cannot read property series of undefined</p>

JavaScript 내에 선언된 Chart 변수를 찾지 못해서 발생한 오류로 해당 변수를 this로 명시해주면 해결된다.

#### [수정 전]
{% highlight javascript linenos %}
chart = new Highcharts.Chart({
    chart: {
        height: 300,
        renderTo: 'data-container',
        defaultSeriesType: 'spline',
        events: {
            load: setInterval;
        }
    },
// 후략
{% endhighlight %}

#### [수정 후]
{% highlight javascript linenos %}
chart = new Highcharts.Chart({
    chart: {
        height: 300,
        renderTo: 'data-container',
        defaultSeriesType: 'spline',
        events: {
            load: function() {
                chart = this;
                setInterval;
            }
        }
    },
// 후략
{% endhighlight %}
