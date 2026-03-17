import {
  Search,
  Filter,
  Clock,
  Plus,
  MoreHorizontal,
  Calculator,
  SquareMenu, Flame,
  ImageIcon,
  Edit,
  Trash2
} from "lucide-react";
import { useState } from "react";
const categories = [
  { name: "All Items", count: 42 },
  { name: "Starters", count: 8 },
  { name: "Main Course", count: 18 },
  { name: "Beverages", count: 10 },
  { name: "Desserts", count: 6 }
]

const items = [
  {
    name: "Crispy Buffalo Wings",
    category: "Starters",
    desc: "Spicy fried chicken wings served with blue cheese dip and celery sticks.",
    cost: "$4.50",
    margin: "65.4%",
    time: "20 min",
    cal: "650",
    price: "$12.99",
    stock: true,
    image: "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=200"
  },
  {
    name: "Grilled Norwegian Salmon",
    category: "Main Course",
    desc: "Fresh Norwegian salmon grilled to perfection with lemon butter sauce and seasonal vegetables.",
    cost: "$9.80",
    margin: "60.0%",
    time: "25 min",
    cal: "580",
    price: "$24.50",
    stock: true,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200"
  },
  {
    name: "Classic Caesar Salad",
    category: "Starters",
    desc: "Crisp romaine lettuce with parmesan cheese, croutons, and our signature Caesar dressing.",
    cost: "$2.50",
    margin: "75.0%",
    time: "10 min",
    cal: "320",
    price: "$9.99",
    stock: false,
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=200"
  },
  {
    name: "Double Cheeseburger",
    category: "Main Course",
    desc: "Two beef patties with melted cheese, lettuce, tomato, and our special sauce on a toasted bun.",
    cost: "$6.20",
    margin: "61.2%",
    time: "20 min",
    cal: "850",
    price: "$15.99",
    stock: true,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=200"
  },
  {
    name: "Chocolate Lava Cake",
    category: "Desserts",
    desc: "Warm chocolate cake with a molten center, served with vanilla ice cream.",
    cost: "$2.90",
    margin: "65.8%",
    time: "15 min",
    cal: "450",
    price: "$8.50",
    stock: true,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=200"
  },
  {
    name: "Iced Caramel Macchiato",
    category: "Beverages",
    desc: "Rich espresso with vanilla syrup, steamed milk, and caramel drizzle.",
    cost: "$1.80",
    margin: "67.3%",
    time: "5 min",
    cal: "220",
    price: "$5.50",
    stock: true,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=200"
  },
  {
    name: "Garlic Butter Prawns",
    category: "Starters",
    desc: "Succulent prawns sautéed in garlic butter sauce with a hint of lemon.",
    cost: "$5.20",
    margin: "64.1%",
    time: "15 min",
    cal: "450",
    price: "$14.50",
    stock: true,
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=200"
  },
  {
    name: "Mushroom Risotto",
    category: "Main Course",
    desc: "Creamy arborio rice cooked with wild mushrooms and parmesan cheese.",
    cost: "$7.20",
    margin: "60.0%",
    time: "30 min",
    cal: "620",
    price: "$18.00",
    stock: true,
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=200"
  },
  {
    name: "Spicy Pepperoni Pizza",
    category: "Main Course",
    desc: "Classic pizza topped with spicy pepperoni, mozzarella cheese, and tomato sauce.",
    cost: "$6.80",
    margin: "58.8%",
    time: "25 min",
    cal: "900",
    price: "$16.50",
    stock: true,
    image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=200"
  },
  {
    name: "New York Cheesecake",
    category: "Desserts",
    desc: "Rich and creamy New York style cheesecake with berry compote.",
    cost: "$2.60",
    margin: "67.4%",
    time: "0 min",
    cal: "400",
    price: "$7.99",
    stock: true,
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=200"
  },
  {
    name: "Fresh Orange Juice",
    category: "Beverages",
    desc: "Freshly squeezed orange juice made daily.",
    cost: "$1.20",
    margin: "73.3%",
    time: "5 min",
    cal: "110",
    price: "$4.50",
    stock: true,
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=200"
  },
  {
    name: "Avocado Toast",
    category: "Starters",
    desc: "Smashed avocado on toasted sourdough with a poached egg and microgreens.",
    cost: "$3.40",
    margin: "69.0%",
    time: "10 min",
    cal: "350",
    price: "$11.00",
    stock: true,
    image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=200"
  }
]

