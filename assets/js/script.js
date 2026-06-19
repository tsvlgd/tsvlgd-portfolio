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

/* ---------- PORTFOLIO BORDER ANIMATION ---------- */
const projectItems = document.querySelectorAll('.project-item > a');
let borderAngle = 0;

function animateBorder() {
  borderAngle = (borderAngle + 2) % 360;
  projectItems.forEach(item => {
    item.style.setProperty('--angle', `${borderAngle}deg`);
  });
  requestAnimationFrame(animateBorder);
}

animateBorder();

/* ---------- THEME TOGGLE ---------- */
const themeBtn = document.getElementById("theme-toggle-btn");
const currentTheme = localStorage.getItem("theme") || "dark";

if (currentTheme === "light") {
  document.body.setAttribute("data-theme", "light");
}

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const isLight = document.body.getAttribute("data-theme") === "light";
    if (isLight) {
      document.body.removeAttribute("data-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  });
}

/* ---------- AVATAR FLIP ---------- */
const avatarBox = document.getElementById("avatar-flip-box");
if (avatarBox) {
  avatarBox.addEventListener("click", () => {
    avatarBox.classList.toggle("flipped");
  });
}

/* ---------- ACCORDION ---------- */
const accordionItems = document.querySelectorAll("[data-accordion]");
accordionItems.forEach(item => {
  const header = item.querySelector('.timeline-header');
  if (header) {
    header.addEventListener('click', () => {
      item.classList.toggle('active');
    });
  }
});

/* ---------- MOBILE DRAWER ---------- */
const mobileNavToggle = document.getElementById('mobile-nav-toggle');
const mobileDrawer = document.getElementById('mobile-drawer');
const mobileDrawerLinks = document.querySelectorAll('.mobile-drawer-link');

if (mobileNavToggle && mobileDrawer) {
  const toggleDrawer = () => {
    mobileNavToggle.classList.toggle('active');
    mobileDrawer.classList.toggle('active');
  };

  mobileNavToggle.addEventListener('click', toggleDrawer);

  mobileDrawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Keep syncing with main logic
      const targetPage = link.innerText.toLowerCase();
      pages.forEach(page => {
        page.classList.toggle("active", page.dataset.page === targetPage);
      });
      navLinks.forEach(l => l.classList.toggle("active", l.innerText.toLowerCase() === targetPage));
      mobileDrawerLinks.forEach(l => l.classList.toggle("active", l === link));
      
      toggleDrawer();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}

/* ---------- Quote Rotation ---------- */
const quotes = [
  { text: '"If the pain doesn\'t kill me, it will only make me stronger."', author: '— Sung Jin-Woo, Solo Leveling' },
  { text: '"Discipline is choosing what you want most over what you want now."', author: '— Abraham Lincoln' },
  { text: '"First deserve, then desire."', author: '— Unknown' },
  { text: '"Action cures fear."', author: '— David Schwartz' }
];

const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');

if (quoteText && quoteAuthor) {
  let currentQuoteIndex = 0;
  setInterval(() => {
    // Fade out
    quoteText.style.opacity = '0';
    quoteAuthor.style.opacity = '0';
    
    setTimeout(() => {
      // Update text
      currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
      quoteText.innerText = quotes[currentQuoteIndex].text;
      quoteAuthor.innerText = quotes[currentQuoteIndex].author;
      
      // Fade in
      quoteText.style.opacity = '1';
      quoteAuthor.style.opacity = '1';
    }, 400); // Wait for transition
  }, 6000); // Rotate every 6 seconds
}

/* ---------- Experience Accordion ---------- */
const workCards = document.querySelectorAll('.work-card');
if (workCards.length > 0) {
  workCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      if (window.innerWidth > 1024) {
        workCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      }
    });
    card.addEventListener('click', () => {
      if (window.innerWidth <= 1024) {
        workCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      }
    });
  });
}
