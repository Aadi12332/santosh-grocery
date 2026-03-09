import { ShoppingBag, X, Minus, Plus, Trash2, ArrowRight } from "lucide-react"
import { useState } from "react";

export default function CartModal({ open, onClose, selectedProduct }: { open: boolean; onClose: () => void; selectedProduct?: string }) {

  if (!open) return null

  const [qty, setQty] = useState(1)

  const item = {
    title: "Premium Matcha Tea Set",
    price: 45,
    img: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7"
  }

  const subtotal = item.price * qty
  const delivery = 5.99
  const tax = 3.6
  const total = subtotal + delivery + tax

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >

      <div
        className="absolute inset-0 bg-black/40"
      />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-[448px] w-[96%] min-h-[503px] bg-[#020618] shadow-[0px_25px_50px_-12px_#000000] text-white flex flex-col"
      >

        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">

          <div className="flex items-center gap-2 text-lg font-medium font-playfair">

            <ShoppingBag size={20} className="text-[#00BC7D]" />

            Your Cart <span className="text-[#62748E] text-sm">(0)</span>

          </div>

          <button onClick={onClose}>
            <X className="text-gray-400" />
          </button>

        </div>

        {
          selectedProduct ? 
                  <div className="flex flex-col h-full justify-between">

          <div className="p-5">

            <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-4 flex gap-4 items-start">

              <img
                src={item.img}
                className="w-16 h-16 rounded-lg object-cover"
              />

              <div className="flex-1">

                <div className="flex justify-between items-start">

                  <div>

                    <h3 className="font-playfair text-lg text-white">
                      {item.title}
                    </h3>

                    <p className="text-[#94A3B8] text-sm mt-1">
                      Saved Item
                    </p>

                  </div>

                  <Trash2 size={18} className="text-[#94A3B8]" />

                </div>

                <div className="flex justify-between items-center mt-4">

                  <p className="text-white text-lg">
                    ${item.price.toFixed(2)}
                  </p>

                  <div className="flex items-center border border-[#1E293B] rounded-lg overflow-hidden">

                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="px-3 py-2 text-[#94A3B8]"
                    >
                      <Minus size={14} />
                    </button>

                    <span className="px-4 text-white">
                      {qty}
                    </span>

                    <button
                      onClick={() => setQty(qty + 1)}
                      className="px-3 py-2 text-[#94A3B8]"
                    >
                      <Plus size={14} />
                    </button>

                  </div>

                </div>

              </div>

            </div>

          </div>

          <div className="bg-[#0F172A] p-6 border-t border-[#1E293B]">

            <div className="space-y-3 text-[#94A3B8]">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>$5.99</span>
              </div>

              <div className="flex justify-between">
                <span>Tax (8%)</span>
                <span>$3.60</span>
              </div>

            </div>

            <div className="flex justify-between mt-4 pt-4 border-t border-[#1E293B]">

              <span className="text-white text-lg">
                Total
              </span>

              <span className="text-[#00BC7D] text-xl font-playfair font-semibold">
                ${total.toFixed(2)}
              </span>

            </div>

            <button className="mt-6 w-full bg-[#009966] py-4 rounded-lg text-white font-medium flex items-center justify-center gap-2">

              Checkout

              <ArrowRight size={18} />

            </button>

          </div>

        </div>
       :
       <div className="flex flex-col items-center justify-center flex-1 text-center p-6">

          <div className="w-20 h-20 rounded-full bg-[#0F172B] flex items-center justify-center mb-6">
            <ShoppingBag size={30} className="text-[#314158]" />
          </div>

          <h2 className="text-[20px] font-medium font-playfair mb-2">
            Your cart is empty
          </h2>

          <p className="text-[#62748E] max-w-[310px] mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>

          <button className="bg-[#009966] px-6 py-3 rounded-lg font-medium">
            Start Shopping
          </button>

        </div>
        }




      </div>

    </div>
  )
}