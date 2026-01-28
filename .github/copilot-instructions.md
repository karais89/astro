# Copilot Instructions

이 저장소는 **Astro + Starlight**로 구축된 개인 개발 아카이브 사이트입니다.

## 아키텍처 개요

- **프레임워크**: Astro 5 + Starlight 문서 테마  
- **콘텐츠**: `src/content/docs/` 아래 TIL, coding-test, blog 3개 섹션  
- **배포**: GitHub Pages (main push 시 자동 빌드/배포)

핵심 설정 파일:
- [astro.config.mjs](../astro.config.mjs) - Starlight 설정, 사이드바 동적 생성, remark 플러그인
- [src/content.config.ts](../src/content.config.ts) - 콘텐츠 스키마 확장 (date, tags, draft 등)

## 콘텐츠 작성 규칙

파일명은 **반드시 `YYYY-MM-DD-title.md` 형식** 사용:
```
src/content/docs/blog/2025-09-06-my-post.md
src/content/docs/til/2025-09-06-learned-today.md
src/content/docs/coding-test/2025-09-06-boj-11047.md
```

Frontmatter 필수 필드:
```yaml
---
title: "제목"
date: 2025-09-06
createdAt: 2025-09-06
tags: [태그1, 태그2]
draft: false  # true면 빌드에서 제외됨
---
```

관련 글 연결: `related` 배열에 `{ href, label }` 객체 사용 (문자열 형식은 미지원)

## 컴포넌트 구조

| 위치 | 용도 | 예시 |
|------|------|------|
| `src/components/starlight/` | Starlight 기본 컴포넌트 오버라이드 | Header.astro, PageTitle.astro |
| `src/components/` | 커스텀 UI 컴포넌트 | GameDevGrid.astro, RecentPosts.astro |
| `src/remark/` | Markdown 처리 플러그인 | remark-related.js |

Starlight 컴포넌트 오버라이드 시 `virtual:starlight/components/*` 경로에서 기본 컴포넌트를 import합니다.

## 사이드바 동작 원리

`astro.config.mjs`의 `buildSection()` 함수가 빌드 시점에 파일시스템을 스캔하여:
- 파일명 YYYY-MM-DD 접두어로 날짜 순 정렬
- `draft: true` 문서 자동 제외
- 최근 N개 + 연도별 그룹 구조 생성

## 주요 명령어

```bash
npm ci          # 의존성 설치 (락파일 기준)
npm run dev     # 개발 서버 (HMR)
npm run build   # 프로덕션 빌드 → dist/
npm run preview # 빌드 결과 미리보기
```

## 코딩 컨벤션

- 들여쓰기: 2 spaces
- 컴포넌트/레이아웃: `PascalCase.astro`
- 라우트 파일: `kebab-case.astro`
- 유틸리티: `camelCase.js`
- TypeScript 또는 ES 모듈 사용, 상대 경로 대신 TS alias 권장

## 빌드 전 체크리스트

1. `npm run build` 성공 확인
2. 파일명 날짜 형식 준수 여부
3. Frontmatter `draft: false` 설정 (공개할 글)
4. 이미지는 `docs/[section]/_assets/` 또는 `public/`에 배치
