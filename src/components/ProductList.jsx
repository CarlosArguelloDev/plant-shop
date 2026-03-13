import { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import ProductCard from './ProductCard';

/**
 * ProductList — owns the filter bar and the product grid.
 *
 * Replaces:
 *   - The 7 static `<!-- Product N -->` blocks in index.html
 *   - `filterBtns.forEach` event-listener loop in main.js
 *   - `productCards.forEach` show/hide animation loop in main.js
 *
 * State:
 *   products      — fetched from Flask via api.js (empty while loading)
 *   activeFilter  — which category pill is selected ("all" | "interior" | "suculenta" | "tropical" | "helecho")
 *   loading       — true while the fetch is in-flight
 *   error         — error message string, or null
 *
 * The component gracefully degrades when Flask is offline (shows an error notice).
 */
export default function ProductList({ onAddToCart }) {
  const [products, setProducts]     = useState([]);
  const [activeFilter, setFilter]   = useState('all');
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);

  // ── Fetch products from Flask on mount ────────────────────────
  useEffect(() => {
    setLoading(true);
    setError(null);

    getProducts()
      .then(data => setProducts(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // ── Filter helpers ────────────────────────────────────────────
  const filters = [
    { key: 'all',      label: 'Todos' },
    { key: 'interior', label: 'Interior' },
    { key: 'suculenta',label: 'Suculentas' },
    { key: 'tropical', label: 'Tropicales' },
    { key: 'helecho',  label: 'Helechos' },
  ];

  const visible = activeFilter === 'all'
    ? products
    : products.filter(p => p.category === activeFilter);

  // ── Render ────────────────────────────────────────────────────
  return (
    <section className="products" id="plantas">
      <div className="container">
        <div className="section-header animate-up visible">
          <div className="tag">🌿 Colección</div>
          <h2 className="section-title">Plantas para cada estilo</h2>
          <p className="section-desc">
            Desde suculentas de bajo mantenimiento hasta exuberantes tropicales, encuentra la planta ideal para ti.
          </p>
        </div>

        {/* Filter bar — replaces filterBtns DOM loop from main.js */}
        <div className="products-filter animate-up visible">
          {filters.map(f => (
            <button
              key={f.key}
              className={`filter-btn${activeFilter === f.key ? ' active' : ''}`}
              data-filter={f.key}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Loading state */}
        {loading && (
          <p style={{ textAlign: 'center', color: 'var(--gray-400)', padding: '48px 0' }}>
            Cargando plantas…
          </p>
        )}

        {/* Error state */}
        {!loading && error && (
          <div style={{
            textAlign: 'center', padding: '48px 0',
            color: 'var(--gray-600)', background: 'var(--green-50)',
            borderRadius: 'var(--radius-md)', border: '1px solid var(--green-100)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🌿</div>
            <p style={{ fontWeight: 600 }}>No pudimos cargar las plantas.</p>
            <p style={{ fontSize: '.9rem', marginTop: '8px', color: 'var(--gray-400)' }}>
              Asegúrate de que el servidor Flask esté corriendo en <code>http://localhost:5000</code>.
            </p>
          </div>
        )}

        {/* Product grid — replaces static HTML product cards */}
        {!loading && !error && (
          <div className="products-grid" id="productsGrid">
            {visible.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
            {visible.length === 0 && (
              <p style={{ gridColumn: '1/-1', textAlign: 'center', color: 'var(--gray-400)', padding: '32px 0' }}>
                No hay plantas en esta categoría.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
