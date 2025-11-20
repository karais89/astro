---
title: "주차 요금 계산 (Lv.2)"
description: 주차 요금 계산 문제 풀이.
date: 2025-11-20"
tags: ["programmers"]
draft: false
preferBodyH1: true
---

# 주차 요금 계산 (Lv.2)

### 문제 설명

주차장의 요금표와 차량이 들어오고(입차) 나간(출차) 기록이 주어졌을 때, 차량별로 주차 요금을 계산하려고 합니다. 아래는 하나의 예시를 나타냅니다.

요금표
```text
기본 시간(분)	기본 요금(원)	단위 시간(분)	단위 요금(원)
180	5000	10	600
```

입/출차 기록
```text
시각(시:분)	차량 번호	내역
05:34	5961	입차
06:00	0000	입차
06:34	0000	출차
07:59	5961	출차
07:59	0148	입차
18:59	0000	입차
19:09	0148	출차
22:59	5961	입차
23:00	5961	출차
```

자동차별 주차 요금
```text
차량 번호	누적 주차 시간(분)	주차 요금(원)
0000	34 + 300 = 334	5000 + ⌈(334 - 180) / 10⌉ x 600 = 14600
0148	670	5000 +⌈(670 - 180) / 10⌉x 600 = 34400
5961	145 + 1 = 146	5000
```

- 어떤 차량이 입차된 후에 출차된 내역이 없다면, 23:59에 출차된 것으로 간주합니다.
  - 0000번 차량은 18:59에 입차된 이후, 출차된 내역이 없습니다. 따라서, 23:59에 출차된 것으로 간주합니다.
- 00:00부터 23:59까지의 입/출차 내역을 바탕으로 차량별 누적 주차 시간을 계산하여 요금을 일괄로 정산합니다.
- 누적 주차 시간이 기본 시간이하라면, 기본 요금을 청구합니다.
- 누적 주차 시간이 기본 시간을 초과하면, 기본 요금에 더해서, 초과한 시간에 대해서 단위 시간 마다 단위 요금을 청구합니다.
  - 초과한 시간이 단위 시간으로 나누어 떨어지지 않으면, 올림합니다.
  - ⌈a⌉ : a보다 작지 않은 최소의 정수를 의미합니다. 즉, 올림을 의미합니다.

주차 요금을 나타내는 정수 배열 fees, 자동차의 입/출차 내역을 나타내는 문자열 배열 records가 매개변수로 주어집니다. 차량 번호가 작은 자동차부터 청구할 주차 요금을 차례대로 정수 배열에 담아서 return 하도록 solution 함수를 완성해주세요.

## 풀이 코드 (C#)

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

public class Solution {
    public int[] solution(int[] fees, string[] records) {
        Dictionary<string, List<int>> parks = new Dictionary<string, List<int>>();
        foreach (var record in records)
        {
            var r = record.Split();
            var time = r[0].Split(":");
            var minTime = int.Parse(time[0]) * 60 + int.Parse(time[1]);
            var number = r[1];
            var type = r[2];
            
            if (parks.ContainsKey(number))
            {
                parks[number].Add(minTime);
            }
            else
            {
                var list = new List<int>();
                list.Add(minTime);
                parks.Add(number, list);
            }
        }

        foreach (var p in parks)
        {
            if (p.Value.Count % 2 != 0)
            {
                parks[p.Key].Add(23 * 60 + 59);
            }
        }
        
        List<string> sortedList = parks.Keys.ToList();
        sortedList.Sort();
        
        List<int> totalTimeList = new List<int>();
        foreach (var l in sortedList)
        {
            var timeList = parks[l];
            int sum = 0;
            for (int i = timeList.Count - 1; i >= 0; i-=2)
            {
                sum += timeList[i] - timeList[i-1];
            }
            totalTimeList.Add(sum);
        }
        
        int baseTimeMin = fees[0];
        int baseCost = fees[1];
        int unitTime = fees[2];
        int unitCost = fees[3];
        
        int[] answer = new int[totalTimeList.Count];
        for (int i = 0; i < totalTimeList.Count; i++)
        {
            int totalTime = totalTimeList[i];
            if (totalTime <= baseTimeMin)
            {
                answer[i] = baseCost;
            }
            else
            {
                answer[i] = baseCost + (int)Math.Ceiling((totalTime - baseTimeMin) / (float)unitTime) * unitCost;
            }
        }
        
        return answer;
    }
}
```

## 다른 사람의 풀이

```csharp

```
- 다른 사람 풀이도 거의 비슷한 느낌을 받음. 별도로 기재하지 않았음.

## 가독성 높인 버전

```csharp
public int[] solution(int[] fees, string[] records)
{
    var inTime = new Dictionary<string, int>();
    var totalTime = new Dictionary<string, int>();

    foreach (var record in records)
    {
        var parts = record.Split();
        var time = ToMinutes(parts[0]);
        var car = parts[1];
        var type = parts[2];

        if (type == "IN")
        {
            inTime[car] = time;
        }
        else
        {
            int duration = time - inTime[car];
            inTime.Remove(car);

            if (!totalTime.ContainsKey(car))
                totalTime[car] = 0;

            totalTime[car] += duration;
        }
    }

    // 출차 기록 없는 차량 처리
    foreach (var car in inTime.Keys)
    {
        int duration = (23 * 60 + 59) - inTime[car];

        if (!totalTime.ContainsKey(car))
            totalTime[car] = 0;

        totalTime[car] += duration;
    }

    int baseTime = fees[0];
    int baseCost = fees[1];
    int unitTime = fees[2];
    int unitCost = fees[3];

    return totalTime
        .OrderBy(x => x.Key)
        .Select(x => CalcFee(x.Value, baseTime, baseCost, unitTime, unitCost))
        .ToArray();
}

int ToMinutes(string t)
{
    var s = t.Split(":");
    return int.Parse(s[0]) * 60 + int.Parse(s[1]);
}

int CalcFee(int total, int baseTime, int baseCost, int unitTime, int unitCost)
{
    if (total <= baseTime) return baseCost;

    int extra = total - baseTime;
    int units = (int)Math.Ceiling(extra / (float)unitTime);
    return baseCost + units * unitCost;
}

```

- 입차/출차 흐름 그대로 코드에 드러나 이해가 빠름
- List<int> 없이도 쉽게 해결
- Dictionary 2개가 역할이 명확해 유지보수가 유리

## 메모

- 주차 요금 계산 문제. 실제 알고리즘 적인 부분은 없는 것으로 보임. 단순 입출력 변환, 그리고 정렬, 시간 계산을 종합적으로 하면 풀 수 있는 문제로 생각 됨.
- 이 문제의 핵심 패턴
  - 문자열 파싱 → 시각(시:분) → 분 단위로 변환
  - 입차/출차 이벤트 처리
  - 딕셔너리로 상태/누적 관리
  - 출차 기록 missing 시 마지막 시각 보정
  - 정렬 후 요금 계산
