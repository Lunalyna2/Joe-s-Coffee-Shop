import { OrderStatus } from "./orderStatus";

// this file provides type-safe mapping between backend order status values and ui labels

// backend -> ui mapping
export const statusMap: Record<OrderStatus, string> = {
  draft: "DRAFT",
  in_progress: "IN PROGRESS",
  ready_to_serve: "READY TO SERVE",
  completed: "COMPLETED",
  canceled: "CANCELED",
};

//reverse mapping
export const statusReverseMap: Record<string, OrderStatus> = {
  DRAFT: "draft",
  "IN PROGRESS": "in_progress",
  "READY TO SERVE": "ready_to_serve",
  COMPLETED: "completed",
  CANCELED: "canceled",
};
