import { useState } from "react"
import { ShoppingCart, Trash2, Heart, ShoppingBag } from "lucide-react"
import CartModal from "./CartModal"

const items = [
  {
    name: "Premium Matcha Tea Set",
    price: "$45.00",
    oldPrice: "$55.00",
    rating: 4.8,
    stock: "In Stock",
    sale: true,
    img: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7"
  },
  {
    name: "Organic Honey Jar",
    price: "$18.50",
    rating: 4.9,
    stock: "Low Stock",
    img: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce"
  },
  {
    name: "Artisan Coffee Beans",
    price: "$22.00",
    oldPrice: "$25.00",
    rating: 4.7,
    stock: "In Stock",
    sale: true,
    img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93"
  },
  {
    name: "Organic Avocado Pack",
    price: "$12.00",
    rating: 4.6,
    stock: "In Stock",
    img: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578"
  },
  {
    name: "Italian Olive Oil",
    price: "$28.00",
    oldPrice: "$35.00",
    rating: 4.9,
    stock: "In Stock",
    sale: true,
    img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5"
  },
  {
    name: "Natural Almond Butter",
    price: "$16.75",
    rating: 4.5,
    stock: "Low Stock",
    img: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce"
  },
  {
    name: "Fresh Blueberries",
    price: "$9.50",
    rating: 4.8,
    stock: "In Stock",
    img: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e"
  }
]

export default function SavedItems() {
  const [openCart, setOpenCart] = useState(false)


  return (
    <div className="space-y-8">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>
          <h1 className="lg:text-[34px] text-[24px] font-playfair font-medium text-[#0F172A]">
            Saved Items
          </h1>

          <p className="text-[#6A7282] mt-1 lg:text-lg text-base">
            Keep track of products you love.
          </p>
        </div>

        <button className="flex items-center gap-2 border border-[#E5E7EB] rounded-lg w-fit lg:rounded-xl px-4 py-2 bg-white shadow-sm">
          <ShoppingBag size={18}/>
          Continue Shopping
        </button>

      </div>


      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {items.map((item,i)=>(
          <div
            key={i}
            className="border border-[#E5E7EB] rounded-lg lg:rounded-xl bg-white shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] overflow-hidden flex flex-col"
          >

            <div className="relative">

              <img
                src={item.img}
                className="w-full h-52 object-cover"
              />

              {item.sale && (
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  SALE
                </span>
              )}

              <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow">
                <Trash2 size={16}/>
              </button>

            </div>


            <div className="lg:p-5 p-2 flex flex-col gap-3 flex-1">

              <h3 className="font-playfair text-lg text-[#0F172A]">
                {item.name}
              </h3>

              <div className="flex items-center gap-3">

                <span className="text-[#009966] text-xl font-bold">
                  {item.price}
                </span>

                {item.oldPrice && (
                  <span className="text-[#99A1AF] line-through">
                    {item.oldPrice}
                  </span>
                )}

              </div>


              <div className="flex items-center justify-between text-sm">

                <span className={`px-3 py-1 font-semibold text-sm rounded-full ${
                  item.stock==="Low Stock"
                    ? "bg-[#FFF7ED] text-[#F54900]"
                    : "bg-[#ECFDF5] text-[#009966]"
                }`}>
                  {item.stock}
                </span>

                <span className="flex items-center gap-1 text-[#F0B100]">
                  <Heart size={14} className="fill-[#F0B100]" />
                  {item.rating}
                </span>

              </div>

              <button onClick={() => setOpenCart(true)} className="mt-auto flex items-center justify-center gap-2 bg-[#009966] text-white py-3 rounded-lg shadow-sm">
                <ShoppingCart size={18}/>
                Add to Cart
              </button>

            </div>

          </div>
        ))}

        <CartModal selectedProduct="selectedProduct" open={openCart} onClose={() => setOpenCart(false)} />

      </div>

    </div>
  )
}