---
title: "슬라이딩 윈도우 패턴 정리"
description: 연속된 구간을 효율적으로 탐색할 때 사용하는 슬라이딩 윈도우(Sliding Window) 패턴을 정리합니다.
date: 2025-10-24
tags: ["coding-test", "sliding-window", "algorithm"]
draft: false
template: splash
related:
  - slug: "coding-test/2025-10-24-number"
---

## 도입부

코딩테스트 문제를 풀다 보면 "연속된 부분 구간"을 탐색하거나 합을 구하는 문제가 자주 나옵니다.  
예를 들어, “연속된 수의 합”, “최대 연속 부분합”, “연속 부분 수열의 합의 개수” 같은 문제들이죠.

이런 문제를 처음 풀 때는 매번 `for`문으로 합을 다시 구하곤 했는데,  
시간 복잡도가 너무 커서 효율이 떨어집니다.  
찾아보니 이런 상황에서 자주 쓰이는 패턴이 바로 **슬라이딩 윈도우(Sliding Window)** 였습니다.

## 기본 구조

슬라이딩 윈도우는 **고정된 길이의 구간(윈도우)을 한 칸씩 옮겨가며** 데이터를 처리하는 기법입니다.  
핵심은 매번 합을 새로 계산하지 않고,  
**이전 상태에서 빠진 값과 새로 들어온 값만 반영**한다는 점입니다.

```csharp
int[] arr = { 1, 2, 3, 4, 5 };
int k = 3; // 윈도우 크기
int sum = 0;

// 첫 구간 합
for (int i = 0; i < k; i++) sum += arr[i];
Console.WriteLine(sum); // 6

// 슬라이딩 시작
for (int i = k; i < arr.Length; i++) {
    sum += arr[i] - arr[i - k];
    Console.WriteLine(sum);
}
````

출력 결과는 `[6, 9, 12]`가 됩니다.
즉, `1+2+3 → 2+3+4 → 3+4+5`처럼 윈도우가 한 칸씩 미끄러지며 합을 효율적으로 갱신합니다.

## 확장 예시: 원형 수열 문제

프로그래머스 **「연속 부분 수열 합의 개수 (Lv.2)」** 문제에서는
원형 구조를 처리하기 위해 배열을 2배로 확장하고,
각 윈도우 길이에 대해 슬라이딩 윈도우를 적용합니다.

```csharp
public int solution(int[] elements) {
    int n = elements.Length;
    int[] extended = new int[n * 2];
    for (int i = 0; i < n * 2; i++)
        extended[i] = elements[i % n];

    HashSet<int> sums = new HashSet<int>();

    for (int size = 1; size <= n; size++) {
        int sum = 0;
        for (int i = 0; i < size; i++) sum += extended[i];
        sums.Add(sum);

        for (int start = 1; start < n; start++) {
            sum += extended[start + size - 1] - extended[start - 1];
            sums.Add(sum);
        }
    }

    return sums.Count;
}
```

배열을 두 배로 확장하면 인덱스가 자연스럽게 이어지기 때문에, 원형 처리 로직을 따로 작성할 필요가 없습니다.

## 장단점

- **장점**
  - 한 번 계산한 결과를 재활용하므로 시간 효율이 뛰어남
  - 반복 구조가 단순해 구현이 쉽고 직관적
  - 누적합과 함께 쓰면 더욱 빠른 계산 가능

- **단점**
  - 윈도우 크기가 가변적일 경우(예: 투 포인터 문제)는 별도 처리 필요
  - 초기 합 계산이나 인덱스 관리에서 실수하기 쉬움

## 내 생각

> 슬라이딩 윈도우는 “연속된 구간”이 등장하면 일단 떠올려야 할 1순위 패턴이다.

## 마무리

슬라이딩 윈도우는 결국 **“변화량만 더하고 빼는 사고방식”**입니다.
매번 전체를 다시 계산하지 말고, 이전 상태를 최대한 재활용하는 것이 효율적인 알고리즘의 핵심이다.
