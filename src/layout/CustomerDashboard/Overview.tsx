import { Wallet, Package, TrendingUp, Clock, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const stats = [
    {
        title: "Wallet Balance",
        value: "$1,240.50",
        subtitle: "**** 4291",
        action: "TOP UP",
        icon: Wallet,
        iconColor: "#009966",
        iconBgColor: "bg-[#D0FAE5]",
        iconBorderColor: "border-[#A4F4CF]",
        badge: { text: "Active", bg: "#D1FAE5", color: "#009966" },
        gradient: "from-white to-[#ECFDF580]",
        path: "wallet"
    },
    {
        title: "Active Orders",
        value: "2 Items",
        subtitle: "Arriving by 8:45 PM",
        icon: Package,
        iconColor: "#3B82F6",
        iconBgColor: "bg-[#DBEAFE]",
        iconBorderColor: "border-[#BEDBFF]",
        badge: { text: "In Transit", bg: "#DBEAFE", color: "#2563EB" },
        gradient: "from-white to-[#EFF6FF80]",
        extraIcon: Clock,
        path: "orders"
    },
    {
        title: "Reward Points",
        value: "4,850",
        subtitle: "150 points to Gold Tier",
        icon: TrendingUp,
        iconColor: "#F97316",
        iconBgColor: "bg-[#FFEDD4]",
        iconBorderColor: "border-[#FFD6A7]",
        gradient: "from-white to-[#FFF7ED80]",
        path: ""
    }
]

export default function Overview({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
    const navigate = useNavigate();
    return (
        <div className="space-y-8">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                <div>
                    <h1 className="text-[34px] font-playfair font-medium text-[#0F172A]">
                        Good Evening, Sarah
                    </h1>
                    <p className="text-[#6A7282] mt-1 text-lg">
                        Welcome back to your personal dashboard.
                    </p>
                </div>

                <div className="flex flex-wrap gap-3">

                    <button onClick={() => setActiveTab("invite")} className="px-4 py-2 text-white rounded-lg bg-[#9810FA] shadow-sm">
                        Invite
                    </button>

                    <button onClick={()=>navigate("/restaurants")} className="px-4 py-2 text-white rounded-lg bg-[#009966] shadow-sm">
                        Order Food
                    </button>

                    <button onClick={()=>navigate("/marketplace")} className="px-4 py-2 border rounded-lg border-[#E5E7EB] bg-white shadow-sm">
                        Buy Groceries
                    </button>

                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {stats.map((card, i) => {
                    const Icon = card.icon
                    const ExtraIcon = card.extraIcon

                    return (
                        <div
  key={i}
  onClick={card.path ? () => setActiveTab(card.path) : undefined}
  className={`p-6 rounded-xl border border-[#E5E7EB] bg-gradient-to-br ${card.gradient} shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] space-y-4 ${
    card.path ? "cursor-pointer hover:shadow-md" : ""
  }`}
>
                            <div className="flex items-center justify-between">
                                <span className={`flex items-center justify-center w-12 h-12 rounded-full ${card.iconBgColor} border ${card.iconBorderColor}`}>
                                    <Icon style={{ color: card.iconColor }} />
                                </span>

                                {card.badge && (
                                    <span
                                        className="text-xs px-3 py-1 rounded-full"
                                        style={{
                                            background: card.badge.bg,
                                            color: card.badge.color
                                        }}
                                    >
                                        {card.badge.text}
                                    </span>
                                )}
                            </div>

                            <div>
                                <p className="text-base mt-6 text-[#6A7282]">{card.title}</p>
                                <h2 className="text-[34px] text-[#101828] mt-1 mb-7 font-semibold font-playfair">
                                    {card.value}
                                </h2>
                            </div>

                            <div className="flex justify-between text-base items-center">
                                {ExtraIcon ? (
                                    <div className="flex items-center gap-1 text-[#1447E6]">
                                        <ExtraIcon size={14} />
                                        {card.subtitle}
                                    </div>
                                ) : (
                                    <span className={`text-[16px] ${card.action ? "text-[#6A7282] font-medium" : "text-[#CA3500] font-bold"}`}>{card.subtitle}</span>
                                )}

                                {card.action && (
                                    <button className="text-[#009966] font-medium">
                                        {card.action}
                                    </button>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                <div className="xl:col-span-2 space-y-6">

                    <div className="flex items-center justify-between">
                        <h2 className="font-bold font-playfair text-[20px]">Recent Orders</h2>
                        <button className="text-[#009966] text-[16px]">View All</button>
                    </div>

                    <div onClick={() => setActiveTab("orders")} className="cursor-pointer p-4 border border-[#E5E7EB] rounded-xl shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] flex items-center gap-4">
                        <img
                            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
                            className="w-16 h-16 rounded-lg object-cover"
                        />

                        <div className="flex-1">
                            <h3 className="font-bold text-lg font-playfair">The Slate Room</h3>
                            <p className="text-sm text-[#6A7282]">
                                Wagyu Beef Burger, Truffle Fries, Coke Zero
                            </p>

                            <p className="text-xs text-[#6A7282] mt-1">
                                Today, 7:30 PM • $48.50
                            </p>
                        </div>

                        <span className="text-xs bg-blue-100 text-[#1447E6] px-3 py-1 rounded-full">
                            On the way
                        </span>
                    </div>

                    <div onClick={() => setActiveTab("orders")} className="cursor-pointer p-4 border border-[#E5E7EB] rounded-xl shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] flex items-center gap-4">
                        <img
                            src="https://images.unsplash.com/photo-1542838132-92c53300491e"
                            className="w-16 h-16 rounded-lg object-cover"
                        />

                        <div className="flex-1">
                            <h3 className="font-bold text-lg font-playfair">Green Valley Market</h3>
                            <p className="text-sm text-[#6A7282]">
                                Organic Avocados, Sourdough Bread, Free-range
                            </p>

                            <p className="text-xs text-[#6A7282] mt-1">
                                Yesterday • $32.10
                            </p>
                        </div>

                        <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full">
                            Delivered
                        </span>
                    </div>

                </div>

                <div className="space-y-6">

                    <div className="flex items-center justify-between">
                        <h2 className="font-bold font-playfair text-[20px]">Recommended</h2>
                        <button className="text-[#E17100] text-[16px]">View Deals</button>
                    </div>

                    <div className="p-6 border border-[#E5E7EB] rounded-xl shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] bg-[#F9FAFB]">
                        <span className="text-xs bg-green-600 text-white px-3 py-1 rounded-full">
                            New Arrival
                        </span>

                        <h3 className=" text-[20px] font-medium font-playfair mt-3">
                            Sushi Masterclass Kit
                        </h3>

                        <p className="text-sm text-[#6A7282] mt-1">
                            Everything you need to create premium sushi at home.
                        </p>

                        <button onClick={() => setActiveTab("product-details")} className="mt-4 w-full border border-[#A4F4CF] shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] text-[#009966] bg-[#ECFDF5] py-2 rounded-lg">
                            View Product
                        </button>
                    </div>

                    <div className="p-6 border border-[#E5E7EB] rounded-xl shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] bg-white flex items-start gap-3">
                        <AlertCircle size={20} className="text-[#99A1AF] min-w-5 mt-1" />
                        <div>
                            <h3 className="font-bold font-playfair flex items-center gap-3">
                                Complete your profile
                            </h3>
                            <p className="text-sm text-[#6A7282] mt-2">
                                Add your backup phone number to secure your account.
                            </p>

                            <button className="mt-3 text-[#009966] font-medium text-sm">
                                Go to Settings
                            </button>
                        </div>


                    </div>

                </div>

            </div>

        </div>
    )
}