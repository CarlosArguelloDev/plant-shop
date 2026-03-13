import { useState, useEffect, useRef } from 'react';
import ProductList from './components/ProductList';

/**
 * App.jsx — root component.
 *
 * Replaces ALL vanilla JS logic from main.js:
 *
 *  | main.js code                              | React equivalent                        |
 *  |-------------------------------------------|-----------------------------------------|
 *  | `let cartCount` + DOM mutation            | useState(cartCount)                     |
 *  | `showToast()` DOM function                | useState(toast) + useEffect for timeout |
 *  | `nav.classList.toggle('scrolled', …)`     | useState(scrolled) + scroll useEffect   |
 *  | hamburger classList.add/remove('open')    | useState(mobileMenuOpen)                |
 *  | `handleNewsletter()` form DOM hide        | useState(newsletterSubmitted)           |
 *  | DOMContentLoaded hero entrance animation  | useEffect → CSS class toggle            |
 *  | Wishlist toggle per card                  | Local state inside ProductCard.jsx      |
 *  | Filter buttons + show/hide cards          | State + filter logic inside ProductList |
 */
export default function App() {
  const [cartCount, setCartCount]             = useState(0);
  const [scrolled, setScrolled]               = useState(false);
  const [mobileOpen, setMobileOpen]           = useState(false);
  const [toast, setToast]                     = useState({ msg: '', visible: false });
  const [newsletterDone, setNewsletterDone]   = useState(false);
  const [heroVisible, setHeroVisible]         = useState(false);
  const toastTimer = useRef(null);

  // ── Sticky nav — replaces `window.addEventListener('scroll', …)` ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Hero entrance animation — replaces DOMContentLoaded block ──────
  useEffect(() => {
    const id = requestAnimationFrame(() => setTimeout(() => setHeroVisible(true), 80));
    return () => cancelAnimationFrame(id);
  }, []);

  // ── Close mobile menu on ESC ─────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // ── Toast helper — replaces showToast() DOM function ─────────────
  function showToast(msg) {
    clearTimeout(toastTimer.current);
    setToast({ msg, visible: true });
    toastTimer.current = setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000);
  }

  // ── Cart — replaces addToCart() + cartCountEl DOM mutation ───────
  function addToCart() {
    setCartCount(c => c + 1);
    showToast('🌿 Planta añadida al carrito');
  }

  // ── Newsletter — replaces handleNewsletter() form hide logic ─────
  function handleNewsletter(e) {
    e.preventDefault();
    setNewsletterDone(true);
    showToast('🎁 ¡Revisa tu correo para tu descuento!');
  }

  // ── Smooth scroll — native CSS `scroll-behavior: smooth` handles this ──

  return (
    <>
      {/* ── NAV ── */}
      <nav className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
        <div className="container nav-inner">
          <a href="#" className="nav-logo">
            <img src="/images/logo.png" alt="Lirio del Valle Logo" className="brand-logo" />
            Lirio del <span>Valle</span>
          </a>
          <ul className="nav-links">
            <li><a href="#plantas">Plantas</a></li>
            <li><a href="#nosotros">Nosotros</a></li>
            <li><a href="#cuidados">Cuidados</a></li>
            <li><a href="#blog">Blog</a></li>
          </ul>
          <div className="nav-actions">
            <button className="cart-btn" id="cartBtn" aria-label="Carrito de compras">
              🛍
              <span className="cart-count" id="cartCount">{cartCount}</span>
            </button>
            <a href="#plantas" className="btn btn-primary" style={{ padding: '10px 22px', fontSize: '.85rem' }}>
              Comprar ahora
            </a>
            <button className="hamburger" id="hamburger" aria-label="Menú" onClick={() => setMobileOpen(true)}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`} id="mobileMenu">
        <button className="close-menu" onClick={() => setMobileOpen(false)}>✕</button>
        <a href="#plantas"  onClick={() => setMobileOpen(false)}>Plantas</a>
        <a href="#nosotros" onClick={() => setMobileOpen(false)}>Nosotros</a>
        <a href="#cuidados" onClick={() => setMobileOpen(false)}>Cuidados</a>
        <a href="#blog"     onClick={() => setMobileOpen(false)}>Blog</a>
        <a href="#plantas"  className="btn btn-primary" onClick={() => setMobileOpen(false)}>Comprar ahora</a>
      </div>

      {/* ── HERO ── */}
      <section className="hero">
        <div
          className="container hero-content"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity .8s ease, transform .8s ease',
          }}
        >
          <div className="hero-eyebrow">
            <div className="eyebrow-line" />
            <span className="eyebrow-text">Colección Primavera 2026</span>
          </div>
          <h1 className="hero-title">
            Trae la<br />
            <em>naturaleza</em><br />
            a tu hogar
          </h1>
          <p className="hero-subtitle">
            Plantas seleccionadas a mano para cada rincón de tu espacio. Frescas, saludables y listas para crecer contigo.
          </p>
          <div className="hero-actions">
            <a href="#plantas" className="btn btn-primary">
              Explorar plantas <span>→</span>
            </a>
            <a href="#nosotros" className="btn btn-outline">Conoce más</a>
          </div>
          <div className="hero-stats">
            <div>
              <div className="stat-value">200+</div>
              <div className="stat-label">Especies únicas</div>
            </div>
            <div>
              <div className="stat-value">12k</div>
              <div className="stat-label">Clientes felices</div>
            </div>
            <div>
              <div className="stat-value">98%</div>
              <div className="stat-label">Satisfacción</div>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-img-wrap">
            <img src="/images/hero.png" alt="Colección de plantas de interior en macetas blancas" />
            <div className="hero-img-overlay" />
          </div>
        </div>
        <div className="hero-scroll" style={{ opacity: 1, animation: 'none' }}>
          <div className="hero-badge" style={{ position: 'static', animation: 'float 3s ease-in-out infinite', boxShadow: 'var(--shadow-sm)', padding: '12px 20px' }}>
            <div className="badge-icon" style={{ fontSize: '1.5rem' }}>🚚</div>
            <div className="badge-text" style={{ textAlign: 'left' }}>
              <strong>Envío gratis</strong>
              <span>en compras &gt; $499</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="features" id="nosotros">
        <div className="container">
          <div className="section-header animate-up visible">
            <div className="tag">✦ Por qué elegirnos</div>
            <h2 className="section-title">Diseñado para ti y tus plantas</h2>
            <p className="section-desc">
              Nos obsesionamos con cada detalle para que recibas una planta perfecta y la cuides con confianza.
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card animate-up visible">
              <div className="feature-icon">🌱</div>
              <h3>Selección Premium</h3>
              <p>Cada planta pasa por una revisión de calidad antes de llegar a ti. Solo enviamos ejemplares sanos, fuertes y llenos de vida.</p>
            </div>
            <div className="feature-card animate-up visible" style={{ transitionDelay: '.1s' }}>
              <div className="feature-icon">🪴</div>
              <h3>Macetas de Diseño</h3>
              <p>Combinamos plantas con macetas modernas y minimalistas para que luzcan perfectas en cualquier espacio de tu hogar u oficina.</p>
            </div>
            <div className="feature-card animate-up visible" style={{ transitionDelay: '.2s' }}>
              <div className="feature-icon">📚</div>
              <h3>Guía de Cuidados</h3>
              <p>Cada orden incluye una tarjeta personalizada con instrucciones detalladas de riego, luz y fertilización para tu planta.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── (fetches from Flask, owns filter state) */}
      <ProductList onAddToCart={addToCart} />

      {/* ── SEASONAL BANNER ── */}
      <section className="seasonal" id="cuidados">
        <div className="container seasonal-inner">
          <div>
            <div className="seasonal-tag">🌸 Oferta de Temporada</div>
            <h2 className="seasonal-title">Primavera en tu sala.<br />30% off en todo.</h2>
            <p className="seasonal-desc">
              Celebra la estación más vibrante con plantas que transforman cualquier espacio. Oferta válida del 20 al 31 de marzo de 2026.
            </p>
            <div className="seasonal-actions">
              <a href="#plantas" className="btn btn-ghost">Ver ofertas →</a>
              <a href="#newsletter" className="btn" style={{ background: 'rgba(255,255,255,.1)', color: '#fff', border: '1.5px solid rgba(255,255,255,.2)' }}>
                Recibir alertas
              </a>
            </div>
          </div>
          <div className="seasonal-visual">🌸</div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="testimonials" id="blog">
        <div className="container">
          <div className="section-header animate-up visible">
            <div className="tag">💬 Reseñas</div>
            <h2 className="section-title">Lo que dicen nuestros clientes</h2>
            <p className="section-desc">Más de 12,000 personas ya llenan sus hogares con vida. Aquí comparten su experiencia.</p>
          </div>
          <div className="testimonials-grid">
            {[
              { init: 'S', name: 'Sofía Ramírez',    tag: 'Compradora verificada · Ciudad de México', text: '"Mi Monstera llegó increíblemente sana y mucho más grande de lo que esperaba. El empaque fue perfecto y la guía de cuidados fue de gran ayuda para mí como principiante."' },
              { init: 'A', name: 'Andrés Morales',   tag: 'Comprador verificado · Guadalajara',        text: '"Llevo seis meses comprando aquí y cada planta ha superado mis expectativas. El servicio al cliente es excepcional y los envíos siempre son rápidos y seguros."' },
              { init: 'V', name: 'Valentina Cruz',   tag: 'Compradora verificada · Monterrey',         text: '"Transformé completamente mi departamento con plantas de Verdeflor. Las macetas son preciosas y combinan perfectamente con la decoración moderna de mi hogar."', delay: '.2s' },
            ].map((t, i) => (
              <div key={i} className="testimonial-card animate-up visible" style={t.delay ? { transitionDelay: t.delay } : {}}>
                <div className="stars">⭐⭐⭐⭐⭐</div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.init}</div>
                  <div>
                    <div className="author-name">{t.name}</div>
                    <div className="author-tag">{t.tag}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="newsletter" id="newsletter">
        <div className="container newsletter-inner">
          <div className="animate-up visible">
            <div className="tag">📧 Newsletter</div>
            <h2 className="newsletter-title">Plantas e inspiración directo a tu correo</h2>
            <p className="newsletter-desc">
              Únete a más de 8,000 amantes de las plantas. Recibe consejos de cuidado, descuentos exclusivos y novedades de la colección.
            </p>
          </div>
          <div className="animate-up visible" style={{ transitionDelay: '.1s' }}>
            {/* handleNewsletter replaces the form style.display DOM toggle in main.js */}
            {!newsletterDone ? (
              <form className="newsletter-form" onSubmit={handleNewsletter}>
                <div className="newsletter-input-wrap">
                  <input
                    type="email"
                    id="emailInput"
                    placeholder="tu@correo.com"
                    required
                    aria-label="Tu correo electrónico"
                  />
                  <button type="submit" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '.85rem' }}>
                    Suscribirme
                  </button>
                </div>
                <div className="newsletter-benefits">
                  <div className="benefit"><span className="benefit-icon">🎁</span><span>10% off en tu primera compra</span></div>
                  <div className="benefit"><span className="benefit-icon">🔒</span><span>Sin spam, te lo prometemos</span></div>
                </div>
              </form>
            ) : (
              <div style={{ marginTop: '16px', padding: '16px 20px', background: 'var(--green-50)', border: '1px solid var(--green-100)', borderRadius: '12px', color: 'var(--green-800)', fontSize: '.9rem', fontWeight: 500 }}>
                🌿 ¡Bienvenido/a a la familia Lirio del Valle! Tu 10% de descuento llegará en breve.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#" className="nav-logo">
                <img src="/images/logo.png" alt="Lirio del Valle Logo" className="brand-logo" />
                Lirio del <span>Valle</span>
              </a>
              <p>Llevamos naturaleza a tu hogar desde 2019. Cada planta cultivada con amor y enviada con cuidado.</p>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="Instagram">📸</a>
                <a href="#" className="social-link" aria-label="Pinterest">📌</a>
                <a href="#" className="social-link" aria-label="TikTok">🎵</a>
                <a href="#" className="social-link" aria-label="Facebook">👤</a>
              </div>
            </div>
            <div>
              <div className="footer-heading">Tienda</div>
              <ul className="footer-links">
                <li><a href="#plantas">Plantas de interior</a></li>
                <li><a href="#plantas">Plantas de exterior</a></li>
                <li><a href="#plantas">Suculentas</a></li>
                <li><a href="#plantas">Macetas &amp; Accesorios</a></li>
                <li><a href="#plantas">Kits regalo</a></li>
              </ul>
            </div>
            <div>
              <div className="footer-heading">Ayuda</div>
              <ul className="footer-links">
                <li><a href="#">Guía de cuidados</a></li>
                <li><a href="#">Envíos y entregas</a></li>
                <li><a href="#">Devoluciones</a></li>
                <li><a href="#">Preguntas frecuentes</a></li>
                <li><a href="#">Contacto</a></li>
              </ul>
            </div>
            <div>
              <div className="footer-heading">Contacto</div>
              <ul className="footer-links">
                <li><a href="mailto:hola@verdeflor.mx">hola@verdeflor.mx</a></li>
                <li><a href="tel:+525512345678">+52 55 1234 5678</a></li>
                <li><a href="#">Ciudad de México, MX</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Lirio del Valle. Todos los derechos reservados.</p>
            <div className="footer-bottom-links">
              <a href="#">Privacidad</a>
              <a href="#">Términos</a>
              <a href="#">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── TOAST ── replaces the #toast div + showToast() in main.js */}
      <div id="toast" style={{
        position: 'fixed', bottom: '32px', right: '32px', zIndex: 999,
        background: 'var(--green-800)', color: '#fff',
        padding: '14px 22px', borderRadius: '12px',
        fontSize: '.9rem', fontWeight: 500,
        boxShadow: '0 8px 32px rgba(0,0,0,.2)',
        transform: toast.visible ? 'translateY(0)' : 'translateY(120px)',
        opacity: toast.visible ? 1 : 0,
        transition: 'all .4s cubic-bezier(.4,0,.2,1)',
        pointerEvents: 'none',
        display: 'flex', gap: '10px', alignItems: 'center',
      }}>
        {toast.msg}
      </div>
    </>
  );
}
