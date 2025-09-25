---
title: "이진 변환 반복하기 (Lv.2)"
description: 이진 변환 반복하기 문제 풀이.
date: 2025-09-25"
tags: ["programmers"]
draft: false
preferBodyH1: true
---

# 이진 변환 반복하기 (Lv.2)

## 문제 요약

0과 1로 이루어진 어떤 문자열 x에 대한 이진 변환을 다음과 같이 정의합니다.

x의 모든 0을 제거합니다.
x의 길이를 c라고 하면, x를 "c를 2진법으로 표현한 문자열"로 바꿉니다.
예를 들어, x = "0111010"이라면, x에 이진 변환을 가하면 x = "0111010" -> "1111" -> "100" 이 됩니다.

0과 1로 이루어진 문자열 s가 매개변수로 주어집니다. s가 "1"이 될 때까지 계속해서 s에 이진 변환을 가했을 때, 이진 변환의 횟수와 변환 과정에서 제거된 모든 0의 개수를 각각 배열에 담아 return 하도록 solution 함수를 완성해주세요.

## 풀이 코드 (C#)

```csharp
using System;

public class Solution {
    
    public string ToBinary(int n)
    {
        if (n == 0) return "0";
        
        string result = "";
        int newN = n;
        while (newN >= 1)
        {
            result = (newN % 2) + result;
            newN /= 2;
        }
        return result;
    }
    
    public int[] solution(string s) {
        int[] answer = new int[] {};
        string newStr = new String(s);
        
        int loopCount = 0;
        int zeroCount = 0;
        while (newStr != "1")
        {
            loopCount++;
            
            int oneCount = 0;
            foreach (var c in newStr)
            {
                if (c == '1')
                {
                    oneCount++;
                }
                else
                {
                    zeroCount++;
                }
            }
            
            newStr = ToBinary(oneCount);
        }
        
        return new int[] {loopCount, zeroCount};
    }
}
```

## 다른 사람 풀이

```csharp
using System;
    using System.Linq;
public class Solution {
    public int[] solution(string s) {
            int[] answer = new int[] { 0, 0 };

            while (!s.Equals("1"))
            {
                answer[0]++;
                var OneCharCount = s.Where(x => x.Equals('1')).Count();
                answer[1] += s.Length - OneCharCount;

                s = Convert.ToString(OneCharCount, 2);
            }

            return answer;
    }
}
```

- 배열을 미리 선언하고 배열의 값을 증가. 별도 변수를 두지 않아 이쪽이 더 가독성 있어 보임
- linq 사용으로 1의 갯수를 한줄로 셀 수 있음.
- 2지수 변환은 내장 c# 내장 함수 사용.

## 메모

- 선택 포인트: 10진수를 2진수로 변경 및 0과 1을 카운팅 하는 방법 선택
- 개선 가능: binary 변환을 자체 함수가 아닌 기본적으로 제공하는 함수를 사용 한다면 가독성 측면에서 개선 가능 
- 주의할 부분: 없음

## 학습 메모

- 패턴: 문자열 변환 + 반복 처리 → "시뮬레이션 문제"
- 핵심 선택 포인트
  - 10진수 → 2진수 변환: 직접 구현 vs Convert.ToString
  - 0/1 카운팅: foreach 직접 구현 vs LINQ (Count)
- 복습 필요 포인트
  - LINQ 문법 (Count, Where)을 자유롭게 활용하는 연습
  - 문자열 → 숫자 변환 함수 (Convert, int.Parse, ToString) 차이
- 추천 연습 문제 유형
  - 문자열 변환/카운팅 (ex: JadenCase, 문자열 압축)
  - 시뮬레이션 반복 (ex: 124 나라의 숫자, 다음 큰 숫자)