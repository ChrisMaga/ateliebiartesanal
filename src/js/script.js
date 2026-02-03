// --- SELEÇÃO DE ELEMENTOS (Cache) ---
const mobileBtn = document.querySelector(".btn-mobile");
const navLinks = document.getElementById("nav-links");
const links = document.querySelectorAll("#nav-links li a");
const icon = document.querySelector(".btn-mobile i");
const backToTopButton = document.querySelector("#backToTop");

// --- MENU MOBILE ---
mobileBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
  icon.classList.toggle("fa-times");
  icon.classList.toggle("fa-bars");
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-times");
  });
});

// --- CARROSSEL PRINCIPAL (SEÇÃO 2) ---
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".carousel");
  const dots = document.querySelectorAll(".dot");
  const btnPrev = document.querySelector(".nav-btn.prev");
  const btnNext = document.querySelector(".nav-btn.next");
  const firstCard = document.querySelector(".card");

  if (!carousel || !firstCard) return;

  let currentActiveIndex = 0; // DECLARAÇÃO QUE FALTA
  let ticking = false;

  const getStepWidth = () => firstCard.offsetWidth + 20;

  carousel.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const step = getStepWidth();
          if (step === 0) {
            ticking = false;
            return;
          }

          const index = Math.round(carousel.scrollLeft / step) % dots.length;

          if (currentActiveIndex !== index) {
            dots.forEach((dot, i) => {
              dot.classList.toggle("active", i === index);
            });
            currentActiveIndex = index;
          }
          ticking = false;
        });
        ticking = true; // Deve ficar aqui para bloquear novas chamadas até o frame rodar
      }
    },
    { passive: true },
  );

  btnNext.addEventListener("click", () => {
    carousel.scrollBy({ left: getStepWidth(), behavior: "smooth" });
  });

  btnPrev.addEventListener("click", () => {
    carousel.scrollBy({ left: -getStepWidth(), behavior: "smooth" });
  });
});

// --- BOTÃO BACK TO TOP (Otimizado) ---
window.addEventListener(
  "scroll",
  () => {
    // Usamos um método mais leve para checar a posição
    const scrollY = window.scrollY || window.pageYOffset;
    if (scrollY > 300) {
      if (!backToTopButton.classList.contains("show")) {
        backToTopButton.classList.add("show");
      }
    } else {
      backToTopButton.classList.remove("show");
    }
  },
  { passive: true },
);

backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// --- CARROSSEL DE DIFERENCIAIS ---
document.addEventListener("DOMContentLoaded", () => {
  const carouselDiff = document.querySelector(".container-diff");
  const btnPrevDiff = document.querySelector(".prev-diff");
  const btnNextDiff = document.querySelector(".next-diff");
  const firstDiff = document.querySelector(".diff");

  if (!carouselDiff || !firstDiff) return;

  const getStepDiff = () => firstDiff.offsetWidth + 20;

  btnNextDiff.addEventListener("click", () => {
    const step = getStepDiff();
    const maxScroll = carouselDiff.scrollWidth - carouselDiff.offsetWidth;
    if (carouselDiff.scrollLeft >= maxScroll - 10) {
      carouselDiff.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      carouselDiff.scrollBy({ left: step, behavior: "smooth" });
    }
  });

  btnPrevDiff.addEventListener("click", () => {
    const step = getStepDiff();
    if (carouselDiff.scrollLeft <= 10) {
      carouselDiff.scrollTo({
        left: carouselDiff.scrollWidth,
        behavior: "smooth",
      });
    } else {
      carouselDiff.scrollBy({ left: -step, behavior: "smooth" });
    }
  });
});
