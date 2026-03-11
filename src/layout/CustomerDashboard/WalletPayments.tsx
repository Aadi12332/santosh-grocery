import { Wallet, Plus, ArrowUpRight, CreditCard, Gift, Clock, ArrowUpRight as Out, ArrowDownLeft } from "lucide-react"

export default function WalletPayments() {

  const activities = [
    { title: "Order Payment", date: "Oct 24, 2023", amount: "-$35.00", type: "debit" },
    { title: "Refund Processed", date: "Oct 23, 2023", amount: "+$32.00", type: "credit" },
    { title: "Order Payment", date: "Oct 22, 2023", amount: "-$55.00", type: "debit" },
    { title: "Refund Processed", date: "Oct 21, 2023", amount: "+$58.00", type: "credit" },
    { title: "Order Payment", date: "Oct 20, 2023", amount: "-$41.00", type: "debit" }
  ]

  return (
    <div className="space-y-8">

      <div>
        <h1 className="lg:text-[34px] text-[24px] font-playfair font-medium text-[#0F172A]">
          Wallet & Payments
        </h1>
        <p className="text-[#6A7282] mt-1 lg:text-lg text-base">
          Manage payment methods, view balance, and track transactions.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-6">

        <div className="space-y-6">

          <div className="border border-[#D1FAE5] bg-gradient-to-br from-white to-[#ECFDF580] lg:rounded-2xl rounded-lg lg:p-8 p-3 shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] flex justify-between items-start">

            <div>
              <p className="text-[#009966] tracking-widest text-sm mb-3">
                HUBNEPA BALANCE
              </p>

              <h2 className="font-playfair text-[32px] lg:text-[52px] text-[#0F172A]">
                $1,240.50
              </h2>

              <div className="flex lg:gap-4 gap-2 mt-6">

                <button className="flex items-center gap-2 lg:px-5 px-3 lg:text-base text-sm min-w-max lg:py-3 py-1.5 bg-[#009966] text-white rounded-lg shadow-sm">
                  <Plus size={18}/>
                  Top Up Wallet
                </button>

                <button className="flex items-center gap-2 lg:px-5 px-3 lg:text-base text-sm lg:py-3 py-1.5 border border-[#D1FAE5] text-[#009966] rounded-lg shadow-sm">
                  <ArrowUpRight size={18}/>
                  Withdraw
                </button>

              </div>

            </div>

            <div className="w-14 h-14 rounded-xl bg-[#ECFDF5] flex items-center justify-center">
              <Wallet className="text-[#009966]"/>
            </div>

          </div>


          <div className="grid md:grid-cols-2 gap-6">

            <div className="border border-[#E5E7EB] lg:rounded-2xl rounded-lg lg:p-8 p-3 bg-white shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]">

              <div className="flex items-center gap-2 mb-5">
                <CreditCard size={18}/>
                <h3 className="font-playfair text-xl text-[#0F172A]">
                  Saved Cards
                </h3>
              </div>

              <div className="border border-[#D1FAE5] rounded-xl p-4 flex items-center justify-between mb-3">

                <div className="flex items-center gap-3">

                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    VISA
                  </span>

                  <span className="text-[#0F172A]">
                    •••• 4291
                  </span>

                  <span className="text-xs bg-[#D1FAE5] text-[#009966] px-2 py-1 rounded-full">
                    Primary
                  </span>

                </div>

              </div>

              <div className="border border-[#E5E7EB] rounded-xl p-4 flex items-center gap-3 mb-4">

                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                  MC
                </span>

                <span className="text-[#6A7282]">
                  •••• 8823
                </span>

              </div>

              <button className="w-full border border-[#E5E7EB] rounded-lg py-3 text-[#6A7282]">
                + Add New Card
              </button>

            </div>


            <div className="border border-[#E5E7EB] lg:rounded-2xl rounded-lg lg:p-8 p-3 bg-white shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]">

              <div className="flex items-center gap-2 mb-5">
                <Gift size={18}/>
                <h3 className="font-playfair text-xl text-[#0F172A]">
                  Vouchers
                </h3>
              </div>

              <div className="flex gap-2 mb-4">

                <input
                  placeholder="Enter code"
                  className="flex-1 border border-[#E5E7EB] rounded-lg px-3 py-2 outline-none"
                />

                <button className="bg-[#0F172A] text-white px-4 rounded-lg">
                  Apply
                </button>

              </div>

              <div className="bg-[#F1F5F9] rounded-lg p-3 flex justify-between mb-3">

                <span className="text-[#009966] font-semibold">
                  WELCOME50
                </span>

                <span className="text-[#6A7282] text-sm">
                  Expires in 2 days
                </span>

              </div>

              <div className="bg-[#F1F5F9] rounded-lg p-3 flex justify-between">

                <span className="text-[#009966] font-semibold">
                  FREESHIP
                </span>

                <span className="text-[#6A7282] text-sm">
                  Active
                </span>

              </div>

            </div>

          </div>

        </div>


        <div className="border border-[#E5E7EB] lg:rounded-2xl rounded-lg lg:p-8 p-3 bg-white shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]">

          <div className="flex items-center gap-2 mb-6">
            <Clock size={18}/>
            <h3 className="font-playfair text-xl text-[#0F172A]">
              Recent Activity
            </h3>
          </div>

          <div className="space-y-6">

            {activities.map((a,i)=>(
              <div key={i} className="flex justify-between items-center">

                <div className="flex gap-3 items-center">

                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    a.type==="debit"
                    ? "bg-red-50 text-red-500"
                    : "bg-green-50 text-[#009966]"
                  }`}>
                    {a.type==="debit"
                      ? <Out size={18}/>
                      : <ArrowDownLeft size={18}/>
                    }
                  </div>

                  <div>

                    <p className="text-[#0F172A]">
                      {a.title}
                    </p>

                    <p className="text-sm text-[#6A7282]">
                      {a.date}
                    </p>

                  </div>

                </div>

                <span className={`font-semibold ${
                  a.type==="debit"
                  ? "text-[#0F172A]"
                  : "text-[#009966]"
                }`}>
                  {a.amount}
                </span>

              </div>
            ))}

          </div>

          <button className="text-[#6A7282] mt-6">
            View Full History
          </button>

        </div>

      </div>

    </div>
  )
}