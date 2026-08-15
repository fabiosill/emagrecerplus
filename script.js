/* ============ Configurações ============ */
const CHECKOUT_URLS = {
  kit1: "#",
  kit2: "#",
  kit3: "#",
  kit6: "#"
};

// Deixe vazio para esconder o contador. Ex: "2026-12-31T23:59:59"
const PROMOTION_END_DATE = "";

/* ============ Menu mobile ============ */
(function menu() {
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  if (!burger || !nav) return;

  burger.addEventListener("click", function () {
    const open = nav.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    });
  });
})();

/* ============ FAQ (acordeão) ============ */
(function faq() {
  const items = document.querySelectorAll("#faq-list .faq__item");
  items.forEach(function (item) {
    const btn = item.querySelector(".faq__q");
    const answer = item.querySelector(".faq__a");
    btn.addEventListener("click", function () {
      const isOpen = item.classList.contains("is-open");
      items.forEach(function (other) {
        other.classList.remove("is-open");
        other.querySelector(".faq__a").style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("is-open");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
})();

/* ============ Checkout ============ */
(function checkout() {
  document.querySelectorAll("[data-checkout]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const url = CHECKOUT_URLS[btn.getAttribute("data-checkout")];
      if (!url || url === "#") {
        alert("Link de checkout ainda não configurado. Edite CHECKOUT_URLS no script.js.");
        return;
      }
      window.open(url, "_blank", "noopener");
    });
  });
})();

/* ============ Contador promocional ============ */
(function countdown() {
  const box = document.getElementById("countdown");
  if (!box || !PROMOTION_END_DATE) return;
  const end = new Date(PROMOTION_END_DATE).getTime();
  if (isNaN(end)) return;

  const el = {
    d: document.getElementById("cd-d"),
    h: document.getElementById("cd-h"),
    m: document.getElementById("cd-m"),
    s: document.getElementById("cd-s")
  };
  const pad = function (n) { return String(n).padStart(2, "0"); };

  function tick() {
    const diff = end - Date.now();
    if (diff <= 0) { box.hidden = true; clearInterval(timer); return; }
    const s = Math.floor(diff / 1000);
    el.d.textContent = pad(Math.floor(s / 86400));
    el.h.textContent = pad(Math.floor((s % 86400) / 3600));
    el.m.textContent = pad(Math.floor((s % 3600) / 60));
    el.s.textContent = pad(s % 60);
  }
  box.hidden = false;
  tick();
  const timer = setInterval(tick, 1000);
})();

/* ============ Scroll (header + voltar ao topo) ============ */
(function scrollBehavior() {
  const header = document.getElementById("header");
  const toTop = document.getElementById("totop");

  window.addEventListener("scroll", function () {
    const y = window.scrollY;
    if (header) header.classList.toggle("is-scrolled", y > 10);
    if (toTop) toTop.classList.toggle("is-visible", y > 600);
  }, { passive: true });

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();

/* ============ Animações de entrada ============ */
(function reveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach(function (i) { i.classList.add("is-visible"); });
    return;
  }
  const obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(function (i) { obs.observe(i); });
})();

/* ============ Placeholders de imagem ============ */
(function imagePlaceholders() {
  const labels = {
    logo: "EMAGRECER+",
    produto: "IMAGEM DO PRODUTO",
    hero: "IMAGEM HERO",
    folha: "IMAGEM DO INGREDIENTE",
    avatar: "FOTO",
    foto: "IMAGEM REAL E AUTORIZADA"
  };
  document.querySelectorAll("img[data-fallback]").forEach(function (img) {
    img.addEventListener("error", function () {
      const kind = img.getAttribute("data-fallback");
      const ph = document.createElement("div");
      ph.className = "ph" + (kind === "avatar" ? " ph--round" : "") + (kind === "logo" ? " ph--logo" : "");
      ph.textContent = kind === "avatar" ? "★" : (labels[kind] || "IMAGEM");
      ph.setAttribute("role", "img");
      ph.setAttribute("aria-label", img.alt || "Imagem");
      if (img.parentNode) img.parentNode.replaceChild(ph, img);
    });
  });
})();
