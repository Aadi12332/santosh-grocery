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
} from "recharts";

import {
  Calendar,
  Download,
  DollarSign,
  Package,
  Users,
  TrendingDown,
  Filter,
  Receipt,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

const stats = [
  {
    icon: DollarSign,
    label: "Total Revenue",
    value: "$12,845.50",
    change: "+12.5%",
    color: "text-green-600",
  },
  {
    icon: Package,
    label: "Total Orders",
    value: "854",
    change: "+6.2%",
    color: "text-blue-600",
  },
  {
    icon: DollarSign,
    label: "Avg. Order Value",
    value: "$32.40",
    change: "-2.4%",
    color: "text-orange-500",
  },
  {
    icon: Users,
    label: "New Customers",
    value: "128",
    change: "+16.3%",
    color: "text-purple-600",
  },
];

const revenueData = [
  { day: "Mon", value: 4000 },
  { day: "Tue", value: 2900 },
  { day: "Wed", value: 2000 },
  { day: "Thu", value: 2800 },
  { day: "Fri", value: 1900 },
  { day: "Sat", value: 2500 },
  { day: "Sun", value: 3500 },
];

const categoryData = [
  {
    name: "Starters",
    amount: "$8,500",
    percent: "25%",
    value: 43,
    color: "#10B981",
  },
  {
    name: "Mains",
    amount: "$6,200",
    percent: "45%",
    value: 32,
    color: "#3B82F6",
  },
  {
    name: "Drinks",
    amount: "$3,400",
    percent: "20%",
    value: 17,
    color: "#F59E0B",
  },
  {
    name: "Desserts",
    amount: "$1,450",
    percent: "10%",
    value: 7,
    color: "#EF4444",
  },
];

const categoryExpense = [
  { name: "Food Supplies", amount: "4250.00", percent: "32.5%" },
  { name: "Staff Salary", amount: "3800.00", percent: "29.1%" },
  { name: "Kitchen Supplies", amount: "1200.00", percent: "9.2%" },
  { name: "Cleaning Supplies", amount: "650.00", percent: "5.0%" },
  { name: "Laundry Supplies", amount: "420.00", percent: "3.2%" },
  { name: "Maintenance", amount: "950.00", percent: "7.3%" },
  { name: "Emergency Maintenance", amount: "300.00", percent: "2.3%" },
  { name: "Office Supplies", amount: "280.00", percent: "2.1%" },
  { name: "Catering Supplies", amount: "450.00", percent: "3.4%" },
  { name: "Beverage", amount: "520.00", percent: "4.0%" },
  { name: "Other", amount: "250.00", percent: "1.9%" }
]

const expenseList = [
  { title: "Vegetable Supply", category: "Food Supplies", amount: "1850.00", entries: 12 },
  { title: "Meat & Poultry", category: "Food Supplies", amount: "2400.00", entries: 8 },
  { title: "Staff Wages", category: "Staff Salary", amount: "3800.00", entries: 15 },
  { title: "Kitchen Equipment", category: "Kitchen Supplies", amount: "800.00", entries: 3 },
  { title: "Utensils & Cookware", category: "Kitchen Supplies", amount: "400.00", entries: 5 },
  { title: "Cleaning Products", category: "Cleaning Supplies", amount: "450.00", entries: 6 }
]

const topItems = [
  { name: "Grilled Norwegian Salmon", orders: 145, revenue: "3552.50" },
  { name: "Crispy Buffalo Wings", orders: 128, revenue: "1662.72" },
  { name: "Double Cheeseburger", orders: 98, revenue: "1567.02" },
  { name: "Mushroom Risotto", orders: 85, revenue: "1530.00" },
  { name: "Spicy Pepperoni Pizza", orders: 76, revenue: "1254.00" }
]

const peakData = [
  { time: "11am", value: 25 },
  { time: "1pm", value: 45 },
  { time: "3pm", value: 32 },
  { time: "5pm", value: 38 },
  { time: "7pm", value: 68 },
  { time: "9pm", value: 82 },
  { time: "11pm", value: 58 }
]

export default function ReportsAnalytics() {
  const change = "-3.2%";
  const isNegative = change.includes("-");
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="lg:text-[34px] text-3xl font-playfair font-semibold">
            Reports & Analytics
          </h1>

          <p className="text-[#6A7282] mt-2">
            Track your restaurant's performance, revenue, and customer insights.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 border border-[#E5E7EB] rounded-lg px-4 py-2 bg-white">
            <Calendar size={18} />

            <select name="" id="" className="outline-none">
              <option value="">Last 7 Days</option>
              <option value="">Last 30 Days</option>
              <option value="">Last 90 Days</option>
            </select>
          </button>

          <button className="flex items-center gap-2 bg-[#2563EB] text-white rounded-lg px-4 py-2">
            <Download size={18} />
            Export PDF
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => {
          const Icon = s.icon;
          const isNegative = s.change.includes("-");

          return (
            <div
              key={i}
              className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <Icon size={18} className={s.color} />
                <p className="text-[#64748B] text-sm font-medium">{s.label}</p>
              </div>

              <p className="text-2xl font-semibold text-[#0F172A]">{s.value}</p>

              <p
                className={`text-sm mt-2 flex items-center gap-1 ${isNegative ? "text-red-500" : "text-green-600"}`}
              >
                {isNegative ? (
                  <>
                    <TrendingDown size={16} />
                  </>
                ) : (
                  <>
                    <TrendingUp size={16} />
                  </>
                )}
                {s.change}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <div className="border border-l-[4px] border-[#FB2C36] rounded-xl p-6 bg-white">
          <div className="flex items-center gap-2 mb-3">
            <Receipt size={18} className="text-red-500" />
            <p className="text-[#64748B] text-sm font-medium">
              Total Monthly Expense
            </p>
          </div>

          <p className="text-3xl font-semibold text-[#0F172A]">$13,070.00</p>

          <p
            className={`text-sm mt-2 flex items-center gap-1 ${isNegative ? "text-red-500" : "text-green-600"
              }`}
          >
            {isNegative ? <TrendingDown size={16} /> : <TrendingUp size={16} />}
            {change} vs last period
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
        <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-playfair text-lg text-[#111827]">
              Revenue Trends
            </h3>

            <button className="text-blue-600 text-sm font-medium">
              View Details
            </button>
          </div>

          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <XAxis
                  dataKey="day"
                  axisLine={true}
                  tickLine={true}
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                />

                <YAxis
                  axisLine={true}
                  tickLine={true}
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-6">
          <h3 className="font-playfair text-lg text-[#111827] mb-4">
            Sales Mix
          </h3>

          <div className="flex justify-center">
            <ResponsiveContainer width={200} height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={2}
                  stroke="none"
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
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ background: c.color }}
                  />

                  <p className="text-sm text-[#475569]">{c.name}</p>
                </div>

                <p className="text-sm font-medium text-[#111827]">
                  {c.percent}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10">

        <h2 className="text-lg font-playfair font-semibold text-[#111827] mb-3">
          Expense Overview
        </h2>

        <div className="grid lg:grid-cols-2 gap-6">

          <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-6">

            <h3 className="text-lg font-medium text-[#111827] mb-4">
              Expense by Category
            </h3>

            <div className="text-sm">

              <div className="grid grid-cols-3 text-[#64748B] border-b pb-3 mb-3">
                <p>CATEGORY</p>
                <p className="text-right">TOTAL EXPENSE</p>
                <p className="text-right">% OF TOTAL</p>
              </div>

              {categoryExpense.map((item, i) => (
                <div
                  key={i}
                  className="grid grid-cols-3 py-3 border-b last:border-2"
                >
                  <p className="text-[#111827]">{item.name}</p>
                  <p className="text-right">${item.amount}</p>
                  <p className="text-right text-[#475569]">{item.percent}</p>
                </div>
              ))}

              <div className="grid grid-cols-3 pt-4 mt-2 font-semibold">
                <p>Total</p>
                <p className="text-right">$13070.00</p>
                <p className="text-right">100.0%</p>
              </div>

            </div>

          </div>

          <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-6">

            <h3 className="text-lg font-medium text-[#111827] mb-4">
              Expense by Title
            </h3>

            <div className="text-sm">

              <div className="grid grid-cols-4 text-[#64748B] border-b pb-3 mb-3">
                <p>EXPENSE TITLE</p>
                <p>CATEGORY</p>
                <p className="text-right">AMOUNT</p>
                <p className="text-right">ENTRIES</p>
              </div>

              {expenseList.map((item, i) => (
                <div
                  key={i}
                  className="grid grid-cols-4 py-3 border-b last:border-none"
                >
                  <p className="text-[#111827] break-words">{item.title}</p>
                  <p className="text-[#475569]">{item.category}</p>
                  <p className="text-right">${item.amount}</p>
                  <p className="text-right">{item.entries}</p>
                </div>
              ))}

            </div>

          </div>

        </div>

      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-6">

  <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-6">

    <h3 className="text-lg font-medium text-[#111827] mb-4">
      Top Selling Items
    </h3>

    <div className="text-sm">

      <div className="grid grid-cols-3 text-[#64748B] border-b pb-3 mb-3">
        <p>ITEM NAME</p>
        <p className="text-right">ORDERS</p>
        <p className="text-right">REVENUE</p>
      </div>

      {topItems.map((item, i) => (
        <div
          key={i}
          className="grid grid-cols-3 py-3 border-b last:border-none"
        >
          <p className="text-[#111827]">{item.name}</p>
          <p className="text-right">{item.orders}</p>
          <p className="text-right">${item.revenue}</p>
        </div>
      ))}

    </div>

    <div className="text-center mt-6">
      <button className="text-blue-600 text-sm font-medium">
        View All Items →
      </button>
    </div>

  </div>


  <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-6">

    <h3 className="text-lg font-medium text-[#111827] mb-4">
      Peak Hours
    </h3>

    <div className="h-[350px]">

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={peakData}>

          <XAxis
            dataKey="time"
            axisLine={true}
            tickLine={true}
            tick={{ fill: '#94A3B8', fontSize: 12 }}
          />

          <YAxis
            axisLine={true}
            tickLine={true}
            tick={{ fill: '#94A3B8', fontSize: 12 }}
          />

          <Tooltip />

          <Bar
            dataKey="value"
            fill="#3B82F6"
            radius={[6, 6, 0, 0]}
          />

        </BarChart>
      </ResponsiveContainer>

    </div>

  </div>

</div>
    </div>
  );
}
