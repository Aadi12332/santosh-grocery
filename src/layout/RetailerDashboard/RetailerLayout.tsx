import { useState, useEffect, useRef } from "react"
import RetailerChild from "./RetailerChild"
import RetailerSidebar from "./RetailerSidebar"
import RetailerHeader from "./RetailerHeader"

export default function RetailerLayout() {

  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || "dashboard"
  })

  const [sidebarOpen,setSidebarOpen] = useState(false)

  const sidebarRef = useRef<HTMLDivElement>(null)

  const handleTabChange = (tab:string)=>{
    setActiveTab(tab)
    localStorage.setItem("activeTab",tab)
  }

  useEffect(()=>{
    const handleClickOutside = (e:MouseEvent)=>{
      if(sidebarRef.current && !sidebarRef.current.contains(e.target as Node)){
        setSidebarOpen(false)
      }
    }

    document.addEventListener("mousedown",handleClickOutside)
    return ()=> document.removeEventListener("mousedown",handleClickOutside)
  },[])

  return (
    <div className="flex h-screen bg-[#F8FAFC] relative">
      {sidebarOpen && (
        <div
          onClick={()=>setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        />
      )}
      <div
        ref={sidebarRef}
        className={`fixed lg:static z-40 h-full min-h-svh bg-white border-r border-[#E5E7EB] transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >

        <RetailerSidebar setSidebarOpen={setSidebarOpen} activeTab={activeTab} setActiveTab={handleTabChange}/>
      </div>


      <div className="flex flex-col flex-1 overflow-hidden">

        <RetailerHeader
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          openSidebar={()=>setSidebarOpen(true)}
        />

        <div className="flex-1 overflow-y-auto scroll-hide lg:p-8 p-4">
          <RetailerChild setActiveTab={handleTabChange} activeTab={activeTab}/>
        </div>

      </div>

    </div>
  )
}