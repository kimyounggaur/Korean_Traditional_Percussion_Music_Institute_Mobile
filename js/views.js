"use strict";

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function phoneHref(phone = SITE.phone) {
  const normalized = String(phone || SITE.phone).replace(/[^\d+]/g, "");
  return `tel:${normalized}`;
}

function findCategory(catId) {
  return CATEGORIES.find((category) => category.id === catId);
}

function findSubItem(catId, itemId) {
  return (SUBMENUS[catId] || []).find((item) => item.id === itemId);
}

function listParagraphs(paragraphs) {
  const safeParagraphs = Array.isArray(paragraphs) && paragraphs.length ? paragraphs : [UI_TEXT.ready];
  return safeParagraphs
    .map((paragraph) => `<p>${escapeHtml(paragraph || UI_TEXT.ready)}</p>`)
    .join("");
}

function emptyState(message = UI_TEXT.ready) {
  return `
    <div class="empty-state" role="status">
      <img src="${escapeHtml(SITE.logoSquare)}" alt="" aria-hidden="true" loading="lazy">
      <p>${escapeHtml(message)}</p>
    </div>
  `;
}

function setView(markup) {
  const view = document.getElementById("view");
  view.innerHTML = `<div class="view-enter">${markup}</div>`;
}

function pageLead(title, description = "") {
  return `
    <section class="page-lead">
      <p class="eyebrow">${escapeHtml(SITE.name)}</p>
      <h1>${escapeHtml(title)}</h1>
      ${description ? `<p class="lead-copy">${escapeHtml(description)}</p>` : ""}
    </section>
  `;
}

function renderHome() {
  const cards = CATEGORIES.map((category, index) => `
    <button class="cat-card accent-${(index % 4) + 1}" type="button" data-navigate="#/c/${escapeHtml(category.id)}">
      <span class="card-image-wrap">
        <img src="${escapeHtml(category.icon)}" alt="${escapeHtml(category.title)} 아이콘" loading="lazy">
      </span>
      <span class="card-title">${escapeHtml(category.title)}</span>
    </button>
  `).join("");

  setView(`
    <section class="home-hero" aria-labelledby="home-title">
      <img class="home-mark" src="${escapeHtml(SITE.logoSquare)}" alt="" aria-hidden="true" loading="lazy">
      <h1 id="home-title" class="home-title">${escapeHtml(SITE.name)}</h1>
      <p class="home-subtitle">${escapeHtml(SITE.nameEn)}</p>
    </section>
    <nav class="grid-2 home-grid" aria-label="주요 메뉴">
      ${cards}
    </nav>
  `);
}

