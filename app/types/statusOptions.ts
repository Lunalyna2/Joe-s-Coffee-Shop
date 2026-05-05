import { StatusOrUndo } from "./orderStatus";

// standardized status options for dropdowns
export const STATUS_OPTIONS: StatusOrUndo[] = [
  "in_progress",
  "ready_to_serve",
  "completed",
  "canceled",
  "undo", // always last
];
