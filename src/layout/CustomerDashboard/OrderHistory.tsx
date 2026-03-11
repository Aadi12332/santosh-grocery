import { Search, Filter, Package, MapPin, Clock, Truck, Utensils, ShoppingBag } from "lucide-react"
import { useState } from "react"

const orders = [
    {
        name: "Nobu Downtown",
        items: "Truffle Wagyu Burger, Spicy Tuna Tartare",
        time: "Just Now",
        price: "$61.99",
        status: "processing",
        img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
        type: "food"
    },
    {
        name: "The Slate Room",
        items: "Wagyu Beef Burger, Truffle Fries, Coke Zero",
        time: "Today, 7:30 PM",
        price: "$48.50",
        status: "transit",
        img: "https://images.unsplash.com/photo-1550547660-d9450f859349",
        type: "food"
    },
    {
        name: "Green Valley Market",
        items: "Organic Avocados, Sourdough Bread, Eggs",
        time: "Yesterday",
        price: "$32.10",
        status: "delivered",
        img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
        type: "grocery"
    },
    {
        name: "Sushi Master",
        items: "Dragon Roll, Miso Soup, Edamame",
        time: "Oct 24, 2023",
        price: "$55.00",
        status: "delivered",
        img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
        type: "food"
    },
    {
        name: "Whole Foods",
        items: "Almond Milk, Granola, Berries",
        time: "Oct 20, 2023",
        price: "$28.45",
        status: "cancelled",
        img: "https://images.unsplash.com/photo-1506617420156-8e4536971650",
        type: "grocery"
    }
]

const statusStyles: any = {
    processing: "bg-[#FFF7ED] text-[#EA580C]",
    transit: "bg-[#EFF6FF] text-[#2563EB]",
    delivered: "bg-[#ECFDF5] text-[#009966]",
    cancelled: "bg-[#FEE2E2] text-red-500"
}

