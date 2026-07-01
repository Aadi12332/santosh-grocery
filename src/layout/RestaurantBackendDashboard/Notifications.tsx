import {
  AlertTriangle,
  Bell,
  Info,
  CheckCircle,
  Clock, Trash2
} from "lucide-react"

const notifications = [
{
title:"New Order #ORD-8825",
desc:"A new delivery order has been placed.",
time:"2 mins ago",
icon:Bell,
color:"#2563EB",
iconbg:"bg-[#DBEAFE]",
bg: "bg-[#EFF6FF4D] border-[#DBEAFE]"

},
{
title:"Low Stock Alert: Tomatoes",
desc:"Inventory for Tomatoes is below threshold (2.5kg).",
time:"1 hour ago",
icon:AlertTriangle,
color:"#DC2626",
iconbg:"bg-[#FEE2E2]",
bg: "bg-[#EFF6FF4D] border-[#DBEAFE]"

},
{
title:"System Update",
desc:"The platform will undergo maintenance at 2 AM.",
time:"3 hours ago",
icon:Info,
color:"#475569",
iconbg:"bg-[#F1F5F9]",
bg: "bg-[#fff] border-[#E2E8F0]"

},
{
title:"Payout Processed",
desc:"Weekly payout of $4,250 has been sent to your bank.",
time:"Yesterday",
icon:CheckCircle,
color:"#16A34A",
iconbg:"bg-[#DCFCE7]",
bg: "bg-[#fff] border-[#E2E8F0]"

}
]
export default function Notifications() {

  return (

    <div className="space-y-5">

      <div className="flex justify-between items-center flex-wrap gap-5">

        <div>

          <h1 className="lg:text-[34px] text-3xl font-playfair font-semibold">
            Notifications
          </h1>

          <p className="text-[#6A7282] mt-2">
            Stay updated with your restaurant activities.
          </p>

        </div>

        <div className="flex items-center gap-4">

          <button className="border border-[#E5E7EB] px-4 py-2 rounded-lg bg-white shadow-sm">
            Mark all as read
          </button>
        </div>

      </div>



      <div className="">
       <div className="space-y-5">

{notifications.map((n,i)=>{

const Icon = n.icon

return(

<div
key={i}
className={`border bg-white rounded-xl p-5 shadow-sm flex gap-4 items-start ${n.bg}`}
>

<div className={`w-12 h-12 rounded-full flex items-center justify-center ${n.iconbg}`}>
<Icon size={22} style={{color:n.color}}/>
</div>



<div className="flex-1">

<div className="flex items-start justify-between">

<div>

<h3 className="font-playfair text-lg text-[#0F172A]">
{n.title}
</h3>

<p className="text-[#64748B] mt-1">
{n.desc}
</p>

</div>



<div className="flex items-center gap-4 text-sm text-[#64748B]">

<div className="flex items-center gap-1">

<Clock size={14}/>
{n.time}

</div>

<button className="text-[#94A3B8]">
<Trash2 size={16}/>
</button>

</div>

</div>

</div>

</div>

)

})}

</div>
      </div>

    </div>

  )

}