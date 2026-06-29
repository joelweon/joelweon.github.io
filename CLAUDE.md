# CLAUDE.md

이 저장소는 **GitHub Pages(클래식 Jekyll 빌드)** 로 배포되는 개인 블로그입니다.
`master` 브랜치에 push 하면 GitHub이 자체 서버에서 Jekyll을 빌드해 `https://joelweon.github.io` 로 발행합니다.
(`.github/workflows` 없음 = npm/pnpm/gulp는 배포 시 **실행되지 않음**. 전부 로컬 전용 도구.)

## ⚠️ Three.js 갤러리 — 빌드 결과물을 커밋해야 함

`threejs-keyframes/` 는 **Vite 프로젝트(소스)** 이고, 빌드 결과는 리포 루트 `threejs/` 로 출력됩니다.
GitHub Pages는 Vite를 돌리지 않으므로 **빌드 산출물(`threejs/`)을 직접 커밋·push 해야** 사이트에 반영됩니다.

소스(`threejs-keyframes/`)만 수정하고 끝내면 라이브에 반영되지 않습니다. 반드시:

```bash
cd threejs-keyframes
pnpm install        # 최초 1회
pnpm build          # → 리포 루트 threejs/ 갱신
cd ..
git add threejs threejs-keyframes
git commit && git push    # threejs/ 산출물까지 함께 커밋
```

- 패키지 매니저는 **pnpm** (루트, `threejs-keyframes/` 둘 다). npm/yarn 락 파일 추가 금지.
- `threejs-keyframes/` 는 `_config.yml` 의 `exclude` 로 Jekyll 발행에서 제외됨 (소스는 발행 안 함).
- Vite `base: '/threejs/'` — 경로는 상대경로 또는 `import.meta.env.BASE_URL` 로 작성 (절대 `/...` 금지, base와 어긋남).

## 블로그 홈 인라인 갤러리

홈(`_includes/projects.html`)의 Project 영역에 데모 갤러리가 **iframe 없이 인라인**으로 박혀 있습니다.
- 진입점: `threejs-keyframes/src/embed.js` → 고정 파일명 `threejs/embed.js` 로 빌드 (해시 없음, Jekyll에서 직접 `<script type="module">` 참조).
- `#threejs-gallery` 컨테이너 크기에 맞춰 마운트 (전체 화면 아님). 스타일은 `#threejs-gallery` 하위로 스코프.
- embed.js 를 수정하면 위 빌드 절차로 `threejs/embed.js` 를 다시 생성해 커밋해야 함.

## 로컬 실행

- 데모 개발: `cd threejs-keyframes && pnpm dev` (http://localhost:5173)
- 배포본 경로 확인: `pnpm build && pnpm preview` (http://localhost:4173/threejs/)
- 블로그 전체: Ruby/Jekyll 설치 후 `jekyll serve` (현재 미설치)
