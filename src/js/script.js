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
  const group = document.querySelector(".group");
  const dots = document.querySelectorAll(".dot");
  const btnPrev = document.querySelector(".nav-btn.prev");
  const btnNext = document.querySelector(".nav-btn.next");

  // Clonagem apenas uma vez para o loop
  const clone = group.innerHTML;
  group.insertAdjacentHTML("afterbegin", clone);
  group.insertAdjacentHTML("beforeend", clone);

  // Salva o primeiro card para evitar querySelector repetitivo
  const firstCard = document.querySelector(".card");
  const getStepWidth = () => firstCard.offsetWidth + 20;

  // Posiciona no meio inicialmente
  carousel.scrollLeft = carousel.offsetWidth;

  // Atualização das bolinhas com Performance (requestAnimationFrame)
  let ticking = false;
  carousel.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const step = getStepWidth();
          const index = Math.round(carousel.scrollLeft / step) % dots.length;

          dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
          });
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true },
  );

  // Navegação Setas
  btnNext.addEventListener("click", () => {
    const step = getStepWidth();
    carousel.scrollBy({ left: step, behavior: "smooth" });
  });

  btnPrev.addEventListener("click", () => {
    const step = getStepWidth();
    carousel.scrollBy({ left: -step, behavior: "smooth" });
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
