import { Order } from "../types";
import { DbOrderStatus } from "../types/orderStatus";
import { updateOrderStatus } from "./orderActions";

export interface OrderCommand {
  order: Order;
  actor: string;
  prevStatus: DbOrderStatus;
  execute(): Promise<void>;
  undo(): Promise<void>;
}

// base class: captures previous status dynamically
abstract class BaseOrderCommand implements OrderCommand {
  order: Order;
  actor: string;
  prevStatus: DbOrderStatus;

  // constructor: initializes order, actor, and stores the current status
  constructor(order: Order, actor: string) {
    this.order = order;
    this.actor = actor;
    this.prevStatus = order.status as DbOrderStatus;
  }

  //abstract method: must be implemented by subclasses to perform a status update
  abstract execute(): Promise<void>;

  // undo method: reverts order status back to prevStatus and syncs with backend
  async undo(): Promise<void> {
    // backend-safe undo
    await updateOrderStatus(this.order.id, this.prevStatus, this.actor);
    this.order.status = this.prevStatus; // keep local state in sync
  }
}

// concrete commands for each status
export class MarkInProgress extends BaseOrderCommand {
  async execute() {
    await updateOrderStatus(this.order.id, "in_progress", this.actor);
    this.order.status = "in_progress";
  }
}

export class MarkReadyToServe extends BaseOrderCommand {
  async execute() {
    await updateOrderStatus(this.order.id, "ready_to_serve", this.actor);
    this.order.status = "ready_to_serve";
  }
}

export class MarkCompleted extends BaseOrderCommand {
  async execute() {
    await updateOrderStatus(this.order.id, "completed", this.actor);
    this.order.status = "completed";
  }
}

export class CancelOrder extends BaseOrderCommand {
  async execute() {
    await updateOrderStatus(this.order.id, "canceled", this.actor);
    this.order.status = "canceled";
  }
}
