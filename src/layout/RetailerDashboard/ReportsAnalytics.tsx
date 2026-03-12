import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Calendar, Download } from "lucide-react"

export default function ReportsAnalytics() {

  const revenueData = [
    { day: "Mon", value: 450 },
    { day: "Tue", value: 320 },
    { day: "Wed", value: 550 },
    { day: "Thu", value: 480 },
    { day: "Fri", value: 600 },
    { day: "Sat", value: 860 },
    { day: "Sun", value: 700 }
  ]

  const categoryData = [
    { name: "Dairy", value: 35, color: "#10B981" },
    { name: "Bakery", value: 25, color: "#F97316" },
    { name: "Produce", value: 20, color: "#3B82F6" },
    { name: "Pantry", value: 15, color: "#8B5CF6" },
    { name: "Others", value: 5, color: "#64748B" }
  ]

  const products = [
    { rank: "#1", name: "Organic Whole Milk", units: 1240, revenue: "$6,200", performance: 90 },
    { rank: "#2", name: "Artisan Sourdough Bread", units: 850, revenue: "$7,225", performance: 80 },
    { rank: "#3", name: "Fresh Avocados", units: 600, revenue: "$4,194", performance: 70 },
    { rank: "#4", name: "Premium Olive Oil", units: 420, revenue: "$10,495", performance: 60 },
    { rank: "#5", name: "Truffle Cheese", units: 380, revenue: "$7,216", performance: 50 }
  ]

  return (
    <div className="space-y-6">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>
          <h1 className="lg:text-[34px] text-3xl font-playfair font-semibold">
            Reports & Analytics
          </h1>

          <p className="text-[#6A7282] mt-2 lg:text-[18px] text-base">
            Deep dive into your sales performance and trends.
          </p>
        </div>

        <div className="flex gap-3">

          <button className="flex items-center gap-2 border border-[#E5E7EB] rounded-lg px-4 py-2 bg-white">
            <Calendar size={18}/>
            Last 7 Days
          </button>

          <button className="flex items-center gap-2 bg-[#F54900] text-white rounded-lg px-4 py-2">
            <Download size={18}/>
            Export Report
          </button>

        </div>

      </div>



      <div className="grid lg:grid-cols-[2fr_1fr] gap-6">

        <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-3 lg:p-6 shadow-sm">

          <h3 className="font-playfair text-xl">Revenue Overview</h3>
          <p className="text-[#6A7282] text-sm mb-6">
            Daily sales breakdown
          </p>

          <div className="h-[360px] -ml-3">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={revenueData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>

                <XAxis dataKey="day"/>
                <YAxis/>
                <Tooltip/>

                <Bar
                  dataKey="value"
                  fill="#F97316"
                  radius={[6,6,0,0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>



        <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-3 lg:p-6 shadow-sm">

          <h3 className="font-playfair text-xl">Sales by Category</h3>
          <p className="text-[#6A7282] text-sm mb-6">
            Distribution of product sales
          </p>

          <div className="h-[200px] flex items-center justify-center">

            <ResponsiveContainer width={200} height={200}>

              <PieChart>

                <Pie
                  data={categoryData}
                  dataKey="value"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={4}
                >
                  {categoryData.map((c, i) => (
                    <Cell key={i} fill={c.color}/>
                  ))}
                </Pie>

              </PieChart>

            </ResponsiveContainer>

          </div>



          <div className="space-y-2 mt-4">

            {categoryData.map((c,i)=>(
              <div key={i} className="flex items-center justify-between text-sm">

                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{background:c.color}}
                  />
                  {c.name}
                </div>

                <span>{c.value}%</span>

              </div>
            ))}

          </div>

        </div>

      </div>



      <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-3 lg:p-6 shadow-sm">

        <div className="flex items-center justify-between mb-6">

          <div>
            <h3 className="font-playfair text-xl">
              Best Selling Products
            </h3>

            <p className="text-[#6A7282] text-sm">
              Top performers by revenue this month
            </p>
          </div>

          <button className="text-[#F54900] font-medium">
            View All Report →
          </button>

        </div>



        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead className="border-b text-[#6A7282] text-sm">

              <tr>
                <th className="py-3">PRODUCT NAME</th>
                <th className="py-3">UNITS SOLD</th>
                <th className="py-3">TOTAL REVENUE</th>
                <th className="py-3">PERFORMANCE</th>
              </tr>

            </thead>



            <tbody>

              {products.map((p,i)=>(
                <tr key={i} className="border-b last:border-none">

                  <td className="py-4">

                    <div className="flex items-center gap-3">

                      <span className="bg-gray-100 text-sm px-3 py-2 border border-[#E2E8F0] rounded">
                        {p.rank}
                      </span>

                      {p.name}

                    </div>

                  </td>

                  <td className="py-4 text-[#374151]">
                    {p.units}
                  </td>

                  <td className="py-4 text-green-600 font-semibold">
                    {p.revenue}
                  </td>

                  <td className="py-4">

                    <div className="w-[120px] h-2 bg-gray-200 rounded">

                      <div
                        className="h-2 bg-[#F54900] rounded"
                        style={{width:`${p.performance}%`}}
                      />

                    </div>

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