import { useState } from "react"
import { ChevronDown, FileText } from "lucide-react"

export default function SupportFAQ() {

  const [open, setOpen] = useState<number | null>(null)

  const faqs = [
    {
      category: "Orders & Shipping",
      items: [
        {
          q: "How do I process a refund for a customer?",
          a: "To process a refund, go to the 'Orders' tab, select the specific order, and click on the 'Issue Refund' button. You can choose to refund the full amount or a partial amount based on the situation."
        },
        {
          q: "Can I change the shipping status manually?",
          a: "Yes, open the order details and update the shipping status from the status dropdown."
        },
        {
          q: "What should I do if an order is delayed?",
          a: "Contact the delivery partner and update the customer with the revised delivery timeline."
        }
      ]
    },
    {
      category: "Payments & Finance",
      items: [
        {
          q: "When will I receive my payouts?",
          a: "Payouts are processed weekly. Funds usually arrive in your bank within 2-3 business days."
        },
        {
          q: "How are commission fees calculated?",
          a: "Commission is calculated as a percentage of the order total depending on your seller plan."
        },
        {
          q: "Can I update my bank account details?",
          a: "Yes, you can update your payout bank account from the Finance settings page."
        }
      ]
    },
    {
      category: "Account & Products",
      items: [
        {
          q: "How do I add a new product?",
          a: "Navigate to Products and click 'Add Product'. Fill in the required information and publish."
        },
        {
          q: "My product was rejected. Why?",
          a: "Products may be rejected if they violate marketplace guidelines or contain incomplete information."
        },
        {
          q: "How do I change my store logo?",
          a: "Go to Account Settings → Store Profile and upload a new logo."
        }
      ]
    }
  ]

  return (
    <div className="grid lg:grid-cols-[320px_1fr] gap-6">

      <div className="space-y-6">

        <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-3 lg:p-6 shadow-sm">

          <div className="flex items-center gap-2 mb-4">
            <FileText size={18} className="text-[#F54900]" />
            <h3 className="font-playfair text-xl">Help Categories</h3>
          </div>

          <div className="space-y-3 text-[#374151]">
            <p className="cursor-pointer hover:text-[#F54900]">Orders & Shipping</p>
            <p className="cursor-pointer hover:text-[#F54900]">Payments & Finance</p>
            <p className="cursor-pointer hover:text-[#F54900]">Account & Products</p>
          </div>

        </div>



        <div className="rounded-lg lg:rounded-xl p-3 lg:p-6 bg-[#FFF7ED] border border-[#FED7AA] shadow-sm">

          <h3 className="font-playfair text-xl mb-2">Still need help?</h3>

          <p className="text-[#6A7282] mb-4">
            Our support team is available 24/7 to assist you with any issues.
          </p>

          <button className="bg-[#F54900] text-white px-5 py-2.5 rounded-lg shadow-sm">
            Start Live Chat
          </button>

        </div>

      </div>



      <div className="space-y-8">

        {faqs.map((section, sIndex) => (

          <div key={sIndex} className="space-y-4">

            <h2 className="font-playfair text-2xl">{section.category}</h2>

            {section.items.map((item, i) => {

              const index = sIndex * 10 + i
              const active = open === index

              return (
                <div
                  key={index}
                  className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-4 shadow-sm cursor-pointer"
                  onClick={() => setOpen(active ? null : index)}
                >

                  <div className="flex items-center justify-between">

                    <p className="font-medium text-[#111827]">
                      {item.q}
                    </p>

                    <ChevronDown
                      size={18}
                      className={`transition ${active ? "rotate-180" : ""}`}
                    />

                  </div>

                  {active && (
                    <p className="text-[#6A7282] mt-3 text-sm">
                      {item.a}
                    </p>
                  )}

                </div>
              )
            })}

          </div>

        ))}

      </div>

    </div>
  )
}