import { FileText, MapPin, Package, Truck, ArrowLeft } from "lucide-react";
import { useState } from "react";

const orders = [
  {
    id: "ORD-7782",
    name: "Fresh Market NYC",
    location: "New York, NY",
    items: 4,
    shipping: "Express",
    weight: 250,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=200",
  },
  {
    id: "ORD-7781",
    name: "Bistro 55",
    location: "Boston, MA",
    items: 12,
    shipping: "Standard",
    weight: 800,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200",
  },
  {
    id: "ORD-7785",
    name: "Organic Roots",
    location: "Philadelphia, PA",
    items: 3,
    shipping: "Refrigerated",
    weight: 120,
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=200",
  },
  {
    id: "ORD-7788",
    name: "Seafood Shack",
    location: "Portland, ME",
    items: 6,
    shipping: "Refrigerated",
    weight: 350,
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=200",
  },
];

export default function CreateManifest({
  setActiveTab,
}: {
  setActiveTab: (tab: string) => void;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const toggleOrder = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id],
    );
  };
  const selectedOrders = orders.filter((o) => selected.includes(o.id));
  const totalWeight = selectedOrders.reduce((a, b) => a + b.weight, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1
          className="lg:text-[34px] text-3xl font-playfair font-semibold cursor-pointer flex items-center gap-2"
          onClick={() => setActiveTab("orders")}
        >
          <ArrowLeft />
          Create Shipping Manifest
        </h1>

        <p className="text-[#6A7282] mt-2 lg:text-[18px] text-base">
          Combine multiple orders into a single shipment manifest.
        </p>
      </div>
      <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
        
        <div className="space-y-6">
          
          <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-6">
            
            <div className="flex justify-between items-center mb-6">
              
              <div>
                
                <h3 className="font-playfair text-xl">
                  
                  Select Orders to Ship
                </h3>
                <p className="text-[#64748B] text-sm">
                  
                  Only "Ready to Ship" orders are shown.
                </p>
              </div>
              <input
                placeholder="Search orders..."
                className="border border-[#E5E7EB] rounded-lg h-12 px-4 outline-none w-[260px]"
              />
            </div>
            <div className="space-y-4">
              
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between border border-[#E5E7EB] rounded-lg p-4"
                >
                  
                  <div className="flex items-center gap-4">
                    
                    <input
                      type="checkbox"
                      checked={selected.includes(order.id)}
                      onChange={() => toggleOrder(order.id)}
                      className="w-5 h-5"
                    />
                    <img
                      src={order.image}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      
                      <p className="font-medium text-[#111827]">
                        
                        {order.name}
                      </p>
                      <div className="flex gap-4 text-sm text-[#64748B] mt-1">
                        
                        <span className="flex items-center gap-1">
                          
                          <MapPin size={14} /> {order.location}
                        </span>
                        <span className="flex items-center gap-1">
                          
                          <Package size={14} /> {order.items} Items
                        </span>
                        <span className="flex items-center gap-1">
                          
                          <Truck size={14} /> {order.shipping}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    
                    <p className="text-sm text-[#64748B]"> {order.id} </p>
                    <p className="font-semibold text-lg">
                      
                      {order.weight} kg
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-6">
            
            <h3 className="font-playfair text-xl mb-6">
              
              Logistics Details
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              
              <input
                placeholder="Carrier"
                className="border border-[#E5E7EB] rounded-lg h-12 px-4 outline-none"
              />
              <input
                placeholder="Vehicle Type"
                className="border border-[#E5E7EB] rounded-lg h-12 px-4 outline-none"
              />
              <input
                type="date"
                className="border border-[#E5E7EB] rounded-lg h-12 px-4 outline-none"
              />
              <input
                placeholder="Assign driver..."
                className="border border-[#E5E7EB] rounded-lg h-12 px-4 outline-none"
              />
            </div>
            <textarea
              rows={4}
              placeholder="Gate codes, handling instructions, loading dock info..."
              className="border border-[#E5E7EB] rounded-lg px-4 py-3 outline-none w-full mt-4"
            />
          </div>
        </div>
        <div className="space-y-6">
          
          <div className="bg-[#0F172A] text-white rounded-xl p-6 shadow-lg">
            
            <div className="flex items-center gap-2 mb-6">
              
              <FileText size={20} />
              <h3 className="font-playfair text-xl"> Manifest Summary </h3>
            </div>
            <div className="space-y-4 text-sm">
              
              <div className="flex justify-between border-b border-white/10 pb-3">
                
                <span>Selected Orders</span> <span>{selected.length}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-3">
                
                <span>Total Weight</span> <span>{totalWeight} kg</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-3">
                
                <span>Estimated Cost</span> <span>$--.--</span>
              </div>
            </div>
            <button className="w-full mt-6 bg-[#2563EB] py-3 rounded-lg shadow">
              
              Generate Manifest
            </button>
          </div>
          <div className="bg-[#EEF2FF] border border-[#E5E7EB] rounded-xl p-6">
            
            <h4 className="font-playfair text-lg mb-3 flex items-center gap-2">
              <Truck size={24} />
              Shipping Policy
            </h4>
            <p className="text-sm text-[#334155] leading-relaxed">
              
              All manifests created before 2:00 PM EST will be scheduled for
              same-day pickup. Ensure all selected orders are packed and labeled
              before driver arrival.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
