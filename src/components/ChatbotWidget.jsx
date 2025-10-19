import React, { useMemo, useRef, useState } from 'react';
import { FaComments, FaPaperPlane, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { askAI } from '../services/aiClient';

const cannedFaq = [
  { q: 'home', a: <>Go to the <Link to="/" className="text-indigo-600 underline">Home</Link> page.</> },
  { q: 'contact', a: <>You can reach us on the <Link to="/contact" className="text-indigo-600 underline">Contact</Link> page.</> },
  { q: 'custom', a: <>Learn about custom orders on <Link to="/custom" className="text-indigo-600 underline">Custom</Link>.</> },
  { q: 'football', a: <>Browse kits at <Link to="/football" className="text-indigo-600 underline">Football</Link>.</> },
  { q: 'cricket', a: <>Browse kits at <Link to="/cricket" className="text-indigo-600 underline">Cricket</Link>.</> },
  { q: 'wrestling', a: <>Browse kits at <Link to="/wrestling" className="text-indigo-600 underline">Wrestling</Link>.</> },
  { q: 'basketball', a: <>Browse kits at <Link to="/basketball" className="text-indigo-600 underline">Basketball</Link>.</> },
  { q: 'hockey', a: <>Browse kits at <Link to="/hockey" className="text-indigo-600 underline">Hockey</Link>.</> },
  { q: 'rugby', a: <>Browse kits at <Link to="/rugby" className="text-indigo-600 underline">Rugby</Link>.</> },
  { q: 'tennis', a: <>Browse kits at <Link to="/tennis" className="text-indigo-600 underline">Tennis</Link>.</> },
  { q: 'running', a: <>Browse kits at <Link to="/running" className="text-indigo-600 underline">Running</Link>.</> },
  { q: 'gym', a: <>Browse kits at <Link to="/gym" className="text-indigo-600 underline">Gym</Link>.</> },
  { q: 'shoes', a: <>Shop accessories at <Link to="/shoes" className="text-indigo-600 underline">Shoes</Link>.</> },
  { q: 'gloves', a: <>Shop accessories at <Link to="/gloves" className="text-indigo-600 underline">Gloves</Link>.</> },
  { q: 'caps', a: <>Shop accessories at <Link to="/caps" className="text-indigo-600 underline">Caps</Link>.</> },
  { q: 'bags', a: <>Shop accessories at <Link to="/bags" className="text-indigo-600 underline">Bags</Link>.</> },
  { q: 'who are you', a: <>I am the WearConnect Assistant. I can navigate you around the site, explain our products, sizes, shipping, and custom orders. Try: "go to cricket", "open contact", or ask "what sizes do you have?"</> },
  { q: 'help', a: <>You can say: "go to [page]", "open [wear]", "contact", "custom", or ask about shipping, sizing, or products.</> },
  { q: 'shipping', a: <>We ship globally. Delivery times depend on your region and order size. For quotes and timelines, use the Request Quote buttons or visit <Link to="/contact" className="text-indigo-600 underline">Contact</Link>.</> },
  { q: 'size', a: <>Most items are available in sizes XS to 3XL. Specific pages show available sizes. Custom sizing is possible via <Link to="/custom" className="text-indigo-600 underline">Custom</Link>.</> },
];

function answerFor(text) {
  const t = text.toLowerCase();
  const hit = cannedFaq.find(x => t.includes(x.q));
  if (hit) return { content: hit.a };

  // Navigation intent detection
  const routes = [
    { k: ['home', 'main'], to: '/' },
    { k: ['contact'], to: '/contact' },
    { k: ['custom'], to: '/custom' },
    { k: ['football'], to: '/football' },
    { k: ['cricket'], to: '/cricket' },
    { k: ['wrestling'], to: '/wrestling' },
    { k: ['basketball'], to: '/basketball' },
    { k: ['hockey'], to: '/hockey' },
    { k: ['rugby'], to: '/rugby' },
    { k: ['tennis'], to: '/tennis' },
    { k: ['running'], to: '/running' },
    { k: ['gym'], to: '/gym' },
    { k: ['shoes'], to: '/shoes' },
    { k: ['gloves'], to: '/gloves' },
    { k: ['caps'], to: '/caps' },
    { k: ['bags'], to: '/bags' },
  ];

  const navVerb = ['go to', 'open', 'take me to', 'navigate', 'show'];
  const wantsNav = navVerb.some(v => t.includes(v));
  for (const r of routes) {
    if (r.k.some(k => t.includes(k))) {
      return {
        content: <>Navigating to <span className="font-semibold">{r.to}</span>…</>,
        route: r.to,
      };
    }
  }

  return (
    { content: <>
      I can help you navigate and answer common questions. Try:
      <ul className="list-disc ml-5 mt-2 text-sm">
        <li>go to football</li>
        <li>open cricket</li>
        <li>contact / custom</li>
        <li>what sizes do you have?</li>
        <li>do you ship internationally?</li>
      </ul>
    </> }
  );
}

const ChatbotWidget = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', body: (
      <>
        Hi! I am <span className="font-semibold">WearConnect Assistant</span>.
        I can navigate to pages, explain products, sizing, shipping, and custom orders.
        Type <span className="italic">help</span> to see examples.
      </>
    ) },
  ]);
  const [input, setInput] = useState('');
  const listRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMessages(prev => [...prev, { from: 'user', body: text }]);
    setInput('');

    // First, try built-in intent routing/FAQ
    let reply = answerFor(text);

    // If an AI key is configured, try AI for richer answer
    const hasKey = !!import.meta.env.VITE_HF_API_KEY;
    if (hasKey) {
      try {
        setLoading(true);
        const aiText = await askAI([...messages, { from: 'user', body: text }]);

        // Check for NAV: /path instruction from the model
        const navMatch = aiText.match(/NAV:\s*(\/[a-zA-Z0-9\/-]*)/);
        if (navMatch?.[1]) {
          reply = { content: aiText.replace(/NAV:\s*\/[\w\/-]*/i, '').trim() || reply.content, route: navMatch[1] };
        } else {
          reply = { content: aiText || reply.content };
        }
      } catch (err) {
        // Fall back silently to deterministic reply
      } finally {
        setLoading(false);
      }
    }

    setMessages(prev => [...prev, { from: 'bot', body: reply.content ?? reply }]);
    setTimeout(() => listRef.current?.scrollTo({ top: 99999, behavior: 'smooth' }), 50);

    if (reply && reply.route) {
      setTimeout(() => navigate(reply.route), 300);
    }
  };

  const toggle = () => setOpen(v => !v);

  return (
    <div className="fixed bottom-5 right-5 z-[90]">
      {/* Floating Button */}
      <button
        onClick={toggle}
        className="w-14 h-14 rounded-full shadow-lg bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 focus:outline-none"
        aria-label="Open chatbot"
      >
        {open ? <FaTimes /> : <FaComments />}
      </button>

      {/* Panel */}
      {open && (
        <div className="mt-3 w-80 max-w-[90vw] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="bg-indigo-600 text-white px-4 py-3 font-semibold">WearConnect Assistant</div>
          <div ref={listRef} className="max-h-72 overflow-auto px-3 py-3 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`${m.from === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800'} px-3 py-2 rounded-lg max-w-[85%] text-sm`}> 
                  {m.body}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSend} className="flex items-center gap-2 p-3 border-t">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about the site..."
              className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button type="submit" className="p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              <FaPaperPlane />
            </button>
          </form>
          {loading && (
            <div className="px-4 py-2 text-xs text-gray-500 border-t">Thinking…</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;
