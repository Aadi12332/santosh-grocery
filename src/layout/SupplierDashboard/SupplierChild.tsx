import FinanceWallet from "./FinanceWallet"
import Notifications from "./Notifications"
import Clients from "./Clients"
import Orders from "./Orders"
import ProductsTable from "./ProductsTable"
import Logistics from "./Logistics"
import ReportsAnalytics from "./ReportsAnalytics"
import SupplierDashboard from "./SupplierDashboard"
import SupplierSettings from "./SupplierSettings"
import SupportCenter from "./SupportCenter"
import Warehouse from "./Warehouse"


export default function SupplierChild({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) {
  if (activeTab === "dashboard") {
    return (
      <SupplierDashboard setActiveTab={setActiveTab} />
    )
  }

  if (activeTab === "notifications") {
    return (
      <Notifications />
    )
  }

  if (activeTab === "products") {
    return (
      <ProductsTable setActiveTab={setActiveTab} />
    )
  }

  if (activeTab === "orders") {
    return (
      <Orders />
    )
  }

  if (activeTab === "warehouse") {
    return (
      <Warehouse />
    )
  }

  if (activeTab === "clients") { return (<Clients setActiveTab={setActiveTab} />) }
  if (activeTab === "finance") { return (<FinanceWallet />) }
  if (activeTab === "logistics") { return (<Logistics />) }
  if (activeTab === "reports") { return (<ReportsAnalytics />) }
  if (activeTab === "support") { return (<SupportCenter />) }
  if (activeTab === "settings") { return (<SupplierSettings />) }

  return null
}