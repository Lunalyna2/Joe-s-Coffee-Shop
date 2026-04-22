// added type safety for MenuItem
export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  status: "active" | "hidden";
}

// replaced any[] with MenuItem
export interface AddMenuModalProps {
  menuItems: MenuItem[];
  onClose: () => void;
  onMenuUpdate: (updatedItems: MenuItem[]) => void;
}

export interface FormData {
  name: string;
  price: string; // keep as string for input binding
  category: string;
  available: "true" | "false";
}
