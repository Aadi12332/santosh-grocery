import { Target, Users } from "lucide-react";
import Mission from "../../assets/images/missionimg.jpg";

export default function MissionSection() {
  return (
    <section className="w-full bg-[#020618]">
      <div className="max-w-[1265px] mx-auto px-3 lg:px-6 py-[80px] grid lg:grid-cols-2 gap-16 items-center">

        <div>
          <h2 className="font-playfair text-[54px] font-medium text-white mb-8">
            Our Mission
          </h2>

          <p className="text-[20px] font-normal text-[#90A1B9] leading-relaxed mb-6">
            HUBNEPA was founded with a singular purpose: to empower local
            businesses while delivering unparalleled convenience to customers.
            We believe that technology should enhance human connection, not
            replace it.
          </p>

          <p className="text-[20px] font-normal text-[#90A1B9] leading-relaxed mb-12">
            By creating a unified platform for both restaurant delivery and
            grocery shopping, we're creating a seamless ecosystem where quality
            meets efficiency, and where every transaction supports the local
            economy.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-[#0F172B] border border-[#1D293D] rounded-[18px] p-6">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#00C9501A] mb-4">
                <Target className="text-[#00C950]" />
              </div>

              <h4 className="font-playfair text-xl text-white mb-2">
                Precision
              </h4>

              <p className="text-[#90A1B9] text-sm leading-relaxed">
                Advanced logistics ensuring your orders arrive exactly when and
                how you expect them.
              </p>
            </div>

            <div className="bg-[#0F172B] border border-[#1D293D] rounded-[18px] p-6">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#155DFC1A] mb-4">
                <Users className="text-[#155DFC]" />
              </div>

              <h4 className="font-playfair text-xl text-white mb-2">
                Community
              </h4>

              <p className="text-[#90A1B9] text-sm leading-relaxed">
                Supporting thousands of local vendors and creating jobs within
                our neighborhoods.
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <img
            src={Mission}
            className="w-full h-[570px] object-cover rounded-[26px]"
          />

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%] bg-[#0F172BCC] backdrop-blur-lg border border-[#1D293D] rounded-[18px] px-8 py-6 flex justify-between items-center">
            <div>
              <p className="text-white text-3xl font-semibold">500k+</p>
              <p className="text-[#90A1B9] text-sm">
                Successful Deliveries
              </p>
            </div>

            <div className="w-px h-12 bg-[#1D293D]" />

            <div>
              <p className="text-white text-3xl font-semibold">98%</p>
              <p className="text-[#90A1B9] text-sm">
                Satisfaction Rate
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}