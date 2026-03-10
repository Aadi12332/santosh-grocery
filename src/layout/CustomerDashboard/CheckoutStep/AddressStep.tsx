import { useState } from "react"
import { Plus } from "lucide-react"

export default function AddressStep() {

  const [selected, setSelected] = useState("home")

  const addresses = [
    {
      id: "home",
      label: "Home",
      badge: "Default",
      address1: "123 Luxury Lane, Apt 4B",
      address2: "New York, NY 10001"
    },
    {
      id: "office",
      label: "Office",
      address1: "456 Corporate Blvd, Floor 12",
      address2: "New York, NY 10005"
    }
  ]

  return (
    <div className="border border-[#1D293D] rounded-2xl p-6 bg-[#0F172B80]">

      <h2 className="font-playfair text-2xl mb-6 text-white">
        Delivery Address
      </h2>

      <div className="space-y-4">

        {addresses.map((item) => {

          const active = selected === item.id

          return (
            <div
              key={item.id}
              onClick={() => setSelected(item.id)}
              className={`flex gap-4 p-5 rounded-xl border cursor-pointer transition
              ${active
                ? "border-[#00BC7D] bg-[#031F2E]"
                : "border-[#1E293B] bg-[#020617]"
              }`}
            >

              <div className="pt-1">

                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center
                  ${active ? "border-[#00BC7D]" : "border-[#475569]"}`}
                >
                  {active && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#00BC7D]" />
                  )}
                </div>

              </div>

              <div className="flex-1">

                <div className="flex items-center gap-3">

                  <span className="text-white text-lg">
                    {item.label}
                  </span>

                  {item.badge && (
                    <span className="text-xs px-2 py-1 rounded-full bg-[#064E3B] text-[#34D399]">
                      {item.badge}
                    </span>
                  )}

                </div>

                <p className="text-[#94A3B8] mt-2">
                  {item.address1}
                </p>

                <p className="text-[#94A3B8]">
                  {item.address2}
                </p>

              </div>

            </div>
          )
        })}

      </div>

      <button className="mt-6 w-full bg-[#E5E7EB] text-black py-4 rounded-xl flex items-center justify-center gap-2">

        <Plus size={18} />

        Add New Address

      </button>

    </div>
  )
}