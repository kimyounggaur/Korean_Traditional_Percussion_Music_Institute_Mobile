"use strict";

/* ──────────────────────────────────────────────────────────
   한국타악예술원 — 콘텐츠/데이터
   화면 텍스트·연락처·시간표·메뉴는 이 파일만 수정하면 됩니다.
   ────────────────────────────────────────────────────────── */

const SITE = {
  name: "한국타악예술원",
  nameEn: "Korean Traditional Percussion Music Institute",
  email: "dugi0115@hanmail.net",
  address: "경기도 부천시 송내대로 39 송내코아빌딩 지하1층",
  transit: "1호선 송내역 1번출구 도보 200m",
  youtube: "https://youtube.com/@nantahappyschool",
  band: "https://band.us/band/91180321",
  logoSquare: "logo/logo-square.png"
};

const UI_TEXT = {
  ready: "내용 준비 중입니다.",
  unavailable: "자료를 준비 중입니다."
};

// 홈 대분류 (순서 = 화면 표시 순서). accent/tint 는 카드 색상.
const CATEGORIES = [
  { id: "intro",       title: "예술원 소개", type: "content", img: "logo/logo-square.png",      accent: "#D83A2B", tint: "#F8DAD4" },
  { id: "class",       title: "수업 소개",   type: "submenu", img: "players/player-nanta.png",  accent: "#2A6CA8", tint: "#D4E1EE" },
  { id: "greeting",    title: "원장 인사말", type: "content", img: "players/player-janggu.png", accent: "#E8A22B", tint: "#FAEAC6" },
  { id: "performance", title: "공연 소개",   type: "content", img: "players/player-cupta.png",  accent: "#2E9163", tint: "#D0E8DC" },
  { id: "history",     title: "예술원 연혁", type: "content", img: "icons/icon-janggu.png",     accent: "#8B5BA8", tint: "#E7D9EF" },
  { id: "license",     title: "자격증 소개", type: "submenu", img: "icons/icon-cupta.png",      accent: "#C2603A", tint: "#F2DCD0" }
];

// 종목 정의
const INSTR = {
  nanta:  { title: "난타",     img: "players/player-nanta.png",  accent: "#D83A2B", tint: "#F8DAD4" },
  spoon:  { title: "스푼난타", img: "players/player-spoon.png",  accent: "#E8A22B", tint: "#FAEAC6" },
  cupta:  { title: "컵타",     img: "players/player-cupta.png",  accent: "#2E9163", tint: "#D0E8DC" },
  janggu: { title: "장구난타", img: "players/player-janggu.png", accent: "#2A6CA8", tint: "#D4E1EE" }
};

const CLASS_ORDER = ["nanta", "spoon", "cupta", "janggu"];
const LICENSE_ORDER = ["nanta", "janggu", "cupta", "spoon"];

// 중분류 카드 목록 (수업/자격증)
const SUBMENUS = {
  class:   CLASS_ORDER.map((id) => ({ id, ...INSTR[id] })),
  license: LICENSE_ORDER.map((id) => ({ id, ...INSTR[id] }))
};

// 반별 시간표
const SCHEDULES = {
  janggu: [
    { day: "월", time: "13:00~14:30" },
    { day: "월", time: "18:30~20:00" },
    { day: "화", time: "08:30~10:00" },
    { day: "화", time: "14:30~16:00" },
    { day: "수", time: "17:00~18:30" },
    { day: "금", time: "11:20~12:50" }
  ],
  nanta: [
    { day: "화", time: "10:00~11:30" },
    { day: "화", time: "13:00~14:30" },
    { day: "목", time: "18:30~20:00" },
    { day: "금", time: "10:00~11:20" }
  ],
  spoon: [
    { day: "목", time: "10:00~11:00" },
    { day: "목", time: "20:00~21:00" }
  ],
  cupta: []
};

// 수업 상세 (tagline + 정보표)
const CLASS_DETAIL = {
  nanta: {
    tagline: "쉽고 재미있게 배우는 난타",
    meta: { "일시": "매주 화·목·금요일", "시간": "반별 시간표 참조", "장소": "한국타악예술원", "준비물": "편한 복장", "인원": "소수정예", "수강료": "문의" }
  },
  spoon: {
    tagline: "리듬감 있게 배우는 스푼난타",
    meta: { "일시": "매주 목요일", "시간": "반별 시간표 참조", "장소": "한국타악예술원", "준비물": "편한 복장", "인원": "소수정예", "수강료": "문의" }
  },
  cupta: {
    tagline: "생활 도구로 즐기는 컵타",
    meta: { "일시": "문의", "시간": "시간 문의", "장소": "한국타악예술원", "준비물": "문의", "인원": "소수정예", "수강료": "문의" }
  },
  janggu: {
    tagline: "전통 장단의 힘을 느끼는 장구난타",
    meta: { "일시": "매주 월·화·수·금요일", "시간": "반별 시간표 참조", "장소": "한국타악예술원", "준비물": "편한 복장", "인원": "소수정예", "수강료": "문의" },
    note: "원본 시간표에는 '장구'로 표기되어 있어 확인이 필요합니다."
  }
};

// 자격증 상세
const LICENSE_DETAIL = {
  nanta:  { title: "난타 지도자 자격증" },
  janggu: { title: "장구난타 지도자 자격증" },
  cupta:  { title: "컵타 지도자 자격증" },
  spoon:  { title: "스푼난타 지도자 자격증" }
};

// 콘텐츠 페이지 (kind: intro | greeting | empty)
const CONTENT = {
  intro:       { title: "예술원 소개", kind: "intro",    paragraphs: ["내용 준비 중입니다."] },
  greeting:    { title: "원장 인사말", kind: "greeting", director: "○○○", paragraphs: ["내용 준비 중입니다."] },
  performance: { title: "공연 소개",   kind: "empty",    emptyMsg: "공연 정보 준비 중입니다." },
  history:     { title: "예술원 연혁", kind: "empty",    emptyMsg: "연혁 정보 준비 중입니다." }
};

window.SITE = SITE;
window.UI_TEXT = UI_TEXT;
window.CATEGORIES = CATEGORIES;
window.INSTR = INSTR;
window.SUBMENUS = SUBMENUS;
window.SCHEDULES = SCHEDULES;
window.CLASS_DETAIL = CLASS_DETAIL;
window.LICENSE_DETAIL = LICENSE_DETAIL;
window.CONTENT = CONTENT;
