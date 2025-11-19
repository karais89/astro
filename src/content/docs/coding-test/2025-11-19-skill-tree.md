---
title: "스킬트리 (Lv.2)"
description: 스킬트리 문제 풀이.
date: 2025-11-19"
tags: ["programmers"]
draft: false
preferBodyH1: true
---

# 스킬트리 (Lv.2)

### 문제 설명
선행 스킬이란 어떤 스킬을 배우기 전에 먼저 배워야 하는 스킬을 뜻합니다.

예를 들어 선행 스킬 순서가 스파크 → 라이트닝 볼트 → 썬더일때, 썬더를 배우려면 먼저 라이트닝 볼트를 배워야 하고, 라이트닝 볼트를 배우려면 먼저 스파크를 배워야 합니다.

위 순서에 없는 다른 스킬(힐링 등)은 순서에 상관없이 배울 수 있습니다. 따라서 스파크 → 힐링 → 라이트닝 볼트 → 썬더와 같은 스킬트리는 가능하지만, 썬더 → 스파크나 라이트닝 볼트 → 스파크 → 힐링 → 썬더와 같은 스킬트리는 불가능합니다.

선행 스킬 순서 skill과 유저들이 만든 스킬트리1를 담은 배열 skill_trees가 매개변수로 주어질 때, 가능한 스킬트리 개수를 return 하는 solution 함수를 작성해주세요.

### 제한사항
- 스킬은 알파벳 대문자로 표기하며, 모든 문자열은 알파벳 대문자로만 이루어져 있습니다.
- 스킬 순서와 스킬트리는 문자열로 표기합니다.
  - 예를 들어, C → B → D 라면 "CBD"로 표기합니다
- 선행 스킬 순서 skill의 길이는 1 이상 26 이하이며, 스킬은 중복해 주어지지 않습니다.
- skill_trees는 길이 1 이상 20 이하인 배열입니다.
- skill_trees의 원소는 스킬을 나타내는 문자열입니다.
  - skill_trees의 원소는 길이가 2 이상 26 이하인 문자열이며, 스킬이 중복해 주어지지 않습니다.

### 입출력 예
skill	skill_trees	return
"CBD"	["BACDE", "CBADF", "AECB", "BDA"]	2


### 입출력 예 설명
- "BACDE": B 스킬을 배우기 전에 C 스킬을 먼저 배워야 합니다. 불가능한 스킬트립니다.
- "CBADF": 가능한 스킬트리입니다.
- "AECB": 가능한 스킬트리입니다.
- "BDA": B 스킬을 배우기 전에 C 스킬을 먼저 배워야 합니다. 불가능한 스킬트리입니다.

## 풀이 코드 (C#)

```csharp
using System;

public class Solution {
    public int solution(string skill, string[] skill_trees) {
        int answer = 0;
        
        char[] skillArr = skill.ToCharArray();
        
        for (int i = 0; i < skill_trees.Length; i++)
        {
            char[] skillTree = skill_trees[i].ToCharArray();
            int findCount = 0;
            bool canSkillTree = true;
            
            for (int j = 0; j < skillTree.Length; j++)
            {
                var s = skillTree[j];
                for (int k = 0; k < skillArr.Length; k++)
                {
                    if (s == skillArr[k])
                    {
                        if (findCount != k)
                        {
                            canSkillTree = false;
                            break;
                        }
                        else
                        {
                            findCount++;
                        }
                    }
                }
                
                if (!canSkillTree)
                {
                    break;
                }
            }
            
            if (canSkillTree)
            {
                answer++;
            }            
        }
        
        return answer;
    }
}
```

## 다른 사람의 풀이

```csharp
using System;
using System.Linq;

public class Solution {
    public int solution(string skills, string[] skill_trees) 
    {
        int answer = 0;

        foreach (string skillTree in skill_trees)
        {
            var index = 0;
            answer++;
            foreach (char skill in skillTree)
            {
                var searchIndex = skills.IndexOf(skill);
                if (searchIndex == index)
                {
                    index++;
                }
                else if (searchIndex > index)
                {
                    answer--;
                    break;
                }
            }
        }

        return answer;
    }    
    private bool CheckCondition(string skill, string skillTree)
    {
        if (string.IsNullOrEmpty(skill)) return true;
        if (string.IsNullOrEmpty(skillTree)) return false;

        if (skillTree.Contains(skill.Last()))
        {
            var findSkillIndex = skillTree.IndexOf(skill.Last());
            return CheckCondition(skill.Substring(0, skill.Length - 1), skillTree.Substring(0, findSkillIndex));
        }

        return CheckCondition(skill.Substring(0, skill.Length - 1), skillTree);
    }
}
```
- 각 스킬트리에서, 선행 스킬 문자열 skills 안의 인덱스를 기준으로 아직 배우면 안 되는(앞에 스킬을 안 배운) 스킬이 먼저 나오면 실패로 간주

## 리팩토링 코드

```csharp
using System;
using System.Collections.Generic;

public class Solution {
    public int solution(string skill, string[] skill_trees) {
        int answer = 0;

        // 미리 문자 → 인덱스 매핑 만들어두기 (O(skill.Length))
        var indexMap = new Dictionary<char, int>();
        for (int i = 0; i < skill.Length; i++)
        {
            indexMap[skill[i]] = i;
        }

        foreach (var tree in skill_trees)
        {
            int expected = 0;      // 다음에 와야 할 스킬 순서
            bool isValid = true;

            foreach (var c in tree)
            {
                // 선행 스킬에 없는 스킬이면 그냥 무시
                if (!indexMap.TryGetValue(c, out int idx))
                    continue;

                if (idx == expected)
                {
                    expected++; // 올바른 순서대로 배움
                }
                else if (idx > expected)
                {
                    // 선행 스킬 안 배웠는데 뒤 스킬 나옴 → 불가능
                    isValid = false;
                    break;
                }
                // idx < expected 인 경우는 이미 배운 스킬이 다시 나온 케이스인데
                // 문제 조건상 스킬 중복이 없으므로 고려할 필요 없음
            }

            if (isValid)
                answer++;
        }

        return answer;
    }
}
```

- 3중 루프 → 사실상 2중 루프로 정리 (Dictionary로 인덱스 즉시 조회)
- 변수 네이밍: expected, isValid 등으로 의도가 좀 더 드러남
- 로직 자체는 기존 코드와 거의 동일 (상태 기반 순서 검증)

## 메모

- 스킬트리라는 게임 관련 문제가 나와서 조금 신선. 순서를 보장해야 되는 부분. 받은 스트링을 char 배열로 변환 후 순서대로 존재하는지 체크하여 푸는 방식으로 해결 하였음.
 - 3중 포문을 사용해서 이렇게 푸는것이 맞는 방식인지 조금 의아함.
- string을 foreach를 돌리면 char로 자동으로 순회하는 부분은 잠시 잊어 먹음.
- 이 문제의 핵심 패턴은 **"선형 스캔 + 순서 제약 검증"**