import { Package, CreditCard, User, ChevronDown, MessageSquare, Phone, Mail, FileText, Wallet } from "lucide-react"
import { useState } from "react"

export default function HelpCenter() {

  const [open,setOpen] = useState<number | null>(null)

  const faqs = [
    {
      q:"Where is my order?",
      a:"You can track your order in real-time by visiting the \"My Orders\" section. Tap on the specific order to see the live map and estimated delivery time."
    },
    {
      q:"How do I process a return?",
      a:"Go to \"Order History\", select the item you wish to return, and click \"Return Item\". Follow the instructions to schedule a pickup or print a shipping label."
    },
    {
      q:"My payment failed but money was deducted.",
      a:"Don't worry! If a transaction fails, the amount is usually refunded automatically within 3-5 business days. You can check the \"Wallet\" section for status updates."
    },
    {
      q:"How to contact the delivery partner?",
      a:"Once an order is \"Out for Delivery\", a phone icon will appear next to the driver's name on the tracking screen."
    }
  ]

  const categories = [
    {
      icon: Package,
      title:"Order Issues",
      desc:"Track, cancel, or report problems with an order.",
      color:"text-blue-600 bg-blue-50"
    },
    {
      icon: CreditCard,
      title:"Payment & Refunds",
      desc:"Manage wallet, refund status, and payment methods.",
      color:"text-green-600 bg-green-50"
    },
    {
      icon: User,
      title:"Account & Settings",
      desc:"Update profile, address, and login security.",
      color:"text-orange-600 bg-orange-50"
    }
  ]

  return (
    <div className="space-y-12">

      <div className="text-center space-y-6">

        <h1 className="lg:text-[34px] text-[24px] font-playfair text-[#0F172A]">
          How can we help you today?
        </h1>

        <input
          placeholder="Search for answers, orders, or topics..."
          className="max-w-xl mx-auto w-full border border-[#E5E7EB] rounded-xl px-5 py-3 shadow-sm outline-none"
        />

      </div>


      <div className="grid md:grid-cols-3 gap-6">

        {categories.map((c,i)=>{

          const Icon = c.icon

          return(
            <div
              key={i}
              className="border border-[#E5E7EB] lg:rounded-xl rounded-lg lg:p-8 p-3 text-center bg-white shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]"
            >

              <div className={`w-12 h-12 mx-auto flex items-center justify-center rounded-full mb-4 ${c.color}`}>
                <Icon size={22}/>
              </div>

              <h3 className="font-playfair text-xl text-[#0F172A]">
                {c.title}
              </h3>

              <p className="text-[#6A7282] mt-2 text-sm">
                {c.desc}
              </p>

            </div>
          )
        })}

      </div>



      <div className="grid lg:grid-cols-[1fr_380px] gap-10">

        <div>

          <h2 className="font-playfair text-2xl text-[#0F172A] mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">

            {faqs.map((f,i)=>(
              <div
                key={i}
                className="border border-[#E5E7EB] rounded-lg lg:rounded-xl lg:p-4 p-3 bg-white shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]"
              >

                <button
                  onClick={()=>setOpen(open===i ? null : i)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <span className="text-[#0F172A] font-medium">
                    {f.q}
                  </span>

                  <ChevronDown
                    className={`transition ${open===i ? "rotate-180" : ""}`}
                    size={18}
                  />

                </button>

                {open===i && (
                  <p className="text-[#6A7282] text-sm mt-3">
                    {f.a}
                  </p>
                )}

              </div>
            ))}

          </div>

        </div>



        <div className="space-y-6">

          <h2 className="font-playfair text-2xl text-[#0F172A]">
            Contact Us
          </h2>


          <div className="border border-[#E5E7EB] rounded-lg lg:rounded-xl bg-white shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]">

            <div className="flex items-center justify-between p-4 border-b">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                  <MessageSquare className="text-green-600" size={18}/>
                </div>

                <div>
                  <p className="text-[#0F172A]">Live Chat</p>
                  <p className="text-sm text-[#6A7282]">Wait time: ~2 mins</p>
                </div>

              </div>

            </div>


            <div className="flex items-center justify-between p-4 border-b">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <Phone className="text-blue-600" size={18}/>
                </div>

                <div>
                  <p className="text-[#0F172A]">Call Support</p>
                  <p className="text-sm text-[#6A7282]">Available 24/7</p>
                </div>

              </div>

            </div>


            <div className="flex items-center justify-between p-4">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Mail className="text-gray-600" size={18}/>
                </div>

                <div>
                  <p className="text-[#0F172A]">Email Us</p>
                  <p className="text-sm text-[#6A7282]">Response in 24h</p>
                </div>

              </div>

            </div>

          </div>



          <div className="border border-[#E5E7EB] rounded-lg lg:rounded-xl lg:p-6 p-3 bg-white shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]">

            <div className="flex items-center gap-3 mb-3">

              <FileText size={18} className="text-[#6A7282]" />

              <h3 className="font-playfair text-lg">
                Policies
              </h3>

            </div>

            <div className="flex flex-col gap-2 text-[#009966] text-sm">

              <button className="text-left">
                Terms of Service
              </button>

              <button className="text-left">
                Privacy Policy
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}