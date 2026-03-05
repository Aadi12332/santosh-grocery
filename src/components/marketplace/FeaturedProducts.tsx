import { Leaf, Wheat, Milk, Wine, Plus, Truck } from "lucide-react"

const categories = [
  { name: "All Products", active: true, icon: Leaf },
  { name: "Organic Produce", icon: Leaf },
  { name: "Artisan Bakery", icon: Wheat },
  { name: "Dairy & Cheese", icon: Milk },
  { name: "Gourmet Pantry", icon: Wine },
]

const products = [
  {
    id: 1,
    category: "Organic Produce",
    title: "Organic Hass Avocados",
    price: "$5.99",
    unit: "per pack",
    image:
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=900",
    badge: "NEW ARRIVAL",
  },
  {
    id: 2,
    category: "Bakery",
    title: "Artisan Sourdough Loaf",
    price: "$6.50",
    unit: "per loaf",
    image:
      "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=900",
  },
  {
    id: 3,
    category: "Dairy & Cheese",
    title: "Aged Swiss Gruyère",
    price: "$18.00",
    unit: "200g block",
    image:
      "https://images.unsplash.com/photo-1552767059-ce182ead6c1b?q=80&w=900",
    badge: "NEW ARRIVAL",
  },
  {
    id: 4,
    category: "Gourmet Pantry",
    title: "Extra Virgin Olive Oil",
    price: "$24.00",
    unit: "500ml",
    image:
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?q=80&w=900",
  },
  {
    id: 5,
    category: "Gourmet Pantry",
    title: "Himalayan Pink Salt",
    price: "$8.50",
    unit: "500g jar",
    image:
      "https://images.unsplash.com/photo-1552767059-ce182ead6c1b?q=80&w=900",
  },
  {
    id: 6,
    category: "Organic Produce",
    title: "Fresh Strawberries",
    price: "$5.99",
    unit: "per box",
    image:
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=900",
    badge: "NEW ARRIVAL",
  },
]

export default function FeaturedProducts() {
  return (
    <section className="bg-[#020618] py-20 text-white">
      <div className="max-w-[1265px] mx-auto px-3 lg:px-6 grid lg:grid-cols-[260px_1fr] gap-10">

        <div className="space-y-6">
          <h3 className="text-[22px] font-medium text-[#CAD5E2] font-playfair">Categories</h3>

          <div className="space-y-3">
            {categories.map((cat, i) => {
              const Icon = cat.icon
              return (
                <button
                  key={i}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-base font-medium transition ${
                    cat.active
                      ? "bg-[#2A0E0E] text-orange-400"
                      : "text-[#94A3B8] hover:bg-[#0F172B]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} />
                    {cat.name}
                  </div>
                  {cat.active && <span>›</span>}
                </button>
              )
            })}
          </div>

          <div className="bg-[#0F172B] border border-[#1D293D] rounded-2xl p-6 text-center space-y-4">
            <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-orange-500">
              <Truck size={20} />
            </div>

            <h4 className="font-bold text-[20px] font-playfair">Free Delivery</h4>

            <p className="text-base text-[#90A1B9]">
              On all orders above $ 50.00
            </p>

            <button className="bg-[#FFFFFF1A] text-base font-medium px-4 py-2 rounded-lg w-full">
              Learn More
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-8 gap-3 flex-wrap">
            <h2 className="font-playfair font-medium text-[28px]">Featured Products</h2>
            <div className="flex gap-3 items-center">
                <span className="text-sm text-[#94A3B8]">Sort by:</span>
                <select name="sort" id="sort" className="bg-[#0F172B] text-sm px-2 py-2 rounded-lg outline-none">
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="popular">Most Popular</option>
                </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-[#0F172B] border border-[#1D293D] rounded-2xl overflow-hidden group"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    className="w-full h-[282px] object-cover"
                  />

                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-orange-500 text-xs px-3 py-1 rounded-full">
                      {product.badge}
                    </span>
                  )}

                  <button className="absolute bottom-3 right-3 w-10 h-10 flex items-center justify-center rounded-full bg-[#1E293B]">
                    <Plus size={18} />
                  </button>
                </div>

                <div className="p-5 space-y-2">
                  <p className="text-sm text-[#62748E]">
                    {product.category}
                  </p>

                  <h3 className="font-medium text-[20px] font-playfair">
                    {product.title}
                  </h3>

                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <p className="font-bold text-lg">{product.price}</p>
                      <p className="text-xs text-[#62748E]">
                        {product.unit}
                      </p>
                    </div>

                    <button className="bg-[#00A63E] text-sm px-4 py-1.5 rounded-full">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="text-[#94A3B8] hover:text-white transition">
              Load More Products →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}