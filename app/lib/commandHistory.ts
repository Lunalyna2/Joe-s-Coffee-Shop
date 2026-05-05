import { OrderCommand } from "./orderStatusCommands";

export class CommandHistory {
  // map: stack of commands per order ID
  private stack: Map<string, OrderCommand[]> = new Map();

  // initialize stack for an order (called when orders are loaded)
  initialize(orderId: string) {
    if (!this.stack.has(orderId)) {
      this.stack.set(orderId, []);
    }
  }

  // run a command and push it onto the stack
  async execute(command: OrderCommand) {
    await command.execute();
    const entries = this.stack.get(command.order.id) ?? [];
    entries.push(command);
    this.stack.set(command.order.id, entries);
  }

  // undo the last command for a given order
  async undo(orderId: string): Promise<boolean> {
    const entries = this.stack.get(orderId);
    if (!entries || entries.length === 0) return false;

    const command = entries.pop()!;
    await command.undo();
    this.stack.set(orderId, entries);
    return true;
  }

  // check if undo is possible
  canUndo(orderId: string): boolean {
    const entries = this.stack.get(orderId);
    return !!entries && entries.length > 0;
  }
}

// export a singleton so history persists across remounts
export const commandHistory = new CommandHistory();
