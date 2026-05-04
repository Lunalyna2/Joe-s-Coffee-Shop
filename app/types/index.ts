import { DbOrderStatus, OrderStatus } from "./orderStatus";

// categories for menu items
export type Category =
  | "coffee"
  | "non_coffee"
  | "pasta_burger"
  | "dessert_pastry";

// category filter type ( adds "ALL" logic for ui filtering)
export type CategoryFilter = Category | "ALL";

// order type values (backend)
export type OrderType = "dine_in" | "take_out";

// order type filter ("ALL" for ui rendering)
export type OrderTypeFilter = OrderType | "ALL";

// menu item definition with type safety
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: Category;
  status: "active" | "hidden";
  created_at?: string;
}

// replaced any[] with MenuItem
export interface AddMenuModalProps {
  menuItems: MenuItemWithQuantity[];
  onClose: () => void;
  onMenuUpdate: (updatedItems: MenuItemWithQuantity[]) => void;
}

//form data used in addmenumodal
export interface FormData {
  name: string;
  price: string; // keep as string for input binding
  category: Category;
  available: boolean;
}

// cashierDashboard-specific
export interface Order {
  id: string;
  customer_name: string;
  status: OrderStatus;
  order_type: OrderType;
  created_at?: string;
  updated_at?: string;
  order_items?: {
    id: string;
    order_id: string;
    menu_item_id: string;
    quantity: number;
    subtotal: number;
    menu_item?: {
      id: string;
      name: string;
      price: number;
      category?: string;
    };
  }[];
  transactions?: Transaction[];
  order_status_log?: OrderStatusLog[];
  item_count?: number;
  grand_total?: number;
}

//individual order item definition
export interface OrderItem {
  id: string;
  order_id: string;
  menu_item_id: string;
  quantity: number;
  subtotal: number;
  menu_item?: MenuItem;
}

// log status changes for an order
export interface OrderStatusLog {
  id: string;
  order_id: string;
  status: DbOrderStatus;
  changed_at: string;
  changed_by: string;
  created_at?: string;
}

//transaction record for an order
export interface Transaction {
  id: string;
  order_id: string;
  receipt_no: string;
  payment_method: string;
  amount: number;
  cash_received: number;
  change: number;
  created_at: string;
}

// for dashboard client
export interface DashboardClientProps {
  menuItems: MenuItemWithQuantity[];
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  orders: Order[];
  updateOrderStatus: (order: Order, status: OrderStatus) => void;
  orderFilter: OrderTypeFilter;
  setOrderFilter: (filter: OrderTypeFilter) => void;
  onMenuUpdate: (items: MenuItemWithQuantity[]) => void;
  onDeleteOrder?: (orderId: string) => void;
  onRecordTransaction?: (tx: Transaction) => Promise<void>;
  onPlaceOrder?: (
    customerName: string,
    orderType: OrderType,
    cookingRequest?: string,
  ) => Promise<Order>;
  setSelectedOrderId: React.Dispatch<React.SetStateAction<string | null>>;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSidebarOpen: boolean;
  selectedOrderId: string | null;
  onExitOrder: () => void;
  onResetMenuItems: () => void;
}

//menu item extended with quantity field
export interface MenuItemWithQuantity extends MenuItem {
  quantity: number;
}

//new type for payment info
export interface PaymentInfo {
  receipt_no: string;
  payment_method: string;
  amount: number;
  cash_received: number;
  change: number;
}

//new order definition
export interface NewOrder {
  customer_name: string;
  order_type: OrderType;
  status: OrderStatus;
  items: MenuItemWithQuantity[];
  cooking_request?: string;
  payment?: PaymentInfo; //added payment info 
}
