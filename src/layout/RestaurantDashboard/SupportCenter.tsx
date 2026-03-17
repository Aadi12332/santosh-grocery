import { Plus, Search, Filter, ChevronDown } from "lucide-react";
import { useState } from "react";
import SupportLiveChat from "./SupportLiveChat";

const tickets = [
  {
    id: "#TCK-9921",
    subject: "Printer connectivity issue",
    priority: "High",
    status: "Open",
    updated: "2 hours ago",
  },
  {
    id: "#TCK-9920",
    subject: "Request to add new menu category",
    priority: "Low",
    status: "Closed",
    updated: "2 days ago",
  },
  {
    id: "#TCK-9919",
    subject: "Payout discrepancy inquiry",
    priority: "Medium",
    status: "Resolved",
    updated: "1 week ago",
  },
];

const priorityStyles: any = {
  High: "bg-red-100 text-red-600",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-blue-100 text-blue-600",
};

const statusStyles: any = {
  Open: "bg-green-100 text-green-700 border border-[#A7F3D0]",
  Closed: "bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]",
  Resolved: "bg-blue-100 text-blue-700 border border-[#BFDBFE]",
};

const faqs = [
  {
    category: "Menu & Orders",
    items: [
      {
        q: "How do I mark an item as sold out?",
        a: "Go to Menu Management, find the item card, and toggle the switch labeled 'Available'. This updates in real-time."
      },
      {
        q: "Can I cancel an order after accepting?",
        a: "Yes, open the order details and update the shipping status from the status dropdown."
      }
    ]
  },
  {
    category: "Payments",
    items: [
      {
        q: "When are payouts processed?",
        a: "Payouts are processed weekly. Funds usually arrive in your bank within 2-3 business days."
      },
      {
        q: "How do I update bank details?",
        a: "Commission is calculated as a percentage of the order total depending on your seller plan."
      },
    ]
  },
]

export default function HelpSupport() {
  const [activeTab, setActiveTab] = useState("tickets");
  const [open, setOpen] = useState<number | null>(null)


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl lg:text-[34px] font-playfair font-semibold">
            Support Center
          </h1>

          <p className="text-[#64748B] mt-2">
            Get help with technical issues or operational questions.
          </p>
        </div>

        <button className="bg-[#009966] text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus size={16} />
          New Ticket
        </button>
      </div>

      <div className="flex gap-2 bg-[#F1F5F9] p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab("tickets")}
          className={`px-4 py-2 rounded-md text-sm ${activeTab === "tickets"
              ? "bg-white shadow text-[#111827]"
              : "text-[#6A7282]"
            }`}
        >
          Support Tickets
        </button>

        <button
          onClick={() => setActiveTab("chat")}
          className={`px-4 py-2 rounded-md text-sm ${activeTab === "chat"
              ? "bg-white shadow text-[#111827]"
              : "text-[#6A7282]"
            }`}
        >
          Live Chat
        </button>

        <button
          onClick={() => setActiveTab("faq")}
          className={`px-4 py-2 rounded-md text-sm ${activeTab === "faq"
              ? "bg-white shadow text-[#111827]"
              : "text-[#6A7282]"
            }`}
        >
          FAQs
        </button>
      </div>

      {activeTab === "tickets" && (
        <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-3 lg:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center border border-[#E5E7EB] rounded-lg px-3 w-full lg:w-[360px]">
              <Search size={18} className="text-[#94A3B8]" />

              <input
                placeholder="Search tickets..."
                className="w-full px-3 py-2 outline-none text-sm"
              />
            </div>

            <button className="flex items-center gap-2 text-[#64748B] font-medium">
              <Filter size={16} />
              Filter
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b text-sm text-[#64748B] bg-[#F8FAFC]">
                <tr>
                  <th className="py-4 font-medium px-2">TICKET ID</th>
                  <th className="py-4 font-medium px-2">SUBJECT</th>
                  <th className="py-4 font-medium px-2">PRIORITY</th>
                  <th className="py-4 font-medium px-2">STATUS</th>
                  <th className="py-4 font-medium px-2">LAST UPDATED</th>
                  <th className="py-4 font-medium px-2 text-right">ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {tickets.map((t, i) => (
                  <tr key={i} className="border-b last:border-none">
                    <td className="py-6 px-2 text-[#64748B] text-sm">{t.id}</td>

                    <td className="py-6 px-2">
                      <p className="font-semibold text-[#0F172A] leading-6">
                        {t.subject}
                      </p>
                    </td>

                    <td className="py-6 px-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${priorityStyles[t.priority]}`}
                      >
                        {t.priority}
                      </span>
                    </td>

                    <td className="py-6 px-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[t.status]}`}
                      >
                        {t.status}
                      </span>
                    </td>

                    <td className="py-6 px-2 text-[#64748B] text-sm">
                      {t.updated}
                    </td>

                    <td className="py-6 px-2 text-right">
                      <button className="text-[#059669] text-sm">
                        View Details
                      </button>
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
        <div className="space-y-8">

          {faqs.map((section, sIndex) => (

            <div key={sIndex} className="space-y-4">

              <h2 className="font-playfair text-2xl">{section.category}</h2>

              {section.items.map((item, i) => {

                const index = sIndex * 10 + i
                const active = open === index

                return (
                  <div
                    key={index}
                    className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-4 shadow-sm cursor-pointer"
                    onClick={() => setOpen(active ? null : index)}
                  >

                    <div className="flex items-center justify-between">

                      <p className="font-medium text-[#111827]">
                        {item.q}
                      </p>

                      <ChevronDown
                        size={18}
                        className={`transition ${active ? "rotate-180" : ""}`}
                      />

                    </div>

                    {active && (
                      <p className="text-[#6A7282] mt-3 text-sm">
                        {item.a}
                      </p>
                    )}

                  </div>
                )
              })}

            </div>

          ))}

        </div>
      )}
    </div>
  );
}
