import { useState } from "react";
import { User, Mail, Lock, Eye, Sparkles, Check } from "lucide-react";
import authImg from "../../assets/images/signupbg.svg";
import GoogleIcon from "../../assets/images/googleicon.svg";
import RestIcon from "../../assets/images/restIcon.svg";
import { useNavigate } from "react-router-dom";

export default function AuthSection() {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  return (
    <section className="min-h-[851px] bg-[#020618] ">
      <div className="max-w-[1265px] mx-auto lg:px-6 px-3 flex">
        <div
          className="hidden lg:flex w-1/2 relative"
          style={{
            backgroundImage: `url(${authImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#020618]/90 via-[#020618]/60 to-transparent" />

          <div className="relative z-10 px-10 py-16 flex flex-col justify-end text-white">
            <div className="w-16 h-1 bg-[#00BC7D] mb-6 rounded-full" />
            <h2 className="font-playfair text-[48px] font-medium">
              "The most exclusive dining club in the city."
            </h2>
            <p className="mt-6 text-[#E2E8F0] text-lg">
              Join 50,000+ members enjoying priority reservations and premium
              delivery.
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center py-16">
          <div className="w-full max-w-[400px]">
            <div className="flex justify-between items-center mb-8">
              <span className="flex items-center gap-2 bg-[#00BC7D1A] border border-[#00BC7D33] text-[#00BC7D] px-4 py-1.5 rounded-full text-xs font-semibold">
                <Sparkles size={16} />
                FREE MEMBERSHIP
              </span>

              <div className="flex items-center gap-5">
                <span className="text-xs text-[#90A1B9]">
                  Already a member?
                </span>
                <button onClick={()=>navigate("/sign-in")} className="text-[#64748B] text-xs bg-[#1E2939] border border-[#1D293D] px-3 py-1 rounded-full font-medium hover:text-white transition">
                  SIGN IN
                </button>
              </div>
            </div>

            <h3 className="font-playfair text-[36px] font-medium text-white">
              Join the Inner Circle
            </h3>

            <p className="mt-2 text-[#90A1B9] text-lg">
              Create your account to unlock premium access.
            </p>

            <button className="mt-8 w-full bg-white text-[#0F172B] font-bold py-3 rounded-[12px] hover:bg-gray-200 transition flex items-center gap-3 justify-center">
              <img src={GoogleIcon} alt="" />
              Continue with Google
            </button>

            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-[#1D293D]" />
              <span className="text-xs text-[#62748E]">
                OR SIGN UP WITH EMAIL
              </span>
              <div className="flex-1 h-px bg-[#1D293D]" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="" className="text-[#CAD5E2] text-sm">
                  First Name
                </label>
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                  />
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full bg-[#0F172B80] border border-[#1D293D] rounded-[12px] pl-10 pr-4 py-3 text-white placeholder-[#64748B] focus:outline-none focus:border-[#00A63E]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="" className="text-[#CAD5E2] text-sm">
                  Last Name
                </label>
                <div>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full bg-[#0F172B80] border border-[#1D293D] rounded-[12px] px-4 py-3 text-white placeholder-[#64748B] focus:outline-none focus:border-[#00A63E]"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="" className="text-[#CAD5E2] text-sm">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                />
                <input
                  type="email"
                  placeholder="name@example.com"
                  autoComplete="off"
                  className="w-full bg-[#0F172B80] border border-[#1D293D] rounded-[12px] pl-10 pr-4 py-3 text-white placeholder-[#64748B] focus:outline-none focus:border-[#00A63E]"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="" className="text-[#CAD5E2] text-sm">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                />
                <input
                  type="password"
                  autoComplete="off"
                  placeholder="Create a strong password"
                  className="w-full bg-[#0F172B80] border border-[#1D293D] rounded-[12px] pl-10 pr-10 py-3 text-white placeholder-[#64748B] focus:outline-none focus:border-[#00A63E]"
                />
                <Eye
                  size={18}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-start gap-3 mt-6">
              <button
                type="button"
                onClick={() => setChecked(!checked)}
                className={`mt-1 w-4 h-4 min-w-4 rounded-[4px] border transition-all duration-200 flex items-center justify-center
                    ${
                      checked
                        ? "bg-[#00A63E] border-[#00A63E]"
                        : "bg-[#0F172B] border-[#334155] shadow-[0px_0px_0px_1px_#FFFFFF0D]"
                    }
                `}
              >
                {checked && (
                  <Check size={14} className="text-white" strokeWidth={3} />
                )}
              </button>
              <p className="text-sm text-[#90A1B9] leading-relaxed">
                I agree to the{" "}
                <span className="text-[#00BC7D]">Terms of Service</span> and{" "}
                <span className="text-[#00BC7D]">Privacy Policy</span>, and I
                want to receive exclusive offers.
              </p>
            </div>

            <button className="mt-6 w-full bg-[#009966] text-white py-3 rounded-[12px] font-semibold shadow-[0px_10px_15px_-3px_#00A63E33] hover:opacity-90 transition">
              Create Account
            </button>

            <p className="mt-6 text-center text-xs text-[#00A63E] flex gap-2 items-center justify-center">
              <img src={RestIcon} alt="" />
              Are you a restaurant or driver? Partner with us
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
