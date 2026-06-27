"use strict";

function renderFooter() {
  const footer = document.getElementById("appFooter");
  if (!footer) {
    return;
  }

  footer.innerHTML = `
    <div class="appfooter-brand">
      <span class="d"></span>
      <p>${escapeHtml(SITE.name)}</p>
    </div>
    <div class="appfooter-info">
      <p class="appfooter-addr">${escapeHtml(SITE.address)}</p>
      <p class="appfooter-meta"><b>교통편</b> · ${escapeHtml(SITE.transit)}</p>
      <p class="appfooter-meta"><b>문의</b> · <a href="${escapeHtml(mailHref())}">${escapeHtml(SITE.email)}</a></p>
    </div>
    <div class="social">
      <a href="${escapeHtml(SITE.youtube)}" target="_blank" rel="noopener">
        <span class="dot" style="background: var(--red)"></span>YouTube
      </a>
      <a href="${escapeHtml(SITE.band)}" target="_blank" rel="noopener">
        <span class="dot" style="background: var(--green)"></span>네이버밴드
      </a>
    </div>
    <p class="appfooter-en">${escapeHtml(SITE.nameEn)}</p>
  `;
}

function bindGlobalEvents() {
  const backButton = document.getElementById("backButton");
  const homeButton = document.getElementById("homeButton");

  backButton?.addEventListener("click", () => {
    const route = parseHash();
    if (route.itemId) {
      navigate(`#/c/${route.catId}`);
      return;
    }
    navigate("#/");
  });

  homeButton?.addEventListener("click", () => {
    navigate("#/");
  });

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-navigate]");
    if (!trigger) {
      return;
    }

    event.preventDefault();
    navigate(trigger.dataset.navigate);
  });
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  if (!["http:", "https:"].includes(window.location.protocol)) {
    return;
  }

  navigator.serviceWorker.register("sw.js").catch(() => {});
}

window.addEventListener("DOMContentLoaded", () => {
  renderFooter();
  bindGlobalEvents();
  registerServiceWorker();
});
