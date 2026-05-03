// backend-safe statuses (match DB constraint)
export type DbOrderStatus =
  | "in_progress"
  | "ready_to_serve"
  | "completed"
  | "canceled";

// frontend-only status (used before saving)
export type DraftStatus = "draft";

// full union for UI/state
export type OrderStatus = DraftStatus | DbOrderStatus;
