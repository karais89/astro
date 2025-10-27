---
title: "n^2 배열 자르기 (Lv.2)"
description: n^2 배열 자르기 문제 풀이.
date: 2025-10-27"
tags: ["programmers"]
draft: false
preferBodyH1: true
---

# n^2 배열 자르기 (Lv.2)

정수 n, left, right가 주어집니다. 다음 과정을 거쳐서 1차원 배열을 만들고자 합니다.

1. n행 n열 크기의 비어있는 2차원 배열을 만듭니다.
2. i = 1, 2, 3, ..., n에 대해서, 다음 과정을 반복합니다.
1행 1열부터 i행 i열까지의 영역 내의 모든 빈 칸을 숫자 i로 채웁니다.
3. 1행, 2행, ..., n행을 잘라내어 모두 이어붙인 새로운 1차원 배열을 만듭니다.
4. 새로운 1차원 배열을 arr이라 할 때, arr[left], arr[left+1], ..., arr[right]만 남기고 나머지는 지웁니다.

정수 n, left, right가 매개변수로 주어집니다. 주어진 과정대로 만들어진 1차원 배열을 return 하도록 solution 함수를 완성해주세요.

## 풀이 코드 (C#)

```csharp
using System;

public class Solution {
    public int[] solution(int n, long left, long right) {
        int[] answer = new int[right-left+1];
        for (int i = 0; i < answer.Length; i++)
        {
            long index = left + i;
            long row = index / n;
            long col = index % n;
            int num = (int)Math.Max(col, row) + 1; 

            answer[i] = num;
        }

        return answer;
    }
}
```

## 다른 사람의 풀이

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

public class Solution 
{
    public int[] solution(int n, long left, long right) 
    {
        int[] answer = new int[right - left + 1];
        int index = 0;
        for (long i = left; i < right + 1; i++)
        {
            answer[index] = (int)(Math.Max(i / (long)n, i % (long)n) + 1);
            index++;
        }
        return answer;
    }
}
```

## 메모

- 2차원 배열을 직접 생성하지 않고, index → (row, col) 계산으로 접근. 값은 max(row, col) + 1 로 결정됨.
- 전체 n^2 배열을 만들면 메모리 초과.
- left/right 구간만 계산하는 게 포인트.
- "2차원 좌표를 1차원 인덱스로 변환하는 사고" (row = index / n, col = index % n)
