import {
  FileText,
  ChevronLeft,
  ChevronRight,
  Clock,
  UserPlus,
  Users,
  Calendar,
  MessageSquare,
  DollarSign,
  Search,
  Filter,
  MoreHorizontal,
  Key,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";

const tabs = [
  { key: "directory", label: "Staff Directory", icon: Users },
  { key: "schedule", label: "Schedule", icon: Calendar },
  { key: "requests", label: "Requests", icon: MessageSquare },
  { key: "payroll", label: "Payroll", icon: DollarSign },
];

const staff = [
  {
    name: "Sarah Jenkins",
    type: "Full-time",
    role: "Manager",
    status: "Active",
    branch: "Downtown HQ",
    date: "2023-01-15",
    code: "8821",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Michael Chen",
    type: "Full-time",
    role: "Head Chef",
    status: "Active",
    branch: "Downtown HQ",
    date: "2023-02-01",
    code: "9932",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Jessica Wu",
    type: "Part-time",
    role: "Chef",
    status: "Training",
    branch: "Downtown HQ",
    date: "2023-11-20",
    code: "7741",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "David Wilson",
    type: "Part-time",
    role: "Front Staff",
    status: "Active",
    branch: "Downtown HQ",
    date: "2023-06-10",
    code: "6652",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Emma Thompson",
    type: "Full-time",
    role: "Front Staff",
    status: "Active",
    branch: "Downtown HQ",
    date: "2023-03-12",
    code: "5519",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

const schedule = [
  {
    day: "Monday",
    date: "Feb 12",
    shifts: [
      {
        time: "09:00 - 17:00",
        staff: ["Sarah Jenkins", "Michael Chen", "David Wilson"],
      },
      {
        time: "17:00 - 23:00",
        staff: ["Emma Thompson", "Jessica Wu"],
      },
    ],
  },
  {
    day: "Tuesday",
    date: "Feb 13",
    shifts: [
      {
        time: "09:00 - 17:00",
        staff: ["Sarah Jenkins", "Michael Chen"],
      },
      {
        time: "17:00 - 23:00",
        staff: ["Emma Thompson", "Jessica Wu", "David Wilson"],
      },
    ],
  },
  {
    day: "Wednesday",
    date: "Feb 14",
    shifts: [
      {
        time: "09:00 - 17:00",
        staff: ["Sarah Jenkins", "Michael Chen", "David Wilson"],
      },
      {
        time: "17:00 - 23:00",
        staff: ["Emma Thompson", "Jessica Wu"],
      },
    ],
  },
];

const statusMap: any = {
  Active: "bg-green-100 text-[#009966]",
  Training: "bg-yellow-100 text-yellow-700",
};

const requests = [
  {
    name: "Jessica Wu",
    type: "Time Off",
    subtitle: "Feb 20 - Feb 22",
    note: "Family wedding",
    status: "pending",
    icon: Calendar,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600"
  },
  {
    name: "David Wilson",
    type: "Shift Swap",
    subtitle: "Swap Feb 14 Evening with Emma Thompson",
    status: "approved",
    icon: Users,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600"
  }
]

const payroll = [
  {
    name: "Sarah Jenkins",
    role: "Manager",
    hours: "80 hrs",
    rate: "$22.00/hr",
    total: "$1,760.00"
  },
  {
    name: "Michael Chen",
    role: "Head Chef",
    hours: "80 hrs",
    rate: "$22.00/hr",
    total: "$1,760.00"
  },
  {
    name: "Jessica Wu",
    role: "Chef",
    hours: "80 hrs",
    rate: "$22.00/hr",
    total: "$1,760.00"
  },
  {
    name: "David Wilson",
    role: "Front Staff",
    hours: "80 hrs",
    rate: "$22.00/hr",
    total: "$1,760.00"
  },
  {
    name: "Emma Thompson",
    role: "Front Staff",
    hours: "80 hrs",
    rate: "$22.00/hr",
    total: "$1,760.00"
  }
]

export default function TeamManagement({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  const [tab, setTab] = useState("directory");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl lg:text-[34px] font-playfair font-semibold">
            Team Management
          </h1>

          <p className="text-[#64748B] mt-2">
            Track daily revenue across all delivery platforms and in-house
            dining.
          </p>
        </div>

        <div className="flex gap-3 items-center">
          <button className="border border-[#E5E7EB] rounded-lg px-4 py-2 flex gap-2 items-center bg-white">
            <FileText size={16} />
            Export Payroll
          </button>
          <button className="bg-[#009966] text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <UserPlus size={16} />
            Add Staff Member
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex gap-6 bg-[#F1F5F9] p-2 rounded-xl w-fit">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm ${
                  tab === t.key
                    ? "bg-white shadow text-[#0F172A]"
                    : "text-[#64748B]"
                }`}
              >
                <Icon size={16} />
                {t.label}
              </button>
            );
          })}
        </div>

        {tab === "directory" && (
          <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl shadow-sm">
            <div className="p-6 flex items-center justify-between border-b">
              <div className="flex items-center gap-3 border rounded-lg px-3 w-[320px]">
                <Search size={16} className="text-[#64748B]" />
                <input
                  placeholder="Search staff by name or role..."
                  className="w-full py-2 outline-none text-sm"
                />
              </div>

              <button className="flex items-center gap-2 text-[#64748B]">
                <Filter size={16} />
                Filter
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[900px]">
                <thead className="bg-[#F8FAFC] text-sm text-[#64748B]">
                  <tr>
                    <th className="py-4 px-6">NAME</th>
                    <th>ROLE</th>
                    <th>STATUS</th>
                    <th>BRANCH</th>
                    <th>HIRED DATE</th>
                    <th>LOGIN CODE</th>
                    <th className="text-center">ACTION</th>
                  </tr>
                </thead>

                <tbody>
                  {staff.map((s, i) => (
                    <tr key={i} className="border-t">
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={s.image}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium text-[#0F172A]">
                              {s.name}
                            </p>
                            <p className="text-sm text-[#64748B]">{s.type}</p>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="px-3 py-1 rounded-full bg-[#F1F5F9] text-sm">
                          {s.role}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${statusMap[s.status]}`}
                        >
                          {s.status}
                        </span>
                      </td>

                      <td className="text-[#64748B]">{s.branch}</td>

                      <td className="text-[#64748B]">{s.date}</td>

                      <td>
                        <div className="flex gap-2 items-center">
                          <span className="bg-[#F1F5F9] px-3 py-1 rounded-md">
                            {s.code}
                          </span>
                          <Key size={14} className="text-[#64748B]" />
                        </div>
                      </td>

                      <td className="text-center">
                        <MoreHorizontal
                          size={18}
                          className="text-[#94A3B8] cursor-pointer mx-auto"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "schedule" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="font-playfair text-2xl">
                  Week of Feb 12 – Feb 18
                </h2>

                <div className="flex gap-2">
                  <button className="p-2 border rounded-lg">
                    <ChevronLeft size={16} />
                  </button>
                  <button className="p-2 border rounded-lg">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              <button className="bg-[#0F172A] text-white px-6 py-3 rounded-lg font-medium">
                Publish Schedule
              </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {schedule.map((day, i) => (
                <div
                  key={i}
                  className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl shadow-sm overflow-hidden"
                >
                  <div className="flex justify-between items-center p-5 border-b">
                    <h3 className="font-playfair text-lg">{day.day}</h3>
                    <p className="text-[#64748B]">{day.date}</p>
                  </div>

                  <div className="p-5 space-y-4">
                    {day.shifts.map((shift, idx) => (
                      <div key={idx} className="border rounded-xl p-4">
                        <div className="flex items-center gap-2 text-[#009966] font-medium">
                          <Clock size={16} />
                          {shift.time}
                        </div>

                        <div className="mt-3 space-y-2">
                          {shift.staff.map((s, j) => (
                            <p
                              key={j}
                              className="flex items-center gap-2 text-[#334155]"
                            >
                              <span className="w-2 h-2 bg-green-500 rounded-full" />
                              {s}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}

                    <button className="w-full flex items-center justify-center gap-2 border rounded-lg py-3 text-[#64748B]">
                      <UserPlus size={16} />
                      Add Shift
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "requests" && (
            <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl shadow-sm">

              <div className="p-6 border-b">
                <h3 className="font-playfair text-xl">Staff Requests</h3>
                <p className="text-[#64748B] mt-1">
                  Manage time-off requests and shift swaps.
                </p>
              </div>

              <div className="divide-y">

                {requests.map((r, i) => (
                  <div key={i} className="p-6 flex items-center justify-between">

                    <div className="flex items-start gap-4">

                      <div className={`w-12 h-12 flex items-center justify-center rounded-full ${r.iconBg}`}>
                        <r.icon size={20} className={r.iconColor} />
                      </div>

                      <div>
                        <p className="font-semibold text-[#0F172A]">
                          {r.name} • {r.type}
                        </p>

                        <p className="text-[#64748B] mt-1">
                          {r.subtitle}
                        </p>

                        {r.note && (
                          <p className="text-[#94A3B8] italic mt-1">
                            "{r.note}"
                          </p>
                        )}
                      </div>

                    </div>

                    <div className="flex items-center gap-3">

                      {r.status === "pending" && (
                        <>
                          <button className="px-4 py-2 rounded-lg border border-red-300 text-red-600">
                            Reject
                          </button>
                          <button className="px-4 py-2 rounded-lg bg-[#009966] text-white">
                            Approve
                          </button>
                        </>
                      )}

                      {r.status === "approved" && (
                        <span className="flex items-center gap-2 bg-green-100 text-[#009966] px-3 py-1 rounded-full text-sm">
                          <CheckCircle size={16} />
                          Approved
                        </span>
                      )}

                    </div>

                  </div>
                ))}

              </div>

            </div>
          )}

        {tab === "payroll" && (
              <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl shadow-sm">

      <div className="p-6 flex items-center justify-between border-b">

        <div>
          <h3 className="font-playfair text-xl">Payroll Overview</h3>
          <p className="text-[#64748B] mt-1">
            Salary period: Feb 1 - Feb 14
          </p>
        </div>

        <button className="bg-[#0F172A] text-white px-6 py-3 rounded-lg font-medium">
          Run Payroll
        </button>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full text-left min-w-[800px]">

          <thead className="bg-[#F8FAFC] text-sm text-[#64748B]">
            <tr>
              <th className="py-4 px-6 font-medium">EMPLOYEE</th>
              <th>ROLE</th>
              <th>HOURS WORKED</th>
              <th>HOURLY RATE</th>
              <th className="text-end px-6">TOTAL PAY</th>
            </tr>
          </thead>

          <tbody>

            {payroll.map((p, i) => (
              <tr key={i} className="border-t">

                <td className="py-5 px-6 font-medium text-[#0F172A]">
                  {p.name}
                </td>

                <td className="text-[#64748B]">
                  {p.role}
                </td>

                <td className="text-[#0F172A]">
                  {p.hours}
                </td>

                <td className="text-[#64748B]">
                  {p.rate}
                </td>

                <td className="py-5 px-6 text-end font-semibold text-[#009966]">
                  {p.total}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
        )}
      </div>
    </div>
  );
}
