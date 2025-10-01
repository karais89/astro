---
title: "첫 글"
description: Astro + Starlight 기반 개인 개발 아카이브 구축기.
date: 2025-09-05
tags: []
draft: false
template: splash
related:
  - slug: "blog/2025-09-22-gcd-lcm"
  - slug: "blog/2025-09-23-dfs-bfs"
    label: "DFS/BFS 정리 보기"
  - href: "https://github.com/karais89/astro"
    label: "GitHub 저장소"
---

## 개요

가벼운 글과 메모를 남기는 공간입니다. TIL, 코딩테스트, 블로그 글로 구조를 나눴습니다.

## 앞으로의 계획

문서 구조를 다듬고, 쓰기/찾기 경험을 지속적으로 개선할 예정입니다.

## Related 필드 사용 예시

- `slug`만 넣으면 해당 문서의 제목이 자동으로 링크 텍스트가 됩니다.
- `slug`와 `label`을 함께 쓰면 표시되는 문구를 원하는 대로 바꿀 수 있습니다.
- 외부 링크는 `href`와 `label`을 모두 적어주면 됩니다.

```yaml
related:
  - slug: "blog/2025-09-22-gcd-lcm"            # 내부 문서, 제목 자동 표기
  - slug: "blog/2025-09-23-dfs-bfs"            # 내부 문서 + 사용자 지정 문구
    label: "DFS/BFS 정리 보기"
  - href: "https://github.com/karais89/astro"   # 외부 링크는 항상 label 필요
    label: "GitHub 저장소"
```

위 예시는 실제 이 글의 frontmatter에 반영돼 있으니 프론트엔드에서 렌더링된 모습을 바로 확인할 수 있습니다.
