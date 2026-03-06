type SectionListItem = {
  label: string;
  text: string;
};

type SectionItem = {
  title: string;
  content?: string;
  list?: SectionListItem[];
};

type TermsSectionProps = {
  title: string;
  lastUpdated: string;
  intro: string;
  icon?: React.ReactNode;
  sections: SectionItem[];
};

import { Scale } from "lucide-react";

export function TermsSection({
  title,
  lastUpdated,
  intro,
  sections,
  icon,
}: TermsSectionProps) {
  return (
    <section className="w-full bg-[#020618]">
      <div className="max-w-[900px] mx-auto px-3 lg:px-6 py-[80px]">

        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-xl bg-[#0F172B] border border-[#1D293D] flex items-center justify-center">
            {icon || <Scale className="text-[#00BC7D]" />}
          </div>

          <div>
            <h1 className="font-playfair text-[36px] text-white font-medium leading-[1] mb-2">
              {title}
            </h1>
            <p className="text-[#62748E] text-base">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>

        <p className="text-[#90A1B9] text-[20px] leading-relaxed mb-10">
          {intro}
        </p>

        <div className="space-y-10">
          {sections.map((item, index) => (
            <div key={index}>
              <h3 className="font-playfair text-[24px] font-medium text-white mb-4">
                {index + 1}. {item.title}
              </h3>

              {item.content && (
                <p className="text-[#CAD5E2] text-[16px] leading-relaxed mb-4">
                  {item.content}
                </p>
              )}

              {item.list && (
                <div className="space-y-3">
                  {item.list.map((listItem, i) => (
                    <p key={i} className="text-[#CAD5E2] text-[16px]">
                      <span className="font-semibold text-white">
                        {listItem.label}:
                      </span>{" "}
                      {listItem.text}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}