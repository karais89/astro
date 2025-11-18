---
title: "주식가격 (Lv.2)"
description: 주식가격 문제 풀이.
date: 2025-11-18"
tags: ["programmers", "Stack", "Queue"]
draft: false
preferBodyH1: true
---

# 주식가격 (Lv.2)

### 문제 설명
초 단위로 기록된 주식가격이 담긴 배열 prices가 매개변수로 주어질 때, 가격이 떨어지지 않은 기간은 몇 초인지를 return 하도록 solution 함수를 완성하세요.

### 제한사항
prices의 각 가격은 1 이상 10,000 이하인 자연수입니다.
prices의 길이는 2 이상 100,000 이하입니다.

### 입출력 예
prices	return
[1, 2, 3, 2, 3]	[4, 3, 1, 1, 0]

### 입출력 예 설명
1초 시점의 ₩1은 끝까지 가격이 떨어지지 않았습니다.
2초 시점의 ₩2은 끝까지 가격이 떨어지지 않았습니다.
3초 시점의 ₩3은 1초뒤에 가격이 떨어집니다. 따라서 1초간 가격이 떨어지지 않은 것으로 봅니다.
4초 시점의 ₩2은 1초간 가격이 떨어지지 않았습니다.
5초 시점의 ₩3은 0초간 가격이 떨어지지 않았습니다.

## 풀이 코드 (C#)

```csharp
using System;

public class Solution {
    public int[] solution(int[] prices) {
        int[] answer = new int[prices.Length];
        for (int i = 0; i < prices.Length; i++)
        {
            int val = prices[i];
            int count = 0;
            for (int j = i + 1; j < prices.Length; j++)
            {
                count++;
                if (val > prices[j])
                {
                    break;
                }
            }
            answer[i] = count;
        }
        
        return answer;
    }
}
```

## 다른 사람의 풀이

```csharp
using System;

public class Solution {
    public int[] solution(int[] prices) {
        int[] answer = new int[prices.Length];
        Array.Clear(answer, 0, answer.Length);

        for(int i=0; i<prices.Length; i++) {
            for(int j=i+1; j<prices.Length; j++) {
                answer[i]++;
                if (prices[i] > prices[j])
                    break;
            }
        }
        return answer;
    }
}
```

## 스택을 이용한 정석 패턴

```csharp
using System;
using System.Collections.Generic;

public class Solution {
    public int[] solution(int[] prices) {
        int n = prices.Length;
        int[] answer = new int[n];

        // 아직 "가격이 떨어지는 시점"을 만나지 않은 인덱스들을 담는 스택
        Stack<int> stack = new Stack<int>();

        for (int i = 0; i < n; i++)
        {
            // 현재 시점 i의 가격이, 스택 맨 위 인덱스의 가격보다 낮아지는 순간
            // => 그 스택에 있는 인덱스의 "유지 기간"이 끝났다고 볼 수 있음
            while (stack.Count > 0 && prices[stack.Peek()] > prices[i])
            {
                int idx = stack.Pop();   // 그 시점의 인덱스를 꺼내고
                answer[idx] = i - idx;   // (현재 시점 - 그 시점) 만큼 유지된 것
            }

            // 아직 끝나는 시점을 모르는 인덱스를 스택에 넣어둠
            stack.Push(i);
        }

        // 끝까지 갔는데도 "떨어지는" 시점을 만나지 못한 애들 처리
        while (stack.Count > 0)
        {
            int idx = stack.Pop();
            answer[idx] = (n - 1) - idx;   // 마지막 인덱스까지 유지된 것
        }

        return answer;
    }
}
```

1. stack에는 아직 자기 가격이 떨어지지 않은 시점들의 인덱스가 들어 있음.
2. 시간이 i로 흐를 때, 현재 가격이 더 낮으면 → 스택 위에 있는 과거 시점들의 “유지 기간이 끝났음”을 의미.
3. 그래서 “가격이 떨어지는 순간” 과거 인덱스들을 스택에서 꺼내며 answer[idx] = i - idx 로 지속 시간을 확정한다.
4. 끝까지 가격이 안 떨어진 애들은 마지막까지 유지된 것이므로 n - 1 - idx 로 계산한다.

## 메모

- 스택/큐 카테고리에 있던 문제 인데, 딱히 스택/큐 방식을 사용하여 풀지 않았는데 풀림
- 이 문제는 대표적인 "가격 유지 기간 계산" 스택 패턴 문제임.
- 시점 i에서 가격이 떨어지는 순간, 과거의 여러 시점을 한번에 해결 가능.