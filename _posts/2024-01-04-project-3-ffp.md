---
title:  "[Project][연세대 공학대학원] Future Frame Prediction 모델 개선 프로젝트"
excerpt: "2023년 2학기 연세대 공학대학원 딥러닝기반이상탐지모델링 수업 팀 프로젝트: Future Frame Prediction 모델 개선 프로젝트"

toc: true
toc_sticky: true
published: false
categories:
  - Project
tags:
  - Project
  - Pytorch
  - Transformer
  - CNN
  - ML
last_modified_at: 2024-01-04T17:30:00
---

# Future Frame Prediction 모델 개선 프로젝트

## 프로젝트 개요

<img src="/assets/images/projects/project_3_01.png" />

### 기간
2023.11.1~2023.12.3

### 설명
연세대학교 공학대학원 컴퓨터소프트웨어 전공 강의인 '딥러닝기반 이상탐지모델링'의 팀 프로젝트로 딥러닝 이상탐지 방법론 중 하나인 [Future Frame Prediction](https://arxiv.org/abs/1712.09867) 모델을 Baseline 논문으로 하여 성능 개선 실험 진행

### 인원 
5명

### 담당 역할 및 사용 기술
논문 구현 및 개선
Pytorch, Tensorboard, Transformer (ViViT)

### 저장소
[https://github.com/younginshin115/Anomaly_Prediction](https://github.com/younginshin115/Anomaly_Prediction)

## Baseline 논문

TODO : 채우기

## 문제 정의 및 방법 제안

<img src="/assets/images/projects/project_3_02.png" />

첫번째로 CNN 기반 모델인 U-Net이 갖는 Long-range Relation 한계를 극복하기 위해 Transformer를 사용하고 했습니다. 하지만 Transformer를 단독으로 사용할 경우 Inductive Bias가 부족해서 학습에 대량의 데이터가 필요하다는 단점이 있었습니다. 이를 극복하기 위해 Transformer를 단독으로 사용하지 않고 U-Net과 Transformer를 결합한 형태의 구조를 사용하여 U-Net의 장점과 Transformer의 단점을 모두 취하고자 했습니다.

두번째로 모델 구조를 분석하여 현재 Baseline 논문인 Future Frame Prediction 모델의 경우 프레임을 단순 합하여 사용하기 때문에 Temproal Relation이 약하다는 문제가 있습니다. 이에 같은 파라미터를 공유하는 여러개의 인코더로 임베딩 추출하고 Transformer를 사용하여 Self-Attention을 적용하는 것으로 이 문제를 해결하고자 했습니다.

이 두가지를 모두 고려하였을 때 Predictor의 구조를 기존에 발표되었던 [TransAnomaly](https://ieeexplore.ieee.org/document/9525368)의 Predictor의 구조로 교체하면 두가지 문제를 모두 해결할 수 있을것이라고 생각했습니다.

<img src="/assets/images/projects/project_3_03.png" />

두번째를 좀 더 설명하기 위해 Future Frame Prediction과 Transanomaly의 Predictor 구조를 가져왔습니다. 보시는 바와 같이 U-Net은 input이 하나입니다. 모든 프레임을 쌓아서 넣기 때문에 서로에 대한 Temporal Relation이 약하다는 단점이 있습니다. 반면 TransAnomaly의 Predictor 구조를 보시면 인코더를 4개의 레이어를 병렬로 사용하여 4개의 feature를 뽑고 이를 순서 정보를 지켜서 Transformer로 인코딩을 하므로 시간적, 순서적 정보가 상대적으로 잘 살아있다는 장점이 있습니다.

<img src="/assets/images/projects/project_3_04.png" />

Future Frame Prediction 모델은 Temporal 정보를 확보하기 위해 실제 프레임과 그 직전 프레임과의 움직임 차이, 예측한 프레임과 그 직전 실제 프레임과의 움직임 차이를 Optical Flow 모델을 이용하여 계산합니다. Baseline 모델은 FlowNet을 Optical Flow 모델로 사용했습니다. 하지만 이 FlowNet은 초기 모델인 만큼 작은 변화와 Noise Artifact에 취약해 현실에 적용하기 어렵다는 단점이 있었습니다. Baseline 논문이 발표된 이후 FlowNet에 대한 후속 연구가 이어져 FlowNet2, LiteFlowNet 등 다양한 개선 모델이 나왔습니다. 이에 FlowNet을 FlowNet2와 LiteFlowNet 교체했습니다.

<img src="/assets/images/projects/project_3_05.png" />

Future Frame Prediction은 모델의 성능이 Predictor의 성능에 달려있다고 강조하고 있습니다. 이에 기존 Loss Function의 조합을 현재의 모델 구조에서 테스트하여 최적의 Loss Function 조합을 찾고 새로운 Loss Function을 추가하는 실험을 진행했습니다.

## 실험 결과

### 실험 공통 개요

|--|--|--|
|Dataset|UCSD Pedestrian 2 (ped2)|
|Iteration|10,000|
|Validation Interval|1,000|
|Dataset Preprocessing|256x256으로 리사이징, 모든 프레임의 픽셀 intensity는 [-1,1]로 정규화|
|예측에 사용할 프레임 개수|4|
|Optimizer|Adam|
|Activation|ReLU|

대부분은 Baseline 논문의 실험 방식을 따랐습니다. Iteration의 경우 시간적, 자원적 제약의 한계로 한 실험당 10,000번만 진행했습니다.

### 실험 공통 목적

앞서 언급한 것 처럼 모델의 성능은 Predictor의 성능에 달려있습니다. 실험의 공통적인 목적은 다양한 Loss 함수로 Predictor를 학습하여 정상 상황의 Future Frame을 높은 성능으로 예측하는 Predictor를 구현하고 이 Predictor로 이상 상황을 잘 탐지해내는 것입니다.

아래 이미지는 저희 모델이 Avenue 데이터셋읠 학습할 때 중간 저장한 이미지입니다. 각 두 이미지 중 왼쪽이 저희가 예측한 이미지이고 오른쪽이 실제 이미지입니다.

<img src="/assets/images/projects/project_3_07.png" />

학습을 막 시작했을 때, 즉 Iteration이 천번 이하일 때는 보시다시피 이미지가 잘 예측되지 않는 것을 알 수 있습니다. 하지만 실험이 막바지에 이르렀을 때, 즉 iteration이 9,000번 이상이 됐을 때는 실제와 거의 비슷한 이미지를 예측해내는 것을 볼 수 있습니다. 이처럼 좋은 성능의 Predictor를 만드는 것이 이 실험의 목적입니다.

### 실험 1 Predictor: U-Net vs U-Net + Transformer (ViViT)

||U-Net|U-Net + Transformer|
|--|:--:|:--:|
|**Best AUC**|0.9515|0.9616|
|**Heatmap**|<img src="/assets/images/projects/project_3_exp1_1.gif" />|<img src="/assets/images/projects/project_3_exp1_2.gif" />|

첫번째 실험은 Predictor의 구조를 변경하는 실험입니다. Transformer 모델은 영상 데이터에 많이 사용하는 [ViViT: A Video VIsion Transformer](https://arxiv.org/abs/2103.15691)를 사용했습니다. 기존의 U-Net 구조에서 U-Net + Transformer 구조로 변경했을 떄 AUC가 상상하는 것을 확인할 수 있었습니다. 이후 실험은 모두 오른쪽의 U-Net + Transformer 구조의 Predictor로 진행되었다는 것을 미리 말씀드립니다.