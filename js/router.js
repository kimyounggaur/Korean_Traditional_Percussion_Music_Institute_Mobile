"use strict";

function parseHash() {
  const hash = window.location.hash || "#/";
  const cleaned = hash.replace(/^#\/?/, "").replace(/\/+$/, "");
  const segments = cleaned ? cleaned.split("/").filter(Boolean) : [];

  if (!segments.length) {
    return { route: "home", catId: "", itemId: "" };
  }

  if (segments[0] === "c") {
    return {
      route: "category",
      catId: segments[1] || "",
      itemId: segments[2] || ""
    };
  }

  return { route: "not-found", catId: "", itemId: "" };
}

function navigate(path = "#/") {
  const nextHash = path.startsWith("#") ? path : `#${path.startsWith("/") ? path : `/${path}`}`;
  if (window.location.hash === nextHash) {
    render();
    return;
  }
  window.location.hash = nextHash;
}

function resolveHeaderTitle(route) {
  if (route.route === "home") {
    return "";
  }

  const category = findCategory(route.catId);
  if (!category) {
    return UI_TEXT.home;
  }

  if (!route.itemId) {
    return category.title;
  }

  const item = findSubItem(route.catId, route.itemId);
  return item ? item.title : category.title;
}

function updateHeader(route) {
  const isHome = route.route === "home";
  const backButton = document.getElementById("backButton");
  const headerLogo = document.getElementById("headerLogo");
  const headerTitle = document.getElementById("headerTitle");

  backButton.hidden = isHome;
  headerLogo.hidden = !isHome;
  headerTitle.hidden = isHome;
  headerTitle.textContent = resolveHeaderTitle(route);
}

function render() {
  const route = parseHash();

  if (route.route === "not-found") {
    navigate("#/");
    return;
  }

  if (route.route === "home") {
    updateHeader(route);
    renderHome();
    window.scrollTo({ top: 0, left: 0 });
    return;
  }

  const category = findCategory(route.catId);
  if (!category) {
    navigate("#/");
    return;
  }

  updateHeader(route);

  if (!route.itemId) {
    if (category.type === "submenu") {
      renderSubmenu(route.catId);
    } else {
      renderContent(route.catId);
    }
  } else {
    renderDetail(route.catId, route.itemId);
  }

  window.scrollTo({ top: 0, left: 0 });
}

window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", () => {
  if (!window.location.hash) {
    window.location.hash = "#/";
    return;
  }
  render();
});

window.parseHash = parseHash;
window.navigate = navigate;
window.render = render;
