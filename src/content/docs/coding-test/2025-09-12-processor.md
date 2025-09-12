---
title: "프로세스 (Lv.2)"
description: 프로세스 문제 풀이.
date: 2025-09-12
tags: ["programmers", "stack", "queue"]
draft: false
preferBodyH1: true
---

# 프로세스 (Lv.2)

## 문제 요약

문제 설명
운영체제의 역할 중 하나는 컴퓨터 시스템의 자원을 효율적으로 관리하는 것입니다. 이 문제에서는 운영체제가 다음 규칙에 따라 프로세스를 관리할 경우 특정 프로세스가 몇 번째로 실행되는지 알아내면 됩니다.

1. 실행 대기 큐(Queue)에서 대기중인 프로세스 하나를 꺼냅니다.
2. 큐에 대기중인 프로세스 중 우선순위가 더 높은 프로세스가 있다면 방금 꺼낸 프로세스를 다시 큐에 넣습니다.
3. 만약 그런 프로세스가 없다면 방금 꺼낸 프로세스를 실행합니다.
  3.1 한 번 실행한 프로세스는 다시 큐에 넣지 않고 그대로 종료됩니다.
예를 들어 프로세스 4개 [A, B, C, D]가 순서대로 실행 대기 큐에 들어있고, 우선순위가 [2, 1, 3, 2]라면 [C, D, A, B] 순으로 실행하게 됩니다.

현재 실행 대기 큐(Queue)에 있는 프로세스의 중요도가 순서대로 담긴 배열 priorities와, 몇 번째로 실행되는지 알고싶은 프로세스의 위치를 알려주는 location이 매개변수로 주어질 때, 해당 프로세스가 몇 번째로 실행되는지 return 하도록 solution 함수를 작성해주세요.

## 풀이 코드 (C#)

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

public class Solution {
    
    public class Data
    {
        public int Index { get; set; }
        public int Priority { get; set; }
        
        public Data(int index, int priority)
        {
            Index = index;
            Priority = priority;
        }
    }
    
    public int solution(int[] priorities, int location) {
        // Queue를 실제로 사용해서 풀수 있을 것 같음.
        int answer = 0;
        Queue<Data> queues = new Queue<Data>();
        Queue<Data> execQueues = new Queue<Data>();
        for (int i = 0; i < priorities.Length; i++)
        {
            queues.Enqueue(new Data(i, priorities[i]));
        }
        
        // 여기서 어떤식으로 처리하면 좋을지 고민 됨
        while (queues.Count > 0)
        {
            var priority = queues.Peek();
            var max = priority.Priority;
            foreach (var q in queues)
            {
                if (max < q.Priority)
                {
                    max = q.Priority;
                    // 만약 최대 값이 있다면 일단 빼놓고 다시 queue에 넣기
                }
            }
            
            if (max != priority.Priority)
            {
                // max 까지 전부 queue 빼기. 그리고 다시 집어넣기
                Queue<Data> tmpQueues = new Queue<Data>();
                
                while (queues.Count > 0)
                {
                    var q = queues.Peek();
                    if (q.Priority == max)
                    {
                        break;
                    }
                    tmpQueues.Enqueue(queues.Dequeue());
                }
                
                while (tmpQueues.Count > 0)
                {
                    queues.Enqueue(tmpQueues.Dequeue());        
                }
            }
            else
            {
                execQueues.Enqueue(queues.Dequeue());
            }
        }
    
            
        var list = execQueues.ToList();
        for (int i = 0; i < list.Count; i++)
        {
            if (list[i].Index == location)
            {
                answer = i;
            }
        }
        
        return answer + 1;
    }
}
```

## 다른 사람 풀이
```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

public class Solution {
    public int solution(int[] priorities, int location)
    {
        int answer = 0;
        Queue<KeyValuePair<int, int>> que = new Queue<KeyValuePair<int, int>>();
        for(int i = 0; i < priorities.Length; i++)
        {
            que.Enqueue(new KeyValuePair<int, int>(i, priorities[i]));
        }
        while(true)
        {
            int nMax = que.Max(x => x.Value);
            var kv = que.Dequeue();
            if (kv.Value == nMax)
            {
                if (kv.Key == location) return answer + 1;
                else
                {
                    answer++;
                    continue;
                }
            }
            que.Enqueue(kv);
        }            
    }
}
```
- 엄청 간결하게 풀 수 있던 문제로 보임

## 가독성 중심 풀이
```csharp
// Data 클래스 제거 → (idx, prio) 튜플 사용
Queue<(int idx, int prio)> queues = new Queue<(int, int)>();
Queue<(int idx, int prio)> execQueues = new Queue<(int, int)>();
```
- Data클래스 제거후 튜플로 변경

```csharp
var priority = queues.Peek();
var max = priority.Priority;
foreach (var q in queues)
{
    if (max < q.Priority)
    {
        max = q.Priority;
        // 만약 최대 값이 있다면 일단 빼놓고 다시 queue에 넣기
    }
}

