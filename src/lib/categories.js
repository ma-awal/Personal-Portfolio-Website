// Project category. Admin dropdown ar public filter duitei ekhan theke.
export const CATEGORIES = ["Portfolio", "Ecommerce", "Landing Page"];

// Ager (Shopify/React) category er data thakle auto map hoy. Chena na gele "" (shudhu "All" e dekhay, admin e warning dekhay).
const MAP = {
  portfolio: "Portfolio",
  ecommerce: "Ecommerce", "e-commerce": "Ecommerce", shopify: "Ecommerce", woocommerce: "Ecommerce",
  landing: "Landing Page", "landing page": "Landing Page", "landing-page": "Landing Page", landingpage: "Landing Page",
};
export const normalizeCategory = (c) => MAP[String(c ?? "").trim().toLowerCase()] || "";
