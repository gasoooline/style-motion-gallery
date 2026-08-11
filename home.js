(function () {
  const frame = document.getElementById("homeGalleryFrame");
  const stage = frame ? frame.closest(".home-stage") || frame : null;
  const links = Array.from(document.querySelectorAll(".home-rail-link"));
  const panels = Array.from(document.querySelectorAll("[data-home-preview-panel]"));
  if (!frame || !stage || !links.length || !panels.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let loopTimer = null;
  let coverStep = 0;
  let looping = false;

  function setState(nextState) {
    frame.dataset.homeState = nextState;
    links.forEach((link) => {
      const active = link.dataset.homePreview === nextState;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    panels.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.homePreviewPanel === nextState));
    coverStep = 0;
    updateCoverflow();
    if (looping) restartLoop();
  }

  function getActivePanel() {
    return panels.find((panel) => panel.classList.contains("is-active")) || panels[0];
  }

  function updateCoverflow() {
    const panel = getActivePanel();
    if (!panel) return;
    const cards = Array.from(panel.querySelectorAll("[data-cover-card]"));
    if (!cards.length) return;

    const order = [coverStep % 3, (coverStep + 1) % 3, (coverStep + 2) % 3];
    cards.forEach((card) => {
      card.classList.remove("is-left", "is-center", "is-right");
      const index = Number(card.dataset.coverCard);
      const slot = order.indexOf(index);
      if (slot === 0) card.classList.add("is-center");
      else if (slot === 1) card.classList.add("is-right");
      else card.classList.add("is-left");
    });
    panel.dataset.coverStep = String(coverStep);
  }

  function stopLoop() {
    if (loopTimer) {
      window.clearInterval(loopTimer);
      loopTimer = null;
    }
  }

  function restartLoop() {
    stopLoop();
    if (reduceMotion.matches || !looping) return;
    loopTimer = window.setInterval(() => {
      coverStep = (coverStep + 1) % 3;
      updateCoverflow();
    }, 1050);
  }

  reduceMotion.addEventListener("change", () => {
    coverStep = 0;
    updateCoverflow();
    restartLoop();
  });

  links.forEach((link) => {
    const nextState = link.dataset.homePreview;
    link.addEventListener("pointerenter", () => {
      looping = true;
      setState(nextState);
    });
    link.addEventListener("focus", () => {
      looping = true;
      setState(nextState);
    });
  });

  stage.addEventListener("pointerleave", () => {
    looping = false;
    stopLoop();
    setState("styles");
  });
  stage.addEventListener("focusout", (event) => {
    if (!stage.contains(event.relatedTarget)) {
      looping = false;
      stopLoop();
      setState("styles");
    }
  });

  setState(frame.dataset.homeState || "styles");
})();
