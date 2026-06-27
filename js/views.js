"use strict";

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function mailHref(email = SITE.email) {
  return `mailto:${String(email || "").trim()}`;
}

function findCategory(catId) {
  return CATEGORIES.find((category) => category.id === catId);
}

function findSubItem(catId, itemId) {
  return (SUBMENUS[catId] || []).find((item) => item.id === itemId);
}

function setView(markup) {
  const view = document.getElementById("view");
  view.innerHTML = `<div class="view-enter">${markup}</div>`;
}

function brandTitle() {
  const name = SITE.name || "";
  const highlight = "예술원";
  const index = name.indexOf(highlight);

  if (index === -1) {
    return escapeHtml(name);
  }

  return [
    escapeHtml(name.slice(0, index)),
    `<span>${escapeHtml(highlight)}</span>`,
    escapeHtml(name.slice(index + highlight.length))
  ].join("");
}

function beatRow() {
  const beats = [
    { size: 9, color: "var(--red)", delay: "0s" },
    { size: 13, color: "var(--gold)", delay: ".12s" },
    { size: 9, color: "var(--green)", delay: ".24s" },
    { size: 16, color: "var(--blue)", delay: ".36s" },
    { size: 9, color: "var(--purple)", delay: ".48s" }
  ];

  return `
    <div class="beat-row" aria-hidden="true">
      ${beats.map((beat) => `
        <span class="beat" style="width: ${beat.size}px; height: ${beat.size}px; background: ${beat.color}; animation-delay: ${beat.delay}"></span>
      `).join("")}
    </div>
  `;
}

function itemVars(item) {
  return `--c: ${escapeHtml(item?.accent || "#D83A2B")}; --t: ${escapeHtml(item?.tint || "#F8DAD4")}`;
}

function pageLead(title, description = "", extraClass = "") {
  return `
    <section class="lead ${escapeHtml(extraClass)}">
      <p class="lead-eyebrow">${escapeHtml(SITE.name)}</p>
      <h1 class="lead-title">${escapeHtml(title || UI_TEXT.ready)}</h1>
      ${description ? `<p class="lead-copy">${escapeHtml(description)}</p>` : ""}
    </section>
  `;
}

function listParagraphs(paragraphs) {
  const safeParagraphs = Array.isArray(paragraphs) && paragraphs.length ? paragraphs : [UI_TEXT.ready];
  return safeParagraphs
    .map((paragraph) => `<p>${escapeHtml(paragraph || UI_TEXT.ready)}</p>`)
    .join("");
}

function placeholder(message = UI_TEXT.unavailable) {
  return `
    <div class="placeholder" role="status">
      <span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>
      <p>${escapeHtml(message)}</p>
    </div>
  `;
}

function renderHome() {
  const cards = CATEGORIES.map((category, index) => `
    <button class="cat-card nb nb-press" style="${itemVars(category)}" type="button" data-navigate="#/c/${escapeHtml(category.id)}">
      <span class="cat-bar"></span>
      <span class="cat-top">
        <span class="cat-index">${String(index + 1).padStart(2, "0")}</span>
        <span class="cat-dots" aria-hidden="true"><i></i><i></i><i></i></span>
      </span>
      <span class="cat-orb">
        <img src="${escapeHtml(category.img)}" alt="${escapeHtml(category.title)}" loading="lazy">
      </span>
      <span class="cat-name">${escapeHtml(category.title)}</span>
    </button>
  `).join("");

  setView(`
    <section class="hero" aria-labelledby="home-title">
      <img class="hero-logo" src="${escapeHtml(SITE.logoSquare)}" alt="" aria-hidden="true" loading="lazy">
      <h1 id="home-title" class="hero-title">${brandTitle()}</h1>
      <p class="hero-sub">${escapeHtml(SITE.nameEn)}</p>
      ${beatRow()}
    </section>
    <nav class="menu-grid" aria-label="주요 메뉴">
      ${cards}
    </nav>
  `);
}

