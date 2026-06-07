// ──────────────────────────────────────────────────────────────
//  BankSmart AI — Express Server  (server.js)
// ──────────────────────────────────────────────────────────────
require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const path     = require('path');
const mongoose = require('mongoose');

const chatRoutes    = require('./routes/chat');
const historyRoutes = require('./routes/history');

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── MongoDB Connection ────────────────────────────────────────
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/banksmart';

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅  MongoDB connected:', MONGO_URI))
  .catch((err) => {
    console.error('❌  MongoDB connection error:', err.message);
    console.warn('⚠️   Running WITHOUT database — chat history disabled.');
  });

// ── API Routes ────────────────────────────────────────────────
app.use('/api/chat',    chatRoutes);
app.use('/api/history', historyRoutes);

// Health check
app.get('/api/health', (_req, res) =>
  res.json({
    status : 'ok',
    service: 'BankSmart AI',
    time   : new Date().toISOString(),
    db     : mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  })
);

// ── Catch-all: serve frontend ─────────────────────────────────
app.get('*', (_req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
);

// ── Start ─────────────────────────────────────────────────────
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀  BankSmart AI server running → http://localhost:${PORT}`);
    console.log(`📡  API endpoint              → http://localhost:${PORT}/api/chat`);
  });
}

module.exports = app;

