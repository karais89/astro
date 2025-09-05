# 📘 README (Tech Summary for Astro Docs Site)

## 🚀 Tech Stack

* **Framework**: [Astro](https://astro.build) + [Starlight Docs Theme](https://starlight.astro.build)
* **Language**: TypeScript (선택), Markdown/MDX
* **Deployment**: GitHub Pages (GitHub Actions CI/CD)
* **Search**: Pagefind (기본 제공)
* **Styling**: Starlight 기본 테마 (다크/라이트 지원)

---

## 📂 Project Structure

```
src/content/docs/
  til/              # 날짜별 학습 기록
  coding-test/      # 문제 풀이 (플랫폼/알고리즘별)
  blog/             # 블로그 글, 정리 글
public/             # 정적 자산 (이미지, favicon 등)
astro.config.mjs    # 사이트 전역 설정
```

---

## 🔑 Key Features

* **Docs 분류**: TIL / 코딩테스트 / 블로그
* **검색(Search)**: 페이지 단위 인덱싱 + 초안 제외
* **목차 자동 생성 (TOC)**
* **최근 글 / 연도별 아카이브**
* **CI/CD**: 글 작성 → push → 자동 빌드 & 배포(5분 이내)

---

## 📈 Non-Functional Targets

* Build time ≤ 1 min (100\~300 문서 기준)
* Lighthouse Performance ≥ 90
* WCAG AA 접근성 충족 (다크/라이트 대비, 코드 Copy 버튼)

---

## 🛠️ Setup & Usage

```bash
# 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 배포 (GitHub Pages, Actions 자동)
git push origin main
```

---

## ✅ Success Metrics

* 매일 **TIL 기록 가능**
* **코딩테스트 풀이**를 검색/탐색 가능
* **채용 리뷰어**가 포트폴리오 참고 용도로 활용