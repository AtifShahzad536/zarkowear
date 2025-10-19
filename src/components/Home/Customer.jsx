import React, { useEffect, useState } from 'react';
import { getHome, imageUrl } from '../../services/api';
import { BsChatDots } from "react-icons/bs";
const Testimonials = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    setLoading(true);
    getHome()
      .then((d) => { if (!alive) return; setList(d.testimonials || []); setError(''); })
      .catch((e) => alive && setError(e.message || 'Failed to load'))
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, []);

  return (
    <section className="w-full bg-gray-50 py-12 px-6">
      <div className="text-center mb-10">
       <h2 className="flex items-center justify-center gap-2 text-4xl font-bold text-indigo-600">
  <BsChatDots className="text-5xl text-indigo-600" />
  What Our Customers Say
</h2>

        <p className="text-gray-600 mt-2 text-lg">Real voices. Real experiences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {loading && <div className="col-span-full text-center text-gray-500">Loading...</div>}
        {error && <div className="col-span-full text-center text-rose-600">{error}</div>}
        {list.map((t, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition"
          >
            <img
              src={imageUrl(t.image)}
              alt={t.name}
              className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-indigo-100"
            />
            <p className="text-gray-700 italic mb-4">“{t.quote}”</p>
            <h4 className="text-indigo-600 font-bold text-lg">{t.name}</h4>
            <span className="text-sm text-gray-500">{t.role}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;