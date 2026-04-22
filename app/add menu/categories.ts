// adjusted into value-label pairs for backend values
export const categories = [
  { value: "coffee", label: "Coffee-Based" },
  { value: "non_coffee", label: "Non-Coffee" },
  { value: "pasta_burger", label: "Pasta & Burgers" },
  { value: "dessert_pastry", label: "Desserts & Pastries" },
];

// fast lookup for labels
export const categoryMap: Record<string, string> = Object.fromEntries(
  categories.map((c) => [c.value, c.label]),
);
