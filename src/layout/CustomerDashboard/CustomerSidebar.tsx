import {
  Home,
  Clock,
  Wallet,
  Heart,
  Settings,
  HelpCircle,
  ShoppingBag,
  LogOut
} from "lucide-react"
import Logo from "../../assets/images/logo.svg"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

const menu = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "orders", label: "My Orders", icon: Clock },
  { id: "wallet", label: "Wallet & Payments", icon: Wallet },
  { id: "saved", label: "Saved Items", icon: Heart },
  { id: "profile", label: "Profile & Settings", icon: Settings },
  { id: "support", label: "Help & Support", icon: HelpCircle }
]

export default function CustomerSidebar({
  activeTab,
  setActiveTab,
  setSidebarOpen
}: {
  activeTab: string
  setActiveTab: (tab: string) => void
  setSidebarOpen: (open: boolean) => void
}) {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  )

  useEffect(() => {
    const handleStorage = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true")
    }

    window.addEventListener("storage", handleStorage)

    return () => window.removeEventListener("storage", handleStorage)
  }, [])
  return (
    <div className="w-[288px] flex flex-col h-full pb-5">

      <div className="px-6 py-6">
        <img src={Logo} alt="" />
      </div>

      <div className="px-4">
        <div className="flex items-center gap-3 bg-[#F9FAFB] rounded-xl p-4 border border-[#F1F5F9]">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <div className="font-semibold text-[#111827]">Sarah Chen</div>
            <div className="text-[#009966] text-sm">Platinum Member</div>
          </div>
        </div>
      </div>

      <div className="flex-1 mt-6 px-4 space-y-1 flex flex-col justify-between gap-1 h-full">

        <div className="space-y-1">
          {menu.map((item) => {
            const Icon = item.icon
            const active = activeTab === item.id

            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSidebarOpen(false) }}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm transition ${active
                  ? "bg-[#ECFDF5] text-[#009966] font-medium"
                  : "text-[#6A7282] hover:bg-gray-50"
                  }`}
              >
                <Icon size={20} />
                {item.label}
              </button>
            )
          })}

          <div className="border-t border-[#E5E7EB] my-4"></div>

          <div className="px-4 text-xs font-semibold text-[#9CA3AF] tracking-wider !mt-5">
            SHOP
          </div>

          <button onClick={() => navigate("/marketplace")} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm text-[#6A7282] hover:bg-gray-50">
            <ShoppingBag size={20} />
            Marketplace
          </button>
        </div>

        <button onClick={() => {
            localStorage.clear();
          navigate("/sign-in")
        }} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm text-red-500 hover:bg-red-50">
          <LogOut size={20} />
          Sign Out
        </button>

      </div>

    </div>
  )
}