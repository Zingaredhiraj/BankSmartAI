# 🏦 BankSmart AI — Banking & Financial Assistant Chatbot

> An intelligent, full-stack Indian banking chatbot powered by **Google Gemini AI**, **Node.js/Express**, and **MongoDB** with a stunning glassmorphism dark UI.

---

## 📸 Screenshots

| Welcome Screen | Chat Conversation |
|---|---|
| *(Run the app and capture screenshots for submission)* | *(Use sample conversations below)* |

---

## 🚀 Features

| Feature | Details |
|---|---|
| 💬 Smart Chat UI | Glassmorphism dark theme, typing indicator, animated bubbles |
| 🧠 Knowledge Base | 40+ curated Q&A entries on Indian banking & finance |
| 🤖 Gemini AI Fallback | Google Gemini 1.5 Flash for questions outside the knowledge base |
| 🗄️ MongoDB Storage | Full chat history persisted per session |
| 📡 REST API | `POST /api/chat`, `GET /api/history`, `DELETE /api/history/:id` |
| 📱 Responsive | Works on desktop, tablet, and mobile |
| 🔐 Session Management | UUID-based sessions stored in localStorage + MongoDB |
| 🏥 Health Endpoint | `/api/health` for monitoring DB and service status |

---

## 🗂️ Project Structure

```
BankAiSira/
├── server.js               # Express server entry point
├── package.json            # Dependencies and scripts
├── .env.example            # Environment variables template
├── .gitignore
├── README.md
│
├── routes/
│   ├── chat.js             # POST /api/chat — main chat endpoint
│   └── history.js          # GET/DELETE /api/history — chat history
│
├── models/
│   └── ChatMessage.js      # Mongoose schema for chat messages
│
├── data/
│   └── knowledgeBase.js    # 40+ banking Q&A entries
│
└── public/
    ├── index.html          # Frontend HTML
    ├── style.css           # Glassmorphism CSS (no frameworks)
    └── app.js              # Frontend JavaScript
```

---

