# Copilot Instructions (Astro + Starlight Dev Archive)

## Big picture
- Astro 5 + Starlight 기반 문서형 개인 아카이브 사이트입니다.
- 콘텐츠 컬렉션은 `docs` 하나이며, 소스는 `src/content/docs/**` 입니다 (`src/content.config.ts`).
- GitHub Pages 배포를 위해 `astro.config.mjs`에서 `site`/`base`를 사용합니다(현재 `base: '/astro/'`). 링크는 가능하면 `import.meta.env.BASE_URL` 기반으로 만듭니다.

## Content conventions (정렬/목록이 이 규칙에 의존)
- 문서 위치: `src/content/docs/{til,coding-test,blog}/...`
- 파일명: `YYYY-MM-DD-title.md` 또는 `.mdx` (사이드바/최근글 정렬이 이 접두어에 의존)
- Frontmatter에서 실제로 쓰이는 필드들:
	- `title` (필수), `description` (선택)
	- `date` 또는 `updatedAt` (목록/정렬에 사용)
	- `tags` (태그 페이지에 사용), `draft: true`면 목록/사이드바에서 제외
	- 컨벤션으로 `createdAt`도 자주 함께 둡니다 (예: `date`와 동일)
- 이미지/첨부: 문서 폴더의 `_assets/`에 두고 `./_assets/...`로 참조하거나 `public/`에 둡니다.

## Draft 제외 규칙 (중요)
- 사이드바는 `astro.config.mjs`의 `buildSection()`/`getDocsMeta()`가 파일을 스캔하면서 frontmatter에 `draft: true`가 있으면 제외합니다.
- 페이지/컴포넌트 목록은 `getCollection('docs', ...)`에서 `data.draft !== true`로 제외합니다.

## Navigation & listing patterns
- 사이드바는 현재 `til`, `coding-test`만 동적 생성합니다(최근 N개 + 연도 그룹). 새 섹션을 추가하면 `astro.config.mjs`의 `sidebar`에 `buildSection()`을 추가해야 합니다.
- 블로그 목록/페이지네이션은 `src/pages/blog/index.astro` + `src/pages/blog/page/[page].astro`에서 `getCollection('docs')`로 `blog/`만 모아 날짜 내림차순 정렬합니다.
- 전체 아카이브/연도별/태그는 `src/pages/archive/*`, `src/pages/tags/*`에서 `til/`, `coding-test/`, `blog/`를 합쳐 집계합니다.

## Starlight overrides & styling
- 오버라이드 컴포넌트: `src/components/starlight/*` (연결은 `astro.config.mjs`의 `starlight({ components: ... })`).
- 전역 스타일: `src/styles/global.css`, 관련글 위젯 스타일: `src/styles/related.css` (`astro.config.mjs`의 `customCss`).

## Related links (remark plugin)
- `src/remark/remark-related.js`가 frontmatter의 `related`로 “관련 글” 위젯을 주입합니다.
- `related`는 객체 배열만 사용합니다: `[{ href: '/blog/2026-01-28-openspec/', label: '...' }]` (문자열 포맷은 경고 후 무시).
- 내부 링크는 배포 `base`를 고려하므로, href는 사이트 루트 기준(`/...`)으로 작성하는 패턴을 권장합니다.

## Commands
- `npm ci`, `npm run dev`, `npm run build`, `npm run preview`
- 필요 시 Astro 체크: `npm run astro -- check`
