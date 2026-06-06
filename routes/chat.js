// ──────────────────────────────────────────────────────────────
//  BankSmart AI — Chat Route  (routes/chat.js)
//  v2: Answers ALL questions via Gemini + expanded KB
// ──────────────────────────────────────────────────────────────
const express    = require('express');
const { v4: uuidv4 } = require('uuid');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const ChatMessage = require('../models/ChatMessage');
const knowledgeBase = require('../data/knowledgeBase');

const router = express.Router();

// ── In-memory conversation history per session ────────────────
const sessionHistory = new Map(); // sessionId -> [{role, parts}]
const MAX_HISTORY    = 20;        // keep last 20 turns

// ── Init Gemini with chat capability ─────────────────────────
let genAIClient = null;
let geminiModelName = 'gemini-flash-latest';

if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
  try {
    genAIClient = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    console.log('✅  Gemini AI initialized');
  } catch (e) {
    console.warn('⚠️   Gemini init failed:', e.message);
  }
}

// ── System instruction for Gemini ────────────────────────────
const SYSTEM_INSTRUCTION = `You are BankSmart AI — an expert Indian banking and financial assistant, and also a highly knowledgeable general-purpose AI assistant.

YOUR CORE MISSION:
- Answer EVERY question the user asks, completely and accurately.
- NEVER refuse to answer. NEVER say "I don't have information about that."
- NEVER redirect the user elsewhere for questions you can answer.
- Always provide your best, most helpful answer.

BANKING & FINANCE (Your Specialty — Indian Context):
- Cover all topics: RBI, SEBI, NPCI, loans, EMI, UPI, NEFT, RTGS, IMPS, credit scores, CIBIL, FD, RD, PPF, mutual funds, SIP, ELSS, NAV, stocks, NSE, BSE, Nifty, Sensex, insurance, income tax, GST, budget, GDP, inflation, repo rate, CRR, SLR, forex, FDI, FPI, NRI banking, digital banking, BNPL, cryptocurrency in India, and all financial concepts.
- Always use Indian context: ₹ symbol, RBI guidelines, Indian banks (SBI, HDFC, ICICI, etc.), Indian regulations.

ALL OTHER TOPICS (General Knowledge):
- Science, technology, history, geography, mathematics, physics, chemistry, biology, computer science, programming, AI/ML, economics, politics, sports, entertainment, health, cooking, travel — answer everything.
- Give clear, accurate, and helpful responses.

FORMATTING RULES:
- Structure your response clearly using bullet points (•) or numbered lists when listing items.
- Use relevant emojis to make responses engaging (but not excessive).
- For complex topics, use headers or sections.
- Keep responses informative: 4-10 sentences or equivalent structured content.
- Respond in the same language/style the user uses (English, Hindi, Hinglish).
- For calculations, show the formula and a worked example.
- Always be friendly, professional, and encouraging.

EXAMPLES OF WHAT YOU MUST ANSWER:
- "What is FDI?" → Explain Foreign Direct Investment fully with Indian context.
- "How does blockchain work?" → Explain clearly.
- "What is the capital of France?" → Answer directly.
- "How to calculate compound interest?" → Give formula + example.
- "What is the current repo rate?" → Give the latest known info + context.`;

// ── Knowledge-base matcher (fast local lookup) ────────────────
function findKBAnswer(userMessage) {
  const msg = userMessage.toLowerCase().trim();
  for (const entry of knowledgeBase) {
    const hit = entry.keywords.some((kw) => msg.includes(kw.toLowerCase()));
    if (hit) return { answer: entry.answer, category: entry.category };
  }
  return null;
}

// ── Gemini multi-turn chat query ──────────────────────────────
async function askGemini(userMessage, sessionId) {
  if (!genAIClient) return null;
  try {
    if (!sessionHistory.has(sessionId)) {
      sessionHistory.set(sessionId, []);
    }
    const history = sessionHistory.get(sessionId);

    const model = genAIClient.getGenerativeModel({
      model: geminiModelName,
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    const chat = model.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 1024,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(userMessage);
    const text   = result.response.text();
    const reply  = text && text.trim() ? text.trim() : null;

    if (reply) {
      history.push(
        { role: 'user',  parts: [{ text: userMessage }] },
        { role: 'model', parts: [{ text: reply }] }
      );
      if (history.length > MAX_HISTORY * 2) {
        history.splice(0, 2);
      }
    }

    return reply;
  } catch (err) {
    console.error('Gemini error:', err.message);
    try {
      const model = genAIClient.getGenerativeModel({ model: geminiModelName });
      const result = await model.generateContent(
        `${SYSTEM_INSTRUCTION}\n\nUser: ${userMessage}`
      );
      return result.response.text()?.trim() || null;
    } catch (e2) {
      console.error('Gemini fallback also failed:', e2.message);
      return null;
    }
  }
}

// ── Save to DB (fire-and-forget, won't crash server) ──────────
async function saveToDB(sessionId, role, content, source, category) {
  try {
    await ChatMessage.create({ sessionId, role, content, source, category });
  } catch (_) { /* DB optional */ }
}

// ── POST /api/chat ────────────────────────────────────────────
router.post('/', async (req, res) => {
  const { message, sessionId: clientSession } = req.body;

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'message is required' });
  }

  const sessionId = clientSession || uuidv4();
  const userMsg   = message.trim();

  // Save user message
  await saveToDB(sessionId, 'user', userMsg, 'user', 'general');

  // 1️⃣  Knowledge base
  const kbResult = findKBAnswer(userMsg);
  if (kbResult) {
    await saveToDB(sessionId, 'assistant', kbResult.answer, 'knowledge_base', kbResult.category);
    return res.json({
      reply    : kbResult.answer,
      source   : 'knowledge_base',
      category : kbResult.category,
      sessionId,
    });
  }

  // 2️⃣  Gemini
  const geminiReply = await askGemini(userMsg, sessionId);
  if (geminiReply) {
    await saveToDB(sessionId, 'assistant', geminiReply, 'gemini', 'ai_generated');
    return res.json({
      reply    : geminiReply,
      source   : 'gemini',
      category : 'ai_generated',
      sessionId,
    });
  }

  // 3️⃣  Fallback
  const fallback =
    '⚠️ My AI engine is temporarily unavailable. Please check the GEMINI_API_KEY in your .env file and ensure internet connectivity. Restart the server after updating the key.';
  await saveToDB(sessionId, 'assistant', fallback, 'fallback', 'error');
  return res.json({
    reply    : fallback,
    source   : 'fallback',
    category : 'general',
    sessionId,
  });
});

module.exports = router;
