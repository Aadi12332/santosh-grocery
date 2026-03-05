export default function RestaurantPartnershipCTA() {
  return (
    <section className="w-full bg-[#020618] py-20">
      <div className="max-w-[1265px] mx-auto lg:px-6 px-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 rounded-[20px] border-t border-[#00C95033] bg-[linear-gradient(90deg,rgba(13,84,43,0.2)_0%,#0F172B_100%)] px-8 py-10">
          
          <div className="max-w-[640px]">
            <h2 className="font-playfair text-[32px] font-medium text-white">
              Own a Restaurant?
            </h2>

            <p className="mt-4 text-[18px] text-[#90A1B9] font-normal leading-relaxed">
              Join the most exclusive dining network in the country. We only
              accept the top 10% of applicants to maintain our premium
              standards.
            </p>
          </div>

          <button className="px-8 h-[48px] bg-white text-[#00C950] text-base rounded-lg hover:bg-gray-100 transition">
            Apply for Partnership
          </button>

        </div>
      </div>
    </section>
  )
}