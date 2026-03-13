import { Search, Download, Truck, PackageCheck, Clock, Box, MoreHorizontal, Filter, Package } from "lucide-react"

export default function Orders() {

  const stats = [
    { label: "Pending", value: 12, color: "bg-blue-100 text-blue-600", icon: Clock },
    { label: "Processing", value: 8, color: "bg-yellow-100 text-yellow-600", icon: Box },
    { label: "In Transit", value: 24, color: "bg-indigo-100 text-indigo-600", icon: Truck },
    { label: "Completed", value: 156, color: "bg-green-100 text-green-600", icon: PackageCheck }
  ]

  const orders = [
    {
      id: "ORD-7782",
      date: "Feb 5, 2026",
      client: "Fresh Market NYC",
      type: "Retailer",
      img: "https://picsum.photos/40?1",
      items: "4 Items",
      weight: "250 kg",
      amount: "$4,250.00",
      payment: "Paid",
      shipping: "Express",
      status: "Processing"
    },
    {
      id: "ORD-7781",
      date: "Feb 4, 2026",
      client: "Bistro 55",
      type: "Restaurant",
      img: "https://picsum.photos/40?2",
      items: "12 Items",
      weight: "800 kg",
      amount: "$8,900.50",
      payment: "Net 30",
      shipping: "Standard",
      status: "In Transit"
    },
    {
      id: "ORD-7780",
      date: "Feb 4, 2026",
      client: "Green Grocers",
      type: "Retailer",
      img: "https://picsum.photos/40?3",
      items: "2 Items",
      weight: "45 kg",
      amount: "$1,200.00",
      payment: "Paid",
      shipping: "Local",
      status: "Delivered"
    },
    {
      id: "ORD-7779",
      date: "Feb 3, 2026",
      client: "Sushi Zen",
      type: "Restaurant",
      img: "https://picsum.photos/40?4",
      items: "1 Item",
      weight: "500 kg",
      amount: "$12,400.00",
      payment: "Unpaid",
      shipping: "Refrigerated",
      status: "New"
    },
    {
      id: "ORD-7778",
      date: "Feb 3, 2026",
      client: "Daily Mart",
      type: "Retailer",
      img: "https://picsum.photos/40?5",
      items: "8 Items",
      weight: "180 kg",
      amount: "$3,150.00",
      payment: "Paid",
      shipping: "Standard",
      status: "Pending"
    }
  ]

  const statusStyles: any = {
    Processing: "bg-yellow-100 text-yellow-700",
    "In Transit": "bg-blue-100 text-blue-700",
    Delivered: "bg-green-100 text-green-700",
    New: "bg-purple-100 text-purple-700",
    Pending: "bg-gray-100 text-gray-600"
  }

  return (

    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-3xl lg:text-[34px] font-playfair font-semibold">
            Order Management
          </h1>

          <p className="text-[#64748B] mt-2">
            Track and fulfill bulk orders from your clients.
          </p>
        </div>

        <div className="flex gap-3">

          <button className="border border-[#E5E7EB] bg-white rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm">
            <Download size={16} />
            Export
          </button>

          <button className="bg-[#155DFC] text-white rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm ">
            <Package size={16} />
            Create Manifest
          </button>

        </div>

      </div>


      <div className="grid lg:grid-cols-4 gap-4">

        {stats.map((s, i) => {

          const Icon = s.icon

          return (

            <div key={i} className="border border-[#E5E7EB] rounded-lg lg:rounded-xl p-4 flex items-center gap-4">

              <div className={`w-12 h-12 flex items-center justify-center rounded-lg ${s.color}`}>
                <Icon size={20} />
              </div>

              <div>
                <p className="text-[#64748B]">{s.label}</p>
                <p className="text-xl font-semibold">{s.value}</p>
              </div>

            </div>

          )

        })}

      </div>


      <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-3 lg:p-6">

        <div className="flex gap-3 mb-6">

          <div className="flex items-center border border-[#E5E7EB] rounded-lg px-3 flex-1">
            <Search size={18} className="text-[#64748B]" />
            <input placeholder="Search by Order ID, Client, or Status..." className="w-full px-3 py-2 outline-none text-sm" />
          </div>

          <button className="border border-[#E5E7EB] bg-white rounded-lg px-4 py-2 shadow-sm flex items-center gap-2">
            <Filter size={16} />
            All Filters
          </button>

        </div>


        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead className="border-b text-[#64748B] text-sm">

              <tr>
                <th className="py-3">ORDER ID</th>
                <th className="py-3">CLIENT</th>
                <th className="py-3">DETAILS</th>
                <th className="py-3">AMOUNT</th>
                <th className="py-3">SHIPPING</th>
                <th className="py-3">STATUS</th>
                <th className="py-3 text-center">Action</th>
              </tr>

            </thead>

            <tbody>

              {orders.map((o, i) => (

                <tr key={i} className="border-b last:border-none">

                  <td className="py-5">

                    <div>
                      <p className="font-medium">{o.id}</p>
                      <p className="text-sm text-[#64748B]">{o.date}</p>
                    </div>

                  </td>


                  <td className="py-5">

                    <div className="flex items-center gap-3">

                      <img src={o.img} className="w-10 h-10 rounded-full" />

                      <div>
                        <p className="font-medium">{o.client}</p>
                        <p className="text-sm text-[#64748B]">{o.type}</p>
                      </div>

                    </div>

                  </td>


                  <td className="py-5">

                    <div>
                      <p>{o.items}</p>
                      <p className="text-sm text-[#64748B]">{o.weight}</p>
                    </div>

                  </td>


                  <td className="py-5">

                    <div>
                      <p className="font-medium">{o.amount}</p>
                      <p className={`text-sm ${o.payment === "Paid" ? "text-green-600" : "text-orange-500"}`}>
                        {o.payment}
                      </p>
                    </div>

                  </td>


                  <td className="py-5">

                    <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm">
                      {o.shipping}
                    </span>

                  </td>


                  <td className="py-5">

                    <span className={`px-3 py-1 rounded-full text-xs ${statusStyles[o.status]}`}>
                      {o.status}
                    </span>

                  </td>

                  <td className="text-center">
                    <MoreHorizontal size={20} className="mx-auto"/>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  )
}