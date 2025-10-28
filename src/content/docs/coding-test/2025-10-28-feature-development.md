---
title: "기능개발 (Lv.2)"
description: 기능개발 문제 풀이.
date: 2025-10-28"
tags: ["programmers"]
draft: false
preferBodyH1: true
---

# 기능개발 (Lv.2)

프로그래머스 팀에서는 기능 개선 작업을 수행 중입니다. 각 기능은 진도가 100%일 때 서비스에 반영할 수 있습니다.

또, 각 기능의 개발속도는 모두 다르기 때문에 뒤에 있는 기능이 앞에 있는 기능보다 먼저 개발될 수 있고, 이때 뒤에 있는 기능은 앞에 있는 기능이 배포될 때 함께 배포됩니다.

먼저 배포되어야 하는 순서대로 작업의 진도가 적힌 정수 배열 progresses와 각 작업의 개발 속도가 적힌 정수 배열 speeds가 주어질 때 각 배포마다 몇 개의 기능이 배포되는지를 return 하도록 solution 함수를 완성하세요.

제한 사항

- 작업의 개수(progresses, speeds배열의 길이)는 100개 이하입니다.
- 작업 진도는 100 미만의 자연수입니다.
- 작업 속도는 100 이하의 자연수입니다.
- 배포는 하루에 한 번만 할 수 있으며, 하루의 끝에 이루어진다고 가정합니다. 예를 들어 진도율이 95%인 작업의 개발 속도가 하루에 4%라면 배포는 2일 뒤에 이루어집니다.

## 풀이 코드 (C#)

```csharp
using System;
using System.Collections.Generic;

public class Solution {
    public int[] solution(int[] progresses, int[] speeds) {
        List<int> queue = new List<int>();
        queue.Add(0);
        
        int maxDay = 0;
        for (int i = 0; i < progresses.Length; i++)
        {
            int progress = progresses[i];
            int speed = speeds[i];
            int day = 100 - progress;
            if (day % speed == 0)
            {
                day /= speed;
            }
            else
            {
                day = day / speed + 1;
            }
        
            if (maxDay == 0)
            {
                maxDay = day;
            }
            
            if (maxDay < day)
            {
                maxDay = day;
                queue.Add(1);                
            }
            else
            {
                queue[queue.Count - 1]++;
            }
        }
        
        return queue.ToArray();
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
    public int[] solution(int[] progresses, int[] speeds)
    {
        int[] answer = new int[] { };

        var tmp = progresses.Select((item, idx) => (int)Math.Ceiling( (double)(100 - item) / speeds[idx] ));

        List<int> deploy = new List<int>();
        List<int> Remains = new List<int>();

        int lastBig = -1;
        foreach(int itm in tmp)
        {
            if (lastBig < itm)
                lastBig = itm;

            deploy.Add(lastBig);
        }

        var tmp2 = from itm in deploy
                   group itm by itm into g
                   select new
                   {
                       CNT = g.Count()
                   };

        answer = tmp2.Select(x => x.CNT).ToArray();

        return answer;
    }
}
```

## 리팩토링

```csharp
using System;
using System.Collections.Generic;

public class Solution {
    public int[] solution(int[] progresses, int[] speeds) {
        var batches = new List<int>();
        
        int curDay = 0;   // 현재 배치의 배포 기준일
        int count  = 0;   // 현재 배치에 포함된 작업 수

        for (int i = 0; i < progresses.Length; i++) {
            int need = 100 - progresses[i];
            int day  = (need + speeds[i] - 1) / speeds[i]; // 올림

            if (count == 0) {           // 첫 작업
                curDay = day;
                count = 1;
            } else if (day <= curDay) { // 현재 배치에 합류
                count++;
            } else {                    // 새 배치 시작
                batches.Add(count);
                curDay = day;
                count = 1;
            }
        }

        if (count > 0) batches.Add(count); // 마지막 배치 밀어넣기
        return batches.ToArray();
    }
}
```

- 불필요한 분기 제거, 변수 명확화, 첫 원소/마지막 배치 처리 흐름이 자연스럽습니다.

## 메모

- 스택/큐 카테고리에 있어서 스택/큐로 풀려고 했다가 못 품.
- 가장 큰 일수를 계산하고, 해당 일자 기준으로 list에서 카운팅 하는 방향으로 진행.

## 학습 메모 (패턴·알고리즘 정리, 복습 포인트 제안)

- 핵심 패턴
  - 배치/묶음 세기 with 기준값 갱신: 왼쪽부터 보며 “현재 배치 기준”(curDay)을 유지하다가, 새 항목이 기준을 초과하면 배치를 끊고 다음 배치를 시작. (유사 문제: “기능개발”, “과제 제출 묶음”, “문서 인쇄 우선순위에서 배치 처리” 변형 등)
  - 정수 올림 나눗셈: `ceil(a/b) = (a + b - 1) / b (양의 정수 한정)`. 분기 없이 깔끔하게 처리.
  - 러닝 맥스(running maximum): 지금까지의 최대를 누적해서 만든 수열. 비내림이 되며, 같은 값의 연속 구간 길이 = 배치 크기로 해석 가능.
  