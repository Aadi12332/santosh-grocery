import { useState } from "react"
import { Store, FileText, Bell, Shield, Save } from "lucide-react"
import KYCDocuments from "./KYCDocuments"
import NotificationSettings from "./NotificationSettings"
import SecuritySettings from "./SecuritySettings"

export default function RetailerSettings() {

  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="space-y-6">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>
          <h1 className="lg:text-[34px] text-3xl font-playfair font-semibold">
            Settings
          </h1>

          <p className="text-[#6A7282] mt-2 lg:text-[18px] text-base">
            Manage your profile, business details, and preferences.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-[#F54900] text-white px-5 py-2.5 rounded-lg shadow">
          <Save size={18}/>
          Save Changes
        </button>

      </div>



      <div className="flex gap-2 bg-[#F1F5F9] p-1 rounded-lg w-fit">

        <button
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm ${
            activeTab === "profile"
              ? "bg-white shadow text-[#111827]"
              : "text-[#6A7282]"
          }`}
        >
          <Store size={16}/>
          Profile & Business
        </button>

        <button
          onClick={() => setActiveTab("kyc")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm ${
            activeTab === "kyc"
              ? "bg-white shadow text-[#111827]"
              : "text-[#6A7282]"
          }`}
        >
          <FileText size={16}/>
          KYC Documents
        </button>

        <button
          onClick={() => setActiveTab("notifications")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm ${
            activeTab === "notifications"
              ? "bg-white shadow text-[#111827]"
              : "text-[#6A7282]"
          }`}
        >
          <Bell size={16}/>
          Notifications
        </button>

        <button
          onClick={() => setActiveTab("security")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm ${
            activeTab === "security"
              ? "bg-white shadow text-[#111827]"
              : "text-[#6A7282]"
          }`}
        >
          <Shield size={16}/>
          Security
        </button>

      </div>



      {activeTab === "profile" && (
        <div className="grid lg:grid-cols-[320px_1fr] gap-6">

          <div className="space-y-6">

            <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-3 lg:p-6 shadow-sm text-center">

              <h3 className="font-playfair text-xl mb-4">
                Store Logo
              </h3>

              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                className="w-36 h-36 rounded-full mx-auto object-cover"
              />

              <p className="text-[#6A7282] text-sm mt-4">
                Recommended size: 500×500px. <br/> Formats: JPG, PNG.
              </p>

            </div>



            <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-3 lg:p-6 shadow-sm text-center">

              <h3 className="font-playfair text-xl mb-4">
                Store Banner
              </h3>

              <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center text-[#6A7282] text-sm">
                No banner uploaded
              </div>

              <button className="mt-4 border border-[#E5E7EB] px-4 py-2 rounded-lg bg-white">
                Upload Banner
              </button>

            </div>

          </div>



          <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-3 lg:p-6 shadow-sm">

            <h3 className="font-playfair text-xl">
              Business Information
            </h3>

            <p className="text-[#6A7282] text-sm mb-6">
              These details will be visible to customers.
            </p>



            <div className="grid md:grid-cols-2 gap-4">

              <div>
                <label className="text-sm text-[#374151]">Store Name</label>
                <input
                  className="w-full border border-[#E5E7EB] rounded-lg outline-none px-3 py-2 mt-1"
                  defaultValue="Organic Greens Market"
                />
              </div>

              <div>
                <label className="text-sm text-[#374151]">Contact Person</label>
                <input
                  className="w-full border border-[#E5E7EB] rounded-lg outline-none px-3 py-2 mt-1"
                  defaultValue="Sarah Chen"
                />
              </div>

              <div>
                <label className="text-sm text-[#374151]">Email Address</label>
                <input
                  className="w-full border border-[#E5E7EB] rounded-lg outline-none px-3 py-2 mt-1"
                  defaultValue="sarah@example.com"
                />
              </div>

              <div>
                <label className="text-sm text-[#374151]">Phone Number</label>
                <input
                  className="w-full border border-[#E5E7EB] rounded-lg outline-none px-3 py-2 mt-1"
                  defaultValue="+1 (555) 123-4567"
                />
              </div>

            </div>



            <div className="mt-4">

              <label className="text-sm text-[#374151]">
                Business Address
              </label>

              <input
                className="w-full border border-[#E5E7EB] rounded-lg outline-none px-3 py-2 mt-1"
                defaultValue="123 Market Street, San Francisco, CA 94103"
              />

            </div>



            <div className="mt-4">

              <label className="text-sm text-[#374151]">
                Description
              </label>

              <textarea
                rows={4}
                className="w-full border border-[#E5E7EB] rounded-lg outline-none px-3 py-2 mt-1"
                defaultValue="We provide fresh, organic produce sourced directly from local farmers."
              />

            </div>

          </div>

        </div>
      )}

      {activeTab === "kyc" && <KYCDocuments />}
      {activeTab === "notifications" && <NotificationSettings />}
      {activeTab === "security" && <SecuritySettings />}

    </div>
  )
}