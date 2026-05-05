import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import OrderDetailsModal from "../app/receiptmodal/orderDetailsModal";
import { MenuItemWithQuantity, OrderType, PaymentInfo, Order } from "../app/types";

const meta: Meta<typeof OrderDetailsModal> = {
  title: "Checkout/OrderDetailsModal",
  component: OrderDetailsModal,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onClose: { action: "closed" },
    onPlaceOrder: { action: "order placed" },
    onResetMenuItems: { action: "reset menu items" },
  },
};

export default meta;
type Story = StoryObj<typeof OrderDetailsModal>;

export const Default: Story = {
  render: (args) => {
    const [items, setItems] = useState<MenuItemWithQuantity[]>([
      { id: "1", name: "Spanish Latte", price: 170, quantity: 2, category: "coffee", status: "active" },
      { id: "2", name: "Truffle Mushroom Pasta", price: 285, quantity: 1, category: "pasta_burger", status: "active" },
    ]);

    const updateQuantity = (id: string, delta: number) => {
      setItems((prev) =>
        prev
          .map((item) =>
            item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
          )
          .filter((i) => i.quantity > 0)
      );
    };

    const removeItem = (id: string) => {
      setItems((prev) => prev.filter((item) => item.id !== id));
    };

    return (
      <div className="h-screen w-100 border-x">
        <OrderDetailsModal
          {...args}
          orderId="demo-001"
          orderItems={items}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
          onPlaceOrder={async (customerName: string, orderType: OrderType, cookingRequest?: string, payment?: PaymentInfo) => {
            args.onPlaceOrder?.(customerName, orderType, cookingRequest, payment);
            return {
              id: "demo-order",
              customer_name: customerName,
              order_type: orderType,
              status: "in_progress",
              order_items: [],
              created_at: new Date().toISOString(),
            } as Order;
          }}
          onClose={args.onClose}
          onResetMenuItems={args.onResetMenuItems}
        />
      </div>
    );
  },
};

export const EmptyCart: Story = {
  render: (args) => (
    <div className="h-screen w-100 border-x">
      <OrderDetailsModal
        {...args}
        orderId="demo-002"
        orderItems={[]}
        updateQuantity={() => {}}
        removeItem={() => {}}
        onPlaceOrder={async (customerName: string, orderType: OrderType) => {
          args.onPlaceOrder?.(customerName, orderType);
          return {
            id: "empty-order",
            customer_name: customerName,
            order_type: orderType,
            status: "in_progress",
            order_items: [],
            created_at: new Date().toISOString(),
          } as Order;
        }}
        onClose={args.onClose}
        onResetMenuItems={args.onResetMenuItems}
      />
    </div>
  ),
};

export const WithDiscount: Story = {
  render: (args) => {
    const [items, setItems] = useState<MenuItemWithQuantity[]>([
      { id: "1", name: "Cappuccino", price: 150, quantity: 2, category: "coffee", status: "active" },
      { id: "2", name: "Blueberry Muffin", price: 95, quantity: 3, category: "dessert_pastry", status: "active" },
    ]);

    const updateQuantity = (id: string, delta: number) => {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        ).filter((i) => i.quantity > 0)
      );
    };

    return (
      <div className="h-screen w-100 border-x">
        <OrderDetailsModal
          {...args}
          orderId="demo-003"
          orderItems={items}
          updateQuantity={updateQuantity}
          removeItem={(id) => setItems((prev) => prev.filter((item) => item.id !== id))}
          onPlaceOrder={async (customerName: string, orderType: OrderType) => {
            args.onPlaceOrder?.(customerName, orderType);
            return {
              id: "discount-order",
              customer_name: customerName,
              order_type: orderType,
              status: "in_progress",
              order_items: [],
              created_at: new Date().toISOString(),
            } as Order;
          }}
          onClose={args.onClose}
          onResetMenuItems={args.onResetMenuItems}
        />
      </div>
    );
  },
};

export const WithCookingRequest: Story = {
  args: {
    orderItems: [
      { id: "1", name: "Grilled Salmon", price: 450, quantity: 1, category: "pasta_burger", status: "active" },
    ],
  },
  render: (args) => (
    <div className="h-screen w-100 border-x">
      <OrderDetailsModal
        {...args}
        orderId="demo-004"
        updateQuantity={() => {}}
        removeItem={() => {}}
        onPlaceOrder={async (customerName: string, orderType: OrderType, cookingRequest?: string) => {
          args.onPlaceOrder?.(customerName, orderType, cookingRequest);
          return {
            id: "cooking-order",
            customer_name: customerName,
            order_type: orderType,
            status: "in_progress",
            order_items: [],
            created_at: new Date().toISOString(),
          } as Order;
        }}
        onClose={args.onClose}
        onResetMenuItems={args.onResetMenuItems}
      />
    </div>
  ),
};

export const LargeOrder: Story = {
  args: {
    orderItems: Array.from({ length: 10 }).map((_, i) => ({
      id: `${i + 1}`,
      name: `Item ${i + 1}`,
      price: 100 + i * 10,
      quantity: i + 1,
      category: "coffee",
      status: "active",
    })),
  },
  render: (args) => (
    <div className="h-screen w-100 border-x">
      <OrderDetailsModal
        {...args}
        orderId="demo-005"
        updateQuantity={() => {}}
        removeItem={() => {}}
        onPlaceOrder={async (customerName: string, orderType: OrderType) => {
          args.onPlaceOrder?.(customerName, orderType);
          return {
            id: "large-order",
            customer_name: customerName,
            order_type: orderType,
            status: "in_progress",
            order_items: [],
            created_at: new Date().toISOString(),
          } as Order;
        }}
        onClose={args.onClose}
        onResetMenuItems={args.onResetMenuItems}
      />
    </div>
  ),
};
