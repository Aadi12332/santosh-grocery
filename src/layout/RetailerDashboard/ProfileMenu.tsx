import { useState, useRef, useEffect } from "react"

export default function ProfileMenu() {

  const [open,setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(()=>{
    const handleClick = (e:MouseEvent)=>{
      if(ref.current && !ref.current.contains(e.target as Node)){
        setOpen(false)
      }
    }

    document.addEventListener("mousedown",handleClick)
    return ()=> document.removeEventListener("mousedown",handleClick)
  },[])

  return (
    <div className="relative">

      <div
        onClick={()=>setOpen(true)}
        className="flex items-center gap-3 pl-5 border-l cursor-pointer"
      >
        <div>
          <div className="font-medium text-[#111827]">Sarah Chen</div>
          <div className="text-[#62748E] text-sm text-end">Retailer</div>
        </div>

        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          className="w-12 h-12 rounded-full"
        />
      </div>


      {open && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" />

          <div
            ref={ref}
            className="absolute right-0 top-16 z-50 w-[250px] bg-white lg:rounded-2xl rounded-lg overflow-hidden shadow-xl border border-[#E5E7EB]"
          >

            <div className="px-6 py-3 text-base font-bold text-[#0F172A] border-b">
              My Account
            </div>

            <div className="flex flex-col">

              <button className="text-left px-6 py-3 text-base hover:bg-gray-50 text-[#0F172B]">
                Profile Settings
              </button>

              <button className="text-left px-6 py-3 text-base hover:bg-gray-50 text-[#0F172B] border-b">
                Billing & Wallet
              </button>

              <button className="text-left px-6 py-3 text-base text-[#E7000B] hover:bg-red-50">
                Log out
              </button>

            </div>

          </div>
        </>
      )}

    </div>
  )
}