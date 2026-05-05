import { StatusOrUndo } from "./orderStatus";
// this file provides type-safe mapping between backend order status values and ui labels

// backend -> ui mapping
export const statusMap: Record<StatusOrUndo, string> = {
  draft: "DRAFT",
  in_progress: "IN PROGRESS",
  ready_to_serve: "READY TO SERVE",
  completed: "COMPLETED",
  canceled: "CANCELED",
  undo: "UNDO LAST ACTION",
};

//reverse mapping
export const statusReverseMap: Record<string, StatusOrUndo> = {
  DRAFT: "draft",
  "IN PROGRESS": "in_progress",
  "READY TO SERVE": "ready_to_serve",
  COMPLETED: "completed",
  CANCELED: "canceled",
  "UNDO LAST ACTION": "undo",
};