function renderSubmenu(catId) {
  const category = findCategory(catId);
  const isClass = catId === "class";
  const description = isClass
    ? "원하는 종목을 선택해 수업 정보와 시간표를 확인하세요."
    : "취득 가능한 지도자 자격증 종목입니다.";

  const cards = (SUBMENUS[catId] || []).map((item) => `
    <button class="sub-card nb nb-press" style="${itemVars(item)}" type="button" data-navigate="#/c/${escapeHtml(catId)}/${escapeHtml(item.id)}">
      <span class="sub-thumb">
        <img src="${escapeHtml(item.img)}" alt="${escapeHtml(item.title)}" loading="lazy">
      </span>
      <span class="sub-foot">
        <span class="sub-name">${escapeHtml(item.title)}</span>
        <span class="sub-arrow" aria-hidden="true">&rarr;</span>
      </span>
    </button>
  `).join("");

  setView(`
    ${pageLead(category?.title, description)}
    <nav class="sub-grid" aria-label="${escapeHtml(category?.title || UI_TEXT.ready)} 종목">
      ${cards || placeholder()}
    </nav>
  `);
}

function renderContent(catId) {
  if (catId === "intro") {
    renderIntro();
    return;
  }

  if (catId === "greeting") {
    renderGreeting();
    return;
  }

  if (catId === "performance" || catId === "history") {
    renderEmptyContent(catId);
    return;
  }

  setView(`${pageLead(UI_TEXT.unavailable)}${placeholder()}${renderContentActions()}`);
}

function renderIntro() {
  const content = CONTENT.intro || {};

  setView(`
    ${pageLead(content.title)}
    <section class="content-card nb">
      <img class="content-logo" src="${escapeHtml(SITE.logoSquare)}" alt="${escapeHtml(SITE.name)}" loading="lazy">
      <div class="prose">${listParagraphs(content.paragraphs)}</div>
    </section>
    ${renderContentActions()}
  `);
}

function renderGreeting() {
  const content = CONTENT.greeting || {};
  const director = content.director || "○○○";

  setView(`
    ${pageLead(content.title)}
    <section class="content-card nb">
      <div class="portrait-box">
        <img src="players/player-spoon.png" alt="원장" loading="lazy">
      </div>
      <div class="director">${escapeHtml(director)}</div>
      <div class="prose">${listParagraphs(content.paragraphs)}</div>
      <p class="signature">원장 ${escapeHtml(director)}</p>
    </section>
    ${renderContentActions()}
  `);
}

function renderEmptyContent(catId) {
  const content = CONTENT[catId] || {};

  setView(`
    ${pageLead(content.title)}
    <section class="empty-card">
      ${beatRow()}
      <p>${escapeHtml(content.emptyMsg || UI_TEXT.ready)}</p>
    </section>
    ${renderContentActions()}
  `);
}

function renderContentActions() {
  return `
    <div class="content-actions">
      <p class="contact">문의 · <a href="${escapeHtml(mailHref())}">${escapeHtml(SITE.email)}</a></p>
      <button class="btn-ghost" type="button" data-navigate="#/">홈으로</button>
    </div>
  `;
}

function renderDetail(catId, itemId) {
  if (catId === "class") {
    renderClassDetail(itemId);
    return;
  }

  if (catId === "license") {
    renderLicenseDetail(itemId);
    return;
  }

  setView(`${pageLead(UI_TEXT.unavailable)}${placeholder()}${renderListButton(catId)}`);
}

