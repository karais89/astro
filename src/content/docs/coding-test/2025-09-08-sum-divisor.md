---
title: "약수의 합 (Lv.1)"
description: 약수의 합 문제 풀이.
date: 2025-09-08
tags: ["programmers"]
draft: false
preferBodyH1: true
---

# 약수의 합 (Lv.1)

## 문제 요약

정수 n을 입력받아 n의 약수를 모두 더한 값을 리턴하는 함수, solution을 완성해주세요.

## 풀이 코드 (C#)

```csharp
public class Solution {
    public int solution(int n) {
        int answer = 0;
        for (int i = 1; i <= n; i++)
        {
            if (n % i == 0)
            {
                answer += i;
            }
        }
        return answer;
    }
}
```

## 다른 사람 풀이
```csharp
public class Solution
{
    public int solution(int n)
    {
        int res = 0;
        int halfNumber = n / 2;

        for (int i = 1; i <= halfNumber; ++i)
        {
            if (n % i == 0)
                res += i;
        }

        return res + n;
    }
}
```
- i는 n의 절반까지만 검사해도 충분 (i <= n/2), 마지막에 n을 더하면 됨 → 반복 횟수 절반 절약

## 메모
- 핵심 아이디어: 약수의 합 구하기
- 헷갈린 부분: 없음
- 복습 필요: [ ]

## 추가 메모
- 패턴: 약수(divisor) 구하기 → O(n) → O(n/2) → O(√n)으로 점진적 최적화 가능
- 알고리즘 키워드: 약수(divisor), 제곱근 최적화, 수학적 성질 활용
- 복습 포인트:
    - O(n) → O(√n) 최적화 방식 직접 구현해보기
    - 다른 수학 문제에서도 "짝을 이루는 성질"을 활용할 수 있는지 고민해보기