export default function OrderHistory() {
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [tab, setTab] = useState("all")
    const [showFilter,setShowFilter] = useState(false)
const [status,setStatus] = useState("all")

    return (
        <div className="space-y-6">


            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                <div>
                    <h1 className="lg:text-[34px] text-[24px] font-playfair font-medium text-[#0F172A]">
                        Order History
                    </h1>

                    <p className="text-[#6A7282] mt-1 lg:text-lg text-base">
                        Track current orders and view past receipts.
                    </p>
                </div>

                <div className="flex gap-3">

                    {["all", "food", "grocery"].map(t => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className={`px-4 py-2 rounded-lg border shadow-sm capitalize ${tab === t
                                ? "bg-[#009966] text-white border-[#009966]"
                                : "bg-white border-[#E5E7EB]"
                                }`}
                        >
                            {t}
                        </button>
                    ))}

                </div>

            </div>


            <div className="flex gap-3">

                <div className="flex items-center gap-2 flex-1 border border-[#E5E7EB] rounded-lg lg:rounded-xl px-4 py-3 bg-white shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]">

                    <Search size={18} className="text-[#64748B]" />

                    <input
                        placeholder="Search by restaurant or item..."
                        className="flex-1 outline-none"
                    />

                </div>

                <button onClick={()=>setShowFilter(!showFilter)} className="flex items-center gap-2 border border-[#E5E7EB] rounded-lg lg:rounded-xl px-4 bg-[#009966] text-white shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]">
                    <Filter size={18} />
                    Filter
                </button>

            </div>

            {showFilter && (
  <div className="mt-4 border border-[#E5E7EB] lg:rounded-xl rounded-lg lg:p-6 p-3 bg-[#fff] shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]">

    <p className="text-sm font-semibold text-[#64748B] mb-4">
      ORDER STATUS
    </p>

    <div className="flex flex-wrap lg:gap-3 gap-1">

      {["all","active","delivered","cancelled"].map((s)=>(
        <button
          key={s}
          onClick={()=>setStatus(s)}
          className={`lg:px-4 px-3 py-2 rounded-lg border text-sm capitalize transition
          ${
            status===s
            ? "bg-[#ECFDF5] text-[#009966] border-[#009966]"
            : "bg-white border-[#E5E7EB] text-[#475569]"
          }`}
        >
          {s}
        </button>
      ))}

    </div>

  </div>
)}

            <div className="grid lg:grid-cols-[1fr_340px] gap-6 items-start">
                <div className="space-y-4">

                    {orders.map((o, i) => (
                        <div
                            key={i}
                            onClick={() => setSelectedOrder(o)}
                            className={`flex justify-between border border-[#E5E7EB] lg:rounded-xl rounded-lg lg:p-4 p-2 bg-white cursor-pointer transition
                            shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]
                            ${selectedOrder?.name === o.name ? "ring-2 ring-[#009966]" : ""}
                            `}
                        >

                            <div className="flex gap-4">
                               <div className="relative w-20 h-20">

  <img
    src={o.img}
    className="w-20 h-20 min-w-20 rounded-lg object-cover"
  />

  <div className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">

    {o.type === "food" ? (
      <Utensils size={12} className="text-[#009966]" />
    ) : (
      <ShoppingBag size={12} className="text-[#F97316]" />
    )}

  </div>

</div>
                                <div>

                                    <h3 className="font-playfair text-lg text-[#0F172A]">
                                        {o.name}
                                    </h3>

                                    <p className="text-[#6A7282] text-sm mt-1">
                                        {o.items}
                                    </p>

                                    <span className={`inline-block mt-2 text-xs px-3 py-1 rounded-full ${statusStyles[o.status]}`}>
                                        {o.status === "transit"
                                            ? "In Transit"
                                            : o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                                    </span>

                                </div>

                            </div>

                            <div className="text-right flex flex-col gap-3 justify-between">

                                <p className="text-sm text-[#6A7282]">
                                    {o.time}
                                </p>

                                <p className="font-semibold text-lg text-[#0F172A]">
                                    {o.price}
                                </p>

                            </div>

                        </div>
                    ))}

                </div>

                <div className="border border-[#E5E7EB] rounded-lg lg:rounded-xl lg:p-4 p-2 bg-[#F9FAFB]">

                    {!selectedOrder ? (

                        <div className="flex flex-col items-center justify-center text-center text-[#94A3B8] py-10">

                            <Package size={40} />

                            <p className="mt-3">
                                Select an order to view details
                            </p>

                        </div>

                    ) : (

                        <div className="space-y-6">


                            <div className="flex items-start justify-between">

                                <div>
                                    <h2 className="font-playfair text-2xl text-[#0F172A]">
                                        Order Details
                                    </h2>

                                    <p className="text-[#6A7282] mt-1">
                                        ORD-9921
                                    </p>
                                </div>

                                <button className="text-[#94A3B8] text-xl">
                                    ⋮
                                </button>

                            </div>



                            <div className="relative">

                                <img
                                    src={selectedOrder.img}
                                    className="w-full h-48 rounded-xl object-cover"
                                />

                                <div className="absolute inset-0 flex items-center justify-center">

                                    <div className="flex items-center gap-2 bg-[#FFFFFFE5] px-4 py-2 rounded-full shadow text-[#155DFC] text-xs">

                                        <Truck size={13} />

                                        Arriving in 15 mins

                                    </div>

                                </div>

                            </div>



                            <div className="flex gap-3">

                                <MapPin className="text-[#009966]" size={20} />

                                <div>

                                    <p className="font-semibold text-[#0F172A]">
                                        Delivery Address
                                    </p>

                                    <p className="text-[#6A7282] text-sm">
                                        123 Luxury Lane, Apt 4B, New York, NY
                                    </p>

                                </div>

                            </div>



                            <div className="flex gap-3">

                                <Clock className="text-[#009966]" size={20} />

                                <div>

                                    <p className="font-semibold text-[#0F172A]">
                                        Estimated Arrival
                                    </p>

                                    <p className="text-[#6A7282] text-sm">
                                        8:45 PM - 9:00 PM
                                    </p>

                                </div>

                            </div>


                            <div className="border-t border-[#E5E7EB]" />



                            <div className="space-y-2 text-sm">

                                <div className="flex justify-between text-[#6A7282]">
                                    <span>Subtotal</span>
                                    <span>$42.00</span>
                                </div>

                                <div className="flex justify-between text-[#6A7282]">
                                    <span>Delivery Fee</span>
                                    <span>$4.50</span>
                                </div>

                                <div className="flex justify-between text-[#6A7282]">
                                    <span>Tax</span>
                                    <span>$2.00</span>
                                </div>

                            </div>


                            <div className="border-t border-[#E5E7EB]" />



                            <div className="flex justify-between items-center">

                                <span className="text-lg font-semibold text-[#0F172A]">
                                    Total
                                </span>

                                <span className="text-xl font-semibold text-[#009966]">
                                    {selectedOrder.price}
                                </span>

                            </div>



                            <button className="border border-[#E5E7EB] rounded-lg px-4 py-2 flex items-center gap-2 text-[#0F172A] bg-white shadow-sm">
                                Invoice
                            </button>


                            <p className="text-xs text-[#6A7282]">
                                Problem with order? Request Return/Refund
                            </p>

                        </div>

                    )}

                </div>

            </div>

        </div>
    )
}