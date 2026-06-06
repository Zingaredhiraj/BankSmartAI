// ──────────────────────────────────────────────────────────────
//  BankSmart AI — Knowledge Base  (data/knowledgeBase.js)
//  50+ curated Q&A entries covering Indian banking & finance
// ──────────────────────────────────────────────────────────────

module.exports = [

  // ── LOANS ────────────────────────────────────────────────────
  {
    category: 'loan',
    keywords: ['home loan', 'housing loan', 'mortgage'],
    answer:
      '🏠 **Home Loan** is a secured loan granted by banks to purchase, construct, or renovate a residential property. ' +
      'Current rates (2024) range from **8.35% – 9.5% p.a.** The maximum tenure is 30 years. ' +
      'Processing fee is typically 0.5%–1% of the loan amount. Documents needed: income proof, KYC, and property papers.',
  },
  {
    category: 'loan',
    keywords: ['personal loan', 'unsecured loan'],
    answer:
      '💳 **Personal Loan** is an unsecured loan with no collateral required. ' +
      'Interest rates range from **10.5% – 24% p.a.** based on credit score & income. ' +
      'Tenure: 1–5 years. Amount: ₹50,000 – ₹40 lakh. ' +
      'Tip: A CIBIL score above 750 helps you get the best rates!',
  },
  {
    category: 'loan',
    keywords: ['car loan', 'auto loan', 'vehicle loan'],
    answer:
      '🚗 **Car Loan** interest rates range from **7.15% – 12% p.a.** for new cars. ' +
      'Tenure: up to 7 years. Banks typically finance 80–90% of the on-road price. ' +
      'Used car loan rates are slightly higher. A good credit score can lower your EMI significantly.',
  },
  {
    category: 'loan',
    keywords: ['education loan', 'student loan'],
    answer:
      '🎓 **Education Loans** cover tuition, hostel, books, and travel. ' +
      'Rates: 8.5%–15% p.a. No collateral up to ₹7.5 lakh (Vidya Lakshmi Portal). ' +
      'Moratorium period: course duration + 6–12 months. Tax benefit available under Section 80E.',
  },
  {
    category: 'loan',
    keywords: ['gold loan', 'loan against gold'],
    answer:
      '🥇 **Gold Loan** is a quick secured loan pledging gold ornaments. ' +
      'LTV (Loan-to-Value): up to 75% of gold value as per RBI guidelines. ' +
      'Rates: 7%–29% p.a. Tenure: 3 months – 3 years. Minimal documentation needed.',
  },
  {
    category: 'loan',
    keywords: ['emi', 'equated monthly instalment', 'loan emi'],
    answer:
      '📅 **EMI (Equated Monthly Instalment)** = [P × r × (1+r)^n] / [(1+r)^n – 1] where P = Principal, r = monthly rate, n = tenure in months. ' +
      'For example, a ₹10 lakh loan at 10% p.a. for 5 years = EMI of approx ₹21,247. ' +
      'Use our EMI calculator or apps like BankBazaar to estimate yours.',
  },

  // ── UPI & PAYMENTS ───────────────────────────────────────────
  {
    category: 'upi',
    keywords: ['upi', 'unified payment interface', 'gpay', 'phonepe', 'paytm'],
    answer:
      '📱 **UPI (Unified Payments Interface)** is a real-time payment system by NPCI. ' +
      'You can send/receive money 24×7 using a VPA (Virtual Payment Address) like yourname@bank. ' +
      'Daily limit: ₹1 lakh per day (₹2 lakh for verified users). ' +
      'Apps: GPay, PhonePe, Paytm, BHIM, Amazon Pay.',
  },
  {
    category: 'upi',
    keywords: ['neft', 'national electronic funds transfer'],
    answer:
      '🔄 **NEFT (National Electronic Funds Transfer)** is available 24×7, 365 days. ' +
      'Transactions are processed in half-hourly batches. Minimum: ₹1, No maximum limit. ' +
      'Charges: Free at most banks for online transfers.',
  },
  {
    category: 'upi',
    keywords: ['rtgs', 'real time gross settlement'],
    answer:
      '⚡ **RTGS (Real-Time Gross Settlement)** is for high-value transactions. ' +
      'Minimum: ₹2 lakh, No maximum. Settled in real-time during RBI business hours (7 AM – 6 PM). ' +
      'Used for large corporate and inter-bank transfers.',
  },
  {
    category: 'upi',
    keywords: ['imps', 'immediate payment service'],
    answer:
      '💸 **IMPS (Immediate Payment Service)** enables instant 24×7 fund transfers. ' +
      'Limit: up to ₹5 lakh per transaction. Requires MMID or account + IFSC. ' +
      'Small charges may apply (₹5–₹25). Instant settlement, unlike NEFT batches.',
  },

  // ── CREDIT SCORE ─────────────────────────────────────────────
  {
    category: 'credit_score',
    keywords: ['credit score', 'cibil score', 'cibil', 'credit rating'],
    answer:
      '📊 **CIBIL Score** ranges from 300–900. A score **above 750** is considered excellent. ' +
      'It is calculated by TransUnion CIBIL based on repayment history (35%), credit utilisation (30%), ' +
      'credit history length (15%), and credit mix (20%). ' +
      'Check your score free once/year at cibil.com or via many bank apps.',
  },
  {
    category: 'credit_score',
    keywords: ['improve credit score', 'increase cibil', 'boost credit'],
    answer:
      '⬆️ **To Improve Your Credit Score**: \n' +
      '1. Pay EMIs & credit card bills on time\n' +
      '2. Keep credit utilisation below 30%\n' +
      '3. Avoid too many loan applications at once\n' +
      '4. Maintain old credit accounts (longer history = better)\n' +
      '5. Check your report for errors & dispute them\n' +
      'Results typically visible within 3–6 months!',
  },
  {
    category: 'credit_score',
    keywords: ['credit card', 'credit limit'],
    answer:
      '💳 **Credit Cards** offer a revolving credit line. Pay the full bill before the due date to avoid 36–48% p.a. interest. ' +
      'Always pay at least the minimum due to avoid default. ' +
      'Tip: Use credit cards for rewards but treat it like debit — spend only what you can repay.',
  },

  // ── FIXED DEPOSIT ────────────────────────────────────────────
  {
    category: 'fd',
    keywords: ['fixed deposit', 'fd', 'term deposit', 'bank deposit'],
    answer:
      '🏦 **Fixed Deposit (FD)** is the safest investment option. ' +
      'Current rates (2024): SBI 6.5–7%, HDFC 7–7.25%, Axis 7–7.25%, small finance banks up to 9%. ' +
      'Senior citizens get 0.25–0.5% extra. Tenure: 7 days – 10 years. ' +
      'Interest is taxable. Break early with a small penalty.',
  },
  {
    category: 'fd',
    keywords: ['tax saving fd', 'section 80c fd', 'tax fd'],
    answer:
      '💰 **Tax-Saving FD** has a 5-year lock-in and qualifies for deduction up to ₹1.5 lakh under Section 80C. ' +
      'Premature withdrawal is NOT allowed. Interest earned is still taxable (TDS @ 10% if >₹40,000/year). ' +
      'Best for conservative investors in the 20%–30% tax bracket.',
  },
  {
    category: 'fd',
    keywords: ['recurring deposit', 'rd'],
    answer:
      '📆 **Recurring Deposit (RD)** lets you deposit a fixed amount monthly. ' +
      'Rates similar to FD. Tenure: 6 months – 10 years. ' +
      'Great for salaried individuals to build a corpus gradually. ' +
      'Missed installments attract a small penalty.',
  },

  // ── MUTUAL FUNDS ─────────────────────────────────────────────
  {
    category: 'mutual_fund',
    keywords: ['mutual fund', 'sip', 'mf', 'systematic investment plan'],
    answer:
      '📈 **Mutual Funds** pool money from investors and invest in stocks, bonds, or both. ' +
      'SIP (Systematic Investment Plan) lets you invest as little as ₹500/month. ' +
      'Categories: Equity (high risk/return), Debt (low risk), Hybrid, Index Funds, ELSS (tax saving). ' +
      'Regulated by SEBI. Past performance doesn\'t guarantee future returns.',
  },
  {
    category: 'mutual_fund',
    keywords: ['elss', 'equity linked savings scheme', 'tax saving mutual fund'],
    answer:
      '🌿 **ELSS (Equity Linked Savings Scheme)** is a tax-saving mutual fund under Section 80C (up to ₹1.5 lakh deduction). ' +
      'Lock-in: only 3 years (shortest among 80C options). ' +
      'Returns: historically 12–15% p.a. over 5+ years. ' +
      'LTCG tax @10% on gains above ₹1 lakh per year.',
  },
  {
    category: 'mutual_fund',
    keywords: ['nav', 'net asset value'],
    answer:
      '📉 **NAV (Net Asset Value)** is the per-unit price of a mutual fund. ' +
      'NAV = (Total Assets − Liabilities) / Number of Units. ' +
      'NAV is published daily after market hours. Buying at a lower NAV doesn\'t mean cheaper — what matters is the growth percentage.',
  },
  {
    category: 'mutual_fund',
    keywords: ['index fund', 'nifty fund', 'sensex fund', 'passive fund'],
    answer:
      '📊 **Index Funds** track a market index like Nifty 50 or Sensex. ' +
      'Expense ratio is very low (0.05%–0.2%). No active management risk. ' +
      'Historically Nifty 50 has given ~12% CAGR over 20 years. ' +
      'Ideal for beginners who want market-linked returns without stock-picking.',
  },

  // ── REPO RATE / RBI ──────────────────────────────────────────
  {
    category: 'repo_rate',
    keywords: ['repo rate', 'rbi repo rate', 'monetary policy'],
    answer:
      '🏛️ **Repo Rate** is the rate at which the RBI lends money to commercial banks. ' +
      'As of June 2024: **6.50%** (RBI kept it unchanged at the June 2024 MPC meeting). ' +
      'A higher repo rate raises loan interest rates; a lower rate makes loans cheaper. ' +
      'The RBI\'s Monetary Policy Committee (MPC) meets every 2 months to review it.',
  },
  {
    category: 'repo_rate',
    keywords: ['reverse repo rate', 'reverse repo'],
    answer:
      '🔁 **Reverse Repo Rate** is the rate at which RBI borrows from commercial banks. ' +
      'Currently: **3.35%**. When the RBI raises this, banks prefer to park funds with RBI instead of lending, ' +
      'reducing money supply and controlling inflation.',
  },
  {
    category: 'repo_rate',
    keywords: ['crr', 'cash reserve ratio'],
    answer:
      '💵 **CRR (Cash Reserve Ratio)** is the % of deposits banks must hold as cash with RBI. ' +
      'Current CRR: **4%**. Higher CRR reduces money available for lending, slowing inflation.',
  },
  {
    category: 'repo_rate',
    keywords: ['slr', 'statutory liquidity ratio'],
    answer:
      '📋 **SLR (Statutory Liquidity Ratio)** is the % of deposits banks must hold in liquid assets (gold, govt securities). ' +
      'Current SLR: **18%**. It ensures banks have enough liquid assets to meet obligations.',
  },

  // ── GDP & ECONOMY ────────────────────────────────────────────
  {
    category: 'gdp',
    keywords: ['gdp', 'gross domestic product', 'india gdp'],
    answer:
      '🇮🇳 **GDP (Gross Domestic Product)** measures the total monetary value of goods & services produced in a country. ' +
      'India\'s GDP (FY 2023-24): ~$3.7 trillion, making it the **5th largest economy** in the world. ' +
      'GDP growth rate FY24: **8.2%** — fastest among major economies. ' +
      'India is projected to become the 3rd largest economy by 2027.',
  },
  {
    category: 'gdp',
    keywords: ['inflation', 'cpi', 'consumer price index', 'price rise'],
    answer:
      '📈 **Inflation** measures the rate of price increase over time. ' +
      'India uses **CPI (Consumer Price Index)** as the main inflation gauge. ' +
      'RBI\'s inflation target: **4%** (±2% band). As of April 2024: ~4.83%. ' +
      'High inflation reduces purchasing power; the RBI uses repo rate hikes to control it.',
  },
  {
    category: 'gdp',
    keywords: ['fiscal deficit', 'budget deficit'],
    answer:
      '📊 **Fiscal Deficit** = Government Expenditure − Government Revenue. ' +
      'India\'s FY24 fiscal deficit target: **5.1% of GDP**. ' +
      'High fiscal deficit can lead to inflation and currency depreciation. ' +
      'Borrowing through government bonds (G-Secs) fills the gap.',
  },

  // ── INSURANCE ────────────────────────────────────────────────
  {
    category: 'insurance',
    keywords: ['life insurance', 'term insurance', 'term plan'],
    answer:
      '🛡️ **Term Insurance** is pure life cover with no investment component — cheapest type of life insurance. ' +
      'A ₹1 crore cover can cost as low as ₹700/month for a 30-year-old. ' +
      'Buy at least 10–15× your annual income as cover. ' +
      'Best plans: LIC Tech Term, HDFC Click 2 Protect, ICICI iProtect Smart.',
  },
  {
    category: 'insurance',
    keywords: ['health insurance', 'mediclaim', 'medical insurance'],
    answer:
      '🏥 **Health Insurance** covers hospitalisation, surgery, and medical bills. ' +
      'The ideal cover is ₹10–15 lakh for individuals (higher in metros). ' +
      'Premium paid qualifies for ₹25,000 deduction under Section 80D (₹50,000 for senior citizens). ' +
      'Top insurers: Star Health, Niva Bupa, HDFC ERGO, Care Health.',
  },

  // ── TAX ──────────────────────────────────────────────────────
  {
    category: 'tax',
    keywords: ['income tax', 'tax slab', 'itr'],
    answer:
      '💼 **Income Tax (New Regime FY2024-25)**:\n' +
      '• Up to ₹3 lakh → Nil\n' +
      '• ₹3–7 lakh → 5%\n' +
      '• ₹7–10 lakh → 10%\n' +
      '• ₹10–12 lakh → 15%\n' +
      '• ₹12–15 lakh → 20%\n' +
      '• Above ₹15 lakh → 30%\n' +
      'Standard deduction: ₹75,000. No tax up to ₹7 lakh under new regime with rebate u/s 87A.',
  },
  {
    category: 'tax',
    keywords: ['80c', 'section 80c', 'tax saving', 'tax deduction'],
    answer:
      '🗂️ **Section 80C** allows deduction up to ₹1.5 lakh under the old tax regime:\n' +
      '• ELSS Mutual Funds\n' +
      '• PPF (Public Provident Fund)\n' +
      '• EPF (Employee Provident Fund)\n' +
      '• Tax Saving FD (5 years)\n' +
      '• NSC, SCSS, Sukanya Samriddhi Yojana\n' +
      '• Life insurance premiums',
  },
  {
    category: 'tax',
    keywords: ['ppf', 'public provident fund'],
    answer:
      '📘 **PPF (Public Provident Fund)**: Government-backed, 15-year lock-in. ' +
      'Interest rate: **7.1% p.a.** (compounded annually, tax-free). ' +
      'Annual investment: ₹500 – ₹1.5 lakh. ' +
      'EEE (Exempt-Exempt-Exempt) status — contribution, interest, and maturity are all tax-free. Best for long-term wealth.',
  },

  // ── BANKING BASICS ───────────────────────────────────────────
  {
    category: 'banking',
    keywords: ['savings account', 'savings bank account', 'interest on savings'],
    answer:
      '🏦 **Savings Account** interest rates: SBI 2.7%, HDFC 3–3.5%, small finance banks up to 7%. ' +
      'Keep at least the minimum balance to avoid charges. ' +
      'Interest up to ₹10,000/year is tax-exempt under Section 80TTA.',
  },
  {
    category: 'banking',
    keywords: ['current account', 'business account'],
    answer:
      '🏢 **Current Account** is for businesses with high transaction volumes. ' +
      'No interest paid on balance. Overdraft facility available. ' +
      'Requires higher minimum balance (₹10,000–₹1 lakh depending on bank).',
  },
  {
    category: 'banking',
    keywords: ['kyc', 'know your customer'],
    answer:
      '📄 **KYC (Know Your Customer)** is mandatory RBI compliance for all bank accounts. ' +
      'Required documents: Aadhaar card, PAN card, and a recent photograph. ' +
      'Video KYC is now accepted by most banks. KYC must be updated every 10 years (or 2 years for high-risk customers).',
  },
  {
    category: 'banking',
    keywords: ['ifsc', 'ifsc code', 'bank code'],
    answer:
      '🔢 **IFSC (Indian Financial System Code)** is an 11-character alphanumeric code identifying a specific bank branch. ' +
      'First 4 chars = bank name, 5th = 0 (reserved), last 6 = branch code. ' +
      'Required for NEFT, RTGS, and IMPS transactions. Find it on your cheque book or the RBI website.',
  },
  {
    category: 'banking',
    keywords: ['cheque', 'check', 'bounced cheque', 'cheque bounce'],
    answer:
      '📝 **Cheque Bounce** occurs when a bank rejects a cheque due to insufficient funds. ' +
      'Penalty: ₹150–₹750 per bounce (varies by bank). ' +
      'Legal implications: Section 138 of Negotiable Instruments Act — can lead to imprisonment up to 2 years or fine. ' +
      'Always maintain sufficient balance before issuing cheques.',
  },

  // ── DEMAT & STOCKS ───────────────────────────────────────────
  {
    category: 'investment',
    keywords: ['demat account', 'demat', 'trading account'],
    answer:
      '📊 **Demat Account** holds your shares & securities in electronic form (paperless). ' +
      'Maintained by CDSL or NSDL. Open with brokers like Zerodha, Groww, Angel One, Upstox. ' +
      'Annual Maintenance Charge (AMC): ₹0–₹900/year. Required to trade on NSE/BSE.',
  },
  {
    category: 'investment',
    keywords: ['stock market', 'share market', 'equity', 'nse', 'bse'],
    answer:
      '📈 **Stock Market** allows buying/selling company shares. ' +
      'India has two major exchanges: **NSE (National Stock Exchange)** and **BSE (Bombay Stock Exchange)**. ' +
      'Nifty 50 = top 50 NSE companies. Sensex = top 30 BSE companies. ' +
      'Market hours: 9:15 AM – 3:30 PM (Mon–Fri, excluding holidays).',
  },

  // ── GREETINGS & META ─────────────────────────────────────────
  {
    category: 'greeting',
    keywords: ['hello', 'hi', 'hey', 'namaste', 'good morning', 'good evening', 'good afternoon'],
    answer:
      '👋 Hello! Welcome to **BankSmart AI** — your personal Indian banking & financial assistant! ' +
      'I can help you with:\n' +
      '• 🏠 Loans (Home, Personal, Car, Education)\n' +
      '• 📱 UPI, NEFT, RTGS payments\n' +
      '• 📊 Credit Score & CIBIL\n' +
      '• 🏦 Fixed Deposits & Recurring Deposits\n' +
      '• 📈 Mutual Funds & SIP\n' +
      '• 🏛️ Repo Rate & RBI policies\n' +
      '• 🇮🇳 GDP & Inflation\n\n' +
      'What would you like to know? 😊',
  },
  {
    category: 'greeting',
    keywords: ['thanks', 'thank you', 'thank', 'ty'],
    answer: '😊 You\'re welcome! Is there anything else I can help you with? Feel free to ask any banking or finance question!',
  },
  {
    category: 'greeting',
    keywords: ['bye', 'goodbye', 'see you', 'exit'],
    answer: '👋 Goodbye! Stay financially smart! Remember to check your CIBIL score regularly and invest wisely. See you next time! 💰',
  },
  {
    category: 'general',
    keywords: ['what can you do', 'what do you know', 'help', 'capabilities'],
    answer:
      '🤖 I am **BankSmart AI**, your Indian banking expert. I can answer questions about:\n' +
      '• **Loans**: Home, Car, Personal, Education, Gold\n' +
      '• **Payments**: UPI, NEFT, RTGS, IMPS\n' +
      '• **Credit**: CIBIL Score, Credit Cards\n' +
      '• **Investments**: FD, RD, Mutual Funds, PPF, ELSS, Stocks\n' +
      '• **RBI Policies**: Repo Rate, CRR, SLR\n' +
      '• **Economy**: GDP, Inflation, Fiscal Deficit\n' +
      '• **Tax**: Income Tax Slabs, Section 80C, 80D\n' +
      '• **Insurance**: Term, Health\n\n' +
      'For questions beyond my knowledge base, I use Google Gemini AI! Ask me anything! 💬',
  },
];
