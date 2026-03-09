import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useRole } from "../../layout/RoleProvider";
import { User, ChefHat, Store, Truck } from "lucide-react";
import GoogleIcon from "../../assets/images/googleicon.svg";
import CustomerImg from "../../assets/images/customersideimg.jpg";
import RestaurantImg from "../../assets/images/restaurantsideimg.jpg";
import RetailerImg from "../../assets/images/retailersideimg.jpg";
import SupplierImg from "../../assets/images/suppliersideimg.jpg";
type RoleType = "customer" | "restaurant" | "restaurantbackend" | "retailer" | "supplier";

type RoleConfigType = {
    icon: any;
    title: string;
    description: string;
    btnColor: string;
    iconColor: string;
    borderColor: string;
    quote: string;
    person: string;
    nameLetter: string;
    applyText: string | null;
    quoteColor: string;
    image: string;
    partnerText?: string;
};

const roleConfig: Record<RoleType, RoleConfigType> = {
    customer: {
        icon: User,
        title: "Customer Access",
        description: "Sign in to order exclusive meals and premium products.",
        btnColor: "bg-[#009966]",
        iconColor: "text-[#009966]",
        borderColor: "#009966",
        quote: "Dining at home has never felt this luxurious.",
        person: "PLATINUM MEMBER",
        nameLetter: "P",
        applyText: null,
        quoteColor: "bg-[#009966]",
        image: CustomerImg,
    },

    restaurant: {
        icon: ChefHat,
        title: "Restaurant Owners",
        description: "Manage your menu, orders, and kitchen performance.",
        btnColor: "bg-[#00A63E]",
        iconColor: "text-[#00A63E]",
        borderColor: "#00A63E",
        quote: "HubNepa aligns perfectly with our culinary standards.",
        person: "EXECUTIVE CHEF",
        nameLetter: "E",
        applyText: "Apply for Partnership",
        quoteColor: "bg-[#00A63E]",
        image: RestaurantImg,
        partnerText: "Need access to the Partner Portal?"
    },

    restaurantbackend: {
        icon: ChefHat,
        title: "Restaurant Backend",
        description: "Manage your menu, orders, and kitchen performance.",
        btnColor: "bg-[#00A63E]",
        iconColor: "text-[#00A63E]",
        borderColor: "#00A63E",
        quote: "HubNepa aligns perfectly with our culinary standards.",
        person: "EXECUTIVE CHEF",
        nameLetter: "E",
        applyText: "Apply for Partnership",
        quoteColor: "bg-[#00A63E]",
        image: RestaurantImg,
        partnerText: "Need access to the Partner Portal?"
    },

    retailer: {
        icon: Store,
        title: "Retailer Access",
        description: "Track inventory, sales, and customer insights.",
        btnColor: "bg-[#FF4D00]",
        iconColor: "text-[#FF4D00]",
        borderColor: "#FF4D00",
        quote: "Connecting our premium products with discerning customers.",
        person: "MARKET DIRECTOR",
        nameLetter: "M",
        applyText: "Apply for Partnership",
        quoteColor: "bg-[#FF4D00]",
        image: RetailerImg,
        partnerText: "Need access to the Seller Hub?"
    },

    supplier: {
        icon: Truck,
        title: "Supplier Portal",
        description: "Manage wholesale orders and inventory.",
        btnColor: "bg-[#3B82F6]",
        iconColor: "text-[#3B82F6]",
        borderColor: "#3B82F6",
        quote: "Streamlining the supply chain for modern commerce.",
        person: "LOGISTICS MANAGER",
        nameLetter: "L",
        applyText: "Apply for Partnership",
        quoteColor: "bg-[#3B82F6]",
        image: SupplierImg,
        partnerText: "Need access to the Supplier Portal?"
    },
};

