// --- MENU MOBILE ---
const mobileBtn = document.querySelector(".btn-mobile");
const navLinks = document.getElementById("nav-links");
const links = document.querySelectorAll("#nav-links li a");
const icon = document.querySelector(".btn-mobile i");

mobileBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
  icon.classList.toggle("fa-times");
  icon.classList.toggle("fa-bars");
});

// Fechar menu ao clicar nos links
links.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-times");
  });
});

// --- SEÇÃO 2: CARROSSEL COM FOCO CENTRAL ---
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".carousel");
  if (window.innerWidth > 768) {
    carousel.scrollLeft = 0;
  }
  const group = document.querySelector(".group");

  const cloneBefore = group.innerHTML;
  group.insertAdjacentHTML("afterbegin", cloneBefore);
  group.insertAdjacentHTML("beforeend", cloneBefore);

  carousel.scrollLeft = carousel.offsetWidth;

  const btnPrev = document.querySelector(".nav-btn.prev");
  const btnNext = document.querySelector(".nav-btn.next");
  const dots = document.querySelectorAll(".dot");

  const getStepWidth = () => {
    const card = document.querySelector(".card");
    const gap = 20;
    return card.offsetWidth + gap;
  };

  // FUNÇÃO PRÓXIMO (Setas)
  btnNext.addEventListener("click", () => {
    const step = getStepWidth();
    // Se estiver no fim, volta ao início suavemente
    if (
      carousel.scrollLeft + carousel.offsetWidth >=
      carousel.scrollWidth - 10
    ) {
      carousel.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      carousel.scrollBy({ left: step, behavior: "smooth" });
    }
  });

  // FUNÇÃO ANTERIOR (Setas)
  btnPrev.addEventListener("click", () => {
    const step = getStepWidth();
    // Se estiver no início, vai para o fim suavemente
    if (carousel.scrollLeft <= 10) {
      carousel.scrollTo({ left: carousel.scrollWidth, behavior: "smooth" });
    } else {
      carousel.scrollBy({ left: -step, behavior: "smooth" });
    }
  });

  // --- LOOP INFINITO PARA ARRASTO MANUAL (TOUCH) ---
  carousel.addEventListener("scroll", () => {
    const scrollLeft = carousel.scrollLeft;
    const step = getStepWidth();
    const index = Math.round(scrollLeft / step);

    // Atualiza as bolinhas
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });

    // Lógica para o toque: se o usuário arrastar até o fim, ele "reseta" para o início
    // (Opcional: você pode deixar o comportamento padrão de "bater no muro" no touch
    // se preferir, mas para o loop infinito total, usamos a lógica abaixo)
    if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth) {
      // Pequeno delay para não interromper o movimento do dedo
      setTimeout(() => {
        if (
          carousel.scrollLeft + carousel.offsetWidth >=
          carousel.scrollWidth
        ) {
          carousel.scrollTo({ left: 1 }); // Volta quase ao zero para permitir novo scroll
        }
      }, 500);
    }
  });
});

// --- BOTÃO BACK TO TOP ---
const backToTopButton = document.querySelector("#backToTop");

window.addEventListener("scroll", () => {
  // Mostra o botão após 300px de scroll
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
});

// Volta ao topo suavemente
backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// --- CARROSSEL DE DIFERENCIAIS ---
document.addEventListener("DOMContentLoaded", () => {
  const carouselDiff = document.querySelector(".container-diff");
  const btnPrevDiff = document.querySelector(".prev-diff");
  const btnNextDiff = document.querySelector(".next-diff");

  const getStepDiff = () => {
    const cardDiff = document.querySelector(".diff");
    const gap = 20;
    return cardDiff.offsetWidth + gap;
  };

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
