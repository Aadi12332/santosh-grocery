import { Download, Wallet, Clock, Calendar } from "lucide-react"

export default function FinanceWallet() {

  const transactions = [
    {
      id: "TXN-9921",
      desc: "Settlement",
      date: "Oct 24, 2023",
      amount: "+$1,245.00",
      type: "credit",
      status: "Completed"
    },
    {
      id: "TXN-9920",
      desc: "Order #ORD-7350",
      date: "Oct 23, 2023",
      amount: "+$289.90",
      type: "credit",
      status: "Pending"
    },
    {
      id: "TXN-9919",
      desc: "Commission Fee",
      date: "Oct 23, 2023",
      amount: "-$12.45",
      type: "debit",
      status: "Completed"
    },
    {
      id: "TXN-9918",
      desc: "Settlement",
      date: "Oct 20, 2023",
      amount: "+$850.00",
      type: "credit",
      status: "Completed"
    },
    {
      id: "TXN-9917",
      desc: "Refund #ORD-7349",
      date: "Oct 20, 2023",
      amount: "-$67.25",
      type: "debit",
      status: "Completed"
    }
  ]

  const statusStyles: any = {
    Completed: "bg-green-100 text-green-700 border border-[#A4F4CF]",
    Pending: "bg-yellow-100 text-yellow-700 border border-[#FFF085]"
  }

  return (
    <div className="space-y-6">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>
          <h1 className="lg:text-[34px] text-3xl font-playfair font-semibold">
            Finance & Wallet
          </h1>

          <p className="text-[#6A7282] mt-2 lg:text-[18px] text-base">
            Manage your earnings, settlements, and payouts.
          </p>
        </div>

        <button className="flex items-center gap-2 border border-[#E5E7EB] rounded-lg px-4 py-2 bg-white shadow-sm">
          <Download size={18} />
          Download Statement
        </button>

      </div>



      <div className="grid lg:grid-cols-3 gap-6">

        <div className="rounded-lg lg:rounded-xl p-3 lg:p-6 bg-[#0F8A5F] text-white shadow-lg flex flex-col justify-between">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm opacity-80">Available Balance</p>
              <h2 className="text-[32px] font-playfair mt-2">$3,450.25</h2>
            </div>

            <div className="w-12 h-12 min-w-12 mt-3 flex items-center justify-center rounded-xl bg-white/20">
              <Wallet size={22} />
            </div>

          </div>

          <button className="mt-6 bg-white text-[#0F8A5F] rounded-lg py-2.5 font-medium">
            Withdraw Funds
          </button>

        </div>



        <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-3 lg:p-6 shadow-sm">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-[#6A7282] text-sm">Pending Clearance</p>
              <h2 className="text-[32px] font-playfair mt-2">$450.00</h2>
              <p className="text-[#6A7282] text-sm mt-6">
                Funds usually clear within 24–48 hours after delivery.
              </p>
            </div>

            <div className="w-12 h-12 min-w-12 mt-3 flex items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Clock size={22} />
            </div>

          </div>

        </div>



        <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-3 lg:p-6 shadow-sm">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-[#6A7282] text-sm">Next Payout</p>
              <h2 className="text-[32px] font-playfair mt-2">Oct 31</h2>
              <p className="text-[#6A7282] text-sm mt-6">
                Estimated amount: $1,200.00
              </p>
            </div>

            <div className="w-12 h-12 min-w-12 mt-3 flex items-center justify-center rounded-xl bg-orange-100 text-[#F54900]">
              <Calendar size={22} />
            </div>

          </div>

        </div>

      </div>



      <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-3 lg:p-6 shadow-sm">

        <div className="mb-6">
          <h3 className="font-playfair text-xl">Transaction History</h3>
          <p className="text-[#6A7282] text-sm mt-1">
            Recent earnings and deductions
          </p>
        </div>



        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead className="border-b text-[#6A7282] text-sm">

              <tr>
                <th className="py-3 text-sm font-medium text-[#62748E]">
                  TRANSACTION ID
                </th>

                <th className="py-3 text-sm font-medium text-[#62748E]">
                  DESCRIPTION
                </th>

                <th className="py-3 text-sm font-medium text-[#62748E]">
                  DATE
                </th>

                <th className="py-3 text-sm font-medium text-[#62748E] text-end">
                  AMOUNT
                </th>

                <th className="py-3 text-sm font-medium text-[#62748E] text-end">
                  STATUS
                </th>
              </tr>

            </thead>



            <tbody>

              {transactions.map((t, i) => (

                <tr key={i} className="border-b last:border-none">

                  <td className="py-4 text-[#6A7282]">
                    {t.id}
                  </td>

                  <td className="py-4 text-[#111827] font-medium">
                    {t.desc}
                  </td>

                  <td className="py-4 text-[#6A7282]">
                    {t.date}
                  </td>

                  <td
                    className={`py-4 text-end ${
                      t.type === "credit"
                        ? "text-green-600"
                        : "text-[#111827]"
                    }`}
                  >
                    {t.amount}
                  </td>

                  <td className="py-4 text-end">

                    <span
                      className={`px-3 py-1 rounded-full text-xs ${statusStyles[t.status]}`}
                    >
                      {t.status}
                    </span>

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