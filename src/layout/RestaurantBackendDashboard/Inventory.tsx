import { useState } from "react";
import {
  ChefHat,
  Scale,
  AlertTriangle,
  Plus,
  MoreVertical,
  Pencil,
  Trash2,
  RefreshCcw,
  Edit,
} from "lucide-react";

const stats = [
  {
    title: "Total Recipes",
    value: "48",
    icon: ChefHat,
    iconBg: "bg-blue-100",
    iconColor: "text-[#2563EB]",
  },
  {
    title: "Inventory Value",
    value: "$12,450",
    icon: Scale,
    iconBg: "bg-green-100",
    iconColor: "text-[#009966]",
  },
  {
    title: "Low Stock Alerts",
    value: "3 Items",
    icon: AlertTriangle,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
];

const beverages = [
  {
    name: "Coca Cola",
    category: "Soft Drink",
    stock: 150,
    min: 50,
    unit: "Bottles",
    supplier: "Beverages Co.",
    status: "In Stock",
  },
  {
    name: "Orange Juice",
    category: "Juice",
    stock: 530,
    min: 40,
    unit: "Liters",
    supplier: "Fresh Drinks Ltd.",
    status: "In Stock",
  },
  {
    name: "Mineral Water",
    category: "Water",
    stock: 200,
    min: 100,
    unit: "Bottles",
    supplier: "Pure Water Inc.",
    status: "In Stock",
  },
  {
    name: "Iced Tea",
    category: "Tea",
    stock: 10,
    min: 30,
    unit: "Bottles",
    supplier: "Tea Masters",
    status: "Low",
  },
  {
    name: "Coffee Beans",
    category: "Coffee",
    stock: 0,
    min: 20,
    unit: "Kg",
    supplier: "Coffee World",
    status: "Out of Stock",
  },
];

const cooked = [
  {
    name: "Chicken Alfredo",
    by: "Chef Maria",
    prepared: "18/02/2026 05:34",
    expiry: "21/02/2026 05:34",
    remaining: "2d 13h",
    remainingColor: "text-[#009966]",
    qty: "5 Portions",
    status: "Fresh",
  },
  {
    name: "Vegetable Soup",
    by: "Chef John",
    prepared: "16/02/2026 02:34",
    expiry: "19/02/2026 02:34",
    remaining: "10h 59m",
    remainingColor: "text-orange-500",
    qty: "3 Liters",
    status: "Expiring Soon",
  },
  {
    name: "Beef Stew",
    by: "Chef Sarah",
    prepared: "15/02/2026 14:34",
    expiry: "18/02/2026 14:34",
    remaining: "Expired",
    remainingColor: "text-red-600",
    qty: "2 Kg",
    status: "Expired",
  },
];

const statusMap: any = {
  "In Stock": "bg-green-100 text-[#009966]",
  Low: "bg-yellow-100 text-yellow-700",
  "Out of Stock": "bg-red-100 text-red-600",
  Fresh: "bg-green-100 text-[#009966]",
  "Expiring Soon": "bg-yellow-100 text-yellow-700",
  Expired: "bg-red-100 text-red-600",
};

const rawItems = [
  {
    name: "Tomatoes",
    stock: 50,
    min: 20,
    price: "$3.50",
    supplier: "Fresh Farm",
    status: "In Stock",
  },
  {
    name: "Chicken Breast",
    stock: 15,
    min: 25,
    price: "$12.99",
    supplier: "Meat Market",
    status: "Low",
  },
  {
    name: "Rice",
    stock: 100,
    min: 30,
    price: "$2.50",
    supplier: "Grain Co.",
    status: "In Stock",
  },
  {
    name: "Onions",
    stock: 0,
    min: 15,
    price: "$2.00",
    supplier: "Fresh Farm",
    status: "Out of Stock",
  },
];

const solidItems = [
  {
    name: "Cooking Pots",
    stock: 12,
    min: 5,
    price: "$45.00",
    supplier: "Kitchen Supply",
    status: "In Stock",
  },
  {
    name: "Chef Knives",
    stock: 8,
    min: 10,
    price: "$89.99",
    supplier: "Kitchen Supply",
    status: "Low",
  },
  {
    name: "Cutting Boards",
    stock: 15,
    min: 8,
    price: "$25.00",
    supplier: "Kitchen Supply",
    status: "In Stock",
  },
];

const solidStatusMap: any = {
  "In Stock": "bg-green-100 text-[#009966]",
  Low: "bg-yellow-100 text-yellow-700",
  "Out of Stock": "bg-red-100 text-red-600",
};

export default function Inventory({
  setActiveTab,
}: {
  setActiveTab: (tab: string) => void;
}) {
  const [tab, setTab] = useState<"beverage" | "kitchen">("beverage");
  const [subTab, setSubTab] = useState<"cooked" | "items">("cooked");
  const [subTab2, setSubTab2] = useState<"raw" | "solid">("raw");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl lg:text-[34px] font-playfair font-semibold">
            Recipe & Inventory
          </h1>

          <p className="text-[#64748B] mt-2">
            Track stock levels, manage recipes, and calculate food costs.
          </p>
        </div>

        <div className="flex gap-3">
          <div className="relative">
            <button className="border border-[#E5E7EB] bg-white rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm">
              Stock Adjustment
            </button>
          </div>

          <button className="bg-[#009966] text-white rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm ">
            <Plus size={16} />
            Add Item
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
        {stats.map((s, i) => {
          const Icon = s.icon;

          return (
            <div
              key={i}
              className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-3 lg:p-6 shadow-sm flex items-center gap-4"
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center ${s.iconBg}`}
              >
                <Icon className={s.iconColor} size={24} />
              </div>

              <div>
                <p className="text-[#64748B] text-sm">{s.title}</p>

                <h3 className="text-[28px] font-playfair mt-1 text-[#0F172A]">
                  {s.value}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-3 lg:p-6 shadow-sm">
        <div className="flex gap-8 border-b mb-6">
          <button
            onClick={() => setTab("beverage")}
            className={`pb-3 text-sm font-medium ${
              tab === "beverage"
                ? "text-[#009966] border-b-2 border-[#009966]"
                : "text-[#64748B]"
            }`}
          >
            Beverage Management
          </button>

          <button
            onClick={() => setTab("kitchen")}
            className={`pb-3 text-sm font-medium ${
              tab === "kitchen"
                ? "text-[#009966] border-b-2 border-[#009966]"
                : "text-[#64748B]"
            }`}
          >
            Kitchen Stock Management
          </button>
        </div>

        {tab === "beverage" && (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-[#64748B]">Total: 5 items</p>

              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 border rounded-lg">
                  <RefreshCcw size={16} />
                  Stock Adjustment
                </button>

                <button className="flex items-center gap-2 px-4 py-2 bg-[#009966] text-white rounded-lg">
                  <Plus size={16} />
                  Add Beverage
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b text-sm text-[#64748B]">
                  <tr>
                    <th className="py-3">Beverage Name</th>
                    <th>Category</th>
                    <th>Current Stock</th>
                    <th>Min Threshold</th>
                    <th>Unit Type</th>
                    <th>Supplier</th>
                    <th>Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {beverages.map((b, i) => (
                    <tr key={i} className="border-b last:border-none">
                      <td className="py-4">{b.name}</td>
                      <td>{b.category}</td>
                      <td className="font-medium">{b.stock}</td>
                      <td>{b.min}</td>
                      <td>{b.unit}</td>
                      <td>{b.supplier}</td>
                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${statusMap[b.status]}`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="text-end">
                        <MoreVertical
                          size={18}
                          className="text-[#94A3B8] mx-auto"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === "kitchen" && (
          <>
            <div className="flex gap-8 border-b mb-6">
              <button
                onClick={() => setSubTab("cooked")}
                className={`pb-3 text-sm font-medium ${
                  subTab === "cooked"
                    ? "text-[#009966] border-b-2 border-[#009966]"
                    : "text-[#64748B]"
                }`}
              >
                Cooked Food Stock
              </button>

              <button
                onClick={() => setSubTab("items")}
                className={`pb-3 text-sm font-medium ${
                  subTab === "items"
                    ? "text-[#009966] border-b-2 border-[#009966]"
                    : "text-[#64748B]"
                }`}
              >
                Kitchen Item Stock
              </button>
            </div>

            {subTab === "cooked" && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-[#64748B]">Total: 3 items</p>

                  <button className="flex items-center gap-2 px-4 py-2 bg-[#009966] text-white rounded-lg">
                    <Plus size={16} />
                    Add Cooked Food
                  </button>
                </div>

                <table className="w-full text-left">
                  <thead className="border-b text-sm text-[#64748B]">
                    <tr>
                      <th className="py-3">Dish Name</th>
                      <th>Prepared By</th>
                      <th>Prepared Date</th>
                      <th>Expiry Time</th>
                      <th>Remaining</th>
                      <th>Qty</th>
                      <th>Status</th>
                      <th className="text-end">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {cooked.map((c, i) => (
                      <tr
                        key={i}
                        className={`border-b ${c.status === "Expired" ? "bg-red-50" : ""}`}
                      >
                        <td className="py-4">{c.name}</td>
                        <td>{c.by}</td>
                        <td>{c.prepared}</td>
                        <td>{c.expiry}</td>
                        <td className={c.remainingColor}>{c.remaining}</td>
                        <td>{c.qty}</td>
                        <td>
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${statusMap[c.status]}`}
                          >
                            {c.status}
                          </span>
                        </td>
                        <td className="">
                          <div className="flex gap-3 items-center justify-end">
                            <Edit size={16} className="text-blue-600" />
                            <Trash2 size={16} className="text-red-600" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}

            {subTab === "items" && (
              <div className="space-y-6">
                <div className="flex gap-3">
                  <button
                    onClick={() => setSubTab2("raw")}
                    className={`px-5 py-2 rounded-lg text-sm font-medium ${
                      subTab2 === "raw"
                        ? "bg-[#009966] text-white"
                        : "bg-[#F1F5F9] text-[#64748B]"
                    }`}
                  >
                    Raw Food Items
                  </button>

                  <button
                    onClick={() => setSubTab2("solid")}
                    className={`px-5 py-2 rounded-lg text-sm font-medium ${
                      subTab2 === "solid"
                        ? "bg-[#009966] text-white"
                        : "bg-[#F1F5F9] text-[#64748B]"
                    }`}
                  >
                    Solid / Non-Consumable Items
                  </button>
                </div>

                <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-3 lg:p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-[#64748B]">
                      Total:{" "}
                      {subTab2 === "raw"
                        ? rawItems.length
                        : solidItems.length}{" "}
                      items
                    </p>

                    <button className="flex items-center gap-2 px-4 py-2 bg-[#009966] text-white rounded-lg">
                      <Plus size={16} />
                      {subTab2 === "raw"
                        ? "Add Raw Food Item"
                        : "Add Solid Item"}
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="border-b text-sm text-[#64748B]">
                        <tr>
                          <th className="py-3">Item Name</th>
                          <th>Current Stock</th>
                          <th>Min Threshold</th>
                          <th>Unit Price</th>
                          <th>Supplier</th>
                          <th>Status</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {(subTab2 === "raw"
                          ? rawItems
                          : solidItems
                        ).map((item, i) => (
                          <tr key={i} className="border-b last:border-none">
                            <td className="py-4 font-medium text-[#0F172A]">
                              {item.name}
                            </td>
                            <td>{item.stock}</td>
                            <td>{item.min}</td>
                            <td>{item.price}</td>
                            <td>{item.supplier}</td>
                            <td>
                              <span
                                className={`px-3 py-1 rounded-full text-sm ${
                                  subTab2 === "raw"
                                    ? statusMap[item.status]
                                    : solidStatusMap[item.status]
                                }`}
                              >
                                {item.status}
                              </span>
                            </td>
                            <td>
                              <div className="flex justify-center gap-3">
                                <RefreshCcw
                                size={16}
                                className="text-[#009966] cursor-pointer"
                              />
                              <Pencil
                                size={16}
                                className="text-blue-600 cursor-pointer"
                              />
                              <Trash2
                                size={16}
                                className="text-red-600 cursor-pointer"
                              />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}