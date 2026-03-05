import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.svg";

const navItems = [
  { name: "Restaurants", path: "/restaurants" },
  { name: "Marketplace", path: "/marketplace" },
  { name: "How it Works", path: "/how-it-work" },
];

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="w-full bg-white shadow-sm h-20 flex items-center">
      <div className="max-w-[1265px] lg:px-6 px-3 mx-auto w-full flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={Logo} alt="" />
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative pb-2 transition ${
                  isActive
                    ? "text-[#E17100] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-[#E17100]"
                    : "text-[#64748B] hover:text-black"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate("/sign-in")}
            className="hidden md:block text-sm text-[#64748B] font-medium"
          >
            Sign In
          </button>

          <button
            onClick={() => navigate("/sign-up")}
            className="shadow-[0px_4px_6px_-4px_#D9770633,0px_10px_15px_-3px_#D9770633] flex items-center gap-2 bg-[#D97706] text-white text-sm px-5 py-2.5 rounded-full font-medium hover:opacity-90 transition"
          >
            Sign Up Now
          </button>

          <button
            onClick={() => navigate("/admin")}
            className="hidden md:block text-sm text-[#64748B] font-medium"
          >
            Admin
          </button>
        </div>
      </div>
    </header>
  );
}
