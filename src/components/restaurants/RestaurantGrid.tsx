import { Clock, MapPin, Star, Filter, Utensils, Wine, ChefHat, Flame } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useRole } from "../../layout/RoleProvider";

const cuisines = [
  { name: "All Cuisines", active: true, Icon: Utensils },
  { name: "Fine Dining", Icon: ChefHat },
  { name: "Japanese", Icon: Star },
  { name: "Italian", Icon: Wine },
  { name: "American", Icon: Flame },
]

const restaurants = [
  {
    id: 1,
    name: "Stella's Rooftop",
    type: "ITALIAN • ROOFTOP",
    category: "Premium",
    min: "$20",
    time: "30-45 min",
    distance: "1.2 mi",
    rating: "4.8",
    delivery: "$2.99 Delivery",
    reviews: "1240+ ratings",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de",
    tags: ["BEST VIEW", "WOOD FIRE PIZZA"],
    exclusive: true,
  },
  {
    id: 2,
    name: "Nobu Downtown",
    type: "JAPANESE • SUSHI BAR",
    category: "Luxury",
    min: "$50",
    time: "40-55 min",
    distance: "2.5 mi",
    rating: "4.9",
    delivery: "Free Delivery",
    reviews: "850+ ratings",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9",
    tags: ["OMAKASE AVAILABLE", "FRESH IMPORT"],
    exclusive: true,
  },
  {
    id: 3,
    name: "The Charleston",
    type: "SOUTHERN • HERITAGE",
    category: "Luxury",
    min: "$40",
    time: "60-90 min",
    distance: "3.8 mi",
    rating: "5.0",
    delivery: "$5.99 Delivery",
    reviews: "2100+ ratings",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9",
    tags: ["TASTING MENU", "HISTORIC"],
    exclusive: true,
  },
  {
    id: 4,
    name: "Farm & Fire",
    type: "NEW AMERICAN • FARM TO TABLE",
    category: "Premium",
    min: "$15",
    time: "35-50 min",
    distance: "0.8 mi",
    rating: "4.7",
    delivery: "$1.49 Delivery",
    reviews: "980+ ratings",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    tags: ["ORGANIC", "OUTDOOR SEATING"],
    exclusive: false,
  },
  {
    id: 5,
    name: "Tony's Brick Oven",
    type: "ITALIAN • AUTHENTIC",
    category: "Affordable",
    min: "$25",
    time: "30-45 min",
    distance: "1.5 mi",
    rating: "4.8",
    delivery: "Free Delivery",
    reviews: "3400+ ratings",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9",
    tags: ["LEGENDARY", "FAMILY FAVORITE"],
    exclusive: false,
  },
  {
    id: 6,
    name: "Saffron Lounge",
    type: "INDIAN • FUSION",
    category: "Premium",
    min: "$30",
    time: "45-60 min",
    distance: "4.2 mi",
    rating: "4.6",
    delivery: "$3.49 Delivery",
    reviews: "560+ ratings",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
    tags: ["SIGNATURE CURRY", "COCKTAILS"],
    exclusive: false,
  },
]

export default function RestaurantGrid() {
  const navigate = useNavigate();
const { setRole } = useRole();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  )

  useEffect(() => {
    const handleStorage = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true")
    }

    window.addEventListener("storage", handleStorage)

    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  return (
    <section className="bg-[#020618] py-16 text-white">
      <div className="max-w-[1265px] mx-auto lg:px-6 px-3">

        <div className="flex flex-wrap gap-3 items-center mb-10">
          {cuisines.map((item, i) => (
            <button
              key={i}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm transition ${item.active
                  ? "bg-[#00A63E] text-white"
                  : "bg-[#0F172B] text-[#94A3B8] hover:bg-[#1E293B]"
                }`}
            >
              <item.Icon size={16} />
              {item.name}
            </button>
          ))}

          <div className="border-l border-[#1D293D] ml-2 pl-5 flex items-center gap-2 text-[#94A3B8]">
            <Filter size={16} />
            Filters
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (isLoggedIn) {
                  navigate("/restaurant/dashboard")
                } else {
                  setRole("restaurant");
                  navigate("/role-wise-sign-in?role=restaurant")
                }
              }}
              className="bg-[#0F172B] cursor-pointer border border-[#1D293D] rounded-2xl overflow-hidden hover:border-[#334155] transition"
            >

              <div className="relative">
                <img
                  src={item.image}
                  className="w-full h-56 object-cover"
                />

                {item.exclusive && (
                  <span className="absolute top-3 left-3 bg-[#00C950] text-[10px] font-bold px-3 py-1 rounded-full">
                    EXCLUSIVE PARTNER
                  </span>
                )}

                <div className="absolute bottom-3 left-3 flex gap-2 text-xs">
                  <span className="flex items-center gap-1 bg-[#020618CC] text-sm font-medium px-2 py-1 rounded-full">
                    <Clock size={14} color="#05DF72" />
                    {item.time}
                  </span>

                  <span className="flex items-center gap-1 bg-[#020618CC] text-sm font-medium px-2 py-1 rounded-full">
                    <MapPin size={14} color="#05DF72" />
                    {item.distance}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white text-black text-sm font-bold px-2 py-1 rounded-full">
                  <Star size={12} color="#0F172B" className="fill-[#0F172B]" />
                  {item.rating}
                </div>
              </div>

              <div className="lg:p-5 p-2">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="font-playfair text-[22px]">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#90A1B9] uppercase">
                      {item.type}
                    </p>
                  </div>
                  <div>
                    <span className="text-lg font-medium font-playfair">
                      {item.category}
                    </span>
                    <p className="text-[10px] text-[#62748E]">
                      Min. $20
                    </p>
                  </div>
                </div>

                <div className="text-sm mt-4 text-[#94A3B8] bg-[#1D293D80] px-3 py-2 rounded-lg flex items-center gap-2">
                  <span className="text-sm text-[#CAD5E2] font-medium">{item.delivery}</span>
                  •
                  <span className="text-sm text-[#90A1B9]">{item.reviews}</span>
                </div>

                <div className="flex flex-wrap gap-2 mt-8">
                  {item.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] text-[#90A1B9] px-3 py-1 bg-[#FFFFFF0D] rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button className="w-full mt-6 bg-[#1D293D] hover:bg-[#334155] text-base text-[#CAD5E2] font-medium py-2 rounded-full">
                  View Menu
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}