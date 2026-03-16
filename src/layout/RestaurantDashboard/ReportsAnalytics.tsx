import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts"

import {
  Calendar,
  Download,
  DollarSign,
  Package,
  Users,
  TrendingDown, Filter
} from "lucide-react"
import { useState } from "react"

const stats = [
  {
    icon: DollarSign,
    label: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    color: "text-blue-600",
    bg: "bg-blue-100"
  },
  {
    icon: Package,
    label: "Total Orders",
    value: "356",
    change: "+12.5%",
    color: "text-green-600",
    bg: "bg-green-100"
  },
  {
    icon: Users,
    label: "Active Clients",
    value: "28",
    change: "+4.3%",
    color: "text-gray-800",
    bg: "bg-gray-100"
  },
  {
    icon: TrendingDown,
    label: "Return Rate",
    value: "2.4%",
    change: "-0.5%",
    color: "text-orange-500",
    bg: "bg-orange-100"
  }
]

const revenueData = [
  { day: "Mon", value: 4000 },
  { day: "Tue", value: 2900 },
  { day: "Wed", value: 2000 },
  { day: "Thu", value: 2800 },
  { day: "Fri", value: 1900 },
  { day: "Sat", value: 2500 },
  { day: "Sun", value: 3500 }
]

const categoryData = [
  {
    name: "Fresh Produce",
    amount: "$8,500",
    percent: "43%",
    value: 43,
    color: "#2563EB"
  },
  {
    name: "Meat & Poultry",
    amount: "$6,200",
    percent: "32%",
    value: 32,
    color: "#10B981"
  },
  {
    name: "Dairy",
    amount: "$3,400",
    percent: "17%",
    value: 17,
    color: "#F59E0B"
  },
  {
    name: "Grains",
    amount: "$1,450",
    percent: "7%",
    value: 7,
    color: "#6366F1"
  }
]

const products = [
  {
    name: "Premium Avocado Box (50ct)",
    volume: "124 units",
    revenue: "$6,200",
    growth: "+12%"
  },
  {
    name: "Organic Chicken Breast",
    volume: "98 units",
    revenue: "$4,900",
    growth: "+8%"
  },
  {
    name: "Grass-fed Ribeye",
    volume: "85 units",
    revenue: "$12,750",
    growth: "+15%"
  },
  {
    name: "Basmati Rice (20kg)",
    volume: "76 units",
    revenue: "$2,280",
    growth: "+5%"
  },
  {
    name: "Atlantic Salmon Fillet",
    volume: "62 units",
    revenue: "$8,680",
    growth: "+22%"
  }
]

const growthData = [
  { month: "Jan", new: 4, returning: 12 },
  { month: "Feb", new: 6, returning: 15 },
  { month: "Mar", new: 3, returning: 18 },
  { month: "Apr", new: 8, returning: 22 },
  { month: "May", new: 5, returning: 24 },
  { month: "Jun", new: 9, returning: 28 }
]

const statusData = [
  { name: "Active", value: 65, color: "#10B981" },
  { name: "At Risk", value: 20, color: "#F59E0B" },
  { name: "Inactive", value: 15, color: "#EF4444" }
]

const clients = [
  {
    name: "Urban Bistro Group",
    orders: "45 orders",
    revenue: "$12,450",
    last: "2 days ago",
    status: "Active"
  },
  {
    name: "Whole Foods Local",
    orders: "32 orders",
    revenue: "$8,900",
    last: "1 day ago",
    status: "Active"
  },
  {
    name: "Sushi Zen",
    orders: "28 orders",
    revenue: "$7,200",
    last: "5 days ago",
    status: "Active"
  },
  {
    name: "Green Grocers",
    orders: "15 orders",
    revenue: "$3,100",
    last: "24 days ago",
    status: "At Risk"
  },
  {
    name: "Daily Mart",
    orders: "12 orders",
    revenue: "$2,800",
    last: "45 days ago",
    status: "Inactive"
  }
]

const statusStyles = {
  Active: "bg-green-100 text-green-700",
  "At Risk": "bg-yellow-100 text-yellow-700",
  Inactive: "bg-red-100 text-red-600"
}

