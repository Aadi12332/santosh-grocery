import { useState } from "react"
import { Clock, ShieldCheck, ChevronRight } from "lucide-react"

export function ScheduleStep() {

  const [selected, setSelected] = useState("priority")

  const options = [
    {
      id: "priority",
      title: "Priority Delivery",
      time: "25-35 min",
      price: "$5.99"
    },
    {
      id: "standard",
      title: "Standard Delivery",
      time: "45-55 min",
      price: "Free"
    }
  ]

  return (
    <div className="border border-[#1D293D] rounded-2xl p-6 bg-[#0F172B80]">

      <h2 className="font-playfair text-2xl mb-6 text-white">
        Delivery Time
      </h2>

      <div className="space-y-4">

        {options.map((item) => {

          const active = selected === item.id

          return (
            <div
              key={item.id}
              onClick={() => setSelected(item.id)}
              className={`flex items-center justify-between p-5 rounded-xl border cursor-pointer transition
              ${active
                ? "border-[#00BC7D] bg-[#031F2E]"
                : "border-[#1E293B] bg-[#0F172B80]"
              }`}
            >

              <div className="flex items-center gap-4">

                <div className={`w-12 h-12 rounded-full flex items-center justify-center
                ${active ? "bg-[#043D34]" : "bg-[#1E293B]"}`}>

                  <Clock size={20} className={`${active ? "text-[#00BC7D]" : "text-[#94A3B8]"}`} />

                </div>

                <div>

                  <p className="text-white text-lg">
                    {item.title}
                  </p>

                  <p className="text-[#94A3B8]">
                    {item.time}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-6">

                <span className="text-white text-lg">
                  {item.price}
                </span>

                <div className={`w-6 h-6 rounded-full border flex items-center justify-center
                ${active ? "border-[#00BC7D]" : "border-[#475569]"}`}>

                  {active && (
                    <div className="w-3 h-3 rounded-full bg-[#00BC7D]" />
                  )}

                </div>

              </div>

            </div>
          )
        })}

        <div className="flex items-center justify-between p-5 rounded-xl border border-[#1E293B] bg-[#0F172B80]">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-full bg-[#1E293B] flex items-center justify-center">
              <Clock size={20} className="text-[#94A3B8]" />
            </div>

            <div>

              <p className="text-white text-lg">
                Schedule for Later
              </p>

              <p className="text-[#94A3B8]">
                Choose a time
              </p>

            </div>

          </div>

          <ChevronRight className="text-[#94A3B8]" />

        </div>

      </div>

      <div className="mt-6 flex items-center gap-3 border border-[#2B7FFF33] rounded-xl p-4 text-[#8EC5FF] bg-[#2B7FFF0D]">

        <ShieldCheck size={20} />

        <p>
          Contactless delivery is enabled by default. The driver will leave your order at your door.
        </p>

      </div>

    </div>
  )
}