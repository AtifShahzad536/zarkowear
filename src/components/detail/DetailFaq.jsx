import React, { useState } from 'react';
import { FiChevronDown, FiHelpCircle } from 'react-icons/fi';

export default function DetailFaq({ productName = 'Custom Team Uniform', cleanSport = 'Soccer' }) {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: `What is the minimum order quantity (MOQ) for ${productName}?`,
      a: `Our standard factory MOQ is 15 pieces per design or colorway. We also support pre-production sample orders so coaches and athletic directors can review fabric feel, sizing, and color matching before placing full squad orders.`
    },
    {
      q: `How long does custom production and USA delivery take?`,
      a: `Standard manufacturing in our Sialkot atelier takes 8 to 12 business days after digital mockup sign-off. Air express transit via DHL/FedEx to USA or Canada takes 4 to 6 business days on Door-to-Door DDP terms with all customs clearance pre-handled.`
    },
    {
      q: `Are roster player names and jersey numbers included in the price?`,
      a: `Yes! For full dye-sublimated orders, all custom player names, front and back numbers, team crests, sponsor logos, and federation patches are 100% included in the base quote with zero added setup fees.`
    },
    {
      q: `Are these uniforms compliant with NFHS, NCAA, and US club regulations?`,
      a: `Yes. We strictly build according to national federation rulebooks, ensuring legal number dimensions (4-inch front / 8-inch back), proper contrast borders, legal manufacturer logo sizing, and certified home/away color specifications.`
    },
    {
      q: `What happens if a player loses a jersey mid-season? Can we reorder?`,
      a: `We maintain all custom vector artwork, print layouts, and dye recipes on file permanently. You can reorder single fill-in replacement jerseys for new or transferred players at any point during your season.`
    },
    {
      q: `What if there is a defect or printing error in our delivery?`,
      a: `We back every order with a 100% Free Remake Guarantee. If any item arrives with a stitching defect, spelling error that deviates from your signed-off roster, or sizing discrepancy, we manufacture and air-express replacement pieces immediately at zero cost.`
    }
  ];

  return (
    <section className="bg-white rounded-xl border border-slate-200/90 p-5 sm:p-7 shadow-2xs space-y-5">
      <div className="flex items-center gap-2 text-indigo-600 text-[10px] font-bold uppercase tracking-[0.2em]">
        <FiHelpCircle className="text-sm" />
        <span>Frequently Asked Questions</span>
      </div>
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
        Questions About Ordering {productName}
      </h2>

      <div className="divide-y divide-slate-100">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className="py-3.5">
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                className="w-full flex items-center justify-between text-left gap-3 cursor-pointer group"
              >
                <span className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition">
                  {faq.q}
                </span>
                <FiChevronDown
                  className={`text-slate-400 text-sm shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-indigo-600' : ''}`}
                />
              </button>
              {isOpen && (
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pr-4">
                  {faq.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