function renderClassDetail(itemId) {
  const item = findSubItem("class", itemId);
  const detail = CLASS_DETAIL[itemId];

  if (!item || !detail) {
    setView(`${pageLead(item?.title || UI_TEXT.unavailable)}${placeholder()}${renderListButton("class")}`);
    return;
  }

  const metaRows = Object.entries(detail.meta || {}).concat([["문의", SITE.email]]);

  setView(`
    ${pageLead(item.title, detail.tagline, "detail-lead")}
    <div class="stack">
      ${renderFigure(item)}
      <section class="panel nb">
        <h2 class="panel-h"><span class="bar" style="background: ${escapeHtml(item.accent)}"></span>수업 정보</h2>
        <dl class="meta">
          ${metaRows.map(([label, value]) => renderMetaRow(label, value)).join("")}
        </dl>
      </section>
      <section class="panel nb">
        <h2 class="panel-h"><span class="bar" style="background: var(--gold)"></span>반별 시간표</h2>
        ${renderSchedule(SCHEDULES[itemId])}
        ${detail.note ? `<p class="note">${escapeHtml(detail.note)}</p>` : ""}
      </section>
      <section class="actions">
        <a class="btn-primary nb nb-press" href="${escapeHtml(mailHref())}">이메일 문의하기</a>
        <button class="btn-ghost" type="button" data-navigate="#/c/class">&larr; 수업 목록</button>
      </section>
    </div>
  `);
}

function renderLicenseDetail(itemId) {
  const item = findSubItem("license", itemId);
  const detail = LICENSE_DETAIL[itemId];

  if (!item || !detail) {
    setView(`${pageLead(item?.title || UI_TEXT.unavailable)}${placeholder()}${renderListButton("license")}`);
    return;
  }

  setView(`
    ${pageLead(detail.title)}
    <div class="stack">
      ${renderFigure({ ...item, accent: "#C2603A", tint: "#F2DCD0" }, "190px")}
      <section class="panel panel-sections nb">
        <div>
          <h2 class="panel-sub-h"><span class="bar" style="background: var(--brown)"></span>과정</h2>
          ${placeholder()}
        </div>
        <div>
          <h2 class="panel-sub-h"><span class="bar" style="background: var(--brown)"></span>응시자격</h2>
          <p class="text-line">내용 준비 중입니다.</p>
        </div>
        <div>
          <h2 class="panel-sub-h"><span class="bar" style="background: var(--brown)"></span>취득 절차</h2>
          ${placeholder()}
        </div>
        <dl class="meta">
          ${renderMetaRow("비용", detail.cost || "문의")}
          ${renderMetaRow("문의", detail.contact || SITE.email)}
        </dl>
      </section>
      <section class="actions">
        <a class="btn-primary nb nb-press" href="${escapeHtml(mailHref())}">이메일 문의하기</a>
        <button class="btn-ghost" type="button" data-navigate="#/c/license">&larr; 자격증 목록</button>
      </section>
    </div>
  `);
}

function renderFigure(item, height = "") {
  const heightStyle = height ? `; height: ${escapeHtml(height)}` : "";

  return `
    <div class="figure nb" style="${itemVars(item)}${heightStyle}">
      <span class="figure-bar"></span>
      <img src="${escapeHtml(item.img)}" alt="${escapeHtml(item.title)}" loading="lazy">
    </div>
  `;
}

function renderMetaRow(label, value) {
  return `
    <div class="meta-row">
      <dt>${escapeHtml(label)}</dt>
      <dd>${escapeHtml(value || UI_TEXT.ready)}</dd>
    </div>
  `;
}

function renderSchedule(schedule) {
  if (!Array.isArray(schedule) || !schedule.length) {
    return `<p class="time-inquiry">시간 문의</p>`;
  }

  return `
    <div class="sched-grid">
      ${schedule.map((item) => `
        <span class="sched-chip">
          <strong class="sched-day">${escapeHtml(item.day)}</strong>
          <span class="sched-time">${escapeHtml(item.time)}</span>
        </span>
      `).join("")}
    </div>
  `;
}

function renderListButton(catId) {
  const label = catId === "license" ? "자격증 목록" : "수업 목록";
  const target = catId === "license" ? "#/c/license" : "#/c/class";

  return `
    <section class="actions">
      <button class="btn-ghost" type="button" data-navigate="${target}">&larr; ${escapeHtml(label)}</button>
    </section>
  `;
}
