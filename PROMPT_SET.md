# 📑 Codex 프롬프트 세트

---

## 1️⃣ Must 기능 (기본 구조 + 배포)

```
/exec
PRD.md 문서를 확인하고, Must 기능을 코드로 구현해줘.

### Must 기능
- 문서 구조화 (TIL / 코딩테스트 / 블로그 3개 섹션)
- 검색 기능 (Pagefind 기본 검색)
- GitHub Pages 자동 배포 (CI/CD)

### 구현 지시
1. src/content/docs/ 하위에 샘플 문서 3개 생성
   - til/2025-09-05.md
   - coding-test/boj-11047.md
   - blog/first-post.md

2. astro.config.mjs에서 sidebar를 PRD 정보 구조(Intro, TIL, 코딩테스트, 블로그)에 맞게 설정

3. Pagefind 검색이 기본 동작하도록 설정 확인

4. .github/workflows/deploy.yml에 GitHub Pages 배포 플로우가 포함되어 있는지 확인
   누락 시 새로 작성
```

---

## 2️⃣ Should 기능 – 1차 (글 읽기 경험 개선)

```
/exec
PRD.md의 "Should" 기능 중 글 읽기 경험을 개선하는 항목을 반영해줘.

### 기능
- 코드 블록 하이라이트 + Copy 버튼
- 목차 자동 생성 (TOC)

### 구현 지시
1. 코드 블록에 언어별 하이라이트 적용
2. 각 코드 블록 상단에 Copy 버튼 추가
3. 블로그 글과 코딩테스트 풀이 글에 자동 TOC가 사이드바에 표시되도록 설정
```

---

## 3️⃣ Should 기능 – 2차 (블로그 확장)

```
/exec
PRD.md의 "Should" 기능 중 블로그 경험 확장 항목을 반영해줘.

### 기능
- 최근 글 위젯
- 연도별 아카이브 페이지
- lastUpdated 날짜 표시
- 다크/라이트 모드 전환
- "Edit this page" → GitHub repo 링크

### 구현 지시
1. 블로그 섹션에 최근 글 위젯 추가
2. 연도별 아카이브 페이지 생성
3. 각 문서에 lastUpdated 표시
4. 다크/라이트 모드 전환 토글 적용
5. 각 페이지 하단에 "Edit this page" GitHub 링크 추가
```

---

## 4️⃣ Intro 랜딩 페이지

```
/exec
PRD.md의 정보 구조에 따라 Intro(랜딩 페이지)를 구현해줘.

### 요구사항
- Hero 영역 (사이트 타이틀 + 짧은 설명 + CTA 버튼 3개: TIL / 코딩테스트 / 블로그)
- 카드 레이아웃 (3대 섹션 소개: TIL / 코테 / 블로그)
- 최근 글 미리보기 섹션

### 구현 지시
1. src/content/docs/intro.md 또는 커스텀 페이지 생성
2. Hero + CTA 버튼 3개
3. 카드 레이아웃 섹션 추가
4. 최근 글 목록 표시
```

---

## 5️⃣ Could 기능 (선택/확장)

```
/exec
PRD.md의 "Could" 기능을 반영해줘.

### 기능
- 블로그 RSS 피드
- 피드백 위젯 ("도움이 되었나요?")
- 다국어(i18n)

### 구현 지시
1. RSS 피드 생성 (Astro integration 사용)
2. 각 블로그 글 하단에 피드백 위젯 추가 (예: thumbs up/down)
3. i18n 지원 기본 구조 생성 (ko 기본, en 추가)
```

---

## 6️⃣ Review (점검용)

```
/review
PRD.md를 기준으로 현재 코드 상태를 리뷰해줘.
- Must 기능이 모두 반영되었는지 체크
- Should / Could 기능 중 누락된 부분이 있으면 알려줘
- 파일명 규칙과 frontmatter(date/createdAt) 규칙(Content Rules.md)도 확인
```