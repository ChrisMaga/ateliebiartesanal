const mobileBtn = document.querySelector(".btn-mobile");

const navLinks = document.getElementById("nav-links");
const icon = document.querySelector(".btn-mobile i");

mobileBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
  icon.classList.toggle("fa-times");
  icon.classList.toggle("fa-bars");
});

// section 2
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".carousel");
  const btnPrev = document.querySelector(".nav-btn.prev");
  const btnNext = document.querySelector(".nav-btn.next");
  const dots = document.querySelectorAll(".dot");

  // Tamanho do card + gap (aproximado para o cálculo)
  // Se o card tem 140px e o gap é 1rem (16px) = 156px
  const cardWidth = 156;

  // Função das setas
  btnPrev.addEventListener("click", () => {
    carousel.scrollBy({ left: -cardWidth, behavior: "smooth" });
  });

  btnNext.addEventListener("click", () => {
    carousel.scrollBy({ left: cardWidth, behavior: "smooth" });
  });

  // Função para atualizar as bolinhas ao rolar (scroll spy)
  carousel.addEventListener("scroll", () => {
    const scrollLeft = carousel.scrollLeft;
    // Calcula o índice baseado na rolagem
    const index = Math.round(scrollLeft / cardWidth);

    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  });
});

// botão de back to top
const backToTopButton = document.querySelector("#backToTop");

window.addEventListener("scroll", () => {
  // Se a rolagem passar de 300px, mostra o botão
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
});

// Ação de clique para voltar ao topo suavemente
backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
