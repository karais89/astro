---
title: "피보나치 수 (Lv.2)"
description: 피보나치 수 문제 풀이.
date: 2025-09-26"
tags: ["programmers", "DP"]
draft: false
preferBodyH1: true
---

# 피보나치 수 (Lv.2)

## 문제 요약

피보나치 수는 F(0) = 0, F(1) = 1일 때, 1 이상의 n에 대하여 F(n) = F(n-1) + F(n-2) 가 적용되는 수 입니다.

예를들어

F(2) = F(0) + F(1) = 0 + 1 = 1
F(3) = F(1) + F(2) = 1 + 1 = 2
F(4) = F(2) + F(3) = 1 + 2 = 3
F(5) = F(3) + F(4) = 2 + 3 = 5
와 같이 이어집니다.

2 이상의 n이 입력되었을 때, n번째 피보나치 수를 1234567으로 나눈 나머지를 리턴하는 함수, solution을 완성해 주세요.

## 풀이 코드 (C#)

```csharp
using System;

public class Solution {
    public int Fibonacci(int n)
    {
        if (n == 0) return 0;
        if (n == 1) return 1;
        
        int[] arr = new int[n+1];
        arr[0] = 0;
        arr[1] = 1;
        
        for (int i = 2; i < arr.Length; i++)
        {
            arr[i] = arr[i-1] % 1234567 + arr[i-2] % 1234567;
        }
        
        return arr[n];
    }
    
    public int solution(int n) { 
        return Fibonacci(n) % 1234567;
    }
}
```

## 다른 사람 풀이

```csharp
using System.Collections.Generic;

public class Solution {
    Dictionary<int, long> fDic = new Dictionary<int, long>();

    public int solution(int n) {
        fDic.Clear();
        fDic.Add(0, 0);
        fDic.Add(1, 1);
        for (int i = 2; i <= n; i++)
        {
            long sum = checked(fDic[i - 1] + fDic[i - 2]) % 1234567;
            fDic.Add(i, sum);
        }

        return (int)fDic[n];
    }
}
```

## 개선 코드

```csharp
public int solution(int n) {
    if (n == 0) return 0;
    if (n == 1) return 1;

    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        int temp = (a + b) % 1234567;
        a = b;
        b = temp;
    }
    return b;
}
```

- 배열을 선언하지 않아도 충분히 해결 가능.
- 공간 최적화가 필요한 경우 위 처럼 배열을 선언하지 않고 바로 적용 함.

## 메모

- 선택 포인트: 피보나치 수의 경우 일반적으로 재귀로 풀면 편하긴 한데 일정 수 이상 넘어가면 스택 오버플로우 발생함으로, 재귀로 풀지 않음.
- 개선 가능: 배열을 선언하지 않고도 푸는 방법이 있을 것 같으나, 조금 생각하기 까다로운 부분이 있었음.
- 주의할 부분: 나머지 연산에 대한 성질을 알아야 되는 부분

## 학습 메모
- 패턴: 피보나치 → 전형적인 DP 문제. 점화식 + 중복 계산 제거.
- 복습 포인트
  - 재귀 방식은 지수 시간(O(2^n))이라 피해야 함.
  - 배열 전체 vs 변수 2개 최적화 차이 반드시 기억.
  - 모듈러 연산((a+b) % m)은 반드시 계산 직후 해주어야 안전하다.
- 추천 연습 문제
  - "계단 오르기" (DP 점화식 응용)
  - "타일링" (2×n 직사각형 채우기 문제)

## DP (Dynamic Programming) 요약
- 큰 문제를 작은 문제로 나누고, 중복 계산을 **저장·재활용**하는 방식  
- Top-Down: 재귀 + 메모이제이션  
- Bottom-Up: 반복문 + 테이블 채우기 (피보나치 배열 풀이)  
- 공간 최적화: 배열 대신 직전 두 값만 저장 → O(1) 메모리  

## 모듈러 연산 요약
- 피보나치 수는 매우 커지므로, 중간마다 `% m`을 적용해 **오버플로우를 방지**해야 한다.
- 모듈러 연산 성질: `(a + b) % m = ((a % m) + (b % m)) % m`  
- 따라서 “가공된 값(나머지)”을 써도 원래 수의 나머지와 **동일한 결과**를 얻는다.  
- mod 연산은 덧셈에 대해 닫혀 있으므로, `F(n-1) % m`과 `F(n-2) % m`으로도 정확히 `F(n) % m`을 계산할 수 있다.  