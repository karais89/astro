---
title: 제목/헤딩 가이드
description: title과 본문 H1 사용 가이드
tags: ["guides"]
draft: false
---

## 기본 원칙

- 페이지 제목(H1)은 frontmatter의 `title`로 자동 렌더링됩니다.
- 본문은 H2(`##`)부터 시작하세요. 본문 첫 줄에 H1(`# 제목`)을 넣지 않습니다.

## 예외 사용: 본문 H1 우선 표기

- 본문에서 직접 H1을 쓰고 싶다면, frontmatter에 `preferBodyH1: true`를 추가하세요.
- 이 경우 화면에서는 기본 H1(title)이 숨겨지고(접근성용으로만 유지), 본문 H1이 우선 표시됩니다.
- `title` 값은 여전히 메타데이터/사이드바/검색에 사용되므로 반드시 정확히 입력하세요.

### 예시

```md
---
title: "BOJ 11047 동전 0"
date: 2025-09-05
tags: ["greedy", "boj"]
draft: false
preferBodyH1: true
---

# BOJ 11047 동전 0

## 문제
...내용...
```

