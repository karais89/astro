---
title: "타겟 넘버 (Lv.2)"
description: 타겟 넘버 문제 풀이.
date: 2025-11-14"
tags: ["programmers", "DFS", "BFS"]
draft: false
preferBodyH1: true
related:
  - slug: "blog/2025-09-23-dfs-bfs"
---

# 타겟 넘버 (Lv.2)

### 문제 설명

n개의 음이 아닌 정수들이 있습니다. 이 정수들을 순서를 바꾸지 않고 적절히 더하거나 빼서 타겟 넘버를 만들려고 합니다. 예를 들어 [1, 1, 1, 1, 1]로 숫자 3을 만들려면 다음 다섯 방법을 쓸 수 있습니다.

```
-1+1+1+1+1 = 3
+1-1+1+1+1 = 3
+1+1-1+1+1 = 3
+1+1+1-1+1 = 3
+1+1+1+1-1 = 3
```

사용할 수 있는 숫자가 담긴 배열 numbers, 타겟 넘버 target이 매개변수로 주어질 때 숫자를 적절히 더하고 빼서 타겟 넘버를 만드는 방법의 수를 return 하도록 solution 함수를 작성해주세요.

## 풀이 코드 (C#)

```csharp
using System;

public class Solution {
    int answer = 0;
    public int solution(int[] numbers, int target) {
        Dfs(numbers, target, 0, 0);
        return answer;
    }
    
    void Dfs(int[] numbers, int target, int index, int sum) {
        if (index == numbers.Length) {
            if (sum == target) answer++;
            return;
        }

        Dfs(numbers, target, index + 1, sum + numbers[index]); // + 선택
        Dfs(numbers, target, index + 1, sum - numbers[index]); // - 선택
    }

}
```

## 다른 사람의 풀이

```csharp
using System;

public class Solution {
    static int Dfs(int[] arr, int target, int idx, int num)
    {
        if (idx == arr.Length)
        {
            if (target == num) return 1;
            else return 0;
        }
        else
            return Dfs(arr, target, idx + 1, num + arr[idx]) + Dfs(arr, target, idx + 1, num - arr[idx]);
    }

    public int solution(int[] numbers, int target) {
        int answer = 0;
        return Dfs(numbers, target, 0, 0);
    }
}
```

## 개선 코드
```csharp
using System;

public class Solution
{
    public int solution(int[] numbers, int target)
    {
        return Dfs(numbers, target, 0, 0);
    }

    private int Dfs(int[] numbers, int target, int index, int sum)
    {
        if (index == numbers.Length)
            return sum == target ? 1 : 0;

        int withPlus  = Dfs(numbers, target, index + 1, sum + numbers[index]);
        int withMinus = Dfs(numbers, target, index + 1, sum - numbers[index]);

        return withPlus + withMinus;
    }
}
```

- 재귀 함수가 값을 반환해서 합산하는 쪽이 더 함수형이고 테스트/재사용성도 좋다.

## 메모

- 모든 경우의 수를 탐색해야 됨. 깊이 우선 탐색을 사용하여 풀이
- 깊이 우선 탐색의 경우. 코딩 테스트 문제에서 필수로 나오는 문제로 보이나, 어떤 사고 방식을 사용해서 풀어야 될지 항상 헷갈림.
- 해당 문제 유형을 보고 바로 풀 수 있도록 연습이 필요해 보임.

### DFS로 완전탐색 하는 사고 템플릿
1. 상태 정의
  - index : 지금 몇 번째 원소까지 결정했는지
  - sum : 지금까지의 선택 결과 (부분 합)
2. 종료 조건
  - index == numbers.Length → 더 이상 선택할 숫자가 없다.
  - 이때 sum == target 이면 1, 아니면 0 (혹은 answer++).
3. 선택 / 분기
  - +숫자 를 선택한 경우 → sum + numbers[index]
  - -숫자 를 선택한 경우 → sum - numbers[index]
  - 두 가지를 모두 재귀 호출.
4. 결과 합치기
- return left + right
- 또는 answer 같은 카운터에 누적.