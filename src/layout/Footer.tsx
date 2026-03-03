import { Instagram, Twitter, Facebook, Linkedin, Heart } from "lucide-react"
import Logo from "../assets/images/logo-light.svg"


export default function Footer() {
  return (
    <footer className="bg-[#020618] text-gray-400">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 justify-between gap-32">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6 bg-[#FFFFFF0D] p-3 w-fit rounded-[12px]">
              <img src={Logo} alt="" />
            </div>

            <p className="leading-relaxed text-[#90A1B9]">
              HUBNEPA is the premier digital marketplace, seamlessly connecting
              you with the best local restaurants and verified retail brands.
              Experience the future of commerce.
            </p>

            <div className="flex items-center gap-4 mt-8">
              <div className="w-10 h-10 rounded-full bg-[#1D293D] flex items-center justify-center hover:bg-[#D97706] transition cursor-pointer">
                <Instagram size={18} className="text-[#90A1B9]" />
              </div>
              <div className="w-10 h-10 rounded-full bg-[#1D293D] flex items-center justify-center hover:bg-[#D97706] transition cursor-pointer">
                <Twitter size={18} className="text-[#90A1B9]" />
              </div>
              <div className="w-10 h-10 rounded-full bg-[#1D293D] flex items-center justify-center hover:bg-[#D97706] transition cursor-pointer">
                <Facebook size={18} className="text-[#90A1B9]" />
              </div>
              <div className="w-10 h-10 rounded-full bg-[#1D293D] flex items-center justify-center hover:bg-[#D97706] transition cursor-pointer">
                <Linkedin size={18} className="text-[#90A1B9]" />
              </div>
            </div>
          </div>

          <div className="col-span-3 flex justify-between gap-5">
            <div>
            <h3 className="text-white font-semibold font-playfair mb-6">Platform</h3>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-white text-[#90A1B9] text-sm transition">Marketplace</a></li>
              <li><a href="#" className="hover:text-white text-[#90A1B9] text-sm transition">How it Works</a></li>
              <li><a href="#" className="hover:text-white text-[#90A1B9] text-sm transition">Partner Access</a></li>
              <li><a href="#" className="hover:text-white text-[#90A1B9] text-sm transition">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold font-playfair mb-6">Company</h3>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-white text-[#90A1B9] text-sm transition">About Us</a></li>
              <li><a href="#" className="hover:text-white text-[#90A1B9] text-sm transition">Careers</a></li>
              <li><a href="#" className="hover:text-white text-[#90A1B9] text-sm transition">Press</a></li>
              <li><a href="#" className="hover:text-white text-[#90A1B9] text-sm transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold font-playfair mb-6">Legal</h3>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-white text-[#90A1B9] text-sm transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white text-[#90A1B9] text-sm transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white text-[#90A1B9] text-sm transition">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white text-[#90A1B9] text-sm transition">Dispute Resolution</a></li>
            </ul>
          </div>
          </div>
        </div>

        <div className="border-t border-[#1D293D] mt-16 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#62748E]">
          <p>© 2026 HUBNEPA Technologies. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart size={14} className=" fill-[#62748E]" /> in USA
          </p>
        </div>
      </div>
    </footer>
  )
}