import { useState } from "react"
import CustomerSidebar from "./CustomerSidebar"
import CustomerHeader from "./CustomerHeader"
import CustomerChild from "./CustomerChild"

export default function CustomerLayout() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      <CustomerSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <CustomerHeader activeTab={activeTab} setActiveTab={setActiveTab}/>

        <div className="flex-1 overflow-y-auto scroll-hide lg:p-8 p-4">
          <CustomerChild setActiveTab={setActiveTab} activeTab={activeTab} />
        </div>
      </div>
    </div>
  )
}