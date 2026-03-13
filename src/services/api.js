/**
 * api.js — centralises all HTTP calls to the Flask backend.
 *
 * Replaces: nothing in the original build (products were hardcoded in HTML).
 * Adds:     a single fetch call to GET /products, reusable across any component.
 *
 * Expected response shape from Flask:
 * [
 *   {
 *     "id": 1,
 *     "name": "Monstera Deliciosa",
 *     "price": 349,
 *     "category": "tropical",       // "tropical" | "interior" | "suculenta" | "helecho"
 *     "image": "monstera.png",      // filename inside public/images/
 *     "care": "☀️ Luz indirecta · 💧 Semanal",
 *     "badge": "Nuevo",             // optional: "Nuevo" | "Popular" | "Exótica" | "-20%" | null
 *     "badgeType": "new",           // optional: "new" | "sale"
 *     "originalPrice": null         // optional: number (shows strikethrough)
 *   }
 * ]
 */

const BASE_URL = 'http://localhost:5000';

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error(`Error fetching products: ${res.status}`);
  return res.json();
}
