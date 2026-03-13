import {
  Package,
  AlertTriangle,
  DollarSign,
  Truck,
  Info,
  CheckCircle,
  Clock,
  Trash2
} from "lucide-react"

const filters = [
  { label: "All Notifications" },
  { label: "Unread", count: 2 },
  { label: "Orders" },
  { label: "Alerts & Stock" },
  { label: "Finance" }
]

const notifications = [
  {
    title: "New Bulk Order Received",
    desc: "Urban Bistro Group has placed a new bulk order #ORD-3829 for 50 items.",
    time: "10 min ago",
    icon: Package,
    color: "#2563EB",
    bg: "bg-[#EFF6FF]",
    unread: true
  },
  {
    title: "Low Stock Warning: Organic Avocados",
    desc: "Stock level for 'Organic Avocados' has fallen below the threshold (20 units remaining).",
    time: "45 min ago",
    icon: AlertTriangle,
    color: "#F97316",
    bg: "bg-[#FFF7ED]",
    unread: true
  },
  {
    title: "Payout Processed Successfully",
    desc: "Your payout request of $4,500 has been processed and sent to your bank account.",
    time: "2 hours ago",
    icon: DollarSign,
    color: "#10B981",
    bg: "bg-[#ECFDF5]"
  },
  {
    title: "Shipment Delivered",
    desc: "Shipment #SHP-9921 for Order #ORD-3810 has been successfully delivered to the client.",
    time: "5 hours ago",
    icon: Truck,
    color: "#6366F1",
    bg: "bg-[#EEF2FF]"
  },
  {
    title: "System Maintenance Scheduled",
    desc: "The platform will undergo scheduled maintenance on Sunday, Feb 12th from 2AM to 4AM EST.",
    time: "1 day ago",
    icon: Info,
    color: "#64748B",
    bg: "bg-[#F1F5F9]"
  },
  {
    title: "New Client Registration",
    desc: "A new client 'Green Earth Grocers' has requested to partner with you.",
    time: "1 day ago",
    icon: CheckCircle,
    color: "#16A34A",
    bg: "bg-[#ECFDF5]"
  }
]

export default function Notifications() {

  return (

    <div className="space-y-5">

      <div className="flex justify-between items-start flex-wrap gap-5">

        <div>

          <h1 className="lg:text-[34px] text-3xl font-playfair font-semibold">
            Notifications
          </h1>

          <p className="text-[#6A7282] mt-2">
            Stay updated with important alerts and activities.
          </p>

        </div>

        <div className="flex items-center gap-4">

          <button className="border border-[#E5E7EB] px-4 py-2 rounded-lg bg-white shadow-sm">
            Mark all as read
          </button>

          <button className="flex items-center gap-2 text-[#64748B]">
            <Trash2 size={18} />
            Clear All
          </button>

        </div>

      </div>



      <div className="grid lg:grid-cols-[260px_1fr] gap-5 items-start">

        <div className="border border-[#E5E7EB] bg-white rounded-xl p-4 shadow-sm space-y-2">

          {filters.map((f, i) => (

            <div
              key={i}
              className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer ${i === 0
                  ? "bg-[#EEF2FF] text-[#2563EB]"
                  : "hover:bg-[#F8FAFC]"
                }`}
            >

              <span>{f.label}</span>

              {f.count && (
                <span className="bg-[#DBEAFE] text-[#2563EB] text-xs px-2 py-0.5 rounded-full">
                  {f.count}
                </span>
              )}

            </div>

          ))}

        </div>



        <div className="space-y-5">

          {notifications.map((n, i) => {

            const Icon = n.icon

            return (

              <div
                key={i}
                className={`border rounded-xl p-5 shadow-sm flex gap-4 items-start ${n.unread ? "bg-[#EFF6FF4D] border-[#DBEAFE]" : "bg-white border-[#E2E8F0]"}`}
              >

                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${n.bg}`}>
                  <Icon size={22} style={{ color: n.color }} />
                </div>



                <div className="flex-1">

                  <div className="flex items-center justify-between">

                    <h3 className="font-playfair text-lg font-medium">
                      {n.title}
                    </h3>

                    <div className="flex items-center gap-2 text-sm text-[#64748B]">

                      <Clock size={14} />

                      {n.time}

                      {n.unread && (
                        <span className="w-2.5 h-2.5 bg-[#2563EB] rounded-full" />
                      )}

                    </div>

                  </div>

                  <p className="text-[#6A7282] mt-1">
                    {n.desc}
                  </p>

                </div>

              </div>

            )

          })}

        </div>

      </div>

    </div>

  )

}