export default function RoleSignInSection() {
    const navigate = useNavigate();
    const { role } = useRole();
    const [checked, setChecked] = useState(false);
    const [show, setShow] = useState(false);
    if (!role) return null;

    const config = roleConfig[role as RoleType];
    const Icon = config.icon;


const handleLogin = () => {
  if (role === "customer") {
    navigate("/customer/dashboard")
  }

  if (role === "retailer") {
    navigate("/retailer/dashboard")
  }

  if (role === "supplier") {
    navigate("/supplier/dashboard")
  }

  if (role === "restaurant") {
    navigate("/restaurant/dashboard")
  }
}

    return (
        <section className="bg-[#020618] text-white">
            <div className="min-h-[calc(100vh-80px)] max-w-[1265px] lg:px-6 px-3 mx-auto flex">

                <div className="w-[50%] max-w-[400px] py-10 mx-auto flex flex-col justify-center">

                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#90A1B9] mb-8">
                        <ArrowLeft size={18} />
                        Switch Portal
                    </button>

                    <div className="w-12 h-12 rounded-xl bg-[#0F172B] border border-[#1D293D] focus:outline-none focus:border-[#00A63E] flex items-center justify-center mb-6">
                        <Icon className={config.iconColor} />
                    </div>

                    <h1 className="font-playfair text-[44px] mb-4">
                        {config.title}
                    </h1>

                    <p className="text-[#90A1B9] text-lg mb-10">
                        {config.description}
                    </p>

                    <div>

                        <div>
                            <p className="text-sm mb-2 text-[#90A1B9]">Email Address</p>
                            <div
                                className="flex items-center border border-[#1D293D] bg-[#0F172B] rounded-lg px-4 py-3 focus-within:ring-[0.5px] transition"
                                style={{ '--focus-color': config.borderColor } as React.CSSProperties}
                            >
                                <Mail className="mr-2 opacity-60" size={18} />
                                <input
                                    className="bg-transparent outline-none w-full text-white placeholder-gray-400"
                                    placeholder="name@hubnepa.com"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-[#90A1B9]">Password</span>
                                <button className={config.iconColor}>Forgot password?</button>
                            </div>

                           <div
                                className="flex items-center border border-[#1D293D] bg-[#0F172B] rounded-lg px-4 py-3 focus-within:ring-[0.5px] transition"
                                style={{ '--focus-color': config.borderColor } as React.CSSProperties}
                            >
                                <Lock className="mr-2 opacity-60" size={18} />

                                <input
                                    type={show ? "text" : "password"}
                                    className="bg-transparent outline-none w-full text-white placeholder-gray-400"
                                    placeholder="••••••••"
                                />

                                {show ? (
                                    <EyeOff
                                        size={18}
                                        className="opacity-60 cursor-pointer"
                                        onClick={() => setShow(false)}
                                    />
                                ) : (
                                    <Eye
                                        size={18}
                                        className="opacity-60 cursor-pointer"
                                        onClick={() => setShow(true)}
                                    />
                                )}
                            </div>
                        </div>

                        <div className="flex items-start gap-3 mt-2">
                            <button
                                type="button"
                                onClick={() => setChecked(!checked)}
                                className={`mt-1 w-4 h-4 min-w-4 rounded-[4px] border transition-all duration-200 flex items-center justify-center
                                    ${checked
                                        ? "bg-[#009966] border-[#009966]"
                                        : "bg-[#0F172B] border-[#334155] shadow-[0px_0px_0px_1px_#FFFFFF0D]"
                                    }
                                `}
                            >
                                {checked && (
                                    <Check size={14} className="text-white" strokeWidth={3} />
                                )}
                            </button>
                            <p className="text-sm text-[#90A1B9] leading-relaxed">
                                Remember this device
                            </p>
                        </div>

                        <button onClick={handleLogin}
                            className={`w-full py-3 mt-6 rounded-lg font-medium flex items-center justify-center gap-2 ${config.btnColor}`}
                        >
                            Sign In
                            <ArrowRight size={18} />
                        </button>


                        {config.applyText && (
                            <div className="border border-[#1D293D] bg-[#0F172B80] rounded-xl text-sm p-5 text-center text-[#90A1B9] mt-6">
                                <span className="text-xs mb-3 inline-block">{config.partnerText}</span>
                                <div className={`${config.iconColor} cursor-pointer`} onClick={()=>navigate("/orderplace")}>
                                    {config.applyText}
                                </div>
                            </div>
                        )}

                        {role === "customer" && (
                            <div className="mt-6">

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex-1 h-[1px] bg-[#1D293D]"></div>
                                    <p className="text-[#62748E] text-xs">OR CONTINUE WITH</p>
                                    <div className="flex-1 h-[1px] bg-[#1D293D]"></div>
                                </div>

                                <button className="w-full bg-white text-[#0F172B] py-3 rounded-lg flex items-center justify-center gap-3 font-medium hover:bg-gray-100 transition">
                                    <img
                                        src={GoogleIcon}
                                        alt="google"
                                        className="w-5 h-5"
                                    />
                                    Sign in with Google
                                </button>

                                <p className="text-center text-[#90A1B9] mt-6 text-sm">
                                    Don't have an account?{" "}
                                    <span onClick={() => navigate("/sign-up")} className="text-[#00BC7D] font-medium cursor-pointer">
                                        Sign up now
                                    </span>
                                </p>

                            </div>
                        )}

                    </div>
                </div>

                <div
                    className="w-[50%] relative bg-cover bg-center flex items-end justify-center"
                    style={{ backgroundImage: `url(${config.image})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#020618] to-transparent"></div>

                    <div className="relative max-w-[420px] text-white pb-10">
                        <div className={`h-[4px] w-14 ${config.quoteColor} mb-6`} />

                        <h2 className="font-playfair text-[42px] leading-[1.2] mb-8">
                            "{config.quote}"
                        </h2>

                        <div className="flex items-center gap-4">
                            <div
                                className={`w-10 h-10 rounded-full flex font-semibold text-black items-center justify-center ${config.quoteColor}`}
                            >
                                {config.nameLetter}
                            </div>

                            <div>
                                <p className="text-sm">{config.person}</p>
                                <p className="text-[#90A1B9] text-xs">Verified Partner</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}