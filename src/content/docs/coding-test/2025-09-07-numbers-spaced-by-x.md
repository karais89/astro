---
title: "x만큼 간격이 있는 n개의 숫자 (Lv.1)"
description: x만큼 간격이 있는 n개의 숫자 문제 풀이.
date: 2025-09-07
tags: ["programmers"]
draft: false
preferBodyH1: true
---

# x만큼 간격이 있는 n개의 숫자 (Lv.1)

## 문제 요약

함수 solution은 정수 x와 자연수 n을 입력 받아, x부터 시작해 x씩 증가하는 숫자를 n개 지니는 리스트를 리턴해야 합니다. 다음 제한 조건을 보고, 조건을 만족하는 함수, solution을 완성해주세요.

## 풀이 코드 (C#)

```csharp
public class Solution {
    public long[] solution(int x, int n) {
        long[] answer = new long[n];
        if (n > 0)
        {
            answer[0] = x;
        }
        
        for (int i = 1; i < n; i++)
        {
            answer[i] = answer[i-1] + x;
        }
        return answer;
    }
}
```

## 다른 사람 풀이
```csharp
public class Solution {
    public long[] solution(int x, int n) {
            long[] answer = new long[n];

            for (int i = 0; i < n; i++)
            {
                if (i == 0)
                    answer[i] = x;
                else
                    answer[i] = x + answer[i - 1];
            }

            return answer;

    }
}
```
- for문 안에서 i == 0 검사 하는 부분이 조금 별로 인 것 같았음.

## LINQ 풀이
```csharp
using System.Linq;

public class Solution {
    public long[] solution(int x, int n) {
        return Enumerable.Range(1, n)
                         .Select(i => (long)x * i)
                         .ToArray();
    }
}
```
- c#스러운 풀이.
- 배열의 전에 값을 더하는 것 보다는 명확히 곱하는게 더 좋아보이긴 함

## 메모
- 핵심 아이디어: 그냥 단순한 반복문 문제
- 헷갈린 부분: 없음, 단순 계산 문제. 조건 자체가 자연수 이므로 0 체크는 불필요
- 복습 필요: [ ]
