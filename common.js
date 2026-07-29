(function () {
  let toastTimer;

  function legacyCopyText(text) {
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

  async function copyText(text) {
    if (legacyCopyText(text)) return;
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
    throw new Error("Clipboard copy failed");
  }

  function showToast(message) {
    const toast = document.getElementById("copyToast");
    if (!toast) return;
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("show");
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 1800);
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
    document.documentElement.dataset.lastCopied = label;
    button.classList.add("copied");
    button.textContent = "已复制";
    showToast(`${label} Prompt 已复制`);
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
