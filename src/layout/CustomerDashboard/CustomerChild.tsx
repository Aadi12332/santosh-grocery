import Overview from "./Overview"
import Notifications from "./Notifications"
import SearchTab from "./SearchTab"
import InviteFriends from "./InviteFriends"
import ProductDetails from "./ProductDetails"

export default function CustomerChild({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) {
  if (activeTab === "overview") {
    return (
      <Overview setActiveTab={setActiveTab} />
    )
  }

  if (activeTab === "notifications") {
    return (
      <Notifications />
    )
  }

  if (activeTab === "search") {
    return (
      <SearchTab />
    )
  }

  if (activeTab === "invite") {
    return (
      <InviteFriends />
    )
  }

  if (activeTab === "product-details") {
    return (
      <ProductDetails />
    )
  }

  if (activeTab === "orders") return <div>
    <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#E5E7EB]">

      <div className="text-lg font-semibold">
        Good Evening, Sarah
      </div>

      <div className="flex gap-3">

        <button className="px-4 py-2 text-white rounded-lg bg-[#9810FA]">
          Invite
        </button>

        <button className="px-4 py-2 text-white rounded-lg bg-[#009966]">
          Order Food
        </button>

        <button className="px-4 py-2 border rounded-lg border-[#E5E7EB]">
          Buy Groceries
        </button>

      </div>

    </div></div>
  if (activeTab === "wallet") return <div>Wallet Page</div>
  if (activeTab === "saved") return <div>Saved Items</div>
  if (activeTab === "profile") return <div>Profile Settings</div>
  if (activeTab === "support") return <div>Support Page</div>

  return null
}