export default function MenuManagement({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) {
  const [tab, setTab] = useState("live");
  const [active, setActive] = useState("All Items");
  const [openMenu, setOpenMenu] = useState<number | null>(null)
  const [menuItems, setMenuItems] = useState(items)

  const toggleStock = (index: number) => {
    setMenuItems(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, stock: !item.stock } : item
      )
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl lg:text-[34px] font-playfair font-semibold">
            Menu Management
          </h1>

          <p className="text-[#64748B] mt-2">
            Organize your menu, manage availability, and calculate food costs.
          </p>
        </div>

        <div className="flex gap-3 items-center">
          <div className="flex gap-3 bg-[#F1F5F9] p-1 rounded-lg w-fit">

            <button
              onClick={() => setTab("live")}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${tab === "live"
                ? "bg-white shadow text-[#0F172A]"
                : "text-[#64748B]"
                }`}
            >
              <SquareMenu size={16} />
              Menu View
            </button>

            <button
              onClick={() => setTab("history")}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${tab === "history"
                ? "bg-white shadow text-[#0F172A]"
                : "text-[#64748B]"
                }`}
            >
              <Calculator size={16} />
              Recipe & Costing
            </button>

          </div>
          <button className="border border-[#E5E7EB] rounded-lg px-4 py-2 flex gap-2 items-center bg-white">
            <Filter size={16} />
            Filter
          </button>

          <button onClick={()=>setActiveTab("add-item")} className="bg-[#009966] text-white rounded-lg px-4 py-2 flex gap-2 items-center">
            <Plus size={16} />
            Add Item
          </button>
        </div>
      </div>

      <div className="space-y-6">

        <div className="flex items-center justify-between border border-[#E5E7EB] bg-white rounded-xl px-4 py-3">

          <div className="flex items-center gap-3 w-full">

            <Search size={18} className="text-[#94A3B8]" />

            <input
              placeholder="Search for items by name, ingredients, or tags..."
              className="outline-none w-full"
            />

          </div>

          <span className="text-sm bg-[#F1F5F9] px-3 py-2 rounded-lg min-w-max">
            12 results
          </span>

        </div>



        <div className="flex flex-wrap gap-3">

          {categories.map((c, i) => (
            <button
              key={i}
              onClick={() => setActive(c.name)}
              className={`px-5 py-2 rounded-full border flex items-center gap-2 ${active === c.name
                ? "bg-[#059669] text-white border-[#059669]"
                : "bg-white border-[#E5E7EB]"
                }`}
            >
              {c.name}
              <span className={`${active === c.name ? "text-white" : "text-[#64748B]"}`}>
                {c.count}
              </span>
            </button>
          ))}

          <button className="w-10 h-10 rounded-full border border-[#E5E7EB] flex items-center justify-center">
            <Plus size={18} />
          </button>

        </div>



        <div className="space-y-4">

          {menuItems.map((item, i) => (

            <div
              key={i}
              className="border border-[#E5E7EB] bg-white rounded-xl p-4 flex items-center gap-4"
            >

              <img
                src={item.image}
                className="w-24 h-24 rounded-lg object-cover"
              />

              <div className="flex-1">

                <div className="flex items-center gap-3">

                  <span className={`w-5 h-5 border-2 flex justify-center items-center rounded-lg ${item.stock ? "border-green-500" : "border-red-500"}`} >
                    <span  className={`w-3 h-3 inline-block rounded-full ${item.stock ? "bg-green-500" : "bg-red-500"}`}></span>
                  </span>

                  <h3 className="font-playfair text-lg">
                    {item.name}
                  </h3>

                  <span className="text-xs bg-[#F1F5F9] px-2 py-1 rounded-md">
                    {item.category}
                  </span>

                </div>


                <div className="min-h-9 flex items-center">
                  {tab === "history" ?

                    <div className="flex items-center gap-4 mt-2">

                      <span className="bg-[#EFF6FF] text-[#2563EB] px-3 py-1 rounded-full text-sm">
                        Cost: {item.cost}
                      </span>

                      <span className="text-[#64748B] text-sm">
                        Margin: {item.margin}
                      </span>

                    </div> :
                    <p className="text-[#64748B] text-sm mt-1 line-clamp-1">
                      {item.desc}
                    </p>

                  }
                </div>


                <div className="flex items-center gap-4 text-sm text-[#94A3B8] mt-2">

                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {item.time}
                  </span>

                  <span className="flex items-center gap-1">
                    <Flame size={14} /> {item.cal}
                  </span>

                </div>

              </div>



              <div className="flex items-center gap-6 border-l pl-6">

                <p className="text-xl font-semibold">
                  {item.price}
                </p>


                <div key={i} className="flex items-center gap-3">

                  <p className={`text-sm ${item.stock ? "text-green-600" : "text-[#64748B]"}`}>
                    {item.stock ? "In Stock" : "Out"}
                  </p>

                  <button
                    onClick={() => toggleStock(i)}
                    className={`w-10 h-6 rounded-full flex items-center transition ${item.stock ? "bg-green-500 justify-end" : "bg-gray-300 justify-start"
                      }`}
                  >

                    <div className="w-4 h-4 bg-white rounded-full mx-1" />

                  </button>

                </div>

                <div className="relative">

                  <button
                    onClick={() => setOpenMenu(openMenu === i ? null : i)}
                  >
                    <MoreHorizontal size={18} className="text-[#94A3B8]" />
                  </button>


                  {openMenu === i && (
                    <>
                    <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setOpenMenu(null)}></div>
                    <div className="absolute right-0 top-7 w-52 bg-white border border-[#E5E7EB] rounded-xl shadow-lg overflow-hidden z-50">

                      <button className="flex items-center gap-3 px-4 py-3 w-full hover:bg-[#F8FAFC]">

                        <Edit size={16} className="text-[#64748B]" />

                        Edit Item

                      </button>


                      <button className="flex items-center gap-3 px-4 py-3 w-full hover:bg-[#F8FAFC]">

                        <ImageIcon size={16} className="text-[#64748B]" />

                        Change Photo

                      </button>


                      <div className="border-t border-[#E5E7EB]" />


                      <button className="flex items-center gap-3 px-4 py-3 w-full text-red-600 hover:bg-red-50">

                        <Trash2 size={16} />

                        Delete Item

                      </button>

                    </div>
                    </>


                  )}

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
}
