(function () {
  let toastTimer;

  function resetCopyMode() {
    delete document.documentElement.dataset.copyMode;
  }

  function legacyCopyText(text) {
    resetCopyMode();
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);
    const copied = document.execCommand("copy");
    textarea.remove();
    return copied;
  }

  function selectCopyFallback(text) {
    let textarea = document.getElementById("manualCopyBuffer");
    if (!textarea) {
      textarea = document.createElement("textarea");
      textarea.id = "manualCopyBuffer";
      textarea.setAttribute("readonly", "");
      textarea.setAttribute("aria-label", "手动复制 Prompt");
      textarea.style.position = "fixed";
      textarea.style.left = "16px";
      textarea.style.bottom = "16px";
      textarea.style.zIndex = "120";
      textarea.style.width = "min(420px, calc(100vw - 32px))";
      textarea.style.height = "92px";
      textarea.style.border = "1px solid #285940";
      textarea.style.borderRadius = "6px";
      textarea.style.background = "#f4fff8";
      textarea.style.color = "#183d2b";
      textarea.style.padding = "10px";
      textarea.style.fontSize = "12px";
      textarea.style.boxShadow = "0 14px 40px rgba(24, 61, 43, 0.2)";
      document.body.appendChild(textarea);
    }
    textarea.value = text;
    textarea.hidden = false;
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);
    document.documentElement.dataset.copyMode = "manual";
    window.setTimeout(() => {
      if (document.activeElement !== textarea) textarea.hidden = true;
    }, 6000);
  }

  async function copyText(text) {
    if (legacyCopyText(text)) return;
    if (navigator.clipboard && window.isSecureContext) {
      try {
        resetCopyMode();
        await navigator.clipboard.writeText(text);
        return;
      } catch (error) {
        selectCopyFallback(text);
        return;
      }
    }
    selectCopyFallback(text);
  }

  function showToast(message) {
    const toast = document.getElementById("copyToast");
    if (!toast) return;
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("show");
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 1800);
  }

  function playCopyBurst(button) {
    if (!button || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = button.getBoundingClientRect();
    const compact = window.matchMedia("(max-width: 620px)").matches;
    const count = compact ? 8 : 12;
    const distance = compact ? 34 : 48;
    const burst = document.createElement("span");
    burst.className = "copy-particle-burst";
    burst.setAttribute("aria-hidden", "true");
    burst.style.left = `${rect.left + rect.width / 2}px`;
    burst.style.top = `${rect.top + rect.height / 2}px`;

    Array.from({ length: count }).forEach((_, index) => {
      const angle = (Math.PI * 2 * index) / count - Math.PI / 2;
      const edgeX = Math.cos(angle) * (rect.width / 2);
      const edgeY = Math.sin(angle) * (rect.height / 2);
      const travel = distance + (index % 3) * 9;
      const particle = document.createElement("span");
      particle.style.setProperty("--start-x", `${edgeX}px`);
      particle.style.setProperty("--start-y", `${edgeY}px`);
      particle.style.setProperty("--end-x", `${edgeX + Math.cos(angle) * travel}px`);
      particle.style.setProperty("--end-y", `${edgeY + Math.sin(angle) * travel}px`);
      particle.style.setProperty("--size", `${compact ? 4 : 5 + (index % 2)}px`);
      particle.style.setProperty("--delay", `${index * 12}ms`);
      particle.style.setProperty("--hue", `${132 + index * 11}`);
      burst.appendChild(particle);
    });

    document.body.appendChild(burst);
    window.setTimeout(() => burst.remove(), 760);
  }

  function createFilters(container, labels, onChange) {
    let active = "全部";
    labels.forEach((label) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `filter-button${label === active ? " active" : ""}`;
      button.textContent = label;
      button.setAttribute("aria-pressed", label === active ? "true" : "false");
      button.addEventListener("click", () => {
        active = label;
        container.querySelectorAll(".filter-button").forEach((item) => {
          const selected = item === button;
          item.classList.toggle("active", selected);
          item.setAttribute("aria-pressed", selected ? "true" : "false");
        });
        onChange(active);
      });
      container.appendChild(button);
    });
  }

  function normalize(value) {
    return value.toLocaleLowerCase("zh-CN").replace(/\s+/g, "");
  }

  function setCopyState(button, label) {
    const original = button.textContent;
    const manual = document.documentElement.dataset.copyMode === "manual";
    document.documentElement.dataset.lastCopied = label;
    button.classList.add("copied");
    button.textContent = manual ? "已选中" : "已复制";
    playCopyBurst(button);
    showToast(manual ? `${label} Prompt 已选中，请按 ⌘C 复制` : `${label} Prompt 已复制`);
    window.setTimeout(() => {
      button.classList.remove("copied");
      button.textContent = original;
    }, 1400);
  }

  window.TasteGallery = {
    copyText,
    createFilters,
    normalize,
    setCopyState,
    showToast
  };
})();
