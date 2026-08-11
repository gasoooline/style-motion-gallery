(function () {
  const stage = document.getElementById("homeGalleryFrame");
  const links = Array.from(document.querySelectorAll(".home-rail-link"));
  const panels = Array.from(document.querySelectorAll("[data-home-preview-panel]"));
  if (!stage || !links.length || !panels.length) return;

  function setState(nextState) {
    stage.dataset.homeState = nextState;
    links.forEach((link) => {
      const active = link.dataset.homePreview === nextState;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    panels.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.homePreviewPanel === nextState));
  }

  links.forEach((link) => {
    const nextState = link.dataset.homePreview;
    link.addEventListener("pointerenter", () => setState(nextState));
    link.addEventListener("focus", () => setState(nextState));
  });

  stage.addEventListener("pointerleave", () => setState("styles"));
  stage.addEventListener("focusout", (event) => {
    if (!stage.contains(event.relatedTarget)) setState("styles");
  });

  setState(stage.dataset.homeState || "styles");
})();
