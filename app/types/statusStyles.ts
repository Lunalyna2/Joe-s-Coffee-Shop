import { StatusOrUndo } from "./orderStatus";

//return css classes for styling order status labels and dropdowns
// covers all StatusOrUndo values including "undo"
export const getStatusStyle = (status: StatusOrUndo): string => {
  switch (status) {
    case "in_progress":
      return "bg-amber-100 text-amber-900 border-amber-300 shadow-amber-900/5";
    case "ready_to_serve":
      return "bg-emerald-100 text-emerald-900 border-emerald-400 shadow-emerald-900/10 animate-pulse-subtle";
    case "completed":
      return "bg-[#4B3832] text-[#DCC7AA] border-[#4B3832] opacity-80";
    case "canceled":
      return "bg-red-100 text-red-900 border-red-300 opacity-60";
    case "undo":
      // distinct styling for Undo option
      return "bg-gray-200 text-gray-700 border-gray-300 italic";
    default:
      // fallback for draft or unknown statuses
      return "bg-[#F5E6CA]/50 border-[#DCC7AA] text-[#4B3832]";
  }
};
