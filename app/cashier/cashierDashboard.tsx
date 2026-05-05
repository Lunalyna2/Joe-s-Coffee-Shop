"use client";

import { useState, useEffect } from "react";
import DashboardClient from "../homepage/dashBoardClient";
import OrderDetailsModal from "../receiptmodal/orderDetailsModal";
import { getMenuItems } from "../lib/menuActions";
import { placeOrder, recordTransaction } from "../lib/orderActions";
import {
  MenuItem,
  Order,
  OrderTypeFilter,
  Transaction,
  PaymentInfo,
} from "../types";
import { useOrders } from "../homepage/orderContext";
import { OrdersProvider } from "../homepage/orderContext";
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
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<MenuItemWithQuantity[]>([]);

  // useOrders gives us orders + updateStatus + loadOrders
  const { orders, updateStatus, loadOrders } = useOrders();

  // fetch menu on mount
  useEffect(() => {
    let isMounted = true;
    async function fetchMenu() {
      try {
        const menu = await getMenuItems();
        if (isMounted) {
          setMenuItems(menu.map((m) => ({ ...m, quantity: 0 })));
        }
      } catch (err) {
        console.error("Error loading menu:", err);
      }
    }
    fetchMenu();
    return () => {
      isMounted = false;
    };
  }, []);

  // update quantity of menu item in cart
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

  // remove item from cart
  const removeItem = (id: string) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: 0 } : item)),
    );
    setCartItems((prevCart) => prevCart.filter((c) => c.id !== id));
  };

  // place order
  const handlePlaceOrder = async (
    customerName: string,
    type: string,
    cookingRequest?: string,
    payment?: PaymentInfo,
  ): Promise<Order> => {
    const items = cartItems.filter((i) => i.quantity > 0);
    const normalizedType =
      type.toLowerCase().replace(" ", "_") === "dine_in"
        ? "dine_in"
        : "take_out";

    const newOrder = await placeOrder({
      customer_name: customerName || "GUEST",
      order_type: normalizedType,
      status: "in_progress",
      items,
      cooking_request: cookingRequest,
      payment,
    });

    await loadOrders();
    setSelectedOrderId(null);
    setIsSidebarOpen(false);
    setCartItems([]);
    setMenuItems((prev) => prev.map((item) => ({ ...item, quantity: 0 })));

    return newOrder;
  };

  // exit order sidebar
  const handleExitOrder = async () => {
    if (!selectedOrderId || selectedOrderId === "new") {
      setIsSidebarOpen(false);
      setSelectedOrderId(null);
      setCartItems([]);
      setMenuItems((prev) => prev.map((item) => ({ ...item, quantity: 0 })));
      return;
    }
    setIsSidebarOpen(false);
    setSelectedOrderId(null);
    setMenuItems((prev) => prev.map((item) => ({ ...item, quantity: 0 })));
  };

  // record transaction
  const handleRecordTransaction = async (tx: Transaction) => {
    await recordTransaction(tx);
    await loadOrders();
  };

  // reset menu items
  const onResetMenuItems = () => {
    setMenuItems((prev) => prev.map((item) => ({ ...item, quantity: 0 })));
    setCartItems([]);
  };

  return (
    <main className="flex h-screen w-full overflow-hidden bg-white">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <DashboardClient
            menuItems={menuItems}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
            orders={orders.filter(
              (o) => o.status !== "completed" && o.status !== "canceled",
            )}
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

      {/* sidebar for order details */}
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