// 변경후
var priority = queues.Peek();
int max = queues.Max(q => q.prio); // LINQ로 최대 우선순위 바로 구함
```
- max 값 구하는 로직 linq로 대체

```csharp
// 기존
if (max != priority.prio)
{
    Queue<(int idx, int prio)> tmpQueues = new Queue<(int, int)>();
    while (queues.Count > 0)
    {
        var q = queues.Peek();
        if (q.prio == max) break;
        tmpQueues.Enqueue(queues.Dequeue());
    }
    while (tmpQueues.Count > 0)
        queues.Enqueue(tmpQueues.Dequeue());
}
else
{
    execQueues.Enqueue(queues.Dequeue());
}

// 수정
if (max != priority.prio)
{
    // 맨 앞을 뒤로 보내며 최댓값이 앞에 올 때까지 회전
    queues.Enqueue(queues.Dequeue());
}
else
{
    execQueues.Enqueue(queues.Dequeue());
}
```
- 회전 로직 단순화

```csharp
// 기존
var priority = queues.Peek();
int max = queues.Max(q => q.prio);

// 수정
var head = queues.Peek();
int max  = queues.Max(q => q.prio);

if (max != head.prio) { ... }
```
- 변수명 명확화 priroity는 값으로 보이니 head로 변경

```csharp
// 기존
var list = execQueues.ToList();
for (int i = 0; i < list.Count; i++)
{
    if (list[i].idx == location)
    {
        answer = i;
    }
}
return answer + 1;

// 간단 대체안(둘 중 하나 선택)
// A) for + break
for (int i = 0; i < list.Count; i++)
{
    if (list[i].idx == location) { answer = i; break; }
}

// B) 한 줄
return execQueues.ToList().FindIndex(x => x.idx == location) + 1;
```
- 실행 순서에서 위치 찾을 때 즉시 종료

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

public class Solution {
    public int solution(int[] priorities, int location) {
        int answer = 0;

        // 튜플 사용
        Queue<(int idx, int prio)> queues = new Queue<(int, int)>();
        Queue<(int idx, int prio)> execQueues = new Queue<(int, int)>();

        for (int i = 0; i < priorities.Length; i++)
        {
            queues.Enqueue((i, priorities[i]));
        }
        
        while (queues.Count > 0)
        {
            var head = queues.Peek();
            int max = queues.Max(q => q.prio); // LINQ로 최대 우선순위

            if (max != head.prio)
            {
                // 한 번만 뒤로 보내며 회전
                queues.Enqueue(queues.Dequeue());
            }
            else
            {
                execQueues.Enqueue(queues.Dequeue());
            }
        }

        var list = execQueues.ToList();
        for (int i = 0; i < list.Count; i++)
        {
            if (list[i].idx == location) { answer = i; break; }
        }

        return answer + 1;
    }
}
```
- 최종 수정된 코드

## 메모
- 핵심 아이디어: 스택/큐 문제
- 헷갈린 부분: 없음
- 복습 필요: [ ]

## 학습 메모 (패턴·알고리즘 정리, 복습 포인트)

- 패턴: “우선순위 있는 큐 시뮬레이션”은 회전(rotate) vs. 우선순위 검사 두 축으로 풀이합니다. 우선순위 범위가 작으면 빈도 카운팅이 최고의 무기입니다.
- 복습 포인트:
    - Queue<T> 한 개로 “뽑고 → 검사 → 재삽입/실행”의 단일 루프로 끝내기.
    - 즉시 반환 패턴(정답을 알자마자 반환, 불필요한 저장 금지).
    - 입력 특성(우선순위 범위 제한)을 이용한 상수시간 최적화 습관 들이기.
- 추가 연습:
    - 같은 아이디어를 “프린터 큐”, “다리 건너는 트럭”, “기능개발” 문제에 적용해서 큐 시뮬레이션 감각 강화.
    - 우선순위 범위가 넓을 때는 SortedDictionary(멀티셋)나 최대 힙 적용해보기.