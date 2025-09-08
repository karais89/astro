---
title: "문자열을 정수로 바꾸기 (Lv.1)"
description: 문자열을 정수로 바꾸기 문제 풀이.
date: 2025-09-08
tags: ["programmers"]
draft: false
preferBodyH1: true
---o

# 문자열을 정수로 바꾸기 (Lv.1)

## 문제 요약

문자열 s를 숫자로 변환한 결과를 반환하는 함수, solutin을 완성하세요.

## 풀이 코드 (C#)

```csharp
public class Solution {
    public int solution(string s) {
        int answer = int.Parse(s);
        return answer;
    }
}
```

## 다른 사람 풀이
```csharp
public class Solution {
    public int solution(string s) {
        int answer = int.Parse(s);
        return answer;
    }
}
```
- 내 풀이와 동일.

## 메모
- 핵심 아이디어: 단순 parse 문제
- 헷갈린 부분: 없음
- 복습 필요: [ ]

## 추가 메모
- 이 문제는 "입력 문자열이 항상 올바른 정수 형태"라는 전제 조건이 있음을 파악하는 게 핵심.
- 비슷한 유형으로는 문자열 처리 + 변환 문제들이 자주 나옴.
- ToString() vs Parse() vs Convert.ToInt32() 차이
- 예외 처리 필요 여부 (TryParse)
    - 프로그래머스 문제의 조건 자체가 잘못된 입력값은 없다라고 적혀 있어 TryParse 사용하지 않음
