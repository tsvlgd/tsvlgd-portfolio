"use strict";

/* ---------- Utility ---------- */
const toggleActive = (el) => el.classList.toggle("active");

/* ---------- Sidebar ---------- */
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", () => toggleActive(sidebar));
}

/* ---------- Testimonials Modal ---------- */
const testimonialsItems = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const toggleTestimonialsModal = () => {
  modalContainer?.classList.toggle("active");
  overlay?.classList.toggle("active");
};

testimonialsItems.forEach(item => {
  item.addEventListener("click", () => {
    modalImg.src = item.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = item.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = item.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = item.querySelector("[data-testimonials-text]").innerHTML;
    toggleTestimonialsModal();
  });
});

modalCloseBtn?.addEventListener("click", toggleTestimonialsModal);
overlay?.addEventListener("click", toggleTestimonialsModal);

/* ---------- Portfolio Filter ---------- */
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

select?.addEventListener("click", () => toggleActive(select));

const filterProjects = (value) => {
  filterItems.forEach(item => {
    const match = value === "all" || item.dataset.category === value;
    item.classList.toggle("active", match);
  });
};

selectItems.forEach(item => {
  item.addEventListener("click", () => {
    const value = item.innerText.toLowerCase();
    selectValue.innerText = item.innerText;
    toggleActive(select);
    filterProjects(value);
  });
});

let lastFilterBtn = filterBtns[0];
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.innerText.toLowerCase();
    selectValue.innerText = btn.innerText;
    filterProjects(value);

    lastFilterBtn?.classList.remove("active");
    btn.classList.add("active");
    lastFilterBtn = btn;
  });
});

/* ---------- Contact Form ---------- */
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach(input => {
  input.addEventListener("input", () => {
    form?.checkValidity()
      ? formBtn?.removeAttribute("disabled")
      : formBtn?.setAttribute("disabled", "");
  });
});

/* ---------- PAGE NAVIGATION (FIXED) ---------- */
const navLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    const targetPage = link.innerText.toLowerCase();

    pages.forEach(page => {
      page.classList.toggle("active", page.dataset.page === targetPage);
    });

    navLinks.forEach(l =>
      l.classList.toggle("active", l === link)
    );

    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
