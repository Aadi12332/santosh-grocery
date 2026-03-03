import { ShieldCheck, ArrowRight } from "lucide-react"

export default function AdminLogin() {
  return (
    <section className="relative min-h-screen bg-[#020618] flex items-center justify-center px-3 lg:px-6 overflow-hidden">
      
      <div className="absolute top-[-150px] left-10 -translate-x-1/2 w-[504px] h-[500px] bg-[#E171001A] blur-[150px] rounded-full" />
      <div className="absolute bottom-[-150px] right-10 translate-x-1/2 w-[500px] h-[500px] bg-[#155DFC1A] blur-[150px] rounded-full" />

      <div className="relative z-10 w-full max-w-[504px] text-center">
        
        <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-[#0F172B] border border-[#1D293D] flex items-center justify-center shadow-[0px_8px_10px_-6px_#0000001A,0px_20px_25px_-5px_#0000001A]">
          <ShieldCheck size={45} className="text-[#E17100]" />
        </div>

        <div className="bg-[#0F172B] border border-[#1D293D] p-6 rounded-[12px] text-left">
          
          <h2 className="font-playfair text-[28px] font-semibold text-white text-center">
            Admin Access
          </h2>

          <p className="text-[#90A1B9] text-center mt-2">
            Enter your secure credentials to access the control panel
          </p>

          <div className="mt-8">
            <label className="text-sm text-[#CAD5E2]">Email Address</label>
            <input
              type="email"
              placeholder="admin@hubnepa.com"
              className="mt-2 w-full bg-[#020618] border border-[#1D293D] rounded-lg px-4 h-[48px] text-white placeholder-[#64748B] focus:outline-none focus:border-[#E17100]"
            />
          </div>

          <div className="mt-6">
            <label className="text-sm text-[#CAD5E2]">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-2 w-full bg-[#020618] border border-[#1D293D] rounded-lg px-4 h-[48px] text-white placeholder-[#64748B] focus:outline-none focus:border-[#E17100]"
            />
          </div>

          <button className="mt-8 w-full bg-[#E17100] rounded-lg h-[48px] text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition">
            Sign In
            <ArrowRight size={18} />
          </button>

          <p className="mt-6 text-sm text-center text-[#62748E]">
            Protected area. Unauthorized access is prohibited and monitored.
          </p>

        </div>
      </div>
    </section>
  )
}