import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { adminGetHome, adminUpdateHome, adminListUploads, adminUploadFile } from '../services/api';
import { imageUrl } from '../services/api';

export default function AdminHome() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [heroImages, setHeroImages] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [topSelling, setTopSelling] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [newHero, setNewHero] = useState('');
  const [tab, setTab] = useState('hero'); // 'hero' | 'testimonials' | 'top'
  // shared hidden file inputs state
  const [tUploadIndex, setTUploadIndex] = useState(-1);
  const [tsUploadIndex, setTsUploadIndex] = useState(-1);

  // Sync tab with route on mount and when location changes
  useEffect(() => {
    const p = location.pathname;
    if (p.endsWith('/admin/testimonials')) setTab('testimonials');
    else if (p.endsWith('/admin/top-selling')) setTab('top');
    else setTab('hero');
  }, [location.pathname]);

  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        setLoading(true);
        const [home, files] = await Promise.all([adminGetHome(), adminListUploads()]);
        if (!alive) return;
        setHeroImages(home.heroImages || []);
        setTestimonials(home.testimonials || []);
        setTopSelling(home.topSelling || []);
        setUploads(files || []);
      } catch (e) {
        setError(e.message || 'Failed to load');
      } finally {
        if (alive) setLoading(false);
      }
    }
    load();
    return () => { alive = false; };
  }, []);

  function addHero(url) {
    if (!url) return;
    setHeroImages((arr) => Array.from(new Set([ ...arr, url ])));
    setNewHero('');
  }
  function removeHero(idx) {
    setHeroImages((arr) => arr.filter((_, i) => i !== idx));
  }

  function addTestimonial() {
    setTestimonials((arr) => [ ...arr, { name: '', role: '', image: '', quote: '' } ]);
  }
  function updateTestimonial(i, field, value) {
    setTestimonials((arr) => arr.map((t, idx) => idx === i ? { ...t, [field]: value } : t));
  }
  function removeTestimonial(i) {
    setTestimonials((arr) => arr.filter((_, idx) => idx !== i));
  }

  // Top Selling handlers
  function addTopSelling() {
    setTopSelling((arr) => [ ...arr, { name: '', image: '', link: '' } ]);
  }
  function updateTopSelling(i, field, value) {
    setTopSelling((arr) => arr.map((t, idx) => idx === i ? { ...t, [field]: value } : t));
  }
  function removeTopSelling(i) {
    setTopSelling((arr) => arr.filter((_, idx) => idx !== i));
  }
  function addUploadToTopSelling(iUpload, iTop) {
    const url = uploads[iUpload]?.url || '';
    if (!url) return;
    setTopSelling((arr) => arr.map((t, idx) => idx === iTop ? { ...t, image: url } : t));
  }

  async function save() {
    try {
      setLoading(true);
      await adminUpdateHome({ heroImages, testimonials, topSelling });
    } catch (e) {
      setError(e.message || 'Save failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Admin • Home Settings</h1>
      {loading && <div className="mb-3 text-sm text-gray-500">Working...</div>}
      {error && <div className="mb-3 text-sm text-rose-600">{error}</div>}

      {/* Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button onClick={()=>navigate('/admin/home')} className={`px-3 py-2 rounded border ${tab==='hero'?'bg-black text-white border-black':'bg-white hover:bg-gray-50'}`}>Hero Images</button>
        <button onClick={()=>navigate('/admin/testimonials')} className={`px-3 py-2 rounded border ${tab==='testimonials'?'bg-black text-white border-black':'bg-white hover:bg-gray-50'}`}>Testimonials</button>
        <button onClick={()=>navigate('/admin/top-selling')} className={`px-3 py-2 rounded border ${tab==='top'?'bg-black text-white border-black':'bg-white hover:bg-gray-50'}`}>Top Selling</button>
      </div>

      {/* Hero Images */}
      {tab==='hero' && (
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Hero Images</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
          {heroImages.map((u, i) => (
            <div key={i} className="relative group rounded-xl overflow-hidden ring-1 ring-gray-200 bg-white shadow-sm">
              <img src={imageUrl(u)} alt="hero" className="w-full h-40 object-cover" />
              <button onClick={() => removeHero(i)} className="absolute top-2 right-2 px-2 py-1 text-xs bg-white/95 border rounded shadow">Remove</button>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mb-3 items-center">
          <input className="border rounded px-3 py-2 flex-1" placeholder="/uploads/your.jpg or https://..." value={newHero} onChange={(e)=>setNewHero(e.target.value)} />
          <button onClick={()=>addHero(newHero)} className="px-3 py-2 border rounded">Add</button>
          <input id="heroFile" type="file" accept="image/*" className="hidden" onChange={async (e)=>{
            const f = e.target.files?.[0]; if (!f) return;
            try { const res = await adminUploadFile(f); addHero(res.url); } catch {}
            e.target.value='';
          }} />
          <button onClick={()=>document.getElementById('heroFile').click()} className="px-3 py-2 border rounded">Upload</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {uploads.map((f, i) => (
            <button key={i} onClick={()=>addHero(f.url)} className="rounded-lg overflow-hidden ring-1 ring-gray-200 bg-white hover:shadow">
              <img src={imageUrl(f.url)} alt={f.name} className="w-full h-24 object-cover" />
            </button>
          ))}
        </div>
      </section>
      )}

      {/* Testimonials */}
      {tab==='testimonials' && (
      <section className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">Testimonials</h2>
          <button onClick={addTestimonial} className="px-3 py-2 border rounded">+ Add</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((t, i) => (
            <div key={i} className="rounded-xl ring-1 ring-gray-200 bg-white p-4 shadow-sm space-y-2">
              <div className="flex gap-2">
                <input className="border rounded px-2 py-1 flex-1" placeholder="Name" value={t.name} onChange={(e)=>updateTestimonial(i,'name',e.target.value)} />
                <input className="border rounded px-2 py-1 flex-1" placeholder="Role" value={t.role} onChange={(e)=>updateTestimonial(i,'role',e.target.value)} />
              </div>
              <div className="flex gap-2">
                <input className="border rounded px-2 py-1 flex-1" placeholder="Image URL (/uploads/...)" value={t.image} onChange={(e)=>updateTestimonial(i,'image',e.target.value)} />
                <input id="tHidden" type="file" accept="image/*" className="hidden" onChange={async (e)=>{
                  const f = e.target.files?.[0]; if (!f) return;
                  try { const res = await adminUploadFile(f); updateTestimonial(tUploadIndex,'image',res.url); } catch {}
                  setTUploadIndex(-1); e.target.value='';
                }} />
                <button onClick={()=>{ setTUploadIndex(i); document.getElementById('tHidden').click(); }} className="px-2 py-1 text-sm border rounded">Upload</button>
              </div>
              <textarea className="border rounded px-2 py-1 w-full" placeholder="Quote" value={t.quote} onChange={(e)=>updateTestimonial(i,'quote',e.target.value)} />
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">Preview:</div>
                <button onClick={()=>removeTestimonial(i)} className="px-2 py-1 text-xs border rounded">Remove</button>
              </div>
              {t.image && <img src={imageUrl(t.image)} alt="preview" className="w-full h-28 object-cover rounded-md" />}
            </div>
          ))}
        </div>
      </section>
      )}

      {/* Top Selling */}
      {tab==='top' && (
      <section className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">Top Selling</h2>
          <button onClick={addTopSelling} className="px-3 py-2 border rounded">+ Add item</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topSelling.map((t, i) => (
            <div key={i} className="rounded-xl ring-1 ring-gray-200 bg-white p-4 shadow-sm space-y-2">
              <input className="border rounded px-2 py-1 w-full" placeholder="Name" value={t.name} onChange={(e)=>updateTopSelling(i,'name',e.target.value)} />
              <div className="flex gap-2">
                <input className="border rounded px-2 py-1 flex-1" placeholder="Image URL (/uploads/...)" value={t.image} onChange={(e)=>updateTopSelling(i,'image',e.target.value)} />
                <input id="tsHidden" type="file" accept="image/*" className="hidden" onChange={async (e)=>{
                  const f = e.target.files?.[0]; if (!f) return;
                  try { const res = await adminUploadFile(f); updateTopSelling(tsUploadIndex,'image',res.url); } catch {}
                  setTsUploadIndex(-1); e.target.value='';
                }} />
                <button onClick={()=>{ setTsUploadIndex(i); document.getElementById('tsHidden').click(); }} className="px-2 py-1 text-sm border rounded">Upload</button>
              </div>
              <input className="border rounded px-2 py-1 w-full" placeholder="Link (/football or https://...)" value={t.link} onChange={(e)=>updateTopSelling(i,'link',e.target.value)} />
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">Preview:</div>
                <button onClick={()=>removeTopSelling(i)} className="px-2 py-1 text-xs border rounded">Remove</button>
              </div>
              {t.image && <img src={imageUrl(t.image)} alt="preview" className="w-full h-32 object-cover rounded-md" />}
              {/* Quick pick from uploads */}
              <div className="grid grid-cols-6 gap-2 mt-2">
                {uploads.slice(0,12).map((f, j) => (
                  <button key={j} type="button" onClick={()=>addUploadToTopSelling(j, i)} className="rounded-md overflow-hidden ring-1 ring-gray-200 bg-white">
                    <img src={imageUrl(f.url)} alt={f.name} className="w-full h-16 object-cover" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      )}

      <div>
        <button disabled={loading} onClick={save} className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">Save Changes</button>
      </div>
    </main>
  );
}