## ⚙️ Quick Start

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Google Gemini API Key (free at [aistudio.google.com](https://aistudio.google.com/app/apikey))

### 1. Clone / Extract the project
```bash
cd BankAiSira
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment
```bash
cp .env.example .env
# Edit .env with your values:
nano .env
```

**.env file:**
```env
MONGODB_URI=mongodb://localhost:27017/banksmart
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
NODE_ENV=development
```

### 4. Start the server
```bash
npm start
# or for development with auto-reload:
npm run dev
```

### 5. Open in browser
```
http://localhost:5000
```

---

## 📡 API Reference

### `POST /api/chat`
Send a message and get a response.

**Request:**
```json
{
  "message": "What is the current repo rate?",
  "sessionId": "sess_optional_existing_id"
}
```

**Response:**
```json
{
  "reply": "🏛️ Repo Rate is the rate at which RBI lends money...",
  "source": "knowledge_base",
  "category": "repo_rate",
  "sessionId": "sess_1717500000000_abc1234"
}
```

| Field | Values |
|---|---|
| `source` | `knowledge_base` / `gemini` / `fallback` |
| `category` | `loan`, `upi`, `credit_score`, `fd`, `mutual_fund`, `repo_rate`, `gdp`, `tax`, `banking`, `insurance`, `investment`, `greeting`, `general`, `ai_generated` |

---

### `GET /api/history?sessionId=xxx&limit=50`
Fetch chat history for a session.

**Response:**
```json
{
  "success": true,
  "count": 12,
  "messages": [
    {
      "_id": "...",
      "sessionId": "sess_...",
      "role": "user",
      "content": "What is UPI?",
      "source": "user",
      "category": "general",
      "createdAt": "2024-06-04T10:30:00.000Z"
    }
  ]
}
```

---

### `GET /api/history/sessions`
List all unique session IDs.

---

### `DELETE /api/history/:sessionId`
Delete all messages in a session.

---

### `GET /api/health`
Service health check.

**Response:**
```json
{
  "status": "ok",
  "service": "BankSmart AI",
  "time": "2024-06-04T10:00:00.000Z",
  "db": "connected"
}
```

---

## 💬 Sample Chatbot Conversations

### Conversation 1 — UPI & Payments
```
User:    How does UPI work?
BankBot: 📱 UPI (Unified Payments Interface) is a real-time payment system by NPCI.
         You can send/receive money 24×7 using a VPA (Virtual Payment Address) like
         yourname@bank. Daily limit: ₹1 lakh per day (₹2 lakh for verified users).
         Apps: GPay, PhonePe, Paytm, BHIM, Amazon Pay.
```

### Conversation 2 — Credit Score
```
User:    What is a good CIBIL score?
BankBot: 📊 CIBIL Score ranges from 300–900. A score above 750 is considered excellent.
         It is calculated based on repayment history (35%), credit utilisation (30%),
         credit history length (15%), and credit mix (20%).
         Check your score free once/year at cibil.com or via many bank apps.

User:    How can I improve my credit score?
BankBot: ⬆️ To Improve Your Credit Score:
         1. Pay EMIs & credit card bills on time
         2. Keep credit utilisation below 30%
         3. Avoid too many loan applications at once
         4. Maintain old credit accounts (longer history = better)
         5. Check your report for errors & dispute them
         Results typically visible within 3–6 months!
```

### Conversation 3 — Fixed Deposits
```
User:    What are FD interest rates in 2024?
BankBot: 🏦 Fixed Deposit (FD) is the safest investment option.
         Current rates (2024): SBI 6.5–7%, HDFC 7–7.25%, Axis 7–7.25%,
         small finance banks up to 9%. Senior citizens get 0.25–0.5% extra.
         Tenure: 7 days – 10 years. Interest is taxable.
```

### Conversation 4 — Mutual Funds & SIP
```
User:    Should I invest in SIP?
BankBot: 📈 Mutual Funds pool money from investors and invest in stocks, bonds, or both.
         SIP (Systematic Investment Plan) lets you invest as little as ₹500/month.
         Categories: Equity (high risk/return), Debt (low risk), Hybrid, Index Funds, ELSS.
         Regulated by SEBI. Past performance doesn't guarantee future returns.

User:    What is ELSS?
BankBot: 🌿 ELSS (Equity Linked Savings Scheme) is a tax-saving mutual fund under Section 80C
         (up to ₹1.5 lakh deduction). Lock-in: only 3 years (shortest among 80C options).
         Returns: historically 12–15% p.a. over 5+ years.
         LTCG tax @10% on gains above ₹1 lakh per year.
```

### Conversation 5 — Repo Rate & RBI Policy
```
User:    What is repo rate?
BankBot: 🏛️ Repo Rate is the rate at which the RBI lends money to commercial banks.
         As of June 2024: 6.50%. A higher repo rate raises loan interest rates;
         a lower rate makes loans cheaper. The RBI's Monetary Policy Committee (MPC)
         meets every 2 months to review it.

User:    What is CRR?
BankBot: 💵 CRR (Cash Reserve Ratio) is the % of deposits banks must hold as cash with RBI.
         Current CRR: 4%. Higher CRR reduces money available for lending, slowing inflation.
```

### Conversation 6 — India GDP & Inflation
```
User:    What is India's GDP?
BankBot: 🇮🇳 GDP (Gross Domestic Product) measures the total monetary value of goods &
         services produced in a country. India's GDP (FY 2023-24): ~$3.7 trillion,
         making it the 5th largest economy in the world. GDP growth rate FY24: 8.2%
         — fastest among major economies.

User:    What is inflation?
BankBot: 📈 Inflation measures the rate of price increase over time. India uses CPI
         (Consumer Price Index) as the main inflation gauge. RBI's inflation target: 4%
         (±2% band). As of April 2024: ~4.83%. High inflation reduces purchasing power;
         the RBI uses repo rate hikes to control it.
```

### Conversation 7 — Home Loan
```
User:    Tell me about home loans
BankBot: 🏠 Home Loan is a secured loan granted by banks to purchase, construct, or renovate
         a residential property. Current rates (2024) range from 8.35% – 9.5% p.a.
         The maximum tenure is 30 years. Processing fee is typically 0.5%–1%.
         Documents needed: income proof, KYC, and property papers.

User:    How is EMI calculated?
BankBot: 📅 EMI = [P × r × (1+r)^n] / [(1+r)^n – 1]
         where P = Principal, r = monthly rate, n = tenure in months.
         For example, a ₹10 lakh loan at 10% p.a. for 5 years = EMI of approx ₹21,247.
```

### Conversation 8 — Fallback (Gemini AI)
```
User:    Explain quantum computing in finance
BankBot: [Gemini AI responds with relevant financial context about quantum computing
         applications in banking — fraud detection, portfolio optimization, etc.]
```

---

## 🚢 Deployment Guide

### Option A — Deploy to Render (Free)

1. Push your code to GitHub
2. Go to [render.com](https://render.com) → **New → Web Service**
3. Connect your GitHub repository
4. Configure:
   ```
   Build Command:  npm install
   Start Command:  npm start
   ```
5. Add Environment Variables (in Render dashboard):
   ```
   MONGODB_URI   = mongodb+srv://<user>:<pass>@cluster.mongodb.net/banksmart
   GEMINI_API_KEY = your_gemini_api_key
   NODE_ENV      = production
   PORT          = 10000
   ```
6. Click **Create Web Service** → Live in ~3 minutes ✅

### Option B — Deploy to Railway

1. Push to GitHub
2. Go to [railway.app](https://railway.app) → **New Project → Deploy from GitHub**
3. Add MongoDB plugin or use Atlas URI
4. Set environment variables
5. Deploy automatically on push ✅

### Option C — Deploy to Vercel (Serverless — Limited)
> Note: Vercel is best for frontend-only. For full Node.js + MongoDB, prefer Render or Railway.

1. Add a `vercel.json`:
```json
{
  "version": 2,
  "builds": [{ "src": "server.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "server.js" }]
}
```
2. Run: `vercel --prod`

### MongoDB Atlas (Cloud DB) Setup
1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create a free M0 cluster
3. Create a database user
4. Whitelist `0.0.0.0/0` for cloud access
5. Copy the connection string and paste in `MONGODB_URI`

---

## 🛡️ Topics Covered by Knowledge Base

| Category | Topics |
|---|---|
| 🏠 Loans | Home Loan, Personal Loan, Car Loan, Education Loan, Gold Loan, EMI |
| 📱 Payments | UPI, NEFT, RTGS, IMPS |
| 📊 Credit | CIBIL Score, Credit Cards, How to Improve Score |
| 🏦 Savings | FD, RD, Tax-Saving FD, Savings Account, Current Account |
| 📈 Investments | Mutual Funds, SIP, ELSS, NAV, Index Funds, Demat, Stock Market |
| 🏛️ RBI Policy | Repo Rate, Reverse Repo, CRR, SLR |
| 🇮🇳 Economy | GDP, Inflation/CPI, Fiscal Deficit |
| 💼 Tax | Income Tax Slabs, Section 80C, PPF |
| 🛡️ Insurance | Term Insurance, Health Insurance |
| 🏢 Banking | KYC, IFSC Code, Cheque Bounce, Demat Account |

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js v18+, Express.js v4 |
| AI | Google Gemini 1.5 Flash |
| Database | MongoDB + Mongoose |
| Frontend | Vanilla HTML5, CSS3, JavaScript (ES6+) |
| Fonts | Google Fonts (Inter, Space Grotesk) |
| Deployment | Render / Railway / Vercel |

---

## 📦 NPM Scripts

```bash
npm start      # Production server (node server.js)
npm run dev    # Development with auto-reload (nodemon)
npm test       # Placeholder
```

---

## 📄 License

MIT © 2024 BankSmart AI Team

---

> **Note for Assignment Submission**: Run the app, interact with the chatbot, and take screenshots for each of the 8 sample conversations above. The project includes 40+ knowledge base entries and Google Gemini AI integration for any question beyond the knowledge base.
