---
title: "소수 찾기 (Lv.2)"
description: 소수 찾기 문제 풀이.
date: 2025-11-26
tags: ["programmers", "dfs"]
draft: false
preferBodyH1: true
---

# 소수 찾기 (Lv.2)

### 문제 설명

한자리 숫자가 적힌 종이 조각이 흩어져있습니다. 흩어진 종이 조각을 붙여 소수를 몇 개 만들 수 있는지 알아내려 합니다.

각 종이 조각에 적힌 숫자가 적힌 문자열 numbers가 주어졌을 때, 종이 조각으로 만들 수 있는 소수가 몇 개인지 return 하도록 solution 함수를 완성해주세요.

## 풀이 코드 (C#)

```csharp
using System;
using System.Collections.Generic;

public class Solution {
    
    HashSet<int> set = new HashSet<int>();
    bool[] visited;
    
    public int solution(string numbers) {        
        visited = new bool[numbers.Length];
        
        Dfs("", numbers);
        
        int answer = 0;
        foreach (var s in set)
        {
            if (IsPrime(s))
            {
                answer++;
            }
        }
        
        return answer;
    }
    
    public void Dfs(string cur, string numbers)
    {
        if (cur != "")
        {
            set.Add(int.Parse(cur));
        }
        if (cur.Length == numbers.Length)
        {
            return;
        }
            
        int n = numbers.Length;
        for (int i = 0; i < n; i++)
        {
            if (visited[i]) continue;
            
            visited[i] = true;
            Dfs(cur + numbers[i], numbers);
            visited[i] = false;
        }
    }
    
    public bool IsPrime(int n)
    {
        if (n <= 0) return false;
        if (n == 1) return false;
        if (n == 2) return true;
        if (n % 2 == 0) return false;
        
        int loopCount = (int)Math.Sqrt(n);
        for (int i = 3; i <= loopCount; i += 2)
        {
            if (n % i == 0)
            {
                return false;
            }
        }
        return true;
    }
}
```

## 최적화된 풀이 (C#)

```csharp
using System;
using System.Collections.Generic;

public class Solution {
    HashSet<int> primes = new HashSet<int>();
    bool[] visited;
    
    public int solution(string numbers) {
        visited = new bool[numbers.Length];
        Dfs(0, numbers);
        return primes.Count;
    }
    
    void Dfs(int currentVal, string numbers) {
        // 현재 숫자가 소수이면 집합에 추가
        if (IsPrime(currentVal)) primes.Add(currentVal);
        
        for (int i = 0; i < numbers.Length; i++) {
            if (visited[i]) continue;
            
            visited[i] = true;
            // 문자열 연결 대신 정수 연산 사용 (성능 이점)
            int nextVal = currentVal * 10 + (numbers[i] - '0');
            Dfs(nextVal, numbers);
            visited[i] = false;
        }
    }
    
    bool IsPrime(int n) {
        if (n < 2) return false;
        if (n == 2) return true;
        if (n % 2 == 0) return false;
        
        for (int i = 3; i * i <= n; i += 2) {
            if (n % i == 0) return false;
        }
        return true;
    }
}
```

- 문자열 조작 대신 정수 연산을 사용하여 오버헤드를 줄이고, 코드를 더 간결하게 개선한 풀이입니다.

## 다른 사람의 풀이

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

public class Solution {

    List<string> lstNums = new List<string>();
    List<long> lstNums2 = new List<long>();

    public int solution(string numbers)
    {
        int answer = 0;
        Perm(numbers.ToArray(), 0);
        lstNums = lstNums.Distinct().ToList();
        for (int i = 0; i < numbers.Length; i++)
        {
            foreach (long lNum in lstNums.Select(x => long.Parse(x.Substring(i))))
            {
                lstNums2.Add(lNum);
            }
        }
        lstNums2 = lstNums2.Distinct().ToList();
        foreach (long lNum in lstNums2)
        {
            //Console.WriteLine(lNum.ToString());
            if (IsPrime(lNum)) answer++;
        }
        return answer;
    }

    public bool IsPrime(long candidate) // 소수 판정
    {
        if ((candidate & 1) == 0)
        {
            if (candidate == 2)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        for (int i = 3; (i * i) <= candidate; i += 2)
        {
            if ((candidate % i) == 0)
            {
                return false;
            }
        }
        return candidate != 1;
    }

    public void Perm(char[] a, int k)   // 순열하기
    {
        if (k == a.Length - 1)//순열을 출력
        {
            lstNums.Add(new string(a));
        }
        else
        {
            for (int i = k; i < a.Length; i++)
            {
                //a[k]와 a[i]를 교환
                char temp = a[k];
                a[k] = a[i];
                a[i] = temp;

                Perm(a, k + 1); //a[k+1],…,a[n-1]에 대한 모든 순열
                //원래 상태로 되돌리기 위해 a[k]와 a[i]를 다시 교환
                temp = a[k];
                a[k] = a[i];
                a[i] = temp;
            }
        }
    }

}
```

## 메모

- 소수 찾기 문제 & dfs 문제. 두개만 알고 있다면 풀 수 있는 문제
- 패턴: “순열 생성(백트래킹) + 중복 제거(HashSet) + 소수 판정” 조합.
- 팁: 문자열 연결(`string` + `string`)은 메모리 할당이 발생하므로, 정수 누적(`int` * 10 + `int`) 방식을 사용하면 더 효율적입니다.
- 복습 포인트: 백트래킹(재귀/비트마스크), 에라토스테네스 체, 소수 판정(√n 최적화).