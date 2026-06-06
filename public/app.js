// ================================================================
//  BankSmart AI — app.js  (public/app.js)
//  Frontend logic: chat, session management, UI interactions
// ================================================================

(function () {
  'use strict';

  // ── DOM Refs ──────────────────────────────────────────────────
  const chatArea        = document.getElementById('chatArea');
  const userInput       = document.getElementById('userInput');
  const sendBtn         = document.getElementById('sendBtn');
  const typingIndicator = document.getElementById('typingIndicator');
  const welcomeCard     = document.getElementById('welcomeCard');
  const clearChatBtn    = document.getElementById('clearChat');
  const hamburger       = document.getElementById('hamburger');
  const sidebar         = document.getElementById('sidebar');
  const sidebarClose    = document.getElementById('sidebarClose');
  const overlay         = document.getElementById('overlay');
  const sessionDisplay  = document.getElementById('sessionDisplay');
  const msgCountEl      = document.getElementById('msgCount');
  const dbStatusEl      = document.getElementById('dbStatus');

  // ── State ─────────────────────────────────────────────────────
  let sessionId  = getOrCreateSession();
  let msgCount   = 0;
  let isSending  = false;

  // ── Init ──────────────────────────────────────────────────────
  init();

  function init() {
    updateSessionDisplay();
    checkHealth();
    setInterval(checkHealth, 30000);

    // Event listeners
    sendBtn.addEventListener('click', handleSend);
    userInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    });
    userInput.addEventListener('input', autoResize);

    clearChatBtn.addEventListener('click', handleClear);
    hamburger.addEventListener('click', openSidebar);
    sidebarClose.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);

    // Topic buttons (sidebar)
    document.querySelectorAll('.topic-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const msg = btn.dataset.msg;
        if (msg) sendMessage(msg);
        if (window.innerWidth <= 768) closeSidebar();
      });
    });

    // Welcome chips
    document.querySelectorAll('.chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        const msg = chip.dataset.msg;
        if (msg) sendMessage(msg);
      });
    });

    // Focus input
    userInput.focus();
  }

  // ── Session ───────────────────────────────────────────────────
  function getOrCreateSession() {
    let id = localStorage.getItem('banksmart_session');
    if (!id) {
      id = 'sess_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9);
      localStorage.setItem('banksmart_session', id);
    }
    return id;
  }

  function updateSessionDisplay() {
    sessionDisplay.textContent = sessionId.slice(0, 16) + '…';
    sessionDisplay.title = sessionId;
  }

  // ── Health Check ──────────────────────────────────────────────
  async function checkHealth() {
    try {
      const res  = await fetch('/api/health');
      const data = await res.json();
      if (data.db === 'connected') {
        dbStatusEl.textContent = 'Connected';
        dbStatusEl.classList.remove('disconnected');
      } else {
        dbStatusEl.textContent = 'No DB';
        dbStatusEl.classList.add('disconnected');
      }
    } catch {
      dbStatusEl.textContent = 'Offline';
      dbStatusEl.classList.add('disconnected');
    }
  }

  // ── Send Message ──────────────────────────────────────────────
  function handleSend() {
    const text = userInput.value.trim();
    if (!text || isSending) return;
    sendMessage(text);
  }

  async function sendMessage(text) {
    if (isSending) return;
    isSending = true;

    // Hide welcome card
    if (welcomeCard) welcomeCard.style.display = 'none';

    // Append user bubble
    appendMessage('user', text, null, null);
    userInput.value = '';
    autoResize();
    sendBtn.disabled = true;

    // Show typing
    typingIndicator.hidden = false;
    scrollToBottom();

    try {
      const res = await fetch('/api/chat', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({ message: text, sessionId }),
      });

      const data = await res.json();
      typingIndicator.hidden = true;

      if (res.ok) {
        // Update session from server
        if (data.sessionId) {
          sessionId = data.sessionId;
          localStorage.setItem('banksmart_session', sessionId);
          updateSessionDisplay();
        }
        appendMessage('bot', data.reply, data.source, data.category);
      } else {
        appendMessage('bot', '⚠️ Server error: ' + (data.error || 'Unknown error. Please try again.'), 'fallback', 'error');
      }
    } catch (err) {
      typingIndicator.hidden = true;
      appendMessage(
        'bot',
        '🔌 Could not connect to BankSmart AI server. Please make sure the server is running and try again.',
        'fallback',
        'error'
      );
    } finally {
      isSending = false;
      sendBtn.disabled = false;
      userInput.focus();
      scrollToBottom();
    }
  }

  // ── Append Message ────────────────────────────────────────────
  function appendMessage(role, text, source, category) {
    msgCount++;
    msgCountEl.textContent = msgCount;

    const isUser = role === 'user';
    const now    = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

    const wrapper = document.createElement('div');
    wrapper.className = `msg-wrapper ${isUser ? 'user' : 'bot'}`;

    const avatar = document.createElement('div');
    avatar.className = `avatar ${isUser ? 'user-av' : 'bot-av'}`;
    avatar.textContent = isUser ? '👤' : '🤖';

    const bubble = document.createElement('div');
    bubble.className = `msg-bubble ${isUser ? 'user-msg' : 'bot-msg'}`;
    bubble.innerHTML = formatMessage(text);

    const meta = document.createElement('div');
    meta.className = 'msg-meta';
    meta.innerHTML = `<span>${now}</span>`;

    if (!isUser && source) {
      const badge = document.createElement('span');
      badge.className = `source-badge ${source}`;
      badge.textContent = sourceLabelMap[source] || source;
      meta.appendChild(badge);
    }

    const msgStack = document.createElement('div');
    msgStack.style.cssText = 'display:flex;flex-direction:column;max-width:75%;min-width:0;';
    if (isUser) msgStack.style.alignItems = 'flex-end';
    msgStack.appendChild(bubble);
    msgStack.appendChild(meta);

    wrapper.appendChild(avatar);
    wrapper.appendChild(msgStack);

    chatArea.appendChild(wrapper);
    scrollToBottom();
  }

  const sourceLabelMap = {
    knowledge_base: 'KB',
    gemini        : 'Gemini AI',
    fallback      : 'Fallback',
    user          : '',
  };

  // ── Format Message (simple markdown) ─────────────────────────
  function formatMessage(text) {
    if (!text) return '';
    return text
      // Bold: **text**
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Bullets: lines starting with •
      .replace(/^[•\-] (.+)$/gm, '<li>$1</li>')
      // Numbered list
      .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
      // Wrap li groups
      .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
      // Line breaks
      .replace(/\n/g, '<br />');
  }

  // ── Clear Chat ────────────────────────────────────────────────
  async function handleClear() {
    if (!confirm('Clear this chat session? This cannot be undone.')) return;

    // Clear DB
    try {
      await fetch(`/api/history/${sessionId}`, { method: 'DELETE' });
    } catch (_) {}

    // Reset session
    sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9);
    localStorage.setItem('banksmart_session', sessionId);
    updateSessionDisplay();

    // Clear UI
    chatArea.innerHTML = '';
    chatArea.appendChild(welcomeCard);
    welcomeCard.style.display = '';
    msgCount = 0;
    msgCountEl.textContent = '0';
    userInput.focus();
  }

  // ── Sidebar ───────────────────────────────────────────────────
  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ── Helpers ───────────────────────────────────────────────────
  function scrollToBottom() {
    requestAnimationFrame(() => {
      chatArea.scrollTop = chatArea.scrollHeight;
    });
  }

  function autoResize() {
    userInput.style.height = 'auto';
    userInput.style.height = Math.min(userInput.scrollHeight, 120) + 'px';
  }

})();
