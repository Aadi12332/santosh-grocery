import { Search, Filter, Mail, Phone, MapPin, MoreHorizontal, Building2 } from "lucide-react"
import { useState } from "react";
import BroadcastMessageModal from "./BroadcastMessageModal";

const clients = [
  {
    name: "Urban Bistro Group",
    type: "Restaurant Chain",
    email: "marco@urbanbistro.com",
    phone: "+1 (555) 123-4567",
    location: "Downtown, NY",
    spend: "$45,200",
    orders: 12,
    status: "Active",
    initial: "U",
    color: "bg-orange-100 text-orange-600"
  },
  {
    name: "Whole Foods Local",
    type: "Retailer",
    email: "purchasing@wholefoods.loc",
    phone: "+1 (555) 987-6543",
    location: "Westside, NY",
    spend: "$32,150",
    orders: 8,
    status: "Active",
    initial: "W",
    color: "bg-green-100 text-green-700"
  },
  {
    name: "Fresh Eats Chain",
    type: "Restaurant Chain",
    email: "david@fresheats.com",
    phone: "+1 (555) 234-5678",
    location: "Brooklyn, NY",
    spend: "$28,900",
    orders: 15,
    status: "Review",
    initial: "F",
    color: "bg-orange-100 text-orange-600"
  },
  {
    name: "Green Grocers",
    type: "Retailer",
    email: "lisa@greengrocers.com",
    phone: "+1 (555) 876-5432",
    location: "Queens, NY",
    spend: "$15,400",
    orders: 6,
    status: "Active",
    initial: "G",
    color: "bg-green-100 text-green-700"
  },
  {
    name: "Sushi Zen",
    type: "Restaurant",
    email: "kenji@sushizen.com",
    phone: "+1 (555) 345-6789",
    location: "SoHo, NY",
    spend: "$12,400",
    orders: 4,
    status: "Active",
    initial: "S",
    color: "bg-orange-100 text-orange-600"
  },
  {
    name: "Daily Mart",
    type: "Retailer",
    email: "tom@dailymart.com",
    phone: "+1 (555) 654-3210",
    location: "Bronx, NY",
    spend: "$8,200",
    orders: 3,
    status: "Inactive",
    initial: "D",
    color: "bg-green-100 text-green-700"
  }
]

const statusStyles: any = {
  Active: "bg-green-100 text-green-700",
  Review: "bg-yellow-100 text-yellow-700",
  Inactive: "bg-gray-200 text-gray-600"
}

export default function Clients({ setActiveTab }: { setActiveTab: (tab: string) => void }) {


  const [openBroadcast, setOpenBroadcast] = useState(false);

  return (

    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl lg:text-[34px] font-playfair font-semibold">
            Client Management
          </h1>

          <p className="text-[#64748B] mt-2">
            Manage relationships with restaurants and retailers.
          </p>

        </div>

        <button onClick={() => setOpenBroadcast(true)} className="bg-[#155DFC] text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm">
          <Mail size={16} />
          Broadcast Message
        </button>

        <BroadcastMessageModal
          open={openBroadcast}
          onClose={() => setOpenBroadcast(false)}
        />

      </div>



      <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-4">

        <div className="flex gap-3">

          <div className="flex items-center border border-[#E5E7EB] rounded-lg px-3 flex-1">

            <Search size={18} className="text-[#64748B]" />

            <input
              placeholder="Search clients by name, email, or location..."
              className="w-full px-3 py-2 outline-none text-sm"
            />

          </div>

          <button className="border border-[#E5E7EB] px-4 py-2 rounded-lg flex items-center gap-2 bg-white">
            <Filter size={16} />
            Filter
          </button>

        </div>

      </div>



      <div className="grid lg:grid-cols-3 gap-6">

        {clients.map((c, i) => (

          <div
            key={i}
            className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-6 shadow-sm"
          >

            <div className="flex justify-between">

              <div className="flex gap-3">

                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-semibold text-lg ${c.color}`}>
                  {c.initial}
                </div>

                <div>

                  <p className="font-semibold text-[#111827]">
                    {c.name}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-[#64748B] mt-1">
                    <Building2 size={14} />
                    {c.type}
                  </div>

                </div>

              </div>

              <button className="text-[#64748B]">
                <MoreHorizontal size={18} />
              </button>

            </div>



            <div className="space-y-3 mt-5 text-sm text-[#374151]">

              <div className="flex items-center gap-2">
                <Mail size={16} className="text-[#64748B]" />
                {c.email}
              </div>

              <div className="flex items-center gap-2">
                <Phone size={16} className="text-[#64748B]" />
                {c.phone}
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#64748B]" />
                {c.location}
              </div>

            </div>



            <div className="border-t mt-5 pt-4 flex justify-between items-center">

              <div>

                <p className="text-sm text-[#64748B]">
                  Total Spend
                </p>

                <p className="font-semibold">
                  {c.spend}
                </p>

              </div>

              <div>

                <p className="text-sm text-[#64748B]">
                  Active Orders
                </p>

                <p className="font-semibold">
                  {c.orders}
                </p>

              </div>

              <span className={`px-3 py-1 rounded-full text-xs ${statusStyles[c.status]}`}>
                {c.status}
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>

  )

}