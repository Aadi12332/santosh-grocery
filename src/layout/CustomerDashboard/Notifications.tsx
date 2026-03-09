import { Package, Clock, Utensils, Ticket, Info } from "lucide-react"

const notifications = [
  {
    title: "Order Delivered",
    desc: "Your order from Green Valley Market has been delivered successfully. Enjoy your fresh produce!",
    time: "2 hours ago",
    action: "View Order Details",
    icon: Package,
    iconColor: "#009966",
    iconBg: "bg-[#ECFDF5] border border-[#D0FAE5]",
    bg: "bg-[#ECFDF54D]",
    border: "border-[#D0FAE5]",
    unread: true,
  },
  {
    title: "Driver is Nearby",
    desc: "Your driver for The Slate Room order is 5 minutes away. Please be ready to receive your order.",
    time: "Today, 7:25 PM",
    action: "View Order Details",
    icon: Clock,
    iconColor: "#2563EB",
    iconBg: "bg-[#EFF6FF] border border-[#DBEAFE]",
  },
  {
    title: "New Restaurant Added",
    desc: "Experience authentic Japanese cuisine with 'Sakura Gardens', now delivering to your area.",
    time: "Yesterday",
    action: "Browse Restaurants",
    icon: Utensils,
    iconColor: "#F97316",
    iconBg: "bg-[#FFF7ED] border border-[#FFEDD4]",
  },
  {
    title: "Special Offer Unlocked",
    desc: "Congratulations! You've unlocked a 20% discount on your next grocery order over $50.",
    time: "2 days ago",
    action: "Browse Restaurants",
    icon: Ticket,
    iconColor: "#9333EA",
    iconBg: "bg-[#FAF5FF] border border-[#F3E8FF]",
  },
  {
    title: "System Maintenance",
    desc: "Scheduled maintenance will occur on Sunday between 2:00 AM and 4:00 AM EST.",
    time: "3 days ago",
    icon: Info,
    iconColor: "#6B7280",
    iconBg: "bg-[#F3F4F6] border border-[#E5E7EB]",
  }
]

export default function Notifications() {
  return (
    <div className="">

      <div className="flex items-start justify-between mb-6">

        <div>
          <h1 className="text-4xl font-playfair font-semibold">
            Notifications
          </h1>

          <p className="text-[#6A7282] mt-2">
            Stay updated with your orders and exclusive offers.
          </p>
        </div>

        <button className="px-4 py-2 border border-[#E5E7EB] rounded-lg shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] bg-white">
          Mark all as read
        </button>

      </div>

      <div className="space-y-4">

        {notifications.map((item, i) => {

          const Icon = item.icon

          return (
            <div
              key={i}
              className={`border rounded-xl p-6 flex gap-4 ${
                item.bg ? item.bg : "bg-white"
              } ${item.border ? item.border : "border-[#E5E7EB]"}`}
            >

              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.iconBg}`}>
                <Icon size={22} style={{ color: item.iconColor }} />
              </div>

              <div className="flex-1">

                <div className="flex items-start justify-between">

                  <h3 className="font-playfair text-lg font-medium">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-3">

                    <span className="text-sm text-[#6A7282]">
                      {item.time}
                    </span>

                    {item.unread && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#00BC7D]" />
                    )}

                  </div>

                </div>

                <p className="text-[#6A7282] mt-1">
                  {item.desc}
                </p>

                {item.action && (
                  <button className="mt-3 text-[#009966] font-medium text-sm">
                    {item.action}
                  </button>
                )}

              </div>

            </div>
          )
        })}

      </div>

      <p className="text-center text-[#94A3B8] mt-8">
        You have reached the end of your notifications.
      </p>

    </div>
  )
}