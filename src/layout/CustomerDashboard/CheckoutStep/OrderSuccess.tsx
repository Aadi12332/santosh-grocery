import { Check, Truck } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function OrderSuccess() {
    const navigate = useNavigate()

  const order = {
    id: "ORD-9921",
    delivery: "Today, 8:30 PM - 9:00 PM"
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">

      <div className="w-24 h-24 rounded-full bg-[#043D34] flex items-center justify-center mb-6">

        <div className="w-14 h-14 rounded-full border-2 border-[#00BC7D] flex items-center justify-center">

          <Check size={26} className="text-[#00BC7D]" />

        </div>

      </div>

      <h1 className="font-playfair text-4xl text-white mb-3">
        Order Confirmed!
      </h1>

      <p className="text-[#94A3B8] mb-8">
        Your order <span className="text-white">#{order.id}</span> has been placed successfully.
      </p>

      <div className="w-full max-w-[520px] border border-[#1D293D] rounded-2xl p-6 bg-[#0F172B80] text-left mb-8">

        <div className="flex items-center gap-3 mb-4">

          <Truck className="text-[#60A5FA]" size={20} />

          <div>

            <p className="text-white">
              Estimated Delivery
            </p>

            <p className="text-[#94A3B8] text-sm">
              {order.delivery}
            </p>

          </div>

        </div>

        <div className="w-full h-1.5 bg-[#1E293B] rounded-full mb-4">

          <div className="w-[35%] h-full bg-[#00BC7D] rounded-full" />

        </div>

        <p className="text-[#94A3B8] text-sm">
          We've sent a confirmation email to your inbox.
        </p>

      </div>

      <button onClick={()=> navigate("/customer/dashboard")} className="w-full max-w-[520px] bg-[#009966] text-white py-4 rounded-xl text-lg font-medium mb-6">

        Track Order

      </button>

      <button onClick={()=> navigate("/customer/dashboard")} className="text-[#94A3B8]">

        Back to Home

      </button>

    </div>
  )
}