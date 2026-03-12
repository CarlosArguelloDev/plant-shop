/* ── Verdeflor Main JS ── */
'use strict';

// ── Cart ──────────────────────────────────────
let cartCount = 0;
const cartCountEl = document.getElementById('cartCount');

function addToCart() {
  cartCount++;
  cartCountEl.textContent = cartCount;
  cartCountEl.style.transform = 'scale(1.4)';
  setTimeout(() => { cartCountEl.style.transform = 'scale(1)'; }, 200);
  showToast('🌿 Planta añadida al carrito');
}

// ── Toast ─────────────────────────────────────
const toast = document.getElementById('toast');
let toastTimer;

function showToast(msg) {
  clearTimeout(toastTimer);
  toast.textContent = msg;
  toast.style.transform = 'translateY(0)';
  toast.style.opacity = '1';
  toastTimer = setTimeout(() => {
    toast.style.transform = 'translateY(120px)';
    toast.style.opacity = '0';
  }, 3000);
}

// ── Sticky Nav ────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Scroll Animations ─────────────────────────
const animEls = document.querySelectorAll('.animate-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

animEls.forEach(el => observer.observe(el));

// ── Mobile Menu ───────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu  = document.getElementById('closeMenu');

hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
closeMenu.addEventListener('click',  () => mobileMenu.classList.remove('open'));

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
}

// ── Product Filtering ─────────────────────────
const filterBtns    = document.querySelectorAll('.filter-btn');
const productCards  = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    productCards.forEach(card => {
      const cat = card.dataset.category;
      const match = filter === 'all' || cat === filter;
      card.style.transition = 'opacity .3s, transform .3s';

      if (match) {
        card.style.display = 'block';
        requestAnimationFrame(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        });
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(12px)';
        setTimeout(() => { card.style.display = 'none'; }, 300);
      }
    });
  });
});

// ── Wishlist Toggle ───────────────────────────
document.querySelectorAll('.product-action').forEach(btn => {
  btn.addEventListener('click', () => {
    const isWished = btn.textContent === '❤️';
    btn.textContent = isWished ? '🤍' : '❤️';
    if (!isWished) showToast('❤️ Agregado a tus favoritos');
  });
});

// ── Newsletter Form ───────────────────────────
function handleNewsletter(e) {
  e.preventDefault();
  const input   = document.getElementById('emailInput');
  const success = document.getElementById('newsletterSuccess');

  input.closest('form').style.display = 'none';
  success.style.display = 'block';
  showToast('🎁 ¡Revisa tu correo para tu descuento!');
}

// ── Hero entrance animations ──────────────────
document.addEventListener('DOMContentLoaded', () => {
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(32px)';
    heroContent.style.transition = 'opacity .8s ease, transform .8s ease';
    requestAnimationFrame(() => {
      setTimeout(() => {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
      }, 100);
    });
  }
});

// ── Smooth scroll polyfill for mobile ─────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
