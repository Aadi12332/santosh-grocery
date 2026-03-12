import { Search, Filter, MoreHorizontal, XCircle, CheckCircle2, Eye } from "lucide-react"
import { useState } from "react"
const refunds = [
  {
    refundId: "REF-3321",
    orderId: "ORD-7349",
    customer: "Emily Davis",
    reason: "Damaged Item",
    amount: "$67.25",
    status: "Pending"
  },
  {
    refundId: "REF-3320",
    orderId: "ORD-7312",
    customer: "John Smith",
    reason: "Late Delivery",
    amount: "$15.50",
    status: "Approved"
  },
  {
    refundId: "REF-3319",
    orderId: "ORD-7290",
    customer: "Mike Johnson",
    reason: "Change of Mind",
    amount: "$32.00",
    status: "Rejected"
  }
]

const statusStyles: any = {
  Pending: "bg-yellow-100 text-yellow-700 border border-[#FFF085]",
  Approved: "bg-green-100 text-green-700 border border-[#A4F4CF]",
  Rejected: "bg-red-100 text-red-600 border border-[#FFC9C9]"
}

export default function RefundRequests() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-6">

      <div>
        <h1 className="lg:text-[34px] text-3xl font-playfair font-semibold">
          Refund Requests
        </h1>

        <p className="text-[#6A7282] mt-2 lg:text-[18px] text-base">
          Manage and process customer refund claims.
        </p>
      </div>



      <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-3 lg:p-6 shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

          <div className="flex items-center border border-[#E5E7EB] rounded-lg px-3 w-full lg:w-[320px]">
            <Search size={18} className="text-[#6A7282]" />
            <input
              placeholder="Search by Refund ID or Order ID..."
              className="w-full px-3 py-2 outline-none text-sm"
            />
          </div>

          <button className="flex items-center gap-2 border border-[#E5E7EB] px-4 py-2 rounded-lg bg-white shadow-sm">
            <Filter size={18} />
            Filter Status
          </button>

        </div>



        <div className="">

          <table className="w-full text-left">

            <thead className="border-b text-[#6A7282] text-sm">

              <tr>

                <th className="py-3 text-sm font-medium text-[#62748E]">
                  REFUND ID
                </th>

                <th className="py-3 text-sm font-medium text-[#62748E]">
                  ORDER ID
                </th>

                <th className="py-3 text-sm font-medium text-[#62748E]">
                  CUSTOMER
                </th>

                <th className="py-3 text-sm font-medium text-[#62748E]">
                  REASON
                </th>

                <th className="py-3 text-sm font-medium text-[#62748E]">
                  AMOUNT
                </th>

                <th className="py-3 text-sm font-medium text-[#62748E]">
                  STATUS
                </th>

                <th className="py-3 text-sm font-medium text-[#62748E] text-center">
                  ACTIONS
                </th>

              </tr>

            </thead>



            <tbody>

              {refunds.map((r, i) => (

                <tr key={i} className="border-b last:border-none">

                  <td className="py-5 font-medium text-[#111827]">
                    {r.refundId}
                  </td>

                  <td className="py-5 text-[#62748E]">
                    {r.orderId}
                  </td>

                  <td className="py-5 text-[#374151]">
                    {r.customer}
                  </td>

                  <td className="py-5 text-[#374151]">
                    {r.reason}
                  </td>

                  <td className="py-5 font-medium">
                    {r.amount}
                  </td>

                  <td className="py-5">

                    <span className={`px-3 py-1 rounded-full text-xs ${statusStyles[r.status]}`}>
                      {r.status}
                    </span>

                  </td>

                  <td className="py-5 text-center relative">

                    <button onClick={() =>
                      setOpenIndex(openIndex === i ? null : i)
                    } className="p-2 hover:bg-gray-100 rounded-lg">
                      <MoreHorizontal size={18} />
                    </button>
                    {openIndex === i && (
                      <div className="absolute bottom-12 right-10 mt-2 w-[180px] bg-white rounded-xl shadow-lg border border-[#E5E7EB] overflow-hidden z-50">

                        <button
                          onClick={() => setOpenIndex(null)}
                          className="flex items-center gap-3 text-sm w-full px-4 py-3 text-left hover:bg-gray-50 text-[#334155]"
                        >
                          <Eye size={18} />
                          View Details
                        </button>
                        <button
                          onClick={() => setOpenIndex(null)}
                          className="flex items-center gap-3 text-sm w-full px-4 py-3 text-left hover:bg-green-50 text-green-600"
                        >
                          <CheckCircle2 size={18} />
                          Approve Refund
                        </button>

                        <button
                          onClick={() => setOpenIndex(null)}
                          className="flex items-center gap-3 text-sm w-full px-4 py-3 text-left hover:bg-red-50 text-red-600"
                        >
                          <XCircle size={18} />
                          Reject Refund
                        </button>

                      </div>
                    )}
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