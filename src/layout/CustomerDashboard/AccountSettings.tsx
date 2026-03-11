import { useState } from "react"
import { User, Mail, Phone, Camera, Bell, Globe, Moon, Smartphone, MapPin, Home, AlertTriangle } from "lucide-react"

export default function AccountSettings() {

    const [tab, setTab] = useState("Profile");
    const [toggles, setToggles] = useState<Record<number, boolean>>({
        0: true,
        1: false,
        2: true
    })
    const [theme, setTheme] = useState<"dark" | "light">("light")

    return (
        <div className="space-y-8">

            <div>
                <h1 className="lg:text-[34px] text-[24px] font-playfair font-medium text-[#0F172A]">
                    Account Settings
                </h1>
                <p className="text-[#6A7282] mt-1 lg:text-lg text-base">
                    Manage your profile, security, and preferences.
                </p>
            </div>


            <div className="flex lg:gap-2 gap-1 bg-[#F1F5F9] p-1 rounded-lg lg:rounded-xl w-fit">

                {["Profile", "Security", "Preferences", "Addresses"].map((t) => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={`sm:px-4 px-2 py-2 rounded-lg text-sm ${tab === t ? "bg-white shadow-sm" : "text-[#475569]"
                            }`}
                    >
                        {t}
                    </button>
                ))}

            </div>


            {tab === "Profile" && (
                <div className="border border-[#E5E7EB] lg:rounded-xl rounded-lg lg:p-8 p-3 bg-white shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] space-y-8">

                    <div>
                        <h2 className="font-playfair text-xl text-[#0F172A]">
                            Personal Information
                        </h2>
                        <p className="text-[#6A7282]">
                            Update your personal details here.
                        </p>
                    </div>

                    <div className="flex items-center lg:gap-6 gap-3">

                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                                className="md:min-w-24 md:w-24 md:h-24 w-16 h-16 min-w-16 rounded-full object-cover"
                            />
                            <button className="absolute bottom-0 right-0 md:w-8 md:h-8 w-5 h-5 bg-[#009966] text-white rounded-full flex items-center justify-center shadow">
                                <Camera className="md:w-4 w-3" />
                            </button>
                        </div>

                        <div>
                            <p className="font-playfair text-lg text-[#0F172A]">
                                Profile Picture
                            </p>
                            <p className="text-[#6A7282] lg:text-sm text-xs">
                                JPG, GIF or PNG. Max size of 2MB.
                            </p>
                            <button className="mt-2 border border-[#E5E7EB] rounded-lg px-4 py-1 text-sm">
                                Remove
                            </button>
                        </div>

                    </div>


                    <div className="grid md:grid-cols-2 gap-6">

                        <div>
                            <label className="text-sm text-[#475569]">First Name</label>
                            <div className="mt-1 w-full border border-[#E5E7EB] rounded-lg px-4 py-3 flex items-center gap-1">
                                <User size={16} className="text-[#94A3B8]" />
                                <input defaultValue="Sarah" className="ml-2 flex-1 outline-none" />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm text-[#475569]">Last Name</label>
                            <div className="mt-1 w-full border border-[#E5E7EB] rounded-lg px-4 py-3 flex items-center gap-1">
                                <User size={16} className="text-[#94A3B8]" />
                                <input defaultValue="Chen" className="ml-2 flex-1 outline-none" />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm text-[#475569]">Email Address</label>
                            <div className="mt-1 w-full border border-[#E5E7EB] rounded-lg px-4 py-3 flex items-center gap-1">
                                <Mail size={16} className="text-[#94A3B8]" />
                                <input defaultValue="sarah.chen@example.com" className="ml-2 flex-1 outline-none" />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm text-[#475569]">Phone Number</label>
                            <div className="mt-1 w-full border border-[#E5E7EB] rounded-lg px-4 py-3 flex items-center gap-1">
                                <Phone size={16} className="text-[#94A3B8]" />
                                <input defaultValue="+1 (555) 000-0000" className="ml-2 flex-1 outline-none" />
                            </div>
                        </div>

                    </div>

                    <div className="flex justify-end pt-6 border-t border-[#E5E7EB]">
                        <button className="border border-[#E5E7EB] px-5 py-2 rounded-lg bg-white shadow-sm">
                            Edit Profile
                        </button>
                    </div>

                </div>
            )}



            {tab === "Security" && (
                <div className="border border-[#E5E7EB] lg:rounded-xl rounded-lg lg:p-8 p-3 bg-white shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] space-y-8">

                    <div>
                        <h2 className="font-playfair text-xl">Password & Security</h2>
                        <p className="text-[#6A7282]">Manage your password and security settings.</p>
                    </div>

                    <div className="space-y-4 max-w-xl">

                        <p className="font-playfair text-lg">Change Password</p>

                        <input placeholder="Current Password" className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 outline-none" />
                        <input placeholder="New Password" className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 outline-none" />
                        <input placeholder="Confirm New Password" className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 outline-none" />

                        <button className="bg-[#009966] text-white px-6 py-3 rounded-lg">
                            Update Password
                        </button>

                    </div>

                    <div className="border-t pt-6 flex items-center justify-between">

                        <div>
                            <h3 className="font-playfair text-lg">Two-Factor Authentication</h3>
                            <p className="text-[#6A7282] text-sm">
                                Add an extra layer of security to your account.
                            </p>
                            
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-red-500 text-sm border px-3 py-1 rounded-full border-red-200">
                                Disabled
                            </span>
                        </div>

                    </div>
                     <button className="border border-[#E5E7EB] px-4 py-2 rounded-lg">
                                Enable 2FA
                            </button>

                </div>
            )}



            {tab === "Preferences" && (
                <div className="space-y-6">

                    <div className="border border-[#E5E7EB] rounded-lg lg:rounded-xl lg:p-8 p-3 bg-white shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] space-y-6">

                        <div className="flex items-center gap-3">
                            <Bell className="text-[#009966]" size={20} />
                            <h3 className="font-playfair text-lg">Notifications</h3>
                        </div>

                        {["Order Updates", "Promotions & Offers", "Driver Messages"].map((n, i) => (
                            <div key={i} className="flex items-center justify-between">

                                <div>
                                    <p className="text-[#0F172A]">{n}</p>
                                    <p className="text-sm text-[#6A7282]">
                                        Receive updates about your order.
                                    </p>
                                </div>

                                <button
                                    onClick={() =>
                                        setToggles(prev => ({
                                            ...prev,
                                            [i]: !prev[i]
                                        }))
                                    }
                                    className={`w-12 p-0.5 flex items-center rounded-full transition ${toggles[i] ? "bg-[#009966] justify-end" : "bg-[#CBD5E1] justify-start"
                                        }`}
                                >
                                    <span className="w-5 h-5 bg-white rounded-full shadow" />
                                </button>

                            </div>
                        ))}

                    </div>


                    <div className="border border-[#E5E7EB] rounded-lg lg:rounded-xl lg:p-8 p-3 bg-white shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] space-y-6">

                        <div className="flex items-center gap-3">
                            <Globe className="text-blue-500" size={20} />
                            <h3 className="font-playfair text-lg">Regional Settings</h3>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">

                            <div>
                                <label className="text-sm text-[#475569]">Language</label>
                                <input className="mt-1 w-full border border-[#E5E7EB] rounded-lg px-4 py-3 outline-none" />
                            </div>

                            <div>
                                <label className="text-sm text-[#475569]">Currency</label>
                                <input className="mt-1 w-full border border-[#E5E7EB] rounded-lg px-4 py-3 outline-none" />
                            </div>

                        </div>

                    </div>


                    <div className="border border-[#E5E7EB] rounded-lg lg:rounded-xl lg:p-8 p-3 bg-white shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] space-y-6">

                        <div className="flex items-center gap-3">
                            <Moon className="text-purple-500" />
                            <h3 className="font-playfair text-lg">Appearance</h3>
                        </div>


                        <div className="grid md:grid-cols-2 gap-6">

                            <label
                                className={`border-2 rounded-lg lg:rounded-xl p-6 text-center cursor-pointer transition ${theme === "dark"
                                        ? "border-[#009966] bg-[#F0FDF4]"
                                        : "border-[#E5E7EB]"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="theme"
                                    value="dark"
                                    checked={theme === "dark"}
                                    onChange={() => setTheme("dark")}
                                    className="hidden"
                                />

                                <Moon className={`mx-auto mb-2 ${theme === "dark" ? "text-[#009966]" : ""}`} />
                                Dark Mode
                            </label>


                            <label
                                className={`border-2 rounded-lg lg:rounded-xl p-6 text-center cursor-pointer transition ${theme === "light"
                                        ? " border-[#009966] bg-[#F0FDF4]"
                                        : "border-[#E5E7EB]"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="theme"
                                    value="light"
                                    checked={theme === "light"}
                                    onChange={() => setTheme("light")}
                                    className="hidden"
                                />

                                <Smartphone className={`mx-auto mb-2 ${theme === "light" ? "text-[#009966]" : ""}`} />
                                Light Mode
                            </label>

                        </div>

                    </div>


                    <div className="border border-red-200 bg-red-50 rounded-lg lg:rounded-xl lg:p-6 p-3">
                        <div className="flex items-center gap-3 mb-5">
                            <AlertTriangle className="text-[#E7000B]" />
                            <h3 className="font-playfair text-lg text-[#E7000B]">Danger Zone</h3>
                        </div>
                        <div className="flex items-center justify-between gap-3 flex-wrap">
                            <div>
                                <h3 className="text-red-600 font-playfair">Delete Account</h3>
                                <p className="text-red-500 text-sm">
                                    Permanently remove your account and data.
                                </p>
                            </div>

                            <button className="border border-red-300 text-red-600 px-4 py-2 rounded-lg">
                                Delete
                            </button>
                        </div>

                    </div>

                </div>
            )}



            {tab === "Addresses" && (
                <div className="grid md:grid-cols-2 gap-6">

                    <div className="border border-[#E5E7EB] lg:rounded-xl rounded-lg lg:p-6 p-3 flex flex-col items-center justify-center text-[#6A7282] bg-[#fff]">

                        <span className="bg-[#F3F4F6] rounded-full w-[54px] h-[54px] flex justify-center items-center">
                            <MapPin size={28} />
                        </span>
                        <p className="mt-3">Add New Address</p>

                    </div>


                    <div className="border border-[#34D399] lg:rounded-xl rounded-lg lg:p-6 p-3 bg-white shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]">

                        <div className="flex justify-between items-center mb-4">

                            <div className="flex items-center gap-2">
                                <Home size={18} className="text-[#009966]" />
                                <h3 className="font-playfair text-lg">Home</h3>
                            </div>

                            <span className="bg-[#009966] text-white text-xs px-3 py-1 rounded-full">
                                Default
                            </span>

                        </div>

                        <p className="text-[#6A7282] text-sm">
                            123 Luxury Lane, Apt 4B <br />
                            Downtown District <br />
                            New York, NY 10001
                        </p>

                        <div className="flex gap-4 mt-4 text-sm">
                            <button className="text-[#6A7282]">Edit</button>
                            <button className="text-red-500">Delete</button>
                        </div>

                    </div>

                </div>
            )}

        </div>
    )
}