function renderSubmenu(catId) {
  const category = findCategory(catId);
  const items = SUBMENUS[catId] || [];
  const cards = items.map((item, index) => `
    <button class="sub-card accent-${(index % 4) + 1}" type="button" data-navigate="#/c/${escapeHtml(catId)}/${escapeHtml(item.id)}">
      <span class="sub-image-wrap">
        <img src="${escapeHtml(item.image || item.icon)}" alt="${escapeHtml(item.title)} 일러스트" loading="lazy">
      </span>
      <span class="sub-title">${escapeHtml(item.title)}</span>
    </button>
  `).join("");

  setView(`
    ${pageLead(category?.title || UI_TEXT.ready)}
    <nav class="grid-2 submenu-grid" aria-label="${escapeHtml(category?.title || UI_TEXT.ready)} 종목">
      ${cards || emptyState()}
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

  if (catId === "performance") {
    renderPerformance();
    return;
  }

  if (catId === "history") {
    renderHistory();
    return;
  }

  setView(`${pageLead(UI_TEXT.unavailable)}${emptyState()}`);
}

function renderIntro() {
  const content = CONTENT.intro || {};
  setView(`
    ${pageLead(content.title || "예술원 소개")}
    <section class="content-panel intro-panel">
      <img class="content-symbol" src="${escapeHtml(content.image || SITE.logoSquare)}" alt="${escapeHtml(SITE.name)} 상징" loading="lazy">
      <div class="prose">${listParagraphs(content.paragraphs)}</div>
    </section>
    ${renderContentActions()}
  `);
}

function renderGreeting() {
  const content = CONTENT.greeting || {};
  setView(`
    ${pageLead(content.title || "원장 인사말")}
    <section class="content-panel greeting-panel">
      <img class="portrait" src="${escapeHtml(content.photo || SITE.logoSquare)}" alt="원장 사진" loading="lazy">
      <div class="director-name">${escapeHtml(content.director || "○○○")}</div>
      <div class="prose">${listParagraphs(content.paragraphs)}</div>
      <p class="signature">원장 ${escapeHtml(content.director || "○○○")}</p>
    </section>
    ${renderContentActions()}
  `);
}

function renderPerformance() {
  const content = CONTENT.performance || {};
  const items = Array.isArray(content.items) ? content.items : [];
  const cards = items.map((item) => `
    <article class="list-card">
      <h2>${escapeHtml(item.title || UI_TEXT.ready)}</h2>
      <dl class="meta-list compact">
        <div><dt>일자</dt><dd>${escapeHtml(item.date || UI_TEXT.ready)}</dd></div>
        <div><dt>장소</dt><dd>${escapeHtml(item.place || UI_TEXT.ready)}</dd></div>
      </dl>
      <p>${escapeHtml(item.description || UI_TEXT.ready)}</p>
    </article>
  `).join("");

  setView(`
    ${pageLead(content.title || "공연 소개")}
    <section class="list-stack">
      ${cards || emptyState(UI_TEXT.performanceReady)}
    </section>
    ${renderContentActions()}
  `);
}

function renderHistory() {
  const content = CONTENT.history || {};
  const items = Array.isArray(content.items) ? content.items : [];
  const timeline = items.map((item) => `
    <article class="timeline-item">
      <time>${escapeHtml(item.year || "")}</time>
      <p>${escapeHtml(item.description || item.content || UI_TEXT.ready)}</p>
    </article>
  `).join("");

  setView(`
    ${pageLead(content.title || "예술원 연혁")}
    <section class="timeline" aria-label="연혁">
      ${timeline || emptyState(UI_TEXT.historyReady)}
    </section>
    ${renderContentActions()}
  `);
}

function renderContentActions() {
  return `
    <section class="page-actions">
      <p>${escapeHtml(UI_TEXT.contact)}: <a href="${phoneHref()}">${escapeHtml(SITE.phone)}</a></p>
      <button class="secondary-button" type="button" data-navigate="#/">${escapeHtml(UI_TEXT.goHome)}</button>
    </section>
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

  setView(`${pageLead(UI_TEXT.unavailable)}${emptyState()}${renderListButton(catId)}`);
}

function renderClassDetail(itemId) {
  const item = findSubItem("class", itemId);
  const detail = CLASS_DETAIL[itemId];

  if (!detail) {
    setView(`${pageLead(item?.title || UI_TEXT.unavailable)}${emptyState()}${renderListButton("class")}`);
    return;
  }

  const labels = [
    ["일시", detail["일시"]],
    ["시간", detail["시간"]],
    ["장소", detail["장소"]],
    ["준비물", detail["준비물"]],
    ["인원", detail["인원"]],
    ["수강료", detail["수강료"]],
    ["문의", detail["문의"]]
  ];

  setView(`
    ${pageLead(detail.title || item?.title || "수업 상세", detail["한줄소개"])}
    <section class="poster-card">
      <img class="poster-figure" src="${escapeHtml(detail["이미지"] || item?.image || SITE.logoSquare)}" alt="${escapeHtml(detail.title || item?.title || "수업")} 일러스트" loading="lazy">
      <div class="info-block">
        <h2>${escapeHtml(UI_TEXT.classInfo)}</h2>
        <dl class="meta-list">
          ${labels.map(([label, value]) => `
            <div>
              <dt>${escapeHtml(label)}</dt>
              <dd>${escapeHtml(value || UI_TEXT.ready)}</dd>
            </div>
          `).join("")}
        </dl>
      </div>
      <div class="schedule-block">
        <h2>${escapeHtml(UI_TEXT.schedule)}</h2>
        ${renderSchedule(detail.schedule)}
        ${detail.note ? `<p class="note">${escapeHtml(detail.note)}</p>` : ""}
      </div>
    </section>
    <section class="detail-actions">
      <a class="primary-button" href="${phoneHref(detail["문의"])}">${escapeHtml(UI_TEXT.phoneCall)}</a>
      <button class="secondary-button" type="button" data-navigate="#/c/class">← ${escapeHtml(UI_TEXT.classList)}</button>
    </section>
  `);
}

function renderSchedule(schedule) {
  if (!Array.isArray(schedule) || !schedule.length) {
    return `<p class="time-inquiry">${escapeHtml(UI_TEXT.timeInquiry)}</p>`;
  }

  return `
    <div class="schedule-grid">
      ${schedule.map((item) => `
        <span class="schedule-chip">
          <strong>${escapeHtml(item.day)}</strong>
          <span>${escapeHtml(item.time)}</span>
        </span>
      `).join("")}
    </div>
  `;
}

function renderLicenseDetail(itemId) {
  const item = findSubItem("license", itemId);
  const detail = LICENSE_DETAIL[itemId];

  if (!detail) {
    setView(`${pageLead(item?.title || UI_TEXT.unavailable)}${emptyState()}${renderListButton("license")}`);
    return;
  }

  const courses = Array.isArray(detail["과정"]) ? detail["과정"] : [];
  const steps = Array.isArray(detail["취득절차"]) ? detail["취득절차"] : [];

  setView(`
    ${pageLead(detail["자격명"] || `${detail.title || item?.title || ""} 지도자 자격증`)}
    <section class="license-card">
      <img class="license-icon" src="${escapeHtml(detail["이미지"] || item?.icon || SITE.logoSquare)}" alt="${escapeHtml(detail.title || item?.title || "자격증")} 아이콘" loading="lazy">

      <div class="info-block">
        <h2>${escapeHtml(UI_TEXT.course)}</h2>
        ${courses.length ? `
          <div class="step-grid">
            ${courses.map((course) => `<span>${escapeHtml(course)}</span>`).join("")}
          </div>
        ` : emptyState()}
      </div>

      <div class="info-block">
        <h2>${escapeHtml(UI_TEXT.requirement)}</h2>
        <p class="text-line">${escapeHtml(detail["응시자격"] || UI_TEXT.ready)}</p>
      </div>

      <div class="info-block">
        <h2>${escapeHtml(UI_TEXT.licenseProcess)}</h2>
        ${steps.length ? `
          <ol class="process-list">
            ${steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
          </ol>
        ` : emptyState()}
      </div>

      <dl class="meta-list">
        <div><dt>${escapeHtml(UI_TEXT.cost)}</dt><dd>${escapeHtml(detail["비용"] || UI_TEXT.ready)}</dd></div>
        <div><dt>${escapeHtml(UI_TEXT.contact)}</dt><dd>${escapeHtml(detail["문의"] || SITE.phone)}</dd></div>
      </dl>
    </section>
    <section class="detail-actions">
      <a class="primary-button" href="${phoneHref(detail["문의"])}">${escapeHtml(UI_TEXT.phoneCall)}</a>
      <button class="secondary-button" type="button" data-navigate="#/c/license">← ${escapeHtml(UI_TEXT.licenseList)}</button>
    </section>
  `);
}

function renderListButton(catId) {
  const label = catId === "license" ? UI_TEXT.licenseList : UI_TEXT.classList;
  const target = catId === "license" ? "#/c/license" : "#/c/class";
  return `
    <section class="detail-actions">
      <button class="secondary-button" type="button" data-navigate="${target}">← ${escapeHtml(label)}</button>
    </section>
  `;
}
