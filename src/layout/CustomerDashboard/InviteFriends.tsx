import {
  Gift,
  Copy,
  Twitter,
  Facebook,
  Mail,
  Share2,
  Users,
  CheckCircle,
  CheckCircle2
} from "lucide-react"

const steps = [
  {
    id: 1,
    title: "Invite Friends",
    desc: "Share your unique link via email or social media.",
    icon: Users
  },
  {
    id: 2,
    title: "They Join",
    desc: "Friends sign up and get $20 off their first order.",
    icon: CheckCircle2
  },
  {
    id: 3,
    title: "You Earn",
    desc: "Get $20 credit automatically after their first delivery.",
    icon: Gift
  }
]

export default function InviteFriends() {

  const referralCode = "SARAH-8821"

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode)
  }

  return (
    <div className="min-h-screen bg-[#020618] text-white px-6 py-[74px]">

      <div className="max-w-[960px] mx-auto text-center">

        <div className="w-20 h-20 rounded-full bg-[#00BC7D33] flex items-center justify-center mx-auto mb-6">
          <Gift size={36} className="text-[#00D492]" />
        </div>

        <h1 className="text-[54px] font-medium font-playfair mb-4">
          Invite Friends & Earn
        </h1>

        <p className="text-[#94A3B8] text-lg max-w-[620px] mx-auto">
          Share the luxury experience. Give your friends{" "}
          <span className="text-white">$20 off</span> and earn{" "} <br />
          <span className="text-[#00BC7D] font-bold">$20 credit</span> when they dine.
        </p>

        <div className="mt-16 bg-[#0F172B] border border-[#1D293D] rounded-2xl p-8 shadow-[0px_25px_50px_-12px_#000000]">

          <p className="text-sm text-start tracking-widest text-[#94A3B8] mb-3">
            YOUR REFERRAL CODE
          </p>

          <div className="flex gap-3 mb-6">

            <input value={referralCode} readOnly className="flex-1 h-16 flex items-center text-[22px] placeholder:text-[#00D492] text-[#00D492] outline-none px-4 rounded-lg border border-[#1E293B] bg-[#020618] tracking-widest" />
            <button
              onClick={copyCode}
              className="px-10 flex items-center gap-2 rounded-lg bg-[#1E293B] hover:bg-[#334155]"
            >
              <Copy size={18} />
              Copy
            </button>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            <button className="bg-white text-black py-6 rounded-xl flex flex-col items-center gap-4">
              <Twitter size={22} className="text-[#90A1B9]" />
              Twitter
            </button>

            <button className="bg-white text-black py-6 rounded-xl flex flex-col items-center gap-4">
              <Facebook size={22} className="text-[#90A1B9]" />
              Facebook
            </button>

            <button className="bg-white text-black py-6 rounded-xl flex flex-col items-center gap-4">
              <Mail size={22} className="text-[#90A1B9]" />
              Email
            </button>

            <button className="bg-white text-black py-6 rounded-xl flex flex-col items-center gap-4">
              <Share2 size={22} className="text-[#90A1B9]" />
              More
            </button>

          </div>

        </div>

      </div>

      <div className="max-w-[960px] mx-auto mt-16">

        <h2 className="text-3xl font-playfair mb-8">
          How it Works
        </h2>

       <div className="grid md:grid-cols-3 gap-6">

  {steps.map((step, i) => {

    const Icon = step.icon

    return (
      <div
        key={i}
        className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-6 relative"
      >
        <span className="absolute -top-4 -left-4 bg-[#1D293D] border border-[#314158] text-base rounded-full w-9 h-9 text-[#90A1B9] flex items-center justify-center font-bold">{step.id}</span>

        <Icon className="text-[#00BC7D] mb-4" size={36} />

        <h3 className="font-playfair text-xl mb-2">
          {step.title}
        </h3>

        <p className="text-[#94A3B8]">
          {step.desc}
        </p>

      </div>
    )
  })}

</div>

      </div>

    </div>
  )
}