import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ_ITEMS = [
  {
    question: "How long does a custom uniform order actually take from first call to delivery?",
    answer: "A standard customized tailoring order runs about 8 to 12 working days from the moment you approve the final digital design mockup. Global shipping to the USA takes an additional 3 to 5 business days via DHL or FedEx Express."
  },
  {
    question: "Is there really no minimum order, even for a single jersey?",
    answer: "Our standard customized runs require a minimum order quantity (MOQ) of 15 pieces per customized design layout. However, we do offer physical custom sampling/mockups for team evaluations before full production starts."
  },
  {
    question: "Are Zarko uniforms NFHS-, USA-Wrestling-, and US-Soccer-compliant?",
    answer: "Yes, all our custom sports uniforms and wrestling singlets are engineered to meet the strict uniform compliance standards (including number sizing, color limits, and logo placement guidelines) set by NFHS, USA Wrestling, US Soccer, and other major governing bodies."
  },
  {
    question: "Which sports does Zarko sportswear manufacture, and what fabrics are used?",
    answer: "As a leading custom sportswear manufacturer, we produce high-performance team uniforms for Soccer/Football, Basketball, Wrestling, Rugby, Cricket, Hockey, Tennis, and Running. We use export-grade fabrics including dry-fit micro-polyester, heavy-duty 4-way stretch spandex, and premium flex fleece blends."
  },
  {
    question: "Can I order matching shorts, sideline jackets, warm-ups, and bags in the same design?",
    answer: "Absolutely! We synchronize dye batches and design blueprints across all product types (jerseys, shorts, hoodies, tracksuits, bags) to ensure your entire squad has a cohesive, 100% matching team look."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-[#0A0C16] text-white py-20 sm:py-28 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[500px] h-[250px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[94%] mx-auto px-4 relative z-10">
        {/* Title */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-[9px] uppercase tracking-[0.25em] font-extrabold text-indigo-400">
            HAVE QUESTIONS?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Frequently Asked Questions
          </h2>
          <div className="w-12 h-1 bg-indigo-500 mx-auto mt-4" />
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto leading-relaxed pt-2">
            The most common questions coaches, team parents, and program directors ask before placing a Zarko order.
          </p>
        </div>

        {/* FAQ Accordions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div 
                key={idx} 
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen 
                    ? 'bg-indigo-950/20 border-indigo-500/30' 
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <div
                  className="w-full text-left p-6 flex flex-col gap-2 cursor-pointer"
                  onClick={() => toggleIndex(idx)}
                >
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide leading-snug">
                      {item.question}
                    </h3>
                    <span className={`text-sm shrink-0 font-bold ${isOpen ? 'text-indigo-400' : 'text-slate-400'}`}>
                      {isOpen ? '✕' : '＋'}
                    </span>
                  </div>
                  {/* Concise AEO answer always visible in DOM */}
                  <p className="text-[11px] text-slate-400 font-medium leading-relaxed mt-1">
                    {idx === 0 && "Zarko custom teamwear orders take 8 to 12 working days to manufacture, plus 3 to 5 business days for express delivery to the USA."}
                    {idx === 1 && "Zarko sportswear requires a minimum order quantity (MOQ) of 15 units per custom design layout."}
                    {idx === 2 && "Yes, all our custom jerseys and singlets comply fully with NFHS, USA Wrestling, and US Soccer requirements."}
                    {idx === 3 && "We manufacture custom teamwear for soccer, basketball, wrestling, cricket, rugby, tennis, and running using dry-fit polyester and spandex."}
                    {idx === 4 && "Yes, you can order matching shorts, warm-up hoodies, tracksuits, caps, and team bags matching your custom jerseys."}
                  </p>
                </div>
                
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 text-[11px] sm:text-xs text-slate-400 leading-relaxed font-medium border-t border-white/5">
                    {item.answer}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

