import { DollarSign, Package, ShoppingBag, Clock, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"
import ChartsSection from "./ChartsSection"

const stats = [
  {
    title: "Total Revenue",
    value: "$12,345.00",
    change: "+12.5%",
    icon: DollarSign,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    trend: "up"
  },
  {
    title: "Total Orders",
    value: "1,245",
    change: "+5.2%",
    icon: ShoppingBag,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    trend: "up"
  },
  {
    title: "Total Products",
    value: "84",
    change: "-2.1%",
    icon: Package,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    trend: "down"
  },
  {
    title: "Pending Payments",
    value: "$450.00",
    change: "Due Today",
    icon: Clock,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    trend: "up"
  }
]

const orders = [
  { id:"#ORD-7352", customer:"Alex Morgan", amount:"$124.50", status:"Pending", date:"2 mins ago" },
  { id:"#ORD-7351", customer:"Sarah Smith", amount:"$45.00", status:"Processing", date:"15 mins ago" },
  { id:"#ORD-7350", customer:"James Doe", amount:"$289.90", status:"Delivered", date:"1 hour ago" },
  { id:"#ORD-7349", customer:"Emily Davis", amount:"$67.25", status:"Cancelled", date:"3 hours ago" },
  { id:"#ORD-7348", customer:"Michael Brown", amount:"$15.00", status:"Delivered", date:"5 hours ago" }
]

const statusStyles:any = {
  Pending:"bg-yellow-100 text-yellow-700",
  Processing:"bg-blue-100 text-blue-700",
  Delivered:"bg-green-100 text-green-700",
  Cancelled:"bg-red-100 text-red-700"
}

export default function RetailerDashboard({ setActiveTab }: { setActiveTab: (tab: string) => void }) {

  return (
    <div className="space-y-6">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">

        <div>
          <h1 className="lg:text-[34px] text-3xl font-playfair font-semibold">
            Dashboard
          </h1>

          <p className="text-[#6A7282] mt-2 lg:text-[18px] text-base">
            Welcome back! Here's what's happening with your store today.
          </p>
        </div>

        <div className="flex gap-3">

          <button onClick={() => setActiveTab("orders")} className="border border-[#E5E7EB] bg-white shadow-sm rounded-lg px-4 py-2 text-[#111827]">
            View Orders
          </button>

          <button onClick={() => setActiveTab("products")} className="bg-[#F97316] text-white rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm">
            + Add Product
          </button>

        </div>

      </div>


      <div className="grid lg:grid-cols-4 md:grid-cols-2 lg:gap-6 gap-3">

        {stats.map((s,i)=>{

          const Icon = s.icon

          return(
            <div
              key={i}
              className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-3 lg:p-6 shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]"
            >

              <div className="flex justify-between items-start">

                <div>

                  <p className="text-[#6A7282] text-sm">
                    {s.title}
                  </p>

                  <h3 className="font-playfair text-2xl mt-2">
                    {s.value}
                  </h3>

                </div>

                <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${s.iconBg}`}>
                  <Icon className={s.iconColor} size={18}/>
                </div>

              </div>

              <div className="flex items-center gap-2 mt-4 text-sm">

                {s.trend === "up" ? (
                  <ArrowUpRight className="text-green-600" size={16}/>
                ) : (
                  <ArrowDownRight className="text-red-600" size={16}/>
                )}

                <span className={`${s.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {s.change}
                </span>

                <span className="text-[#6A7282]">
                  vs last month
                </span>

              </div>

            </div>
          )
        })}

      </div>


<ChartsSection />


      <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-3 lg:p-6 shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]">

        <div className="flex items-center justify-between mb-6">

          <div>
            <h3 className="font-playfair text-xl">
              Recent Orders
            </h3>

            <p className="text-[#6A7282] text-sm">
              Latest transactions from your store
            </p>
          </div>

          <button className="text-[#F97316] font-medium">
            View All
          </button>

        </div>


        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead className="text-[#6A7282] text-sm border-b">

              <tr>
                <th className="py-3">ORDER ID</th>
                <th className="py-3">CUSTOMER</th>
                <th className="py-3">AMOUNT</th>
                <th className="py-3">STATUS</th>
                <th className="py-3">DATE</th>
              </tr>

            </thead>

            <tbody>

              {orders.map((o,i)=>(
                <tr key={i} className="border-b last:border-none">

                  <td className="py-4">{o.id}</td>
                  <td className="py-4">{o.customer}</td>
                  <td className="py-4">{o.amount}</td>

                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${statusStyles[o.status]}`}>
                      {o.status}
                    </span>
                  </td>

                  <td className="py-4 text-[#6A7282]">
                    {o.date}
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