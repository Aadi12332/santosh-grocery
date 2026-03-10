import { useState } from "react"
import { MapPin, Clock, CreditCard, CheckCircle, ArrowLeft, ArrowRight, Search, Bell } from "lucide-react"
import { ScheduleStep } from "./ScheduleStep"
import { PaymentStep } from "./PaymentStep"
import { ConfirmStep } from "./ConfirmStep"
import AddressStep from "./AddressStep"
import OrderSuccess from "./OrderSuccess"

export default function Checkout() {

    const [step, setStep] = useState(1)

    const nextStep = () => {
  if (step < 4) {
    setStep(step + 1)
  } else {
    setStep(5)
  }
}

    const prevStep = () => {
        if (step > 1) setStep(step - 1)
    }

    const steps = [
        { id: 1, label: "Address", icon: MapPin },
        { id: 2, label: "Schedule", icon: Clock },
        { id: 3, label: "Payment", icon: CreditCard },
        { id: 4, label: "Confirm", icon: CheckCircle }
    ]

    return (
        <div className="bg-[#020618] min-h-svh">
            <div className="border-b border-[#1E293B]">
                <div className="flex items-center justify-between lg:px-6 px-3 py-4 max-w-[1265px] mx-auto">
                    <div className="flex items-center gap-5 text-sm text-[#94A3B8]">

                        <span>HubNepa</span>

                        <span className="text-[#475569]">›</span>

                        <span className="text-white font-medium">
                            Checkout
                        </span>

                    </div>

                    <div className="flex items-center gap-4">

                        <div className="relative">

                            <Search
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                            />

                            <input
                                placeholder="Search orders..."
                                className="w-[260px] h-10 pl-10 pr-4 rounded-lg text-white bg-[#0F172A] border border-[#1E293B] text-sm outline-none"
                            />

                        </div>

                        <button className="relative">

                            <Bell size={20} className="text-[#94A3B8]" />

                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />

                        </button>

                    </div>
                </div>
            </div>
            {step === 5 ? (
  <OrderSuccess />
) : (
            <div className="grid lg:grid-cols-[1fr_380px] gap-10 py-20 text-white lg:px-6 px-3 max-w-[1265px] mx-auto">
                <div>

                    <button
                        onClick={prevStep}
                        className="flex items-center gap-2 mb-8 text-[#94A3B8]"
                    >
                        <ArrowLeft size={18} />
                        <h1 className="text-3xl font-playfair text-white">Checkout</h1>
                    </button>


                    <div className="flex items-center justify-between mb-10">

                        {steps.map((s, i) => {

                            const Icon = s.icon
                            const active = step >= s.id

                            return (
                                <div key={s.id} className="flex flex-1">

                                    <div className="flex flex-col items-center">

                                        <div
                                            className={`w-10 h-10 flex items-center justify-center rounded-full border ${active
                                                ? "bg-[#009966] border-[#009966]"
                                                : "border-[#1E293B]"
                                                }`}
                                        >
                                            <Icon size={18} />
                                        </div>

                                        <span className="text-sm mt-2">{s.label}</span>

                                    </div>

                                    {i < 3 && (
                                        <div
                                            className={`flex-1 h-[2px] relative top-5 ${step > s.id
                                                ? "bg-[#009966]"
                                                : "bg-[#1E293B]"
                                                }`}
                                        />
                                    )}

                                </div>
                            )
                        })}

                    </div>

                    {step === 1 && <AddressStep />}
                    {step === 2 && <ScheduleStep />}
                    {step === 3 && <PaymentStep />}
                    {step === 4 && <ConfirmStep />}

                </div>
                <div className="border border-[#1E293B] rounded-xl p-6 h-fit">

                    <h3 className="font-playfair text-xl mb-6">
                        Order Summary
                    </h3>

                    <div className="space-y-3 text-[#94A3B8]">

                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>$45.00</span>
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

                    <div className="border-t border-[#1E293B] mt-4 pt-4 flex justify-between items-center">

                        <span>Total</span>

                        <span className="text-[#00BC7D] text-[24px] font-playfair">
                            $54.59
                        </span>

                    </div>

                    <button
                        onClick={nextStep}
                        className="mt-6 bg-[#009966] px-6 py-3 rounded-lg flex items-center justify-center gap-2 w-full"
                    >
                        {step === 4 ? "Place Order" : "Continue"}
                        <ArrowRight size={18} />
                    </button>

                    <div className="text-xs text-[#62748E] mt-5">By placing an order, you agree to our Terms of Service.</div>

                </div>
            </div>
            )}

        </div>
    )
}
