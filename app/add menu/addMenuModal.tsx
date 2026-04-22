"use client";

import React, { useState, useEffect } from "react";
import { X, Plus, Trash2, Edit3, Save, Package } from "lucide-react";
import {
  CoffeeFactory,
  NonCoffeeFactory,
  PastaBurgerFactory,
  DessertFactory,
} from "./factory/menuFactory";
import {
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getMenuItems,
} from "./menuActions";

// factory selector - helper to pick the right factory based on category
function getFactory(category: string) {
  switch (category) {
    case "coffee":
      return new CoffeeFactory();
    case "non_coffee":
      return new NonCoffeeFactory();
    case "pasta_burger":
      return new PastaBurgerFactory();
    case "dessert_pastry":
      return new DessertFactory();
    default:
      throw new Error(`Unknown category: ${category}`);
  }
}

// added type safety for MenuItem
interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  status: "active" | "hidden";
}
// replaced any[] with MenuItem
interface AddMenuModalProps {
  menuItems: MenuItem[];
  onClose: () => void;
  onMenuUpdate: (updatedItems: MenuItem[]) => void;
}

export function AddMenuModal({
  menuItems,
  onClose,
  onMenuUpdate,
}: AddMenuModalProps) {
  const [items, setItems] = useState(menuItems);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "coffee", // normalized default value
    available: "true",
  });

  // adjusted into value-label pairs for backend values
  const categories = [
    { value: "coffee", label: "Coffee-Based" },
    { value: "non_coffee", label: "Non-Coffee" },
    { value: "pasta_burger", label: "Pasta & Burgers" },
    { value: "dessert_pastry", label: "Desserts & Pastries" },
  ];

  // added onMenuUpdate - makes the effect rerun with latest callback
  useEffect(() => {
    async function fetchItems() {
      const latest = await getMenuItems();
      setItems(latest);
      onMenuUpdate(latest);
    }
    fetchItems();
  }, [onMenuUpdate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "price" && parseFloat(value) < 0) {
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // async to call sever actions
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const numericPrice = parseFloat(formData.price);
    if (isNaN(numericPrice) || numericPrice < 0) {
      alert("Please enter a valid price (minimum 0).");
      return;
    }

    let updatedItems;
    // update via supabase
    if (editingId) {
      const updated = await updateMenuItem(editingId, {
        name: formData.name,
        price: numericPrice,
        category: formData.category,
        status: formData.available === "true" ? "active" : "hidden",
      });

      updatedItems = items.map((item) =>
        item.id === editingId ? updated[0] : item,
      );
      setEditingId(null);
    } else {
      // use factory to build item object
      const factory = getFactory(formData.category);
      const newItemObj = factory.createItem(
        formData.name,
        numericPrice,
        formData.available === "true",
      );
      // insert via supabase
      const inserted = await addMenuItem({
        name: newItemObj.getName(),
        price: newItemObj.getPrice(),
        category: newItemObj.getCategory(),
        status: newItemObj.getStatus(),
      });
      updatedItems = [inserted[0], ...items];
    }
    // update local state and notify parent
    setItems(updatedItems);
    onMenuUpdate(updatedItems);
    // reset form after submission
    setFormData({
      name: "",
      price: "",
      category: "coffee",
      available: "true",
    });
  };
  // pre fill form for editing and set editing state
  const startEdit = (item: MenuItem) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      price: item.price.toString(),
      category: item.category,
      available: item.status === "active" ? "true" : "false",
    });
  };
  // delete item and update state
  const deleteItem = async (id: number) => {
    await deleteMenuItem(id);
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    onMenuUpdate(updatedItems);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-[#4B3832]/80 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="relative w-full max-w-5xl bg-[#F5E6CA] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[85vh] border-4 border-[#4B3832]">
        {/*form section*/}
        <div className="w-full md:w-1/3 bg-white p-8 border-r-2 border-[#4B3832]/10 overflow-y-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-[#4B3832] uppercase italic tracking-tighter">
              {editingId ? "Edit Product" : "Add New Item"}
            </h2>
            <p className="text-[10px] font-bold text-[#DCC7AA] uppercase tracking-[0.2em]">
              Menu Configuration
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-[9px] font-black text-[#4B3832] uppercase tracking-widest mb-2 block">
                Item Name
              </label>
              <input
                required
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-[#F5E6CA]/30 border-2 border-[#DCC7AA] text-black rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-[#4B3832] transition-all"
                placeholder="e.g. Caramel Macchiato"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] font-black text-[#4B3832] uppercase tracking-widest mb-2 block">
                  Price (₱)
                </label>
                <input
                  required
                  type="number"
                  min="0"
                  step="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full bg-[#F5E6CA]/30 border-2 border-[#DCC7AA] rounded-xl px-4 py-3 text-xs text-black font-bold outline-none focus:border-[#4B3832] transition-all"
                />
              </div>
              <div>
                <label className="text-[9px] font-black text-[#4B3832] uppercase tracking-widest mb-2 block">
                  Status
                </label>
                <select
                  name="available"
                  value={formData.available}
                  onChange={handleInputChange}
                  className="w-full bg-[#F5E6CA]/30 border-2 border-[#DCC7AA] rounded-xl px-4 py-3 text-xs  text-black font-bold outline-none focus:border-[#4B3832] transition-all appearance-none"
                >
                  <option value="true">Active</option>
                  <option value="false">Hidden</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[9px] font-black text-[#4B3832] uppercase tracking-widest mb-2 block">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full bg-[#F5E6CA]/30 border-2 border-[#DCC7AA] rounded-xl px-4 py-3 text-xs text-black font-bold outline-none focus:border-[#4B3832] transition-all"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 bg-[#4B3832] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#6F4E37] transition-all shadow-lg active:scale-95"
            >
              {editingId ? <Save size={14} /> : <Plus size={14} />}
              {editingId ? "Update Item" : "Add to Menu"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setFormData({
                    name: "",
                    price: "",
                    category: "coffee",
                    available: "true",
                  });
                }}
                className="w-full text-[9px] font-black text-[#4B3832]/40 uppercase tracking-widest hover:text-[#4B3832] transition-colors"
              >
                Cancel Edit
              </button>
            )}
          </form>
        </div>

        {/*inventory list section*/}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-8 flex justify-between items-center bg-[#F5E6CA] border-b border-[#4B3832]/5">
            <div>
              <h3 className="text-xl font-black text-[#4B3832] uppercase italic">
                Inventory List
              </h3>
              <p className="text-[13px] font-bold text-[#4B3832]">
                {items.length} Items total
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#4B3832]/10 rounded-full transition-colors"
            >
              <X size={24} className="text-[#4B3832]" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-3 no-scrollbar">
            {items.length === 0 ? (
              <div className="text-center py-20 opacity-20">
                <Package size={48} className="mx-auto mb-4" />
                <p className="font-black text-[#4B3832] uppercase tracking-widest">
                  Menu is Empty
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white/60 p-4 rounded-2xl border border-[#DCC7AA]/30 group hover:border-[#4B3832]/30 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${item.status === "active" ? "bg-[#4B3832] text-[#DCC7AA]" : "bg-gray-200 text-gray-400"}`}
                    >
                      <Package size={18} />
                    </div>
                    <div>
                      <h4
                        className={`text-[11px] font-black uppercase italic ${item.status === "active" ? "text-[#4B3832]" : "text-gray-400 line-through"}`}
                      >
                        {item.name}
                      </h4>
                      <p className="text-[9px] font-bold text-[#DCC7AA] tracking-widest">
                        ₱{item.price.toFixed(2)} • {item.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => startEdit(item)}
                      className="p-2 bg-white text-amber-400 rounded-lg shadow-sm border border-amber-100 hover:bg-amber-50 transition-colors"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="p-2 bg-white text-red-950 rounded-lg shadow-sm border border-red-100 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
