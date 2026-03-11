import Notifications from "./Notifications"


export default function RetailerChild({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) {
  console.log({activeTab})
  // if (activeTab === "overview") {
  //   return (
  //     <Overview setActiveTab={setActiveTab} />
  //   )
  // }

  if (activeTab === "notifications") {
    return (
      <Notifications />
    )
  }

  // if (activeTab === "search") {
  //   return (
  //     <SearchTab />
  //   )
  // }

  // if (activeTab === "invite") {
  //   return (
  //     <InviteFriends />
  //   )
  // }

  // if (activeTab === "product-details") {
  //   return (
  //     <ProductDetails setActiveTab={setActiveTab} />
  //   )
  // }

  // if (activeTab === "orders") {return (<OrderHistory />)}
  // if (activeTab === "wallet") {return (<WalletPayments />)}
  // if (activeTab === "saved") {return (<SavedItems />)}
  // if (activeTab === "profile") {return (<AccountSettings />)}
  // if (activeTab === "support") {return (<HelpCenter />)}

  return null
}