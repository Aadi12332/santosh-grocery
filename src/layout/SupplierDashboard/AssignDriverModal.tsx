import { User, MapPin, Truck } from "lucide-react";

export default function AssignDriverModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  const drivers = [
    { name: "Sarah Connor", status: "Available", vehicle: "None" },
    { name: "Kyle Reese", status: "Available", vehicle: "Ford Transit #3" },
    { name: "Jane Smith", status: "Idle", vehicle: "Ford Transit #2" }
  ];

  return (
    <div
      className="fixed inset-0 bg-black/20 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-[576px] w-[96%] max-h-[96vh] overflow-auto rounded-xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start p-6 border-b bg-[#F8FAFC80]">
          <div>
            <h3 className="font-playfair text-2xl">Assign Driver</h3>
            <p className="text-[#64748B] mt-1">Dispatch a shipment to a driver.</p>
          </div>
          <button onClick={onClose} className="text-[#64748B] text-xl">✕</button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="text-[#374151] block mb-2">Select Shipment</label>
            <select className="w-full border border-[#E5E7EB] rounded-lg h-12 px-3 outline-none">
              <option>Select shipment</option>
              <option value="">Shipment 1</option>
              <option value="">Shipment 2</option>
              <option value="">Shipment 3</option>
            </select>
          </div>

          <div>
            <label className="text-[#374151] block mb-3">Available Drivers</label>

            <div className="space-y-3">
              {drivers.map((d, i) => (
                <button
                  key={i}
                  className="w-full border border-[#E5E7EB] rounded-xl p-4 flex items-center gap-4 hover:bg-[#F8FAFC]"
                >
                  <div className="w-12 h-12 rounded-full bg-[#F1F5F9] flex items-center justify-center">
                    <User size={20} className="text-[#64748B]" />
                  </div>

                  <div className="text-left">
                    <p className="font-medium text-[#0F172A]">{d.name}</p>
                    <p className="text-sm text-[#64748B]">
                      {d.status} • {d.vehicle}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="border border-[#E5E7EB] rounded-xl p-4 flex items-center justify-between bg-[#F8FAFC]">
            <div className="flex gap-4 items-center">
              <div className="w-10 h-10 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center">
                <MapPin size={18} className="text-[#64748B]" />
              </div>

              <div>
                <p className="text-xs text-[#64748B] tracking-wide">ESTIMATED ROUTE</p>
                <p className="font-medium text-[#0F172A]">
                  Warehouse A <span className="mx-2 text-[#94A3B8]">»</span> Queens Blvd
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-[#64748B]">Distance</p>
              <p className="font-semibold text-[#0F172A]">12.4 mi</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 border-t p-6 bg-[#F8FAFC80]">
          <button onClick={onClose} className="text-[#64748B]">Cancel</button>

          <button className="bg-[#2563EB] text-white px-6 py-2 rounded-lg flex items-center gap-2 shadow">
            <Truck size={16} />
            Assign & Dispatch
          </button>
        </div>
      </div>
    </div>
  );
}