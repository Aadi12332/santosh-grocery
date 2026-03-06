import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo-light.svg";

export default function SecondaryFooter() {
    const navigate = useNavigate();
  return (
    <div className="border-t border-[#1D293D] bg-[#020618]">
      <div className="max-w-[1265px] mx-auto lg:px-6 px-3 py-6 flex items-center justify-between">

        <div className="flex items-center gap-3 cursor-pointer" onClick={()=>navigate("/")}>
          <img
            src={Logo}
            className=""
          />
        </div>

        <div className="flex items-center gap-8 text-[#90A1B9] text-sm">
          <NavLink to="/privacy-policy" className="hover:text-white transition">
            Privacy
          </NavLink>

          <NavLink to="/terms" className="hover:text-white transition">
            Terms
          </NavLink>

          <NavLink to="/contact" className="hover:text-white transition">
            Contact
          </NavLink>
        </div>

        <p className="text-[#64748B] text-sm">
          © 2026 HUBNEPA.
        </p>

      </div>
    </div>
  );
}