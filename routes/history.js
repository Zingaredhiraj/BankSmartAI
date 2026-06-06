// ──────────────────────────────────────────────────────────────
//  BankSmart AI — History Route  (routes/history.js)
// ──────────────────────────────────────────────────────────────
const express     = require('express');
const ChatMessage = require('../models/ChatMessage');

const router = express.Router();

// GET /api/history?sessionId=xxx&limit=50
router.get('/', async (req, res) => {
  try {
    const { sessionId, limit = 50 } = req.query;
    const filter = sessionId ? { sessionId } : {};
    const msgs = await ChatMessage.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .lean();
    res.json({ success: true, count: msgs.length, messages: msgs.reverse() });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/history/sessions — list unique sessions
router.get('/sessions', async (req, res) => {
  try {
    const sessions = await ChatMessage.distinct('sessionId');
    res.json({ success: true, sessions });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/history/:sessionId — clear a session
router.delete('/:sessionId', async (req, res) => {
  try {
    const result = await ChatMessage.deleteMany({ sessionId: req.params.sessionId });
    res.json({ success: true, deleted: result.deletedCount });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