export default function ReportsAnalytics() {
  const [activeReportTab, setActiveReportTab] = useState("Sales Analysis")

  return (

    <div className="space-y-6">

      <div className="flex justify-between items-start">

        <div>

          <h1 className="lg:text-[34px] text-3xl font-playfair font-semibold">
            Reports & Analytics
          </h1>

          <p className="text-[#6A7282] mt-2">
            Deep dive into your business performance.
          </p>

        </div>

        <div className="flex gap-3">

          <button className="flex items-center gap-2 border border-[#E5E7EB] rounded-lg px-4 py-2 bg-white">

            <Calendar size={18} />

            Last 7 Days

          </button>

          <button className="flex items-center gap-2 bg-[#2563EB] text-white rounded-lg px-4 py-2">

            <Download size={18} />

            Export PDF

          </button>

        </div>

      </div>



      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        {stats.map((s, i) => {

          const Icon = s.icon

          return (

            <div
              key={i}
              className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-6 shadow-sm"
            >

              <div className="flex justify-between items-center mb-4">

                <div className={`p-2 rounded-lg ${s.bg}`}>
                  <Icon size={20} className={s.color} />
                </div>

                <span className="text-green-600 text-sm bg-green-100 px-2 py-1 rounded-full">
                  {s.change}
                </span>

              </div>

              <p className="text-[#64748B] text-sm">
                {s.label}
              </p>

              <p className="text-2xl font-playfair font-semibold mt-1">
                {s.value}
              </p>

            </div>

          )

        })}

      </div>



      <div className="flex bg-[#fff] border border-[#E2E8F0] rounded-lg p-1 w-full">

        {["Sales Analysis", "Product Performance", "Client Insights"].map((t, i) => (

          <button
            key={i}
            onClick={() => setActiveReportTab(t)}
            className={`px-6 py-2 rounded-lg text-sm flex-1 transition ${activeReportTab === t
              ? "bg-[#EFF6FF] border border-[#00000000] text-[#1447E6]"
              : "text-[#020617]"
              }`}
          >
            {t}
          </button>

        ))}

      </div>

      {activeReportTab === "Sales Analysis" && (
        <div className="grid lg:grid-cols-[2fr_1fr] gap-6 items-start">

          <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-6 shadow-sm">

            <h3 className="font-playfair text-xl">
              Revenue Trends
            </h3>

            <p className="text-[#6A7282] text-sm mb-6">
              Daily revenue performance over time
            </p>

            <div className="h-[320px]">

              <ResponsiveContainer width="100%" height="100%">

                <LineChart data={revenueData}>

                  <XAxis dataKey="day" />

                  <YAxis />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#2563EB"
                    strokeWidth={3}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </div>



          <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-6 shadow-sm">

            <h3 className="font-playfair text-xl">
              Sales by Category
            </h3>

            <p className="text-[#6A7282] text-sm mb-6">
              Revenue distribution by product type
            </p>

            <div className="flex justify-center">

              <ResponsiveContainer width={220} height={220}>

                <PieChart>

                  <Pie
                    data={categoryData}
                    dataKey="value"
                    innerRadius={75}
                      outerRadius={100}
                    paddingAngle={3}
                  >

                    {categoryData.map((c, i) => (
                      <Cell key={i} fill={c.color} />
                    ))}

                  </Pie>

                </PieChart>

              </ResponsiveContainer>

            </div>



            <div className="space-y-3 mt-6">

              {categoryData.map((c, i) => (

                <div key={i} className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ background: c.color }}
                    />

                    <div className="text-sm">

                      <p className="text-[#111827]">
                        {c.name}
                      </p>

                    </div>

                  </div>

                  <div className="text-right text-sm">

                    <p className="font-medium">
                      {c.amount}
                    </p>

                    <p className="text-[#64748B]">
                      {c.percent}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>
      )}

      {activeReportTab === "Product Performance" && (
        <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-3 lg:p-6 shadow-sm">

          <div className="flex justify-between items-start mb-6">

            <div>

              <h3 className="font-playfair text-xl">
                Top Performing Products
              </h3>

              <p className="text-[#6A7282] text-sm">
                Best selling items by volume and revenue
              </p>

            </div>

            <button className="flex items-center gap-2 border border-[#E5E7EB] rounded-lg px-4 py-2 bg-white">

              <Filter size={16} />

              Filter

            </button>

          </div>



          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead className="bg-[#F8FAFC] text-[#64748B] text-sm">

                <tr>

                  <th className="py-4 px-4">
                    PRODUCT NAME
                  </th>

                  <th className="py-4 px-4">
                    SALES VOLUME
                  </th>

                  <th className="py-4 px-4">
                    TOTAL REVENUE
                  </th>

                  <th className="py-4 px-4">
                    GROWTH (MOM)
                  </th>

                  <th className="py-4 px-4 text-right">
                    ACTION
                  </th>

                </tr>

              </thead>



              <tbody>

                {products.map((p, i) => (

                  <tr key={i} className="border-t">

                    <td className="py-5 px-4 text-[#111827] font-medium">
                      {p.name}
                    </td>

                    <td className="py-5 px-4 text-[#64748B]">
                      {p.volume}
                    </td>

                    <td className="py-5 px-4 text-green-600 font-semibold">
                      {p.revenue}
                    </td>

                    <td className="py-5 px-4">

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-md text-sm">
                        {p.growth}
                      </span>

                    </td>

                    <td className="py-5 px-4 text-right">

                      <button className="text-[#2563EB] font-medium">
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

      {activeReportTab === "Client Insights" && (
        <div>
          <div className="grid lg:grid-cols-[2fr_1fr] gap-5 mb-5">

            <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-6 shadow-sm">

              <h3 className="font-playfair text-xl">
                Client Growth
              </h3>

              <p className="text-[#6A7282] text-sm mb-6">
                New vs Returning Clients over the last 6 months
              </p>

              <div className="h-[300px]">

                <ResponsiveContainer width="100%" height="100%">

                  <BarChart data={growthData}>

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Bar dataKey="new" fill="#3B82F6" radius={[4, 4, 0, 0]} />

                    <Bar dataKey="returning" fill="#10B981" radius={[4, 4, 0, 0]} />

                  </BarChart>

                </ResponsiveContainer>

              </div>

              <div className="flex gap-6 mt-4 text-sm">

                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-[#3B82F6] rounded" />
                  New Clients
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-[#10B981] rounded" />
                  Returning Clients
                </div>

              </div>

            </div>

            <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-6 shadow-sm">

              <h3 className="font-playfair text-xl">
                Client Status
              </h3>

              <p className="text-[#6A7282] text-sm mb-6">
                Distribution of client engagement
              </p>

              <div className="flex justify-center">

                <ResponsiveContainer width={200} height={200}>

                  <PieChart>

                    <Pie
                      data={statusData}
                      dataKey="value"
                      innerRadius={75}
                      outerRadius={100}
                      paddingAngle={3}
                    >

                      {statusData.map((s, i) => (
                        <Cell key={i} fill={s.color} />
                      ))}

                    </Pie>

                  </PieChart>

                </ResponsiveContainer>

              </div>

              <div className="text-center -mt-32 mb-10">

                <h2 className="text-3xl font-semibold">
                  28
                </h2>

                <p className="text-sm text-[#6A7282]">
                  TOTAL CLIENTS
                </p>

              </div>

              <div className="space-y-2 mt-24">

                {statusData.map((s, i) => (

                  <div key={i} className="flex items-center justify-between">

                    <div className="flex items-center gap-2">

                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ background: s.color }}
                      />

                      {s.name}

                    </div>

                    <span>{s.value}%</span>

                  </div>

                ))}

              </div>

            </div>

          </div>

          <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-6 shadow-sm">

            <div className="flex justify-between items-start mb-6">

              <div>

                <h3 className="font-playfair text-xl">
                  Top Clients by Revenue
                </h3>

                <p className="text-[#6A7282] text-sm">
                  Highest value partnerships and their current status
                </p>

              </div>

              <button className="border border-[#E5E7EB] px-4 py-2 rounded-lg">
                View All Clients
              </button>

            </div>

            <table className="w-full text-left">

              <thead className="bg-[#F8FAFC] text-sm text-[#64748B]">

                <tr>

                  <th className="py-4 px-4">CLIENT NAME</th>
                  <th className="py-4 px-4">TOTAL ORDERS</th>
                  <th className="py-4 px-4">TOTAL REVENUE</th>
                  <th className="py-4 px-4">LAST ORDER</th>
                  <th className="py-4 px-4">STATUS</th>
                  <th className="py-4 px-4">ACTIONS</th>

                </tr>

              </thead>

              <tbody>

                {clients.map((c, i) => (

                  <tr key={i} className="border-t">

                    <td className="py-5 px-4 font-medium">
                      {c.name}
                    </td>

                    <td className="py-5 px-4 text-[#64748B]">
                      {c.orders}
                    </td>

                    <td className="py-5 px-4 text-green-600 font-semibold">
                      {c.revenue}
                    </td>

                    <td className="py-5 px-4 text-[#64748B]">
                      {c.last}
                    </td>

                    <td className="py-5 px-4">

                      <span className={`px-3 py-1 rounded-md text-sm ${statusStyles[c.status as keyof typeof statusStyles]}`}>
                        {c.status}
                      </span>

                    </td>

                    <td className="py-5 px-4 text-[#64748B]">
                      •••
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        </div>
      )}

    </div>

  )

}