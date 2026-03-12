import { Search } from "lucide-react"
import { useState } from "react"
import SupportLiveChat from "./SupportLiveChat"
import SupportFAQ from "./SupportFAQ"

export default function SupportCenter() {

  const [activeTab, setActiveTab] = useState("tickets")

  const tickets = [
    {
      id: "#TCK-9921",
      subject: "Payment Issue - Order #ORD-7350",
      priority: "High",
      status: "Open",
      updated: "2 hours ago"
    },
    {
      id: "#TCK-9920",
      subject: "Request to update product category",
      priority: "Low",
      status: "Closed",
      updated: "2 days ago"
    },
    {
      id: "#TCK-9919",
      subject: "Commission fee clarification",
      priority: "Medium",
      status: "Resolved",
      updated: "1 week ago"
    }
  ]

  const priorityStyles: any = {
    High: "bg-red-100 text-red-600",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-blue-100 text-blue-600"
  }

  const statusStyles: any = {
    Open: "bg-green-100 text-green-700 border border-[#A4F4CF]",
    Closed: "bg-gray-200 text-gray-600 border border-[#E2E8F0]",
    Resolved: "bg-blue-100 text-blue-700 border border-[#BEDBFF]"
  }

  return (
    <div className="space-y-6">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>
          <h1 className="lg:text-[34px] text-3xl font-playfair font-semibold">
            Support Center
          </h1>

          <p className="text-[#6A7282] mt-2 lg:text-[18px] text-base">
            Get help with your store and orders.
          </p>
        </div>

        <button className="bg-[#F54900] text-white px-5 py-2.5 rounded-lg shadow-sm">
          + New Ticket
        </button>

      </div>



      <div className="flex gap-2 bg-[#F1F5F9] p-1 rounded-lg w-fit">

        <button
          onClick={() => setActiveTab("tickets")}
          className={`px-4 py-2 rounded-md text-sm ${
            activeTab === "tickets"
              ? "bg-white shadow text-[#111827]"
              : "text-[#6A7282]"
          }`}
        >
          Support Tickets
        </button>

        <button
          onClick={() => setActiveTab("chat")}
          className={`px-4 py-2 rounded-md text-sm ${
            activeTab === "chat"
              ? "bg-white shadow text-[#111827]"
              : "text-[#6A7282]"
          }`}
        >
          Live Chat
        </button>

        <button
          onClick={() => setActiveTab("faq")}
          className={`px-4 py-2 rounded-md text-sm ${
            activeTab === "faq"
              ? "bg-white shadow text-[#111827]"
              : "text-[#6A7282]"
          }`}
        >
          FAQs
        </button>

      </div>



      {activeTab === "tickets" && (

        <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-3 lg:p-6 shadow-sm">

          <div className="flex items-center border border-[#E5E7EB] rounded-lg px-3 w-full lg:w-[320px] mb-6">
            <Search size={18} className="text-[#6A7282]" />
            <input
              placeholder="Search tickets..."
              className="w-full px-3 py-2 outline-none text-sm"
            />
          </div>



          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead className="border-b text-[#6A7282] text-sm">

                <tr>

                  <th className="py-3 text-sm font-medium text-[#62748E]">
                    TICKET ID
                  </th>

                  <th className="py-3 text-sm font-medium text-[#62748E]">
                    SUBJECT
                  </th>

                  <th className="py-3 text-sm font-medium text-[#62748E]">
                    PRIORITY
                  </th>

                  <th className="py-3 text-sm font-medium text-[#62748E]">
                    STATUS
                  </th>

                  <th className="py-3 text-sm font-medium text-[#62748E]">
                    LAST UPDATED
                  </th>

                  <th className="py-3 text-sm font-medium text-[#62748E] text-center">
                    ACTIONS
                  </th>

                </tr>

              </thead>



              <tbody>

                {tickets.map((t, i) => (

                  <tr key={i} className="border-b last:border-none">

                    <td className="py-5 text-[#62748E]">
                      {t.id}
                    </td>

                    <td className="py-5 text-[#111827] font-medium">
                      {t.subject}
                    </td>

                    <td className="py-5">
                      <span className={`px-3 py-1 rounded-md text-sm ${priorityStyles[t.priority]}`}>
                        {t.priority}
                      </span>
                    </td>

                    <td className="py-5">
                      <span className={`px-3 py-1 rounded-full text-xs ${statusStyles[t.status]}`}>
                        {t.status}
                      </span>
                    </td>

                    <td className="py-5 text-[#6A7282]">
                      {t.updated}
                    </td>

                    <td className="py-5 text-center text-[#F54900] font-medium cursor-pointer">
                      View
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      )}

      {activeTab === "chat" && (
        <SupportLiveChat />
      )}

      {activeTab === "faq" && (
        <SupportFAQ />
      )}

    </div>
  )
}