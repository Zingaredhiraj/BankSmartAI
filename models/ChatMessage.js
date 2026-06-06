// ──────────────────────────────────────────────────────────────
//  BankSmart AI — Chat Message Model  (models/ChatMessage.js)
// ──────────────────────────────────────────────────────────────
const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema(
  {
    sessionId: {
      type    : String,
      required: true,
      index   : true,
    },
    role: {
      type    : String,
      enum    : ['user', 'assistant'],
      required: true,
    },
    content: {
      type    : String,
      required: true,
    },
    source: {
      // 'knowledge_base' | 'gemini' | 'fallback'
      type   : String,
      default: 'knowledge_base',
    },
    category: {
      // e.g. 'loan', 'upi', 'credit_score', 'fd', 'mutual_fund' …
      type   : String,
      default: 'general',
    },
    metadata: {
      type   : mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

// Virtual: formatted timestamp
chatMessageSchema.virtual('formattedTime').get(function () {
  return this.createdAt.toLocaleTimeString('en-IN', {
    hour  : '2-digit',
    minute: '2-digit',
    hour12: true,
  });
});

module.exports = mongoose.model('ChatMessage', chatMessageSchema);
