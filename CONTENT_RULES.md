네 👍 딱 \*\*0번 규칙(파일명 + Frontmatter 날짜)\*\*만 명확히 문서로 박아두면 Codex에게 “이 규칙 반드시 지켜”라고 요구하기에 충분합니다.

아래는 그 목적에 맞춘 **간단 문서** 초안이에요:

---

# 📄 Content Rules

## 0. 파일명 & Frontmatter 규칙

* **파일명**: 반드시 `YYYY-MM-DD-title.md` 형식

  * 예:

    * `2025-09-06-til.md`
    * `2025-09-06-boj-11047.md`
    * `2025-09-06-astro-first-steps.md`

* **Frontmatter**: 파일명 날짜를 기반으로 `date`와 `createdAt`을 필수로 넣는다.

  ```yaml
  ---
  title: "제목"
  date: 2025-09-06
  createdAt: 2025-09-06
  tags: []
  draft: false
  ---
  ```
