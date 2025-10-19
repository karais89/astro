---
title: "숫자 변환하기 (Lv.2)"
description: 숫자 변환하기 문제 풀이.
date: 2025-10-19"
tags: ["programmers", "BFS"]
draft: false
preferBodyH1: true
related:
  - slug: "blog/2025-09-23-dfs-bfs"
---

# 숫자 변환하기 (Lv.2)

## 문제 요약

자연수 x를 y로 변환하려고 합니다. 사용할 수 있는 연산은 다음과 같습니다.

- x에 n을 더합니다
- x에 2를 곱합니다.
- x에 3을 곱합니다.

자연수 x, y, n이 매개변수로 주어질 때, x를 y로 변환하기 위해 필요한 최소 연산 횟수를 return하도록 solution 함수를 완성해주세요. 이때 x를 y로 만들 수 없다면 -1을 return 해주세요.

## 풀이 코드 (C#)

```csharp
using System;
using System.Collections.Generic;

public class Solution {
    public int solution(int x, int y, int n) {        
        if (x == y) return 0;
        
        Queue<(int val, int count)> queue = new Queue<(int val, int count)>();
        HashSet<int> visited = new HashSet<int>();
        
        queue.Enqueue((x, 0));
        visited.Add(x);
        
        while (queue.Count > 0)
        {
            var (v, c) = queue.Dequeue();
            
            var nextValues = new int[] { v + n, v * 2, v * 3};
            var nextCount = c + 1;
            for (int i = 0; i < nextValues.Length; i++)
            {
                var nextValue = nextValues[i];
                if (visited.Contains(nextValue)) continue;
                if (nextValue > y) continue;
                if (nextValue == y) return nextCount;
                
                queue.Enqueue((nextValue, nextCount));
                visited.Add(nextValue);
            }
        }
        
        return -1;
    }
}
```

1. x와 y가 같으면 바로 0을 반환한다.
2. 큐에는 (현재 값, 연산 횟수)를, visited에는 방문한 값을 저장한다.
3. 큐가 빌 때까지 반복하면서 BFS 탐색을 진행한다.
4. 큐에서 (현재 값, 연산 횟수)를 꺼낸다.
5. 가능한 다음 값 {v + n, v * 2, v * 3}을 만든다.
6. 각 값에 대해 방문 여부와 y 초과 여부를 검사하고,
   y에 도달하면 현재 연산 횟수 +1을 반환한다.
   아니라면 큐에 추가하고 방문 처리한다.
7. 큐가 다 빌 때까지 y를 찾지 못하면 -1을 반환한다.

> 이 알고리즘은 BFS를 이용해 가능한 모든 연산 경로를 탐색하되, 가장 먼저 y에 도달한 순간의 연산 횟수를 반환한다. 각 숫자는 한 번만 방문하므로 불필요한 중복 계산이 없고, 따라서 최소 연산 횟수를 효율적으로 구할 수 있다.

## 다른 사람의 풀이

```csharp
// 괜찮은 정답이 없는 것으로 보여 생략
```

## 메모

- 최소 연산 횟수 = BFS를 떠올려야 되는 문제. 결국 모든 경우의 수에 대한 탐색이 필요한 상황. dfs, bfs 모두 익숙치 않아 한번에 떠올리기 상당히 힘듦.


## 학습 메모

- 패턴: "최소 연산 횟수 → BFS"
  - → 각 상태를 노드로 보고, 가능한 연산을 간선으로 연결
- 사고 과정 팁
  1. "연산"이 "상태 변환"을 의미한다는 걸 파악
  2. "최소 횟수" → BFS (or DP)
  3. "불가능 조건" → 방문 범위 한정 (> y or visited)
- 비슷한 문제 유형
  - "게임 맵 최단거리" (BFS)
  - "단어 변환 (Word Ladder)" (BFS)
  - "1로 만들기" (DP/BFS 혼합형)