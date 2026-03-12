import { Bell, CheckCircle, AlertCircle, Info } from "lucide-react"

const notifications = [
  {
    title: "New Order #ORD-7352",
    desc: "You have received a new order from Alex Morgan.",
    time: "2 mins ago",
    icon: Bell,
    iconColor: "#2563EB",
    iconBg: "bg-[#EFF6FF]",
    unread: true,
    highlight: true
  },
  {
    title: "Payment Received",
    desc: "Payout of $850.00 has been processed to your wallet.",
    time: "1 hour ago",
    icon: CheckCircle,
    iconColor: "#009966",
    iconBg: "bg-[#ECFDF5]",
    unread: true,
    highlight: true
  },
  {
    title: "Low Stock Alert",
    desc: "Fresh Avocados are running low (2 items left).",
    time: "4 hours ago",
    icon: AlertCircle,
    iconColor: "#F97316",
    iconBg: "bg-[#FFF7ED]"
  },
  {
    title: "Product Approved",
    desc: "Your product 'Organic Honey' has been approved by admin.",
    time: "Yesterday",
    icon: Info,
    iconColor: "#64748B",
    iconBg: "bg-[#F1F5F9]"
  },
  {
    title: "Refund Request",
    desc: "New refund request for Order #ORD-7349.",
    time: "2 days ago",
    icon: AlertCircle,
    iconColor: "#F97316",
    iconBg: "bg-[#FFF7ED]"
  }
]

export default function Notifications() {
  return (
    <div>

      <div className="flex items-start justify-between mb-6 gap-3 flex-wrap">

        <div>
          <h1 className="lg:text-[34px] text-3xl font-playfair font-semibold">
            Notifications
          </h1>

          <p className="text-[#6A7282] mt-2 lg:text-[18px] text-base">
            Stay updated with important alerts.
          </p>
        </div>

        <button className="px-4 py-2 border border-[#E5E7EB] rounded-lg shadow-sm bg-white">
          Mark all as read
        </button>

      </div>



      <div className="space-y-4">

        {notifications.map((item, i) => {

          const Icon = item.icon

          return (
            <div
              key={i}
              className={`rounded-lg lg:rounded-xl p-3 lg:p-6 border flex gap-4 items-start shadow-sm
              ${
                item.highlight
                  ? "border-[#FDBA74] bg-[#FFF7ED]"
                  : "border-[#E5E7EB] bg-white"
              }`}
            >

              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${item.iconBg}`}
              >
                <Icon size={22} style={{ color: item.iconColor }} />
              </div>



              <div className="flex-1">

                <div className="flex items-center justify-between">

                  <h3 className="font-playfair text-lg font-medium">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-2">

                    <span className="text-sm text-[#64748B]">
                      {item.time}
                    </span>

                    {item.unread && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#F97316]" />
                    )}

                  </div>

                </div>

                <p className="text-[#6A7282] mt-1">
                  {item.desc}
                </p>

              </div>

            </div>
          )
        })}

      </div>



      <p className="text-center text-[#94A3B8] mt-8">
        Showing recent notifications from the last 30 days.
      </p>

    </div>
  )
}