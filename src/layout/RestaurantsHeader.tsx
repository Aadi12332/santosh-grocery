import { NavLink, useNavigate } from "react-router-dom";
import Favicon from "../assets/images/favicon.svg";
import { useRole } from "./RoleProvider";
export default function RestaurantsHeader() {
    const { setRole } = useRole();
    const navigate = useNavigate();
  return (
    <header className="w-full bg-[#020618]">
      <div className="max-w-[1265px] mx-auto lg:px-6 px-3 h-[80px] flex items-center justify-between">

        <div className="flex items-center gap-3">
          <img
            src={Favicon}
            className="w-14 h-14 object-contain"
          />

          <span className="text-white text-lg font-semibold">
            Restaurants
          </span>
        </div>

        <div className="flex items-center gap-6">
          <span onClick={() => {
    setRole("restaurantbackend");
    navigate(`/role-wise-sign-in?role=restaurantbackend`);
  }}
            className="text-[#90A1B9] hover:text-white transition cursor-pointer"
          >
            Partner Login
          </span>

          <NavLink
            to="/restaurants"
            className="px-5 py-2 rounded-full border border-[#1D293D] text-[#00D492] hover:bg-[#0F172B] transition"
          >
            Find Food
          </NavLink>
        </div>

      </div>
    </header>
  );
}