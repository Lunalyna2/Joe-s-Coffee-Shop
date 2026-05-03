import { Category } from "../types";
// adjusted into value-label pairs for backend values
export const categories: { value: Category; label: string }[] = [
  { value: "coffee", label: "COFFEE-BASED" },
  { value: "non_coffee", label: "NON-COFFEE" },
  { value: "pasta_burger", label: "PASTA & BURGERS" },
  { value: "dessert_pastry", label: "DESSERTS & PASTRIES" },
];

// fast lookup for labels
export const categoryMap: Record<Category, string> = {
  coffee: "COFFEE-BASED",
  non_coffee: "NON-COFFEE",
  pasta_burger: "PASTA & BURGERS",
  dessert_pastry: "DESSERTS & PASTRIES",
};
