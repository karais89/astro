---
title: "JadenCase 문자열 만들기 (Lv.2)"
description: JadenCase 문자열 만들기 문제 풀이.
date: 2025-09-21
tags: ["programmers"]
draft: false
preferBodyH1: true
---

# JadenCase 문자열 만들기 (Lv.2)

## 문제 요약

JadenCase란 모든 단어의 첫 문자가 대문자이고, 그 외의 알파벳은 소문자인 문자열입니다. 단, 첫 문자가 알파벳이 아닐 때에는 이어지는 알파벳은 소문자로 쓰면 됩니다. (첫 번째 입출력 예 참고)
문자열 s가 주어졌을 때, s를 JadenCase로 바꾼 문자열을 리턴하는 함수, solution을 완성해주세요.

제한 조건
s는 길이 1 이상 200 이하인 문자열입니다.
s는 알파벳과 숫자, 공백문자(" ")로 이루어져 있습니다.
숫자는 단어의 첫 문자로만 나옵니다.
숫자로만 이루어진 단어는 없습니다.
공백문자가 연속해서 나올 수 있습니다.

## 풀이 코드 (C#)

```csharp
using System;
using System.Text;

public class Solution {
    public string solution(string s) {
        StringBuilder builder = new StringBuilder();
        int diff = 'a' - 'A';
        
        for (int i = 0; i < s.Length; i++)
        {
            char prevCh = i == 0 ? ' ' : s[i-1];
            char currCh = s[i];
            if (prevCh == ' ')
            {
                if (currCh >= 'a' && currCh <= 'z')
                {
                    char newCh = (char)(currCh - diff);
                    builder.Append(newCh.ToString());
                }
                else
                {
                    builder.Append(currCh.ToString());
                }
            }
            else
            {
                if (currCh >= 'A' && currCh <= 'Z')
                {
                    char newCh = (char)(currCh + diff);
                    builder.Append(newCh.ToString());
                }
                else
                {
                    builder.Append(currCh.ToString());
                }
            }
        }
        
        return builder.ToString();
    }
}
```

## 다른 사람 풀이

```csharp
using System.Text;

public class Solution {
    public string solution(string s) {
        StringBuilder answer = new StringBuilder();
        var charArray = s.ToLower().ToCharArray();

        for (int i = 0; i < charArray.Length; i++)
        {
            answer.Append(i == 0 || answer[i - 1] == ' '? char.ToUpper(charArray[i]) : charArray[i]);
        }

        return answer.ToString();
    }
}
```

- ToCharArray() 가 있는걸 항상 잊어 먹음
- 코드량은 적지만 가독성 측면에서는 조금 떨어진다고 생각함.

## 개선 버전

```csharp
using System;
using System.Text;

public class Solution {
    public string solution(string s) {
        var builder = new StringBuilder();

        for (int i = 0; i < s.Length; i++)
        {
            char curr = s[i];
            bool isFirstChar = i == 0 || s[i - 1] == ' ';
            builder.Append(isFirstChar ? char.ToUpper(curr) : char.ToLower(curr));
        }

        return builder.ToString();
    }
}
```

- 훨씬 짧고 명확하게 JadenCase 변환이 가능.

## 메모

- 선택 포인트: 처음에는 배열로 먼저 만들고 문제를 풀려고 했는데 띄어쓰기가 여러개 있을 수 있다는 부분으로 인해 순회로 변경함. upper과 lower 자체가 있다는 것을을 알긴 했는데, 최대한 안쓰고 풀려고하다 보니 풀이가 조금 복잡해짐.
- 개선 가능: ToCharArray 및 ToUpper 함수를 잘 활용하면 좋지 않을까 싶음.
- 주의할 부분: 없음


## 학습 메모

- 문자열 변환 문제는 char.ToUpper/ToLower, char.IsUpper/IsLower 같은 내장 함수 활용이 가장 깔끔함.
- 연속 공백 처리 때문에 단순 Split 접근이 아니라 직접 순회 방식을 써야 함.
- C#답게 짜려면 아스키코드 계산 대신 built-in 메서드 활용 권장.
- 복습 포인트:
  - StringBuilder와 ToCharArray 활용법.
  - 조건 분기 대신 삼항 연산자 활용 패턴.