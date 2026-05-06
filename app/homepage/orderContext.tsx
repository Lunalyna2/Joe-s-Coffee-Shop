"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Order } from "../types";
import { getOrders } from "../lib/orderActions";
import {
  MarkInProgress,
  MarkReadyToServe,
  MarkCompleted,
  CancelOrder,
  OrderCommand,
} from "../lib/orderStatusCommands";
import { commandHistory } from "../lib/commandHistory";
import { StatusOrUndo, DbOrderStatus } from "../types/orderStatus";

function showToast(message: string) {
  alert(message); // placeholder for toast notification
}

interface OrdersContextType {
  orders: Order[];
  updateStatus: (order: Order, newStatus: StatusOrUndo) => Promise<void>;
  loadOrders: () => Promise<void>;
  undoStatus: (orderId: string) => Promise<void>;
  canUndo: (orderId: string) => boolean;
  clearOrders: () => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

interface OrdersProviderProps {
  children: React.ReactNode;
  userEmail: string; // new prop
}

// ordersprovider -- react context that centralizes order state, backend sync, and undoable status updates
export const OrdersProvider = ({
  children,
  userEmail,
}: OrdersProviderProps) => {
  const [orders, setOrders] = useState<Order[]>([]);

  //load orders from backend and initialize command history
  const loadOrders = async () => {
    const data = await getOrders();
    setOrders(data);
    data.forEach((order) => commandHistory.initialize(order.id));
  };

  //fetch orders on mount and hadnle cleanup
  useEffect(() => {
    let isMounted = true;
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        if (isMounted) {
          setOrders(data);
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };
    fetchOrders();
    return () => {
      isMounted = false;
    };
  }, []);
  //update order status or trigger undo
  const updateStatus = async (order: Order, newStatus: StatusOrUndo) => {
    if (newStatus === "undo") {
      await undoStatus(order.id);
      return;
    }

    let command: OrderCommand | null = null;
    switch (newStatus as DbOrderStatus) {
      case "in_progress":
        command = new MarkInProgress(order, userEmail); //create command
        break;
      case "ready_to_serve":
        command = new MarkReadyToServe(order, userEmail);
        break;
      case "completed":
        command = new MarkCompleted(order, userEmail);
        break;
      case "canceled":
        command = new CancelOrder(order, userEmail);
        break;
    }
    // run command via invoker, refresh ui state
    if (command) {
      await commandHistory.execute(command);
      await loadOrders();
    }
  };

  //undo last status change for an order
  const undoStatus = async (orderId: string) => {
    const success = await commandHistory.undo(orderId);
    if (!success) {
      const order = orders.find((o) => o.id === orderId);
      if (order?.status === "in_progress") {
        showToast("No previous action to undo for this order.");
      }
    } else {
      await loadOrders();
    }
  };
  //check if undo is available for an order
  const canUndo = (orderId: string) => commandHistory.canUndo(orderId);
  //clear orders from local state
  const clearOrders = () => {
    setOrders([]);
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        updateStatus,
        loadOrders,
        undoStatus,
        canUndo,
        clearOrders,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) throw new Error("useOrders must be used within OrdersProvider");
  return context;
};
