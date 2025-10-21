---
title: "가장 큰 수 (Lv.2)"
description: 가장 큰 수 문제 풀이.
date: 2025-10-21"
tags: ["programmers"]
draft: false
preferBodyH1: true
---

# 가장 큰 수 (Lv.2)

문제 설명

0 또는 양의 정수가 주어졌을 때, 정수를 이어 붙여 만들 수 있는 가장 큰 수를 알아내 주세요.

예를 들어, 주어진 정수가 [6, 10, 2]라면 [6102, 6210, 1062, 1026, 2610, 2106]를 만들 수 있고, 이중 가장 큰 수는 6210입니다.

0 또는 양의 정수가 담긴 배열 numbers가 매개변수로 주어질 때, 순서를 재배치하여 만들 수 있는 가장 큰 수를 문자열로 바꾸어 return 하도록 solution 함수를 작성해주세요.

제한 사항

numbers의 길이는 1 이상 100,000 이하입니다.
numbers의 원소는 0 이상 1,000 이하입니다.
정답이 너무 클 수 있으니 문자열로 바꾸어 return 합니다.

## 풀이 코드 (C#)

```csharp
using System;
using System.Linq;

public class Solution {
    public string solution(int[] numbers) {
        // 1. 숫자를 문자열로 변환
        var strNumbers = numbers.Select(n => n.ToString()).ToArray();

        // 2. 커스텀 정렬: (x+y) vs (y+x) 비교
        Array.Sort(strNumbers, (a, b) =>
        {
            string ab = a + b;
            string ba = b + a;
            // b+a가 더 크면 b가 앞에 오게 (내림차순)
            return ba.CompareTo(ab);
        });

        // 3. 모든 숫자를 이어붙임
        string result = string.Join("", strNumbers);

        // 4. 모든 숫자가 0일 경우 예외 처리
        if (result[0] == '0')
            return "0";

        return result;
    }
}
```

## 다른 사람의 풀이

```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

public class Solution {
    public string solution(int[] numbers)
    {
        Array.Sort(numbers, (x, y) =>
        {
            string XY = x.ToString() + y.ToString();
            string YX = y.ToString() + x.ToString();
            return YX.CompareTo(XY);
        });
        if (numbers.Where(x => x == 0).Count() == numbers.Length) return "0";
        else return string.Join("", numbers);
    }
}
```

## 메모

- 핵심은 단순한 숫자 크기 비교가 아니라, 문자열 결합 결과로 정렬 순서를 결정하는 데 있음.
- 이어 붙여서 가장 큰 수를 찾는 문제. 커스텀 정렬을 만들어서 문제를 풀어야 함.
- `(x+y) > (y+x)` 식을 떠올려서 해당 식을 기반으로 정렬 알고리즘 생성

## 4. 학습 메모

- 커스텀 정렬(Custom Comparator)
- 두 원소 a, b의 순서를 “결합 후 비교”로 정의.
- 즉, 단순 값이 아니라 **“조합 결과의 우선순위”**로 정렬 기준을 만든다.