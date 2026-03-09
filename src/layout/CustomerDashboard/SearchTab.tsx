import { Search, SlidersHorizontal, Package, ShoppingBag, Utensils, FilterIcon } from "lucide-react"

const recent = ["Sushi", "Organic Milk", "The Slate Room", "Pizza", "Wine"]

const results = [
  {
    title: "The Slate Room",
    subtitle: "Order #4291 • Today, 7:30 PM",
    desc: "Wagyu Beef Burger, Truffle Fries...",
    status: "Active",
    price: "$48.50",
    icon: Package,
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
  },
  {
    title: "Sushi Masterclass Kit",
    subtitle: "Cooking Kits",
    desc: "Premium DIY Sushi Set",
    status: "In Stock",
    price: "$89.99",
    icon: ShoppingBag,
    img: "https://images.unsplash.com/photo-1553621042-f6e147245754"
  },
  {
    title: "Sakura Gardens",
    subtitle: "Japanese • Sushi • Ramen",
    desc: "4.9 (1.2k Reviews) • 25-35 min",
    status: "Open",
    price: "Affordable",
    icon: Utensils,
    img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5"
  },
  {
    title: "Green Valley Market",
    subtitle: "Order #3920 • Yesterday",
    desc: "Organic Avocados, Sourdough...",
    status: "Delivered",
    price: "$32.10",
    icon: Package,
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e"
  }
]

export default function SearchTab() {
  return (
    <div className="">

      <div className="relative mb-8">

        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
        />

        <input
          placeholder="Search for orders, products, or restaurants..."
          className="w-full h-14 pl-12 pr-12 rounded-xl border border-[#E5E7EB] outline-none
          shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]"
        />

        <FilterIcon
          size={20}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
        />

      </div>

      <div className="mb-10">

        <h3 className="text-sm tracking-widest text-[#6A7282] mb-3 font-playfair">
          RECENT SEARCHES
        </h3>

        <div className="flex flex-wrap gap-3">

          {recent.map((item, i) => (
            <button
              key={i}
              className="px-5 text-[#4A5565] py-2 rounded-full border border-[#E5E7EB] bg-white
              shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]"
            >
              {item}
            </button>
          ))}

        </div>

      </div>

      <div className="space-y-4">

        <h3 className="text-sm tracking-widest text-[#6A7282] font-playfair">
          SUGGESTED FOR YOU
        </h3>

        {results.map((item, i) => {

          const Icon = item.icon

          return (
            <div
              key={i}
              className="flex items-center gap-4 p-5 rounded-xl border border-[#E5E7EB] bg-white
              shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]"
            >

              <img
                src={item.img}
                className="w-16 h-16 rounded-lg object-cover"
              />

              <div className="flex-1 space-y-1">

                <h3 className="font-playfair text-lg font-medium">
                  {item.title}
                </h3>

                <p className="text-[#6A7282] text-base">
                  {item.subtitle}
                </p>

                <p className="text-[#99A1AF] text-sm">
                  {item.desc}
                </p>

              </div>

              <div className="flex items-center gap-6">

                <span className={`px-3 py-1 text-xs rounded-full bg-[#EFF6FF] font-semibold ${item.status === 'Active' ? 'bg-[#EFF6FF] border-[#DBEAFE] text-[#2563EB]' : 'bg-[#ECFDF5] border-[#D0FAE5] text-[#009966]'}`}>
                  {item.status}
                </span>

                <div className="text-right border-l border-[#E5E7EB] pl-6 flex flex-col items-end">

                  <p className="font-playfair text-lg">
                    {item.price}
                  </p>

                  <Icon size={18} className="text-[#94A3B8] mt-1" />

                </div>

              </div>

            </div>
          )
        })}

      </div>

    </div>
  )
}