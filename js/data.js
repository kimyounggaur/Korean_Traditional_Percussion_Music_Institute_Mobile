"use strict";

const SITE = {
  name: "한국타악예술원",
  nameEn: "Korean Traditional Percussion Music Institute",
  phone: "010-0000-0000",
  address: "주소를 입력하세요",
  email: "",
  logo: "assets/logo/logo-horizontal.png",
  logoSquare: "assets/logo/logo-square.png"
};

const UI_TEXT = {
  home: "홈",
  back: "뒤로",
  ready: "내용 준비 중입니다.",
  performanceReady: "공연 정보 준비 중입니다.",
  historyReady: "연혁 정보 준비 중입니다.",
  contact: "문의",
  phoneCall: "전화 문의하기",
  goHome: "홈으로",
  classList: "수업 목록",
  licenseList: "자격증 목록",
  schedule: "반별 시간표",
  timeInquiry: "시간 문의",
  classInfo: "수업 정보",
  licenseProcess: "취득 절차",
  course: "과정",
  requirement: "응시자격",
  cost: "비용",
  unavailable: "자료를 준비 중입니다.",
  appInstallNote: "모바일에서 홈화면에 추가해 앱처럼 사용할 수 있습니다.",
  footerSeparator: " · "
};

const CATEGORIES = [
  { id: "intro", title: "예술원 소개", type: "content", icon: "assets/icons/icon-janggu.png" },
  { id: "class", title: "수업 소개", type: "submenu", icon: "assets/players/player-nanta.png" },
  { id: "greeting", title: "원장 인사말", type: "content", icon: "assets/players/player-janggu.png" },
  { id: "performance", title: "공연 소개", type: "content", icon: "assets/players/player-cupta.png" },
  { id: "history", title: "예술원 연혁", type: "content", icon: "assets/icons/icon-cupta.png" },
  { id: "license", title: "자격증 소개", type: "submenu", icon: "assets/icons/icon-nanta.png" }
];

const SUBMENUS = {
  class: [
    { id: "nanta", title: "난타", icon: "assets/icons/icon-nanta.png", image: "assets/players/player-nanta.png" },
    { id: "spoon", title: "스푼난타", icon: "assets/icons/icon-spoon.png", image: "assets/players/player-spoon.png" },
    { id: "cupta", title: "컵타", icon: "assets/icons/icon-cupta.png", image: "assets/players/player-cupta.png" },
    { id: "janggu", title: "장구난타", icon: "assets/icons/icon-janggu.png", image: "assets/players/player-janggu.png" }
  ],
  license: [
    { id: "nanta", title: "난타", icon: "assets/icons/icon-nanta.png", image: "assets/players/player-nanta.png" },
    { id: "janggu", title: "장구난타", icon: "assets/icons/icon-janggu.png", image: "assets/players/player-janggu.png" },
    { id: "cupta", title: "컵타", icon: "assets/icons/icon-cupta.png", image: "assets/players/player-cupta.png" },
    { id: "spoon", title: "스푼난타", icon: "assets/icons/icon-spoon.png", image: "assets/players/player-spoon.png" }
  ]
};

const CONTENT = {
  intro: {
    title: "예술원 소개",
    image: "assets/logo/logo-square.png",
    paragraphs: ["내용 준비 중입니다."]
  },
  greeting: {
    title: "원장 인사말",
    director: "○○○",
    photo: "assets/players/player-janggu.png",
    paragraphs: ["내용 준비 중입니다."]
  },
  performance: {
    title: "공연 소개",
    items: []
  },
  history: {
    title: "예술원 연혁",
    items: []
  }
};

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

const CLASS_DETAIL = {
  nanta: {
    title: "난타",
    "한줄소개": "쉽고 재미있게 배우는 난타",
    "이미지": "assets/players/player-nanta.png",
    "일시": "매주 화·목·금요일",
    "시간": "반별 시간표 참조",
    "장소": "한국타악예술원",
    "준비물": "편한 복장",
    "인원": "소수정예",
    "수강료": "문의",
    "문의": SITE.phone,
    schedule: SCHEDULES.nanta
  },
  spoon: {
    title: "스푼난타",
    "한줄소개": "리듬감 있게 배우는 스푼난타",
    "이미지": "assets/players/player-spoon.png",
    "일시": "매주 목요일",
    "시간": "반별 시간표 참조",
    "장소": "한국타악예술원",
    "준비물": "편한 복장",
    "인원": "소수정예",
    "수강료": "문의",
    "문의": SITE.phone,
    schedule: SCHEDULES.spoon
  },
  cupta: {
    title: "컵타",
    "한줄소개": "생활 도구로 즐기는 컵타",
    "이미지": "assets/players/player-cupta.png",
    "일시": "문의",
    "시간": "시간 문의",
    "장소": "한국타악예술원",
    "준비물": "문의",
    "인원": "소수정예",
    "수강료": "문의",
    "문의": SITE.phone,
    schedule: SCHEDULES.cupta
  },
  janggu: {
    title: "장구난타",
    "한줄소개": "전통 장단의 힘을 느끼는 장구난타",
    "이미지": "assets/players/player-janggu.png",
    "일시": "매주 월·화·수·금요일",
    "시간": "반별 시간표 참조",
    "장소": "한국타악예술원",
    "준비물": "편한 복장",
    "인원": "소수정예",
    "수강료": "문의",
    "문의": SITE.phone,
    schedule: SCHEDULES.janggu,
    note: "원본 시간표에는 '장구'로 표기되어 있어 확인 필요"
  }
};

const LICENSE_DETAIL = {
  nanta: {
    title: "난타",
    "자격명": "난타 지도자 자격증",
    "이미지": "assets/icons/icon-nanta.png",
    "과정": [],
    "응시자격": "",
    "취득절차": [],
    "비용": "문의",
    "문의": SITE.phone
  },
  janggu: {
    title: "장구난타",
    "자격명": "장구난타 지도자 자격증",
    "이미지": "assets/icons/icon-janggu.png",
    "과정": [],
    "응시자격": "",
    "취득절차": [],
    "비용": "문의",
    "문의": SITE.phone
  },
  cupta: {
    title: "컵타",
    "자격명": "컵타 지도자 자격증",
    "이미지": "assets/icons/icon-cupta.png",
    "과정": [],
    "응시자격": "",
    "취득절차": [],
    "비용": "문의",
    "문의": SITE.phone
  },
  spoon: {
    title: "스푼난타",
    "자격명": "스푼난타 지도자 자격증",
    "이미지": "assets/icons/icon-spoon.png",
    "과정": [],
    "응시자격": "",
    "취득절차": [],
    "비용": "문의",
    "문의": SITE.phone
  }
};

window.SITE = SITE;
window.UI_TEXT = UI_TEXT;
window.CATEGORIES = CATEGORIES;
window.SUBMENUS = SUBMENUS;
window.CONTENT = CONTENT;
window.SCHEDULES = SCHEDULES;
window.CLASS_DETAIL = CLASS_DETAIL;
window.LICENSE_DETAIL = LICENSE_DETAIL;
