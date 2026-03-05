import { Utensils, ShoppingBag } from "lucide-react"
const cards = [
  {
    icon: Utensils,
    title: "I'm Hungry",
    desc: "Explore 500+ premium restaurants and order your next meal.",
    button: "Find Restaurants",
    buttonClass:
      "bg-[#00A63E] text-white shadow-[0px_0px_15px_-5px_#22C55E4D]",
  },
  {
    icon: ShoppingBag,
    title: "I Need Groceries",
    desc: "Shop organic produce and essentials from top local marts.",
    button: "Shop Market",
    buttonClass:
      "bg-[#1E293B] text-[#CAD5E2] border border-[#334155]",
  },
]

export default function StartJourney() {
  return (
    <section className="relative w-full bg-[#020618]">
      <div className="max-w-[1265px] mx-auto px-3 lg:px-6 pt-10 pb-[120px] text-center">
        <h2 className="font-playfair text-[40px] md:text-[56px] text-white mb-16">
          Start Your Journey
        </h2>

        <div className="flex justify-center gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon

            return (
              <div
                key={index}
                className="bg-[#0F172B] border border-[#1E293B] rounded-[20px] p-10 text-center max-w-[432px]"
              >
                <div className="flex justify-center mb-6 text-[#94A3B8]">
                  <Icon size={36} />
                </div>

                <h3 className="font-playfair text-[24px] font-bold text-white mb-4">
                  {card.title}
                </h3>

                <p className="text-[#90A1B9] text-[16px] leading-relaxed max-w-[360px] mx-auto mb-10">
                  {card.desc}
                </p>

                <button
                  className={`w-full max-w-[320px] mx-auto h-[48px] text-sm rounded-full font-medium ${card.buttonClass}`}
                >
                  {card.button}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}