import {
  Star,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  Share2,
  Info
} from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import CartModal from "./CartModal";

export default function ProductDetails({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const navigate = useNavigate();
  const [openCart, setOpenCart] = useState(false);

  const images = [
    "https://images.unsplash.com/photo-1553621042-f6e147245754",
    "https://images.unsplash.com/photo-1553621042-f6e147245754",
    "https://images.unsplash.com/photo-1553621042-f6e147245754",
  ]

  const [activeImg, setActiveImg] = useState(images[0])
  const price = 89.99
  const [qty, setQty] = useState(1)

  const total = (price * qty).toFixed(2)

  return (
    <div className="">

      <button onClick={() => navigate(-1)} className="mb-6 text-[#6A7282]">
        ← Back to Dashboard
      </button>

      <div className="grid lg:grid-cols-2 gap-10 xl:gap-24">

        <div>

          <div className="relative">

            <img
              src={activeImg}
              className="w-full aspect-square rounded-2xl object-cover"
            />

            <span className="absolute top-4 left-4 bg-[#009966] text-white text-sm px-3 py-1 rounded-full">
              New Arrival
            </span>

            <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow">
              <Heart size={18} />
            </button>

          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">

            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImg(img)}
                className={`aspect-square rounded-lg object-cover cursor-pointer border ${activeImg === img
                    ? "border-[#009966]"
                    : "border-[#E5E7EB]"
                  }`}
              />
            ))}

          </div>

        </div>

        <div>

          <div className="flex items-center gap-4 text-sm mb-4">

            <div className="flex items-center gap-1 text-[#F59E0B]">
              <Star size={16} fill="#F59E0B" />
              4.9
            </div>

            <span className="text-[#6A7282]">128 Reviews</span>

            <span className="text-[#009966]">In Stock</span>

          </div>

          <h1 className="lg:text-[40px] text-[32px] font-playfair mb-6">
            Sushi Masterclass Kit
          </h1>

          <p className="lg:text-[32px] text-xl text-[#101828] mb-4">
            $89.99
          </p>

          <p className="text-[#6A7282] lg:text-[20px] text-base leading-relaxed mb-10">
            Master the art of sushi making from the comfort of your home.
            This premium kit includes professional-grade tools, authentic
            ingredients sourced from Japan, and step-by-step video guides
            from master chefs.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-16">

            <div className="border border-[#E5E7EB] bg-[#F9FAFB] rounded-lg lg:rounded-xl lg:p-5 p-2 flex gap-3 sm:flex-row flex-col">

              <ShoppingBag className="text-[#009966] min-w-4" />

              <div>
                <p className="font-medium">Pro Tools</p>
                <p className="text-sm text-[#6A7282]">
                  Includes bamboo mat, sashimi knife, and more
                </p>
              </div>

            </div>

            <div className="border border-[#E5E7EB] bg-[#F9FAFB] rounded-lg lg:rounded-xl lg:p-5 p-2 flex gap-3 sm:flex-row flex-col">

              <Truck className="text-[#2563EB] min-w-4" />

              <div>
                <p className="font-medium">Free Delivery</p>
                <p className="text-sm text-[#6A7282]">
                  Arrives in premium insulated packaging
                </p>
              </div>

            </div>

          </div>

          <div className="flex gap-4 mb-6 sm:flex-row flex-col">

            <div className="flex items-center justify-center border border-[#E5E7EB] rounded-lg">

              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-4 py-5"
              >
                <Minus size={16} />
              </button>

              <span className="text-center w-[50px]">{qty}</span>

              <button
                onClick={() => setQty(qty + 1)}
                className="px-4 py-5"
              >
                <Plus size={16} />
              </button>

            </div>

            <button
              onClick={() => setOpenCart(true)}
              className="flex-1 bg-[#009966] text-white rounded-lg px-3 flex items-center justify-center gap-2 py-4 shadow-lg"
            >
              <ShoppingBag size={18} />
              Add to Cart — ${total}
            </button>

            <CartModal setActiveTab={setActiveTab} selectedProduct="selected" open={openCart} onClose={() => setOpenCart(false)} />

          </div>

          <div className="flex gap-6 text-[#6A7282]">

            <button className="flex items-center gap-2">
              <Share2 size={18} />
              Share Product
            </button>

            <button className="flex items-center gap-2">
              <Info size={18} />
              Ask a Question
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}