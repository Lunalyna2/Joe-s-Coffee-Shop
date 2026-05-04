"use client";

import { useState, useEffect } from "react";
import DashboardClient from "../homepage/dashBoardClient";
import OrderDetailsModal from "../receiptmodal/orderDetailsModal";
import { getMenuItems } from "../lib/menuActions";
import {
  placeOrder,
  getOrders,
  updateOrderStatus,
  recordTransaction,
} from "../lib/orderActions";
import { MenuItem, Order, OrderTypeFilter, Transaction, PaymentInfo } from "../types";
import { OrderStatus } from "../types/orderStatus";
import { ORDER_TYPE_MAP } from "../types/orderTypeMap";

// extend MenuItem for UI selection
interface MenuItemWithQuantity extends MenuItem {
  quantity: number;
}
export default function CashierDashboard({
  userEmail,
}: {
  userEmail?: string;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [orderFilter, setOrderFilter] = useState<OrderTypeFilter>("dine_in");
  const [menuItems, setMenuItems] = useState<MenuItemWithQuantity[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<MenuItemWithQuantity[]>([]);

  //load menu and orders from backend
  async function loadDashboardData() {
    try {
      const menu = await getMenuItems();
      const ordersData = await getOrders();
      setMenuItems(menu.map((m) => ({ ...m, quantity: 0 }))); // add UI-only quantity
      setOrders(ordersData);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    }
  }
  //fetch menu and orders on mount
  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const menu = await getMenuItems();
        const ordersData = await getOrders();

        if (isMounted) {
          setMenuItems(menu.map((m) => ({ ...m, quantity: 0 })));
          setOrders(ordersData);
        }
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  // update quantity of menu item in order
  const updateQuantity = (id: string, amount: number) => {
    setMenuItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(0, item.quantity + amount);
          if (newQty > 0) {
            setIsSidebarOpen(true);
            setCartItems((prevCart) => {
              const updated = [...prevCart];
              const existing = updated.find((c) => c.id === id);
              if (existing) {
                existing.quantity = newQty;
              } else {
                updated.push({ ...item, quantity: newQty });
              }
              return updated;
            });
          } else {
            setCartItems((prevCart) => prevCart.filter((c) => c.id !== id));
          }
          return { ...item, quantity: newQty };
        }
        return item;
      }),
    );
  };
  //remove item from cart
  const removeItem = (id: string) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: 0 } : item)),
    );
    setCartItems((prevCart) => prevCart.filter((c) => c.id !== id));
  };

  // handle placing order, reset menu quantities and open sidebar
  const handlePlaceOrder = async (
    customerName: string,
    type: string,
    cookingRequest?: string,
    payment?: PaymentInfo
  ): Promise<Order> => {
    const items = cartItems.filter((i) => i.quantity > 0);
    const normalizedType =
      type.toLowerCase().replace(" ", "_") === "dine_in"
        ? "dine_in"
        : "take_out";

    const newOrder = await placeOrder({
      customer_name: customerName || "GUEST",
      order_type: normalizedType,
      status: "in_progress", //  backend-safe lowercase
      items,
      cooking_request: cookingRequest,
      payment, //added payment info to order placement
    });

    await loadDashboardData();
    setSelectedOrderId(null);
    setIsSidebarOpen(false);
    setCartItems([]);
    setMenuItems((prev) => prev.map((item) => ({ ...item, quantity: 0 })));

    return newOrder; //  return so DashboardClient can use newOrder.id
  };

  // Update order status via backend
  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    await updateOrderStatus(
      orderId,
      newStatus.toLowerCase() as OrderStatus,
      userEmail || "system",
    );
    await loadDashboardData();
    setIsSidebarOpen(false);
    setSelectedOrderId(null);
  };

  const handleExitOrder = async () => {
    // case 1: draft cart (no real order yet)
    if (!selectedOrderId || selectedOrderId === "new") {
      setIsSidebarOpen(false);
      setSelectedOrderId(null);
      setCartItems([]); //  clear cart safely
      setMenuItems((prev) => prev.map((item) => ({ ...item, quantity: 0 })));
      return;
    }
    // case 2: real order (valid id) -- close sidebar
    setIsSidebarOpen(false);
    setSelectedOrderId(null);
    setMenuItems((prev) => prev.map((item) => ({ ...item, quantity: 0 })));
  };

  // record transaction
  const handleRecordTransaction = async (tx: Transaction) => {
    await recordTransaction(tx);
    await loadDashboardData();
  };
  //reset menuitems and clear cart
  const onResetMenuItems = () => {
    setMenuItems((prev) => prev.map((item) => ({ ...item, quantity: 0 })));
    setCartItems([]);
  };

  return (
    <main className="flex h-screen w-full overflow-hidden bg-white">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {/*dashboard header with user email and filter options*/}
          <DashboardClient
            menuItems={menuItems}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
            orders={orders.filter(
              (o) => o.status !== "completed" && o.status !== "canceled",
            )}
            updateOrderStatus={handleUpdateStatus}
            orderFilter={orderFilter}
            setOrderFilter={setOrderFilter}
            onMenuUpdate={setMenuItems}
            onRecordTransaction={handleRecordTransaction}
            onPlaceOrder={handlePlaceOrder}
            setSelectedOrderId={setSelectedOrderId}
            setIsSidebarOpen={setIsSidebarOpen}
            isSidebarOpen={isSidebarOpen}
            selectedOrderId={selectedOrderId}
            onExitOrder={handleExitOrder}
            onResetMenuItems={onResetMenuItems}
          />
        </div>
      </div>
      {/*sidebar for order details and placing order*/}
      {isSidebarOpen && (
        <aside className="w-100 h-full shrink-0 border-l border-gray-100 bg-[#B5B5B5] z-40">
          <OrderDetailsModal
            orderId={selectedOrderId}
            orderItems={cartItems}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
            onPlaceOrder={handlePlaceOrder}
            onClose={handleExitOrder}
            onResetMenuItems={onResetMenuItems}
          />
        </aside>
      )}
    </main>
  );
}
