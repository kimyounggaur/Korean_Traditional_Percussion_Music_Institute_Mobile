"use strict";

function renderFooter() {
  const footer = document.getElementById("appFooter");
  const parts = [
    escapeHtml(SITE.name),
    `<a href="${phoneHref()}">${escapeHtml(SITE.phone)}</a>`,
    escapeHtml(SITE.address || UI_TEXT.ready)
  ];

  footer.innerHTML = `
    <p>${parts.join(`<span>${escapeHtml(UI_TEXT.footerSeparator)}</span>`)}</p>
    <small>${escapeHtml(UI_TEXT.appInstallNote)}</small>
  `;
}

function bindGlobalEvents() {
  document.getElementById("backButton").addEventListener("click", () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }
    navigate("#/");
  });

  document.getElementById("homeButton").addEventListener("click", () => {
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
