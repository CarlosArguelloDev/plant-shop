import { useState } from 'react';

/**
 * ProductCard — renders one product tile.
 *
 * Replaces: each static `<!-- Product N -->` block in index.html
 *           + the querySelectorAll('.product-action') wishlist toggle in main.js.
 *
 * Props:
 *   product     — object from the Flask API (id, name, price, category, image, care, badge, badgeType, originalPrice)
 *   onAddToCart — callback that increments the global cart counter (lives in App.jsx via useState)
 */
export default function ProductCard({ product, onAddToCart }) {
  const [wished, setWished] = useState(false);

  const handleWish = () => {
    const next = !wished;
    setWished(next);
    // Toast is owned by App; could lift this up later if needed.
  };

  return (
    <div className="product-card animate-up visible" data-category={product.category}>
      <div className="product-img-wrap">
        <img
          src={`/images/${product.image}`}
          alt={product.name}
          loading="lazy"
        />

        {product.badge && product.badgeType === 'new' && (
          <span className="product-badge-new">{product.badge}</span>
        )}
        {product.badge && product.badgeType === 'sale' && (
          <span className="product-badge-sale">{product.badge}</span>
        )}

        <button
          className="product-action"
          aria-label="Favorito"
          title="Agregar a favoritos"
          onClick={handleWish}
        >
          {wished ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="product-info">
        <div className="product-category">{product.categoryLabel || product.category}</div>
        <div className="product-name">{product.name}</div>
        <div className="product-care">{product.care}</div>
        <div className="product-footer">
          <div className="product-price">
            {product.originalPrice && (
              <span className="original">${product.originalPrice}</span>
            )}
            ${product.price}
          </div>
          <button
            className="add-btn"
            aria-label="Agregar al carrito"
            onClick={onAddToCart}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
