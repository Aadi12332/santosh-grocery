import Overview from "./Overview"
import Notifications from "./Notifications"
import SearchTab from "./SearchTab"
import InviteFriends from "./InviteFriends"
import ProductDetails from "./ProductDetails"
import OrderHistory from "./OrderHistory"
import WalletPayments from "./WalletPayments"

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

  if (activeTab === "orders") {return (<OrderHistory />)}
  if (activeTab === "wallet") {return (<WalletPayments />)}
  if (activeTab === "saved") return <div>Saved Items</div>
  if (activeTab === "profile") return <div>Profile Settings</div>
  if (activeTab === "support") return <div>Support Page</div>

  return null
}