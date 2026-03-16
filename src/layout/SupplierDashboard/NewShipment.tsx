import { User, Truck, Package, Plus, MapPin, ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function CreateShipment({
  setActiveTab,
}: {
  setActiveTab: (tab: string) => void;
}) {
  const [items, setItems] = useState([{ product: "", qty: 1, price: 85 }]);

  const addItem = () => {
    setItems([...items, { product: "", qty: 1, price: 0 }]);
  };

  const subtotal = items.reduce((acc, i) => acc + i.qty * i.price, 0);
  const shipping = 150;
  const total = subtotal + shipping;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="lg:text-[34px] text-3xl font-playfair font-semibold cursor-pointer flex items-center gap-2" onClick={() => setActiveTab("dashboard")}>
            <ArrowLeft />
          Create New Shipment
        </h1>

        <p className="text-[#6A7282] mt-2 lg:text-[18px] text-base">
          Schedule a bulk delivery for a client.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <User size={20} className="text-blue-500" />

            <h3 className="font-playfair text-xl">Client Details</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-[#374151]">Select Client</label>

              <select className="w-full border h-12 border-[#E5E7EB] rounded-lg px-3 py-2 mt-1 outline-none">
                <option>Choose a client...</option>
                <option>Client 1</option>
                <option>Client 2</option>
                <option>Client 3</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-[#374151]">Delivery Address</label>

              <div className="border border-[#E5E7EB] rounded-lg p-4 mt-1 flex gap-3">
                <MapPin size={18} className="text-[#64748B]" />

                <div>
                  <p className="font-medium">Main Distribution Center</p>

                  <p className="text-sm text-[#64748B]">
                    123 Supply Chain Blvd, Suite 400
                  </p>

                  <p className="text-sm text-[#64748B]">New York, NY 10001</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Truck size={20} className="text-blue-500" />

            <h3 className="font-playfair text-xl">Logistics</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-[#374151]">Shipping Method</label>

              <select className="w-full border h-12 border-[#E5E7EB] rounded-lg px-3 py-2 mt-1 outline-none">
                <option>Standard Ground</option>
                <option>Express</option>
                <option>Overnight</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-[#374151]">Dispatch Date</label>

              <input
                type="date"
                className="w-full border h-12 border-[#E5E7EB] rounded-lg px-3 py-2 mt-1 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm text-[#374151]">
                Assign Vehicle (Optional)
              </label>

              <select className="w-full border h-12 border-[#E5E7EB] rounded-lg px-3 py-2 mt-1 outline-none">
                <option>Auto-assign</option>
                <option>Vehicle 1</option>
                <option>Vehicle 2</option>
                <option>Vehicle 3</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Package size={20} className="text-blue-500" />

            <h3 className="font-playfair text-xl">Shipment Items</h3>
          </div>

          <button
            onClick={addItem}
            className="flex items-center gap-2 text-[#2563EB]"
          >
            <Plus size={16} />
            Add Item
          </button>
        </div>

        <div className="space-y-4">
          {items.map((item, i) => (
            <div key={i} className="grid lg:grid-cols-[2fr_1fr_1fr] gap-4">
              <select className="border border-[#E5E7EB] h-12 rounded-lg px-3 py-2 outline-none">
                <option>Select product...</option>
                <option>Product 1</option>
                <option>Product 2</option>
                <option>Product 3</option>
              </select>

              <input
                type="number"
                value={item.qty}
                className="border border-[#E5E7EB] h-12 rounded-lg px-3 py-2 outline-none"
              />

              <input
                type="text"
                value={`$ ${item.price}`}
                className="border border-[#E5E7EB] h-12 rounded-lg px-3 py-2 outline-none"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6">
          <div className="bg-[#F8FAFC] rounded-lg p-6 w-[280px] space-y-2">
            <div className="flex justify-between text-sm text-[#64748B]">
              <span>Subtotal</span>

              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm text-[#64748B]">
              <span>Shipping</span>

              <span>$150.00</span>
            </div>

            <div className="flex justify-between text-lg font-semibold pt-2 border-t">
              <span>Total</span>

              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button className="text-[#64748B]">Cancel</button>

        <button className="bg-[#2563EB] h-12 text-white px-6 py-2 rounded-lg shadow">
          Confirm Shipment
        </button>
      </div>
    </div>
  );
}
