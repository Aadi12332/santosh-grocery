import { useState } from "react"
import { Plus } from "lucide-react"

export function PaymentStep() {

  const [selected, setSelected] = useState("mastercard")

  const cards = [
    {
      id: "mastercard",
      name: "Mastercard",
      number: "•••• 4242",
      expiry: "Expires 12/25",
      primary: true
    },
    {
      id: "visa",
      name: "Visa",
      number: "•••• 8831",
      expiry: "Expires 09/24"
    }
  ]

  return (
    <div className="border border-[#1D293D] rounded-2xl p-6 bg-[#0F172B80]">

      <h2 className="font-playfair text-2xl mb-6 text-white">
        Payment Method
      </h2>

      <div className="space-y-4">

        {cards.map((card) => {

          const active = selected === card.id

          return (
            <div
              key={card.id}
              onClick={() => setSelected(card.id)}
              className={`flex items-center justify-between p-5 rounded-xl border cursor-pointer transition
              ${active
                ? "border-[#00BC7D] bg-[#031F2E]"
                : "border-[#1E293B]"
              }`}
            >

              <div className="flex items-center gap-4">

                <div className="w-14 h-10 bg-[#1E293B] rounded-md flex items-center justify-center text-sm font-semibold">

                  {card.name === "Visa" ? (
                    <span className="text-blue-400">VISA</span>
                  ) : (
                    <div className="flex gap-1">
                      <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                      <div className="w-4 h-4 bg-yellow-400 rounded-full -ml-2"></div>
                    </div>
                  )}

                </div>

                <div>

                  <div className="flex items-center gap-3">

                    <p className="text-white text-lg">
                      {card.name} {card.number}
                    </p>

                    {card.primary && (
                      <span className="text-xs px-2 py-1 rounded-full bg-[#1E293B] text-[#94A3B8]">
                        Primary
                      </span>
                    )}

                  </div>

                  <p className="text-[#94A3B8]">
                    {card.expiry}
                  </p>

                </div>

              </div>

              <div
                className={`w-6 h-6 rounded-full border flex items-center justify-center
                ${active ? "border-[#00BC7D]" : "border-[#475569]"}`}
              >

                {active && (
                  <div className="w-3 h-3 rounded-full bg-[#00BC7D]" />
                )}

              </div>

            </div>
          )
        })}

      </div>

      <button className="mt-6 w-full bg-[#E5E7EB] text-black py-4 rounded-xl flex items-center justify-center gap-2">

        <Plus size={18} />

        Add New Card

      </button>

    </div>
  )
}