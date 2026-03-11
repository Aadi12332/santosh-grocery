import { Search, ShoppingBag, Bell, Menu } from "lucide-react"
import { useState } from "react"
import CartModal from "./CartModal"

export default function CustomerHeader({ activeTab, setActiveTab, openSidebar }: { activeTab: string; setActiveTab: (tab: string) => void; openSidebar: () => void }) {
  const [openCart, setOpenCart] = useState(false);
  return (
    <div className="flex items-center justify-between lg:px-8 px-4 h-[72px] bg-white border-b border-[#E5E7EB]">

      <div className="cursor-pointer lg:hidden" onClick={openSidebar}>
        <Menu />
      </div>

      <div className="sm:flex items-center gap-3 text-sm ml-3 hidden">
        <span className="text-[#64748B]">HubNepa</span>
        <span className="text-[#94A3B8]">›</span>
        <span className="font-semibold text-[#0F172A]">Dashboard</span>
      </div>


      <div className="flex items-center sm:gap-4 gap-1 flex-1 justify-end">
        <div className="relative sm:max-w-[250px] max-w-[150px] w-full cursor-pointer" onClick={() => setActiveTab("search")}>
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] cursor-pointer"
          />

          <input
            placeholder="Search orders..." readOnly
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F1F5F9] text-sm outline-none cursor-pointer"
          />
        </div>

        <button onClick={() => setOpenCart(true)} className="w-10 min-w-10 h-10 flex items-center justify-center rounded-lg border border-[#E5E7EB]">
          <ShoppingBag size={18} className="text-[#64748B]" />
        </button>

        <CartModal selectedProduct="" open={openCart} onClose={() => setOpenCart(false)} />

        <button onClick={() => setActiveTab("notifications")} className="relative w-10 min-w-10 h-10 flex items-center justify-center rounded-lg border border-[#E5E7EB]">
          <Bell size={18} className="text-[#64748B]" />

          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

      </div>

    </div>
  )
}