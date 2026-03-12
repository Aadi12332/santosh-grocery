import { Search, Filter, Download, Eye } from "lucide-react"

export default function Orders() {

  const orders = [
    {
      id: "ORD-7352",
      name: "Alex Morgan",
      email: "alex.m@example.com",
      date: "Oct 24, 2023",
      time: "10:30 AM",
      total: "$124.50",
      payment: "Paid",
      paymentmethod: "(Credit Card)",
      status: "Pending"
    },
    {
      id: "ORD-7351",
      name: "Sarah Smith",
      email: "sarah.s@example.com",
      date: "Oct 24, 2023",
      time: "09:15 AM",
      total: "$45.00",
      payment: "Paid",
      paymentmethod: "(PayPal)",
      status: "Processing"
    },
    {
      id: "ORD-7350",
      name: "James Doe",
      email: "james.d@example.com",
      date: "Oct 23, 2023",
      time: "04:45 PM",
      total: "$289.90",
      payment: "Paid",
      paymentmethod: "(Apple Pay)",
      status: "Delivered"
    },
    {
      id: "ORD-7349",
      name: "Emily Davis",
      email: "emily.d@example.com",
      date: "Oct 23, 2023",
      time: "02:20 PM",
      total: "$67.25",
      payment: "Refunded",
      status: "Cancelled"
    }
  ]

  const statusStyles: any = {
    Pending: "bg-yellow-100 text-yellow-700",
    Processing: "bg-blue-100 text-blue-700",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700"
  }

  return (
    <div className="space-y-6">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>
          <h1 className="lg:text-[34px] text-3xl font-playfair font-semibold">
            Orders
          </h1>

          <p className="text-[#6A7282] mt-2 lg:text-[18px] text-base">
            Track and manage customer orders.
          </p>
        </div>

      </div>


      <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-3 lg:p-6 shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

          <div className="flex items-center border border-[#E5E7EB] rounded-lg px-3 w-full lg:w-[340px]">
            <Search size={18} className="text-[#6A7282]" />
            <input
              placeholder="Search by Order ID or Customer..."
              className="w-full px-3 py-2 outline-none text-sm"
            />
          </div>

          <div className="flex gap-3">

            <button className="flex items-center gap-2 border border-[#E5E7EB] rounded-lg px-4 py-2 shadow-sm bg-white">
              <Filter size={16} />
              Status: All
            </button>

            <button className="flex items-center gap-2 border border-[#E5E7EB] rounded-lg px-4 py-2 shadow-sm bg-white">
              <Download size={16} />
              Export CSV
            </button>

          </div>

        </div>


        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead className="border-b text-[#6A7282] text-sm">

              <tr>

                <th className="py-3 text-sm font-medium text-[#62748E]">
                  ORDER ID
                </th>

                <th className="py-3 text-sm font-medium text-[#62748E]">
                  CUSTOMER
                </th>

                <th className="py-3 text-sm font-medium text-[#62748E]">
                  DATE
                </th>

                <th className="py-3 text-sm font-medium text-[#62748E]">
                  TOTAL
                </th>

                <th className="py-3 text-sm font-medium text-[#62748E]">
                  PAYMENT
                </th>

                <th className="py-3 text-sm font-medium text-[#62748E]">
                  DELIVERY STATUS
                </th>

                <th className="py-3 text-sm font-medium text-[#62748E] text-center">
                  ACTION
                </th>

              </tr>

            </thead>

            <tbody>

              {orders.map((o, i) => (

                <tr key={i} className="border-b last:border-none">

                  <td className="py-6 font-medium text-[#111827]">
                    {o.id}
                  </td>

                  <td className="py-6">

                    <div>
                      <p className="text-[#111827] font-medium">
                        {o.name}
                      </p>

                      <p className="text-sm text-[#6A7282]">
                        {o.email}
                      </p>
                    </div>

                  </td>

                  <td className="py-6 text-[#374151]">

                    <p>{o.date}</p>
                    <p className="text-sm text-[#6A7282]">at {o.time}</p>

                  </td>

                  <td className="py-6 font-medium text-[#111827]">
                    {o.total}
                  </td>

                  <td className="py-6 text-[#374151]">
                    {o.payment} <br /> {o.paymentmethod}
                  </td>

                  <td className="py-6">
                    <span className={`px-3 py-1 rounded-full text-xs ${statusStyles[o.status]}`}>
                      {o.status}
                    </span>
                  </td>

                  <td className="py-6 text-center">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Eye size={18} className="text-[#6A7282]" />
                    </button>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


        <div className="flex items-center justify-between mt-6 text-sm text-[#6A7282]">

          <p>
            Showing 4 of 124 orders
          </p>

          <div className="flex gap-3">

            <button className="border border-[#E5E7EB] px-4 py-1.5 rounded-lg bg-gray-100">
              Previous
            </button>

            <button className="border border-[#E5E7EB] px-4 py-1.5 rounded-lg bg-white">
              Next
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}