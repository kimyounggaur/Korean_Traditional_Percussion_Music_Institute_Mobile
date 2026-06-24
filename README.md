# 한국타악예술원 모바일 웹앱

순수 HTML/CSS/JavaScript로 만든 한국타악예술원 소개용 모바일 웹앱입니다. 빌드 도구 없이 `index.html` 하나를 기준으로 동작하며, Vercel 배포를 고려해 모든 경로를 상대경로로 구성했습니다.

운영 URL: https://korean-traditional-percussion-music.vercel.app

## 실행

로컬에서 바로 확인하려면 `index.html`을 브라우저로 열면 됩니다. 서비스 워커와 PWA 설치까지 확인하려면 간단한 로컬 서버를 사용하세요.

```powershell
python -m http.server 4173
```

브라우저에서 `http://localhost:4173`으로 접속합니다.

## 수정 위치

콘텐츠, 연락처, 주소, 시간표, 메뉴명은 `js/data.js`에서 수정합니다.

- `SITE`: 예술원 기본 정보
- `CATEGORIES`: 홈 대분류 메뉴
- `SUBMENUS`: 수업/자격증 종목 메뉴
- `CONTENT`: 소개, 인사말, 공연, 연혁
- `CLASS_DETAIL`: 수업 상세와 반별 시간표
- `LICENSE_DETAIL`: 자격증 상세

## 배포

```powershell
git init
git add .
git commit -m "Create Korean percussion mobile web app"
git branch -M main
git remote add origin https://github.com/<아이디>/korean-percussion-app.git
git push -u origin main
```

Vercel 프로젝트가 GitHub 저장소의 `main` 브랜치와 연결되어 있습니다. `main`에 커밋을 푸시하면 Vercel이 자동으로 프로덕션 배포를 실행합니다.
