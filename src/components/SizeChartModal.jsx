import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMinimize2, FiInfo, FiActivity } from 'react-icons/fi';

const SIZES_DATA = {
  mens: [
    { size: 'XS', chest: '32-34', waist: '26-28', hip: '32-34' },
    { size: 'S', chest: '35-37', waist: '29-31', hip: '35-37' },
    { size: 'M', chest: '38-40', waist: '32-34', hip: '38-40' },
    { size: 'L', chest: '41-43', waist: '35-37', hip: '41-43' },
    { size: 'XL', chest: '44-46', waist: '38-40', hip: '44-46' },
    { size: '2XL', chest: '47-49', waist: '41-43', hip: '47-49' },
    { size: '3XL', chest: '50-54', waist: '42-47', hip: '51-56' },
    { size: '4XL', chest: '55-60', waist: '49-54', hip: '55-60' }
  ],
  womens: [
    { size: 'XS', chest: '30-32', waist: '24-26', hip: '33-35' },
    { size: 'S', chest: '33-35', waist: '27-29', hip: '36-38' },
    { size: 'M', chest: '36-38', waist: '30-32', hip: '39-41' },
    { size: 'L', chest: '39-41', waist: '33-35', hip: '42-44' },
    { size: 'XL', chest: '42-44', waist: '36-38', hip: '45-47' },
    { size: '2XL', chest: '45-47', waist: '39-41', hip: '48-50' },
    { size: '3XL', chest: '48-53', waist: '42-47', hip: '51-56' },
    { size: '4XL', chest: '54-59', waist: '48-53', hip: '57-62' }
  ],
  youth: [
    { size: 'YS', chest: '26-28', waist: '22-24', hip: '26-28' },
    { size: 'YM', chest: '29-31', waist: '25-27', hip: '29-31' },
    { size: 'YL', chest: '32-34', waist: '28-30', hip: '32-34' },
    { size: 'YXL', chest: '35-37', waist: '31-33', hip: '35-37' }
  ]
};

const SizeChartModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('mens');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto">
          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="bg-white rounded-none w-full max-w-4xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:grid md:grid-cols-12 max-h-[90vh] md:max-h-[85vh]"
          >
            {/* Left Column: How to Measure (5 Cols) */}
            <div className="md:col-span-5 bg-slate-50 p-6 sm:p-8 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.2em] font-extrabold text-indigo-600 block mb-1">Guide</span>
                  <h3 className="text-xl font-bold text-slate-900">How to Measure</h3>
                </div>

                <div className="space-y-5">
                  {/* Chest */}
                  <div className="flex gap-4">
                    <span className="w-8 h-8 rounded-none bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 font-bold text-xs">
                      A
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Chest</h4>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        Measure around the fullest part of your chest, keeping the tape parallel to the floor.
                      </p>
                    </div>
                  </div>

                  {/* Waist */}
                  <div className="flex gap-4">
                    <span className="w-8 h-8 rounded-none bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 font-bold text-xs">
                      B
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Waist</h4>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        Measure around your natural waistline, keeping the tape comfortably loose.
                      </p>
                    </div>
                  </div>

                  {/* Hip */}
                  <div className="flex gap-4">
                    <span className="w-8 h-8 rounded-none bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 font-bold text-xs">
                      C
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Hip</h4>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        Measure around the fullest part of your hips, keeping the tape parallel to the floor.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alert Badge */}
              <div className="mt-8 flex gap-2.5 items-start p-3 bg-amber-50 border border-amber-100/60 rounded-none text-amber-800">
                <FiInfo className="text-sm shrink-0 mt-0.5" />
                <p className="text-[10px] font-medium leading-normal">
                  Pro-Tip: Have someone help you measure to keep the tape perfectly straight.
                </p>
              </div>
            </div>

            {/* Right Column: Sizing Table & Tabs (7 Cols) */}
            <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-6">
                {/* Header controls */}
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-slate-900">Size Chart</h3>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-slate-100 rounded-none text-slate-400 hover:text-slate-700 transition"
                    title="Close Size Chart"
                  >
                    <FiMinimize2 size={16} />
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 p-1 bg-slate-100 rounded-none">
                  {['mens', 'womens', 'youth'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-2 text-xs font-bold rounded-none uppercase transition-all ${
                        activeTab === tab
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {tab === 'mens' ? "Men's" : tab === 'womens' ? "Women's" : 'Youth'}
                    </button>
                  ))}
                </div>

                {/* Sizing Table */}
                <div className="border border-slate-100 rounded-none overflow-hidden shadow-inner bg-slate-50/50">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-900 text-white text-[10px] font-extrabold uppercase tracking-wider">
                          <th className="py-3 px-4">Size</th>
                          <th className="py-3 px-4">Chest (Inches)</th>
                          <th className="py-3 px-4">Waist (Inches)</th>
                          <th className="py-3 px-4">Hip (Inches)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                        {SIZES_DATA[activeTab].map((row, idx) => (
                          <tr
                            key={idx}
                            className={`${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'} hover:bg-slate-100/50 transition-colors`}
                          >
                            <td className="py-3 px-4 font-extrabold text-slate-900">{row.size}</td>
                            <td className="py-3 px-4">{row.chest}</td>
                            <td className="py-3 px-4">{row.waist}</td>
                            <td className="py-3 px-4">{row.hip}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Note details footer */}
              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] font-semibold text-slate-400">
                <span className="flex items-center gap-1">
                  <FiActivity /> Custom sizing available for all teams
                </span>
                <span>* Sizes may vary by style</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SizeChartModal;
