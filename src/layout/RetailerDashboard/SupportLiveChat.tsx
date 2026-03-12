import { Paperclip, Send, MoreVertical } from "lucide-react"
import { useState } from "react"

export default function SupportLiveChat() {

  const [message, setMessage] = useState("")

  const messages = [
    {
      type: "admin",
      text: "Hello! How can I help you today?",
      time: "10:30 AM"
    },
    {
      type: "user",
      text: "Hi, I'm having trouble uploading a new product image.",
      time: "10:32 AM"
    },
    {
      type: "admin",
      text: "I can help with that. Are you getting any error message?",
      time: "10:33 AM"
    },
    {
      type: "user",
      text: "Yes, it says 'File too large'.",
      time: "10:35 AM"
    },
    {
      type: "admin",
      text: "Got it. The maximum file size allowed is 5MB. Could you please check the size of your image?",
      time: "10:36 AM"
    }
  ]

  return (
    <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-0 shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] flex flex-col h-[620px]">

      <div className="flex items-center justify-between px-6 py-4 border-b">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-gray-200"/>

          <div>
            <p className="font-playfair text-lg">Admin Support</p>
            <p className="text-sm text-[#6A7282]">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"/>
              Online | Typically replies instantly
            </p>
          </div>

        </div>

        <MoreVertical size={20} className="text-[#6A7282]"/>

      </div>



      <div className="flex-1 overflow-y-auto scroll-hide px-6 py-6 space-y-6">

        <div className="flex justify-center">
          <span className="bg-gray-100 text-sm px-4 py-1 rounded-full text-[#6A7282]">
            Today
          </span>
        </div>

        {messages.map((m, i) => (

          <div
            key={i}
            className={`flex ${m.type === "user" ? "justify-end" : "justify-start"}`}
          >

            <div
              className={`max-w-[420px] px-4 py-3 rounded-2xl shadow-sm ${
                m.type === "user"
                  ? "bg-[#F54900] text-white"
                  : "bg-white border border-[#E5E7EB]"
              }`}
            >

              <p>{m.text}</p>

              <p
                className={`text-xs mt-2 ${
                  m.type === "user"
                    ? "text-white/80 text-right"
                    : "text-[#6A7282] text-right"
                }`}
              >
                {m.time}
              </p>

            </div>

          </div>

        ))}

      </div>



      <div className="border-t px-4 py-3 flex items-center gap-3">

        <Paperclip size={20} className="text-[#6A7282] cursor-pointer"/>

        <input
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border border-[#E5E7EB] rounded-full px-4 py-2 outline-none"
        />

        <button className="w-10 h-10 rounded-full bg-[#F54900] flex items-center justify-center text-white">
          <Send size={18}/>
        </button>

      </div>

    </div>
  )
}