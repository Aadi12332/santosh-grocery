import { Briefcase } from "lucide-react";

const jobs = [
  {
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Remote (US)",
    type: "Full-time",
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "New York, NY",
    type: "Full-time",
  },
  {
    title: "Marketing Manager",
    department: "Marketing",
    location: "Los Angeles, CA",
    type: "Full-time",
  },
  {
    title: "Operations Specialist",
    department: "Operations",
    location: "Chicago, IL",
    type: "Full-time",
  },
]

export default function CareerSection() {
  return (
    <section className="bg-[#020618] py-24 text-white">
      <div className="max-w-[1265px] mx-auto lg:px-6 px-3">
        <div className="text-center mb-16">
          <div className="bg-[#0F172B] w-[72px] h-[72px] rounded-[18px] border border-[#1D293D] flex justify-center items-center mx-auto mb-6">
            <Briefcase size={40} className="text-[#00BC7D]" />
          </div>
          <h2 className="font-playfair text-[54px] font-medium">Join Our Team</h2>
          <p className="text-[#90A1B9] max-w-[700px] mx-auto text-[22px] mt-6">
            We're building the future of food delivery and retail. Come help us shape it.
          </p>
        </div>

           <div className="mt-20">
      <h2 className="font-playfair text-[27px] font-medium text-white mb-6">
        Open Positions
      </h2>

      <div className="border-t border-[#1D293D] pt-8 space-y-6">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-[#0F172B80] border border-[#1D293D] rounded-xl px-8 py-6"
          >
            <div>
              <h3 className="font-playfair text-[20px] font-medium text-white mb-1">
                {job.title}
              </h3>

              <p className="text-[#90A1B9] text-base">
                {job.department} <span className="mx-2">•</span> {job.location}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="px-4 py-1 text-sm bg-[#1E293B] text-[#CBD5E1] rounded-full border border-[#314158]">
                {job.type}
              </span>

              <button className="bg-[#F0B100] hover:bg-[#FACC15] text-[#020618] px-5 py-2 rounded-lg text-sm">
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
      </div>
    </section>
  );
}
