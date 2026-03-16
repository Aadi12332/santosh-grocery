import {
  Search,
  Calendar,
  Download,
  Filter,
  Truck,
  CheckCircle2,
  XCircle,
  ArrowLeft,
} from "lucide-react";
import { useState } from "react";

const shipments = [
  {
    id: "SHIP-8921",
    date: "Jan 15, 2026",
    client: "Fresh Market NYC",
    items: "Organic Avocados, Bananas",
    amount: "$4,250.00",
    vehicle: "Van 04",
    driver: "Mike Ross",
    status: "Delivered",
  },
  {
    id: "SHIP-8920",
    date: "Jan 12, 2026",
    client: "Bistro 55",
    items: "Premium Steak Cuts (20)",
    amount: "$8,900.50",
    vehicle: "Truck 02",
    driver: "Harvey Specter",
    status: "Delivered",
  },
  {
    id: "SHIP-8919",
    date: "Jan 10, 2026",
    client: "Sushi Zen",
    items: "Fresh Salmon, Tuna, Wasabi",
    amount: "$12,400.00",
    vehicle: "Refrigerated 01",
    driver: "Louis Litt",
    status: "Delivered",
  },
  {
    id: "SHIP-8918",
    date: "Jan 08, 2026",
    client: "Green Grocers",
    items: "Seasonal Fruits Mix",
    amount: "$1,200.00",
    vehicle: "-",
    driver: "-",
    status: "Cancelled",
  },
  {
    id: "SHIP-8917",
    date: "Jan 05, 2026",
    client: "Daily Mart",
    items: "Dairy Products Bulk",
    amount: "$3,150.00",
    vehicle: "Truck 05",
    driver: "Donna Paulsen",
    status: "Delivered",
  },
  {
    id: "SHIP-8916",
    date: "Jan 02, 2026",
    client: "Urban Bistro Group",
    items: "Cooking Oil, Flour, Rice",
    amount: "$5,600.00",
    vehicle: "Van 03",
    driver: "Rachel Zane",
    status: "Delivered",
  },
];

export default function ShipmentHistory({
  setActiveTab,
}: {
  setActiveTab: (tab: string) => void;
}) {
  const [openRange, setOpenRange] = useState(false);
  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1
            className="lg:text-[34px] text-3xl font-playfair font-semibold flex items-center gap-3 cursor-pointer"
            onClick={() => setActiveTab("dashboard")}
          >
            <ArrowLeft />
            Shipment History
          </h1>

          <p className="text-[#6A7282] mt-2 lg:text-[18px] text-base">
            Archive of all completed and cancelled shipments.
          </p>
        </div>

        <div className="flex gap-3">
          <div className="relative">
            <button
              onClick={() => setOpenRange(true)}
              className="flex items-center gap-2 border border-[#E5E7EB] px-4 py-2 rounded-lg bg-white shadow-sm"
            >
              <Calendar size={18} />
              Select Range
            </button>
            {openRange && (
                <>
             <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setOpenRange(false)}></div>   
              <div className="absolute z-50 right-0 mt-2 w-[380px] bg-white rounded-xl p-6 shadow-xl border border-[#E5E7EB]">
                <div className="space-y-5">
                  <div>
                    <label className="block text-[#475569] mb-2">
                      Start Date
                    </label>

                    <input
                      type="date"
                      className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#475569] mb-2">
                      End Date
                    </label>

                    <input
                      type="date"
                      className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 outline-none"
                    />
                  </div>

                  <div className="flex gap-3 pt-3">
                    <button
                      onClick={() => setOpenRange(false)}
                      className="flex-1 border border-[#E5E7EB] py-3 rounded-lg"
                    >
                      Cancel
                    </button>

                    <button className="flex-1 bg-[#2563EB] text-white py-3 rounded-lg shadow">
                      Apply Filter
                    </button>
                  </div>
                </div>
              </div>
                </>
            )}
          </div>

          <button className="flex items-center gap-2 border border-[#E5E7EB] px-4 py-2 rounded-lg bg-white shadow-sm">
            <Download size={18} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-3 lg:p-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex items-center border border-[#E5E7EB] rounded-lg px-3 w-full">
            <Search size={18} className="text-[#6A7282]" />

            <input
              placeholder="Search by ID, Client, or Driver..."
              className="w-full px-3 py-2 outline-none text-sm"
            />
          </div>

          <button className="flex min-w-max items-center gap-2 border border-[#E5E7EB] px-4 py-2 rounded-lg bg-white shadow-sm">
            <Filter size={18} />
            Status: All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[900px]">
            <thead className="border-b text-[#6A7282] text-sm">
              <tr>
                <th className="py-4 font-normal text-[#62748E]">SHIPMENT ID</th>
                <th className="py-4 font-normal text-[#62748E]">DATE</th>
                <th className="py-4 font-normal text-[#62748E]">CLIENT</th>
                <th className="py-4 font-normal text-[#62748E]">
                  ITEMS SUMMARY
                </th>
                <th className="py-4 font-normal text-[#62748E]">AMOUNT</th>
                <th className="py-4 font-normal text-[#62748E]">LOGISTICS</th>
                <th className="py-4 font-normal text-[#62748E]">STATUS</th>
              </tr>
            </thead>

            <tbody>
              {shipments.map((s, i) => (
                <tr key={i} className="border-b last:border-none">
                  <td className="py-5 font-medium text-[#111827]">{s.id}</td>

                  <td className="py-5 text-[#64748B]">{s.date}</td>

                  <td className="py-5 font-medium text-[#111827]">
                    {s.client}
                  </td>

                  <td className="py-5 text-[#64748B]">{s.items}</td>

                  <td className="py-5 font-semibold text-[#111827]">
                    {s.amount}
                  </td>

                  <td className="py-5">
                    <div className="flex items-start gap-2 text-[#64748B]">
                      <Truck size={14} />

                      <div className="-mt-1 text-sm">
                        <p>{s.vehicle}</p>
                        <p className="text-sm">{s.driver}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-5">
                    {s.status === "Delivered" && (
                      <span className="flex items-center gap-2 text-green-700 bg-green-100 px-3 py-1 rounded-full w-fit text-sm">
                        <CheckCircle2 size={16} />
                        Delivered
                      </span>
                    )}

                    {s.status === "Cancelled" && (
                      <span className="flex items-center gap-2 text-red-600 bg-red-100 px-3 py-1 rounded-full w-fit text-sm">
                        <XCircle size={16} />
                        Cancelled
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
