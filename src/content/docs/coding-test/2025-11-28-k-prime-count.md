---
title: "k진수에서 소수 개수 구하기 (Lv.2)"
description: k진수에서 소수 개수 구하기 문제 풀이.
date: 2025-11-28
tags: ["programmers", "dfs"]
draft: false
preferBodyH1: true
---

# k진수에서 소수 개수 구하기 (Lv.2)

### 문제 설명

양의 정수 n이 주어집니다. 이 숫자를 k진수로 바꿨을 때, 변환된 수 안에 아래 조건에 맞는 소수(Prime number)가 몇 개인지 알아보려 합니다.

0P0처럼 소수 양쪽에 0이 있는 경우
P0처럼 소수 오른쪽에만 0이 있고 왼쪽에는 아무것도 없는 경우
0P처럼 소수 왼쪽에만 0이 있고 오른쪽에는 아무것도 없는 경우
P처럼 소수 양쪽에 아무것도 없는 경우
단, P는 각 자릿수에 0을 포함하지 않는 소수입니다.
예를 들어, 101은 P가 될 수 없습니다.
예를 들어, 437674을 3진수로 바꾸면 211020101011입니다. 여기서 찾을 수 있는 조건에 맞는 소수는 왼쪽부터 순서대로 211, 2, 11이 있으며, 총 3개입니다. (211, 2, 11을 k진법으로 보았을 때가 아닌, 10진법으로 보았을 때 소수여야 한다는 점에 주의합니다.) 211은 P0 형태에서 찾을 수 있으며, 2는 0P0에서, 11은 0P에서 찾을 수 있습니다.

정수 n과 k가 매개변수로 주어집니다. n을 k진수로 바꿨을 때, 변환된 수 안에서 찾을 수 있는 위 조건에 맞는 소수의 개수를 return 하도록 solution 함수를 완성해 주세요.

## 풀이 코드 (C#)

```csharp
using System;
using System.Text;
using System.Collections.Generic;

public class Solution {
    public int solution(int n, int k) {        
        string numStr = ConvertToBaseK(n, k);        
        var numbers = SplitToZero(numStr);
        int answer = 0;
        foreach (var num in numbers)
        {
            if (IsPrime(num))
            {
                answer++;
            }
        }
        
        return answer;
    }
    
    public bool IsPrime(long num)
    {
        if (num <= 1) return false;
        if (num == 2) return true;
        if (num % 2 == 0) return false;
        long loop = (long) Math.Sqrt(num);
        for (long i = 3; i <= loop; i += 2)
        {
            if (num % i == 0)
            {
                return false;
            }
        }
        
        return true;
    }
    
    // 진수 변환
    public string ConvertToBaseK(int n, int k)
    {
        if (n == 0) return "0";
        
        string str = "";
        while (n > 0)
        {
            str = (n % k).ToString() + str;
            n /= k;
        }
        return str;
    }
    
    public List<long> SplitToZero(string str)
    {
        List<long> numbers = new List<long>();
        string num = "";
        foreach (var c in str)
        {
            if (c == '0')
            {
                if (num != "")
                {
                    numbers.Add(long.Parse(num));
                    num = "";
                }
            }
            else
            {
                num += c.ToString();
            }
        }
        
        if (num != "")
            numbers.Add(long.Parse(num));
        
        return numbers;
    }
}
```

## 다른 사람의 풀이

```csharp
using System;
using System.Text.RegularExpressions;

public class Solution {
    public int solution(int n, int k) {
        int answer = 0;
        string numberString = "";


        /*진수 변환*/
        while(n > 0)
        {
            int t = n / k;
            int mod = n % k;            
            numberString = mod.ToString() + numberString;            
            n = t;
        }       


        /*정규식*/       

        Regex matchNumber = new Regex(@"0?[1-9]+0?");
        MatchCollection resultColl = matchNumber.Matches(numberString);


        foreach(Match m in resultColl)
        {
            if(m.Value.Replace("0","") != "")
            {
                long num = Convert.ToInt64(m.Value.Replace("0",""));

                if(num > 1)
                {
                    if(isPrime(num)) answer++;            
                }
            }
        }             



        return answer;
    }

    public bool isPrime(long num)
    {
        int nr = (int)Math.Sqrt(num);
        for(int i = 2; i <= nr; i++)
        {
            if(num%i == 0)
                return false;
        }
        return true;
    }
}
```

## 개선된 코드

```csharp
using System;
using System.Text;
using System.Linq;

public class Solution {
    public int solution(int n, int k) {
        if (n <= 0) return 0;
        var baseK = ToBaseK(n, k);
        var parts = baseK.Split('0', StringSplitOptions.RemoveEmptyEntries);
        int count = 0;
        foreach (var p in parts) {
            if (long.TryParse(p, out long val) && IsPrime(val)) count++;
        }
        return count;
    }

    string ToBaseK(int n, int k) {
        if (n == 0) return "0";
        var sb = new StringBuilder();
        while (n > 0) {
            sb.Append((n % k).ToString());
            n /= k;
        }
        // reverse
        var arr = sb.ToString().ToCharArray();
        Array.Reverse(arr);
        return new string(arr);
    }

    bool IsPrime(long num) {
        if (num <= 1) return false;
        if (num == 2) return true;
        if (num % 2 == 0) return false;
        for (long i = 3; i * i <= num; i += 2) {
            if (num % i == 0) return false;
        }
        return true;
    }
}
```

- 진수 변환에 StringBuilder 사용(문자열 연결 비용 절감).
- '0'으로 분리할 때 수동 빌드 대신 string.Split('0', StringSplitOptions.RemoveEmptyEntries) 사용으로 코드 단순화.

## 메모

- 진수 변경 + 0으로 나누기 + 소수 구하기를 합친 문제로 보임
- 패턴: 문자열 변환 → 분리 → 각 조각 검사(브루트포스)
