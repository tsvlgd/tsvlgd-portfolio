(function () {
  const overlay = document.getElementById("cmd-palette-overlay");
  const input = document.getElementById("cmd-input");
  const allItems = document.querySelectorAll(".cmd-item");
  let selectedIdx = 0;

  function openPalette() {
    overlay.classList.add("active");
    input.value = "";
    filterItems("");
    input.focus();
    selectedIdx = 0;
    updateSelection();
  }

  function closePalette() {
    overlay.classList.remove("active");
    input.blur();
  }

  function filterItems(query) {
    const q = query.toLowerCase();
    allItems.forEach((item) => {
      const title = item.querySelector(".cmd-item-title")?.textContent.toLowerCase() || "";
      const desc = item.querySelector(".cmd-item-desc")?.textContent.toLowerCase() || "";
      item.style.display = title.includes(q) || desc.includes(q) ? "flex" : "none";
    });
    selectedIdx = 0;
    updateSelection();
  }

  function getVisibleItems() {
    return Array.from(allItems).filter((i) => i.style.display !== "none");
  }

  function updateSelection() {
    const visible = getVisibleItems();
    visible.forEach((item, i) => {
      item.classList.toggle("selected", i === selectedIdx);
    });
  }

  function executeItem(item) {
    if (item.dataset.nav) {
      const navLinks = document.querySelectorAll("[data-nav-link]");
      const pages = document.querySelectorAll("[data-page]");
      const target = item.dataset.nav;

      pages.forEach((p) => p.classList.toggle("active", p.dataset.page === target));
      navLinks.forEach((l) => l.classList.toggle("active", l.innerText.toLowerCase() === target));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (item.dataset.url) {
      window.open(item.dataset.url, "_blank");
    }
    closePalette();
  }

  // Ctrl+K / Cmd+K
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      overlay.classList.contains("active") ? closePalette() : openPalette();
    }
    if (e.key === "Escape") closePalette();
  });

  // Overlay click to close
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closePalette();
  });

  // Search button click
  const searchBtn = document.getElementById("navbar-search-btn");
  if (searchBtn) {
    searchBtn.addEventListener("click", openPalette);
  }

  // Input filtering
  input.addEventListener("input", () => filterItems(input.value));

  // Keyboard navigation
  input.addEventListener("keydown", (e) => {
    const visible = getVisibleItems();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      selectedIdx = (selectedIdx + 1) % visible.length;
      updateSelection();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      selectedIdx = (selectedIdx - 1 + visible.length) % visible.length;
      updateSelection();
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (visible[selectedIdx]) executeItem(visible[selectedIdx]);
    }
  });

  // Click on items
  allItems.forEach((item) => {
    item.addEventListener("click", () => executeItem(item));
  });
})();
