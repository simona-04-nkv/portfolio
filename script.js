// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

if (menuBtn && menu) {
  menuBtn.addEventListener("click", () => {
    menu.classList.toggle("open");
  });

  document.addEventListener("click", (e) => {
    const clickedInside = menu.contains(e.target) || menuBtn.contains(e.target);
    if (!clickedInside) menu.classList.remove("open");
  });
}

// Copy email
const copyEmailBtn = document.getElementById("copyEmailBtn");
if (copyEmailBtn) {
  copyEmailBtn.addEventListener("click", async () => {
    const email = copyEmailBtn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      copyEmailBtn.textContent = "Copied!";
      setTimeout(() => (copyEmailBtn.textContent = "Copy email"), 1200);
    } catch {
      alert("Could not copy. Please copy manually: " + email);
    }
  });
}

// Animated counters
const counters = document.querySelectorAll("[data-count]");
if (counters.length) {
  const animate = (el) => {
    const target = Number(el.dataset.count);
    let current = 0;
    const step = Math.max(1, Math.floor(target / 40));

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = current;
      }
    }, 20);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((c) => observer.observe(c));
}
