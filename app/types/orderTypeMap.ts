import { OrderTypeFilter } from ".";

//mapping utility that links backend ordertype values with ui labels & vice versa

// backend -> UI mapping
export const ORDER_TYPE_MAP: Record<OrderTypeFilter, string> = {
  dine_in: "DINE IN",
  take_out: "TAKE OUT",
  ALL: "ALL ORDERS",
};

// ui -> backend (reverse mapping)
export const ORDER_TYPE_REVERSE_MAP: Record<string, "dine_in" | "take_out"> = {
  "DINE IN": "dine_in",
  "TAKE OUT": "take_out",
};
