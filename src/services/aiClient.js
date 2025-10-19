// AI client that prefers OpenAI if configured, otherwise falls back to Hugging Face.
// Set VITE_OPENAI_API_KEY (and optional VITE_OPENAI_MODEL) to use OpenAI.
// Otherwise set VITE_HF_API_KEY (and optional VITE_HF_MODEL) to use Hugging Face.

function buildSystemPrompt() {
  return `You are WearConnect Assistant for a sports wear ecommerce. Answer briefly and helpfully. If user asks to navigate, start your reply with NAV: <path>. Known paths: /, /contact, /custom, /football, /cricket, /wrestling, /basketball, /hockey, /rugby, /tennis, /running, /gym, /shoes, /gloves, /caps, /bags.`;
}

function historyToPlain(messages) {
  return messages
    .map(m => `${m.from === 'user' ? 'User' : 'Assistant'}: ${typeof m.body === 'string' ? m.body : ''}`)
    .join('\n');
}

function historyToOpenAIChat(messages) {
  const sys = buildSystemPrompt();
  const chat = [{ role: 'system', content: sys }];
  for (const m of messages) {
    if (m.from === 'user') chat.push({ role: 'user', content: typeof m.body === 'string' ? m.body : '' });
    else chat.push({ role: 'assistant', content: typeof m.body === 'string' ? m.body : '' });
  }
  return chat;
}

async function askOpenAI(messages) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI key not configured');
  const model = import.meta.env.VITE_OPENAI_MODEL || 'gpt-4o-mini';

  const chat = historyToOpenAIChat(messages);

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: chat,
      temperature: 0.4,
      max_tokens: 180,
    }),
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`OpenAI error: ${res.status} ${msg}`);
  }
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content || '';
  return text.trim();
}

async function askHuggingFace(messages) {
  const apiKey = import.meta.env.VITE_HF_API_KEY;
  if (!apiKey) throw new Error('HF API key not configured');
  const model = import.meta.env.VITE_HF_MODEL || 'mistralai/Mistral-7B-Instruct-v0.2';
  const system = buildSystemPrompt();
  const history = historyToPlain(messages);
  const prompt = `${system}\n\n${history}\nAssistant:`;

  const res = await fetch(`https://api-inference.huggingface.co/models/${encodeURIComponent(model)}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: {
        max_new_tokens: 120,
        temperature: 0.4,
        top_p: 0.9,
        return_full_text: false,
        do_sample: true,
      },
    }),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`HF API error: ${res.status} ${msg}`);
  }

  const data = await res.json();
  let text = '';
  if (Array.isArray(data) && data[0]?.generated_text) {
    text = data[0].generated_text;
  } else if (typeof data?.generated_text === 'string') {
    text = data.generated_text;
  } else if (Array.isArray(data) && data[0]?.summary_text) {
    text = data[0].summary_text;
  } else {
    text = typeof data === 'string' ? data : JSON.stringify(data);
  }

  return text.trim();
}

export async function askAI(messages) {
  const hasOpenAI = !!import.meta.env.VITE_OPENAI_API_KEY;
  if (hasOpenAI) {
    try {
      return await askOpenAI(messages);
    } catch (e) {
      // fall back to HF if configured
      if (import.meta.env.VITE_HF_API_KEY) {
        return await askHuggingFace(messages);
      }
      throw e;
    }
  }
  // No OpenAI, try HF
  return await askHuggingFace(messages);
}
