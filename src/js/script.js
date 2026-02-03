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

// --- CARROSSEL PRINCIPAL COM INTERSECTION OBSERVER ---
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".carousel");
  const dots = document.querySelectorAll(".dot");
  const cards = document.querySelectorAll(".card");
  const btnPrev = document.querySelector(".nav-btn.prev");
  const btnNext = document.querySelector(".nav-btn.next");

  if (!carousel || cards.length === 0) return;

  // Função para atualizar as bolinhas conforme o card visível
  const observerOptions = {
    root: carousel,
    threshold: 0.6, // Ativa quando 60% do card estiver visível
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Descobre o índice do card que entrou na tela
        const index = Array.from(cards).indexOf(entry.target);

        // Atualiza as bolinhas
        dots.forEach((dot, i) => {
          dot.classList.toggle("active", i === index);
        });
      }
    });
  }, observerOptions);

  cards.forEach((card) => observer.observe(card));

  // Lógica dos Botões (Simples scroll lateral)
  const getStep = () => cards[0].offsetWidth + 20;

  btnNext.addEventListener("click", () => {
    carousel.scrollBy({ left: getStep(), behavior: "smooth" });
  });

  btnPrev.addEventListener("click", () => {
    carousel.scrollBy({ left: -getStep(), behavior: "smooth" });
  });
});

// --- BOTÃO BACK TO TOP ---
window.addEventListener(
  "scroll",
  () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  },
  { passive: true },
);

backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// --- CARROSSEL DE DIFERENCIAIS (Lógica de loop mantida) ---
document.addEventListener("DOMContentLoaded", () => {
  const carouselDiff = document.querySelector(".container-diff");
  const btnPrevDiff = document.querySelector(".prev-diff");
  const btnNextDiff = document.querySelector(".next-diff");
  const firstDiff = document.querySelector(".diff");

  if (!carouselDiff || !firstDiff) return;

  const getStepDiff = () => firstDiff.offsetWidth + 20;

  btnNextDiff.addEventListener("click", () => {
    const maxScroll = carouselDiff.scrollWidth - carouselDiff.offsetWidth;
    if (carouselDiff.scrollLeft >= maxScroll - 10) {
      carouselDiff.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      carouselDiff.scrollBy({ left: getStepDiff(), behavior: "smooth" });
    }
  });

  btnPrevDiff.addEventListener("click", () => {
    if (carouselDiff.scrollLeft <= 10) {
      carouselDiff.scrollTo({
        left: carouselDiff.scrollWidth,
        behavior: "smooth",
      });
    } else {
      carouselDiff.scrollBy({ left: -getStepDiff(), behavior: "smooth" });
    }
  });
});
