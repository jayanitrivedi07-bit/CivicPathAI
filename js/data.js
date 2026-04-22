// ============================================================
// VoteSathi — All Election Knowledge Data
// ============================================================

const VOTESATHI_DATA = {

  // ── TIMELINE PHASES ──────────────────────────────────────
  timeline: [
    {
      id: "announcement",
      icon: "📢",
      phase: "Phase 1",
      title: "Election Announcement",
      titleHi: "चुनाव की घोषणा",
      date: "6–8 Weeks Before",
      dateHi: "6–8 सप्ताह पहले",
      color: "#FF9933",
      description: "The Election Commission of India announces the election schedule. The Model Code of Conduct (MCC) comes into effect immediately, restricting government parties from making policy announcements that could influence voters.",
      descriptionHi: "भारत का चुनाव आयोग चुनाव कार्यक्रम की घोषणा करता है। आचार संहिता तुरंत लागू हो जाती है।",
      keyFacts: ["Model Code of Conduct begins", "Dates for all phases announced", "Voter rolls are finalized", "Election Commission takes charge"]
    },
    {
      id: "nomination",
      icon: "📝",
      phase: "Phase 2",
      title: "Filing of Nominations",
      titleHi: "नामांकन दाखिल करना",
      date: "4–5 Weeks Before",
      dateHi: "4–5 सप्ताह पहले",
      color: "#4F8EF7",
      description: "Political parties and independent candidates file their nomination papers. Any citizen meeting eligibility criteria (25+ years for Lok Sabha) can contest. Candidates submit Form 2A along with a security deposit.",
      descriptionHi: "राजनीतिक दल और निर्दलीय उम्मीदवार नामांकन पत्र दाखिल करते हैं।",
      keyFacts: ["Age requirement: 25+ for Lok Sabha", "Security deposit required", "Form 2A must be submitted", "Party symbol allotted"]
    },
    {
      id: "scrutiny",
      icon: "🔍",
      phase: "Phase 3",
      title: "Scrutiny & Withdrawal",
      titleHi: "जांच और वापसी",
      date: "3–4 Weeks Before",
      dateHi: "3–4 सप्ताह पहले",
      color: "#138808",
      description: "Election officials scrutinize all nomination papers for completeness and legality. Candidates can withdraw their candidacy within a specified period. The final list of candidates is published.",
      descriptionHi: "चुनाव अधिकारी सभी नामांकन पत्रों की जांच करते हैं। उम्मीदवार अपनी उम्मीदवारी वापस ले सकते हैं।",
      keyFacts: ["Nominations reviewed by Returning Officer", "Invalid nominations rejected", "Withdrawal deadline strictly enforced", "Final candidate list published"]
    },
    {
      id: "campaign",
      icon: "🎙️",
      phase: "Phase 4",
      title: "Campaigning Period",
      titleHi: "प्रचार अवधि",
      date: "2–3 Weeks Before",
      dateHi: "2–3 सप्ताह पहले",
      color: "#9C27B0",
      description: "Candidates and parties campaign across constituencies. Rallies, door-to-door visits, and media campaigns are conducted. Campaigning must stop 48 hours before polling day (campaign silence period).",
      descriptionHi: "उम्मीदवार और पार्टियां अपने चुनाव क्षेत्र में प्रचार करती हैं। मतदान से 48 घंटे पहले प्रचार बंद।",
      keyFacts: ["Campaign spending limits apply", "48-hour silence before polling", "Paid news regulations enforced", "Use of government resources banned"]
    },
    {
      id: "voting",
      icon: "🗳️",
      phase: "Phase 5",
      title: "Polling Day (Voting)",
      titleHi: "मतदान दिवस",
      date: "Election Day",
      dateHi: "चुनाव दिवस",
      color: "#FF9933",
      description: "Citizens exercise their right to vote at designated polling booths. Electronic Voting Machines (EVMs) are used. Voting happens in multiple phases across large states. VVPAT slips confirm your vote.",
      descriptionHi: "नागरिक निर्धारित मतदान केंद्रों पर अपना वोट डालते हैं। EVM मशीनों का उपयोग होता है।",
      keyFacts: ["EVM + VVPAT system used", "Voting hours: 7 AM to 6 PM", "Voter ID or alternate ID needed", "Indelible ink marks your finger"]
    },
    {
      id: "counting",
      icon: "🔢",
      phase: "Phase 6",
      title: "Counting of Votes",
      titleHi: "मतों की गिनती",
      date: "Days After Voting",
      dateHi: "मतदान के कुछ दिन बाद",
      color: "#4F8EF7",
      description: "Votes are counted at designated counting centers under strict security. Postal ballots are counted first. EVM data is tallied. Observers from all parties and independent monitors ensure transparency.",
      descriptionHi: "कड़ी सुरक्षा में वोटों की गिनती होती है। EVM डेटा की गणना की जाती है।",
      keyFacts: ["Counting agents from each party present", "Postal ballots counted first", "Results announced round by round", "Candidates can request recounting"]
    },
    {
      id: "results",
      icon: "🏛️",
      phase: "Phase 7",
      title: "Results & Government Formation",
      titleHi: "परिणाम और सरकार गठन",
      date: "Within Days",
      dateHi: "कुछ दिनों में",
      color: "#138808",
      description: "Winners are declared by the Returning Officer. The party or coalition with majority forms the government. The President invites the leader to form the government. Ministers are sworn in.",
      descriptionHi: "विजेताओं की घोषणा होती है। बहुमत दल या गठबंधन सरकार बनाता है।",
      keyFacts: ["272+ seats needed for Lok Sabha majority", "President invites majority leader", "Council of Ministers sworn in", "New government takes charge"]
    }
  ],

  // ── VOTER JOURNEY STEPS ──────────────────────────────────
  journey: [
    {
      id: "eligibility",
      step: 1,
      icon: "✅",
      title: "Check Your Eligibility",
      titleHi: "अपनी पात्रता जांचें",
      subtitle: "Am I eligible to vote?",
      subtitleHi: "क्या मैं वोट दे सकता/सकती हूं?",
      description: "You are eligible to vote in India if you are: (1) An Indian Citizen, (2) At least 18 years old on the qualifying date, (3) Registered in the electoral roll of your constituency, and (4) Not disqualified by any law.",
      descriptionHi: "आप भारत में वोट दे सकते हैं यदि: आप भारतीय नागरिक हैं, 18+ वर्ष के हैं, और मतदाता सूची में पंजीकृत हैं।",
      tip: "💡 Even NRIs can vote if they are registered at their Indian address!",
      tipHi: "💡 प्रवासी भारतीय भी वोट दे सकते हैं यदि वे अपने भारतीय पते पर पंजीकृत हैं!",
      action: "Check eligibility at voters.eci.gov.in"
    },
    {
      id: "voterid",
      step: 2,
      icon: "🪪",
      title: "Get Your Voter ID",
      titleHi: "अपना वोटर आईडी प्राप्त करें",
      subtitle: "Register & get your EPIC card",
      subtitleHi: "पंजीकरण करें और EPIC कार्ड प्राप्त करें",
      description: "Apply for your Voter ID (EPIC – Electoral Photo Identity Card) online at voters.eci.gov.in or visit your local BLO (Booth Level Officer). You need: Proof of Age, Proof of Residence, Passport Photo. Your name will appear in the electoral roll.",
      descriptionHi: "voters.eci.gov.in पर ऑनलाइन आवेदन करें या अपने BLO के पास जाएं। आयु प्रमाण, निवास प्रमाण, फोटो की आवश्यकता है।",
      tip: "💡 You can also use Aadhaar, Passport, Driving License as alternate ID on polling day!",
      tipHi: "💡 मतदान के दिन आधार, पासपोर्ट, ड्राइविंग लाइसेंस को भी वैकल्पिक ID के रूप में उपयोग किया जा सकता है!",
      action: "Apply at voters.eci.gov.in"
    },
    {
      id: "booth",
      step: 3,
      icon: "📍",
      title: "Find Your Polling Booth",
      titleHi: "अपना मतदान केंद्र खोजें",
      subtitle: "Know where to vote",
      subtitleHi: "जानें कहां वोट करें",
      description: "Your polling booth is assigned based on your registered address. You can find it on your Voter ID slip, the ECI website, or the Voter Helpline App. Booths are usually schools, community halls, or government buildings.",
      descriptionHi: "आपका मतदान केंद्र आपके पते के आधार पर तय होता है। Voter Helpline App या ECI वेबसाइट पर खोजें।",
      tip: "💡 Call 1950 — the Voter Helpline Number — for any election queries!",
      tipHi: "💡 किसी भी चुनाव संबंधी जानकारी के लिए 1950 पर कॉल करें!",
      action: "Find booth at voterportal.eci.gov.in"
    },
    {
      id: "votingday",
      step: 4,
      icon: "🗳️",
      title: "Voting Day Experience",
      titleHi: "मतदान दिवस का अनुभव",
      subtitle: "What happens at the booth",
      subtitleHi: "मतदान केंद्र पर क्या होता है",
      description: "On polling day: (1) Arrive at your booth with ID, (2) Officials verify your name in the voter list, (3) You sign the register and get indelible ink on your finger, (4) You enter the voting compartment ALONE, (5) Press the EVM button next to your chosen candidate, (6) A VVPAT slip confirms your vote for 7 seconds.",
      descriptionHi: "मतदान के दिन: ID लेकर पहुंचें → सूची में नाम सत्यापित होगा → अंगुली पर स्याही → EVM पर बटन दबाएं → VVPAT पर्ची से पुष्टि।",
      tip: "💡 Voting is completely private. No one can see or know who you voted for!",
      tipHi: "💡 मतदान पूरी तरह गोपनीय है। कोई नहीं जान सकता आपने किसे वोट दिया!",
      action: "Check polling hours: 7 AM to 6 PM"
    },
    {
      id: "aftervote",
      step: 5,
      icon: "🎉",
      title: "After You Vote",
      titleHi: "वोट देने के बाद",
      subtitle: "Your vote matters — here's what happens next",
      subtitleHi: "आपका वोट मायने रखता है — आगे क्या होता है",
      description: "Your vote is securely stored in the EVM. After all phases, votes are counted at designated centers. The party/candidate with most votes wins. Your single vote can tip the balance — many elections are won by just a few hundred votes!",
      descriptionHi: "आपका वोट EVM में सुरक्षित रहता है। सभी चरणों के बाद गिनती होती है। आपका एक वोट परिणाम बदल सकता है!",
      tip: "💡 Show your inked finger proudly — you participated in democracy! 🇮🇳",
      tipHi: "💡 अपनी स्याही वाली उंगली गर्व से दिखाएं — आपने लोकतंत्र में भाग लिया! 🇮🇳",
      action: "Track results on ECI website"
    }
  ],

  // ── FAQ ENTRIES ──────────────────────────────────────────
  faqs: [
    {
      q: "How do I vote?",
      qHi: "मैं वोट कैसे दे सकता/सकती हूं?",
      a: "Go to your assigned polling booth on election day with your Voter ID. Officials will verify your identity, apply indelible ink on your finger, and guide you to the EVM. Press the button next to your preferred candidate. A VVPAT slip will confirm your vote.",
      aHi: "अपने मतदान केंद्र पर Voter ID लेकर जाएं। अधिकारी पहचान सत्यापित करेंगे, उंगली पर स्याही लगाएंगे और EVM पर वोट डालने में मदद करेंगे।",
      category: "Voting Process"
    },
    {
      q: "What is EVM?",
      qHi: "EVM क्या है?",
      a: "EVM stands for Electronic Voting Machine. It's a tamper-proof device used in Indian elections to record votes electronically. It consists of a Control Unit (with the polling officer) and a Balloting Unit (where voters press buttons). It's completely standalone — not connected to the internet.",
      aHi: "EVM यानी इलेक्ट्रॉनिक वोटिंग मशीन। यह एक tamper-proof डिवाइस है जो वोट इलेक्ट्रॉनिक रूप से रिकॉर्ड करती है। यह इंटरनेट से जुड़ी नहीं होती।",
      category: "Technology"
    },
    {
      q: "Can I vote without Voter ID?",
      qHi: "क्या मैं Voter ID के बिना वोट दे सकता/सकती हूं?",
      a: "Yes! The Election Commission allows 12 alternate documents: Aadhaar Card, Passport, Driving License, PAN Card, MNREGA Job Card, Bank/Post Office Passbook with photo, Health Insurance Smart Card, Pension Document with photo, NPR Smart Card, Service Photo ID Card (government), and more.",
      aHi: "हां! चुनाव आयोग 12 वैकल्पिक दस्तावेजों की अनुमति देता है: आधार कार्ड, पासपोर्ट, ड्राइविंग लाइसेंस, PAN कार्ड आदि।",
      category: "Documents"
    },
    {
      q: "What happens after voting ends?",
      qHi: "मतदान के बाद क्या होता है?",
      a: "After polling closes, EVMs are sealed and stored securely. On counting day, EVMs are brought to counting centers. Votes are counted round by round in the presence of candidates' agents and observers. Results are announced by the Returning Officer.",
      aHi: "मतदान बंद होने के बाद EVM सील और सुरक्षित रखी जाती है। गिनती के दिन, उम्मीदवारों के एजेंटों और पर्यवेक्षकों की उपस्थिति में वोट गिने जाते हैं।",
      category: "After Voting"
    },
    {
      q: "What is VVPAT?",
      qHi: "VVPAT क्या है?",
      a: "VVPAT (Voter Verifiable Paper Audit Trail) is a machine attached to the EVM. After pressing the EVM button, a paper slip showing the party symbol and candidate name appears behind a glass window for 7 seconds, then falls into a sealed box. This lets you verify your vote was cast correctly.",
      aHi: "VVPAT (वोटर वेरिफाइएबल पेपर ऑडिट ट्रेल) EVM से जुड़ी मशीन है। EVM बटन दबाने के बाद, 7 सेकंड की पर्ची दिखती है जो आपके वोट की पुष्टि करती है।",
      category: "Technology"
    },
    {
      q: "How do I register as a new voter?",
      qHi: "नए मतदाता के रूप में पंजीकरण कैसे करें?",
      a: "Visit voters.eci.gov.in or download the Voter Helpline App. Fill Form 6 online. Upload proof of age (birth certificate, 10th marksheet), proof of residence (electricity bill, Aadhaar), and a passport-sized photo. Your BLO will verify and your name will be added to the electoral roll.",
      aHi: "voters.eci.gov.in पर जाएं या Voter Helpline App डाउनलोड करें। Form 6 ऑनलाइन भरें। आयु प्रमाण, निवास प्रमाण और फोटो अपलोड करें।",
      category: "Registration"
    },
    {
      q: "Is voting compulsory in India?",
      qHi: "क्या भारत में मतदान अनिवार्य है?",
      a: "No, voting is not legally compulsory in India (except in Gujarat and some states). However, it is a fundamental civic responsibility. Only 1 state — Gujarat — has a law making local body voting compulsory. But your vote is your power — use it!",
      aHi: "नहीं, भारत में मतदान कानूनी रूप से अनिवार्य नहीं है (गुजरात को छोड़कर)। लेकिन यह एक महत्वपूर्ण नागरिक कर्तव्य है।",
      category: "Rights & Duties"
    },
    {
      q: "Can I vote from any booth?",
      qHi: "क्या मैं किसी भी बूथ से वोट दे सकता/सकती हूं?",
      a: "No. You must vote at the specific polling booth assigned to your registered address. Your voter slip or Voter ID will mention your booth number and address. Check the ECI portal to find your exact booth location.",
      aHi: "नहीं। आपको अपने पंजीकृत पते से संबंधित विशिष्ट मतदान केंद्र पर ही वोट देना होगा।",
      category: "Voting Process"
    },
    {
      q: "What is the Model Code of Conduct?",
      qHi: "आदर्श आचार संहिता क्या है?",
      a: "The Model Code of Conduct (MCC) is a set of guidelines issued by the Election Commission that governs the conduct of political parties and candidates during election time. It kicks in when elections are announced and remains until results are declared. It restricts use of government resources for campaigning.",
      aHi: "आदर्श आचार संहिता चुनाव आयोग द्वारा जारी दिशानिर्देश हैं जो चुनाव के दौरान राजनीतिक दलों और उम्मीदवारों के आचरण को नियंत्रित करते हैं।",
      category: "Rules & Regulations"
    },
    {
      q: "What is NOTA?",
      qHi: "NOTA क्या है?",
      a: "NOTA stands for 'None of the Above'. It's an option on the EVM that lets voters reject all candidates. Introduced in 2013 by the Supreme Court, NOTA allows citizens to express dissatisfaction. However, even if NOTA gets the most votes, the candidate with the highest votes among persons wins.",
      aHi: "NOTA यानी 'इनमें से कोई नहीं'। यह EVM पर एक विकल्प है जो मतदाताओं को सभी उम्मीदवारों को अस्वीकार करने की अनुमति देता है।",
      category: "Voting Process"
    }
  ],

  // ── MYTH vs FACT ─────────────────────────────────────────
  myths: [
    {
      myth: "My vote doesn't make a difference",
      mythHi: "मेरा वोट कोई फर्क नहीं पड़ता",
      fact: "Many Indian elections have been decided by margins of fewer than 100 votes! Every single vote matters. In the 2009 Lok Sabha elections, 8 candidates won by margins of less than 200 votes.",
      factHi: "कई भारतीय चुनाव 100 से कम मतों के अंतर से जीते गए हैं! हर वोट मायने रखता है।",
      icon: "🗳️"
    },
    {
      myth: "Votes can be changed after casting on EVM",
      mythHi: "EVM पर वोट डालने के बाद बदला जा सकता है",
      fact: "Completely false. EVMs are standalone devices not connected to any network. Once a vote is locked, it cannot be altered. The VVPAT system provides an additional paper verification layer.",
      factHi: "पूरी तरह गलत। EVM किसी नेटवर्क से नहीं जुड़ी होती। एक बार वोट लॉक होने के बाद बदला नहीं जा सकता।",
      icon: "🔒"
    },
    {
      myth: "You need a Voter ID to vote",
      mythHi: "वोट देने के लिए Voter ID जरूरी है",
      fact: "Not true! The Election Commission accepts 12 alternative identity documents including Aadhaar, Passport, Driving License, PAN Card, and more. No citizen should be turned away from voting.",
      factHi: "गलत! चुनाव आयोग 12 वैकल्पिक पहचान दस्तावेजों को स्वीकार करता है जिनमें आधार, पासपोर्ट, ड्राइविंग लाइसेंस शामिल हैं।",
      icon: "🪪"
    },
    {
      myth: "The government can see who you voted for",
      mythHi: "सरकार देख सकती है आपने किसे वोट दिया",
      fact: "Voting in India is completely secret. The ballot (EVM) is anonymous. Even election officials cannot determine how any individual voted. This secrecy is protected by law.",
      factHi: "भारत में मतदान पूरी तरह गोपनीय है। EVM अनाम है। चुनाव अधिकारी भी नहीं जान सकते किसने किसे वोट दिया।",
      icon: "🔏"
    },
    {
      myth: "EVMs can be hacked remotely",
      mythHi: "EVM को दूर से हैक किया जा सकता है",
      fact: "EVMs have no wireless or internet connectivity — ever. They are physically air-gapped standalone machines. Multiple security audits by international experts have confirmed their integrity.",
      factHi: "EVM में कोई वायरलेस या इंटरनेट कनेक्टिविटी नहीं है। ये भौतिक रूप से अलग standalone मशीनें हैं।",
      icon: "📵"
    },
    {
      myth: "Only educated people should vote",
      mythHi: "केवल पढ़े-लिखे लोगों को वोट देना चाहिए",
      fact: "The Indian Constitution gives every citizen the equal right to vote, regardless of education, income, or social status. EVMs even use party symbols so literacy is not a barrier. Democracy belongs to everyone!",
      factHi: "भारतीय संविधान हर नागरिक को शिक्षा, आय या सामाजिक स्थिति की परवाह किए बिना समान मतदान अधिकार देता है।",
      icon: "🏛️"
    }
  ],

  // ── QUIZ QUESTIONS ────────────────────────────────────────
  quiz: [
    {
      q: "At what age can an Indian citizen vote?",
      qHi: "एक भारतीय नागरिक किस आयु में मतदान कर सकता है?",
      options: ["16 years", "18 years", "21 years", "25 years"],
      optionsHi: ["16 साल", "18 साल", "21 साल", "25 साल"],
      answer: 1,
      explanation: "The voting age in India was lowered from 21 to 18 by the 61st Constitutional Amendment in 1988.",
      explanationHi: "1988 में 61वें संवैधानिक संशोधन द्वारा भारत में मतदान की आयु 21 से घटाकर 18 कर दी गई।"
    },
    {
      q: "What does EVM stand for?",
      qHi: "EVM का मतलब क्या है?",
      options: ["Electronic Vote Monitor", "Electronic Voting Machine", "Electro Vote Manager", "Electoral Vote Module"],
      optionsHi: ["इलेक्ट्रॉनिक वोट मॉनिटर", "इलेक्ट्रॉनिक वोटिंग मशीन", "इलेक्ट्रो वोट मैनेजर", "इलेक्टोरल वोट मॉड्यूल"],
      answer: 1,
      explanation: "EVM stands for Electronic Voting Machine, used in Indian elections since the 1990s.",
      explanationHi: "EVM का अर्थ है इलेक्ट्रॉनिक वोटिंग मशीन, जो 1990 के दशक से भारतीय चुनावों में उपयोग की जा रही है।"
    },
    {
      q: "What is NOTA?",
      qHi: "NOTA क्या है?",
      options: ["A government scheme", "None of the Above option", "A type of voter ID", "Election observer body"],
      optionsHi: ["एक सरकारी योजना", "इनमें से कोई नहीं विकल्प", "एक प्रकार का मतदाता ID", "चुनाव पर्यवेक्षक निकाय"],
      answer: 1,
      explanation: "NOTA (None of the Above) was introduced in 2013, allowing voters to reject all candidates.",
      explanationHi: "NOTA (इनमें से कोई नहीं) 2013 में लागू किया गया, जो मतदाताओं को सभी उम्मीदवारों को अस्वीकार करने की अनुमति देता है।"
    },
    {
      q: "Which body conducts elections in India?",
      qHi: "भारत में चुनाव कौन कराता है?",
      options: ["Supreme Court", "Parliament", "Election Commission of India", "President of India"],
      optionsHi: ["सर्वोच्च न्यायालय", "संसद", "भारत निर्वाचन आयोग", "भारत के राष्ट्रपति"],
      answer: 2,
      explanation: "The Election Commission of India (ECI) is an autonomous constitutional authority responsible for conducting elections.",
      explanationHi: "भारत निर्वाचन आयोग (ECI) चुनाव कराने के लिए जिम्मेदार एक स्वायत्त संवैधानिक प्राधिकरण है।"
    },
    {
      q: "How long does indelible ink remain on the finger?",
      qHi: "अंगुली पर अमिट स्याही कितने समय तक रहती है?",
      options: ["24 hours", "3 days", "1–2 weeks", "1 month"],
      optionsHi: ["24 घंटे", "3 दिन", "1–2 सप्ताह", "1 महीना"],
      answer: 2,
      explanation: "Indelible ink (made in Mysore) lasts 1–2 weeks, preventing people from voting more than once.",
      explanationHi: "अमिट स्याही (मैसूर में बनाई जाती है) 1–2 सप्ताह तक रहती है, लोगों को एक से अधिक बार वोट देने से रोकती है।"
    },
    {
      q: "What is the Model Code of Conduct?",
      qHi: "आदर्श आचार संहिता क्या है?",
      options: ["A law passed by Parliament", "Guidelines for election conduct", "Voter registration rules", "Rules for counting votes"],
      optionsHi: ["संसद द्वारा पारित कानून", "चुनाव आचरण के लिए दिशानिर्देश", "मतदाता पंजीकरण नियम", "वोट गिनती के नियम"],
      answer: 1,
      explanation: "The MCC is a set of ECI guidelines that kick in from election announcement until results, regulating conduct of parties and candidates.",
      explanationHi: "MCC ECI दिशानिर्देशों का एक समूह है जो चुनाव घोषणा से परिणाम तक लागू होता है।"
    },
    {
      q: "What does VVPAT do?",
      qHi: "VVPAT क्या करता है?",
      options: ["Counts votes automatically", "Verifies voter identity", "Shows a paper slip confirming your vote", "Connects EVM to the internet"],
      optionsHi: ["स्वचालित रूप से वोट गिनता है", "मतदाता की पहचान सत्यापित करता है", "आपके वोट की पुष्टि करने वाली पर्ची दिखाता है", "EVM को इंटरनेट से जोड़ता है"],
      answer: 2,
      explanation: "VVPAT shows a paper slip with the party symbol and candidate name for 7 seconds, confirming your vote was recorded correctly.",
      explanationHi: "VVPAT 7 सेकंड के लिए पार्टी प्रतीक और उम्मीदवार के नाम के साथ एक पर्ची दिखाता है।"
    },
    {
      q: "In India, the right to vote is available to:",
      qHi: "भारत में मतदान का अधिकार किसे है?",
      options: ["Only educated citizens", "Only taxpayers", "Every citizen 18+ years old", "Only government employees"],
      optionsHi: ["केवल शिक्षित नागरिकों को", "केवल करदाताओं को", "18+ वर्ष के हर नागरिक को", "केवल सरकारी कर्मचारियों को"],
      answer: 2,
      explanation: "Article 326 of the Indian Constitution guarantees universal adult suffrage — every citizen 18+ can vote.",
      explanationHi: "भारतीय संविधान का अनुच्छेद 326 सार्वभौमिक वयस्क मताधिकार की गारंटी देता है — 18+ का हर नागरिक वोट दे सकता है।"
    },
    {
      q: "What form is used to register as a new voter?",
      qHi: "नए मतदाता के रूप में पंजीकरण के लिए कौन सा फॉर्म उपयोग किया जाता है?",
      options: ["Form 1", "Form 6", "Form 8", "Form 16"],
      optionsHi: ["फॉर्म 1", "फॉर्म 6", "फॉर्म 8", "फॉर्म 16"],
      answer: 1,
      explanation: "Form 6 is used to apply for inclusion of name in the electoral roll for the first time.",
      explanationHi: "Form 6 का उपयोग पहली बार मतदाता सूची में नाम शामिल करने के लिए आवेदन करने हेतु किया जाता है।"
    },
    {
      q: "How many seats does a party need for majority in Lok Sabha?",
      qHi: "लोकसभा में बहुमत के लिए पार्टी को कितनी सीटें चाहिए?",
      options: ["200+", "251+", "272+", "300+"],
      optionsHi: ["200+", "251+", "272+", "300+"],
      answer: 2,
      explanation: "The Lok Sabha has 543 seats. A party needs 272+ seats (simple majority — more than half) to form the government.",
      explanationHi: "लोकसभा में 543 सीटें हैं। सरकार बनाने के लिए पार्टी को 272+ सीटों (साधारण बहुमत) की आवश्यकता होती है।"
    }
  ],

  // ── CHATBOT KNOWLEDGE BASE ────────────────────────────────
  chatResponses: [
    {
      keywords: ["vote", "voting", "how to vote", "kaise vote"],
      response: "Great question! 🗳️ To vote:\n1. Go to your assigned polling booth\n2. Show your Voter ID or alternate ID\n3. Officials verify your name & apply ink\n4. Enter the voting compartment alone\n5. Press the EVM button for your candidate\n6. A VVPAT slip confirms your vote!\n\nWould you like to **simulate the voting experience**? 🎮"
    },
    {
      keywords: ["evm", "voting machine", "electronic", "machine"],
      response: "📱 EVM (Electronic Voting Machine) is India's secure voting device!\n\n• **Standalone** — Never connected to internet\n• **Control Unit** — With polling officer\n• **Balloting Unit** — Where you press buttons\n• **Tamper-proof** — Certified by IIT experts\n• **VVPAT attached** — Paper trail confirmation\n\nIt's been used since 1998 and is trusted by election experts worldwide! 🌐"
    },
    {
      keywords: ["vvpat", "paper slip", "verify", "confirmation"],
      response: "🧾 VVPAT = Voter Verifiable Paper Audit Trail!\n\nAfter pressing the EVM button:\n✅ A paper slip appears behind a glass window\n✅ Shows party symbol + candidate name\n✅ Visible for **7 seconds**\n✅ Then drops into a sealed box\n\nThis lets YOU verify your vote was counted correctly! Introduced in 2013."
    },
    {
      keywords: ["eligibility", "eligible", "age", "who can vote", "patr"],
      response: "✅ You can vote in India if you are:\n\n🔹 An **Indian citizen**\n🔹 **18 years or older** on the qualifying date\n🔹 **Registered** in the electoral roll\n🔹 Not disqualified by any law\n\nEven NRIs can vote if registered at their Indian address! 🇮🇳\n\nWant to check your eligibility step by step? Click **Voter Journey**!"
    },
    {
      keywords: ["voter id", "epic", "id card", "register", "registration", "panjikaran"],
      response: "🪪 Getting your Voter ID (EPIC Card):\n\n1. Visit **voters.eci.gov.in**\n2. Fill **Form 6** online\n3. Upload: Proof of Age + Residence + Photo\n4. A BLO (Booth Level Officer) verifies\n5. Your EPIC card is delivered!\n\n📞 **Helpline: 1950**\n\nYou can also use Aadhaar, Passport, or Driving License as alternate ID on polling day!"
    },
    {
      keywords: ["booth", "polling", "where", "location", "kahan"],
      response: "📍 Finding your polling booth:\n\n• Check your **Voter ID slip** — booth address is printed\n• Visit **voterportal.eci.gov.in**\n• Download the **Voter Helpline App**\n• Call **1950** for assistance\n\nBooths are usually schools, community halls, or government buildings near your home. 🏫"
    },
    {
      keywords: ["nota", "none of the above", "reject"],
      response: "🚫 NOTA = **None of the Above**!\n\nIntroduced in **2013** by Supreme Court order:\n✅ Allows voters to reject ALL candidates\n✅ Last button on the EVM\n✅ Your vote is still counted (as NOTA)\n⚠️ But even if NOTA gets most votes, the candidate with most votes among persons still wins\n\nNOTA is your right to protest against all candidates! 💪"
    },
    {
      keywords: ["mcc", "model code", "achar sanhita", "conduct"],
      response: "📋 Model Code of Conduct (MCC):\n\nActivates **immediately** when elections are announced:\n\n🔸 Government can't announce new policies\n🔸 No use of government resources for campaigning\n🔸 Campaign must stop 48 hours before polling\n🔸 Parties must follow spending limits\n\nThe MCC ensures a **level playing field** for all candidates! ⚖️"
    },
    {
      keywords: ["secret", "private", "gupat", "who know", "koi dekh"],
      response: "🔏 Yes, your vote is **100% secret**!\n\nIndia uses the **secret ballot system**:\n✅ You vote alone in a private compartment\n✅ EVM stores votes without linking to voter identity\n✅ Not even election officials can see who you voted for\n✅ Protected by **Representation of People Act, 1951**\n\nVote confidently! Your choice is yours alone. 🗳️"
    },
    {
      keywords: ["thank", "help", "great", "good", "nice"],
      response: "😊 Happy to help you understand democracy better!\n\n🇮🇳 Remember — voting is your **right AND responsibility**.\n\nExplore more sections:\n📊 **Timeline** — See election phases\n👤 **Voter Journey** — Your step-by-step guide\n🏆 **Quiz** — Test your knowledge & win badges!\n\nTogether, we build a stronger democracy! 🙌"
    }
  ],

  // ── TRANSLATIONS (EN / HI) ────────────────────────────────
  translations: {
    en: {
      navHome: "Home",
      navOverview: "Overview",
      navTimeline: "Timeline",
      navJourney: "Voter Journey",
      navFAQ: "FAQs",
      navMyths: "Myth vs Fact",
      navQuiz: "Quiz",
      navSimulator: "Simulator",
      heroTitle: "Understand Democracy.",
      heroSubtitle: "Step by Step.",
      heroDesc: "Your complete guide to India's election process — visual, interactive, and made for every citizen.",
      heroBtn: "Begin Your Journey",
      heroBtnQuiz: "Take the Quiz",
      overviewTitle: "What Are Elections?",
      timelineTitle: "Election Timeline",
      journeyTitle: "Your Voter Journey",
      faqTitle: "Frequently Asked Questions",
      mythTitle: "Myth vs Fact",
      quizTitle: "Civic Knowledge Quiz",
      simTitle: "Election Simulator",
      chatPlaceholder: "Ask me anything about elections...",
      chatSend: "Send",
      themeToggle: "Toggle Theme",
      langToggle: "हिंदी",
      largText: "Large Text",
      verified: "✓ Verified Information",
      progress: "Your Journey Progress",
      badgeFirst: "First-time Voter",
      badgeExplorer: "Democracy Explorer",
      badgeExpert: "Civic Expert",
      overviewDesc: "Democracy is built on the power of your vote. Here's why elections matter and how you fit in.",
      timelineDesc: "Click on any phase to learn what happens at each stage of India's election process.",
      journeyDesc: "A step-by-step guide customized for you — from checking eligibility to casting your vote.",
      simDesc: "Experience the complete mock polling booth. No real votes cast!",
      faqDesc: "Everything you need to know about voting in India — answered simply and clearly.",
      modalTitle: "Welcome to VoteSathi!",
      modalDesc: "Tell us about yourself to personalize your journey.",
      modalAge: "Your Age *",
      modalFirst: "Are you a first-time voter?",
      modalState: "Your State / Region",
      modalSubmit: "🚀 Start My Personalized Journey",
      modalSkip: "Skip for now"
    },
    hi: {
      navHome: "होम",
      navOverview: "अवलोकन",
      navTimeline: "समयरेखा",
      navJourney: "मतदाता यात्रा",
      navFAQ: "सामान्य प्रश्न",
      navMyths: "मिथक बनाम तथ्य",
      navQuiz: "प्रश्नोत्तरी",
      navSimulator: "सिम्युलेटर",
      heroTitle: "लोकतंत्र को समझें।",
      heroSubtitle: "कदम दर कदम।",
      heroDesc: "भारत की चुनाव प्रक्रिया के लिए आपकी संपूर्ण मार्गदर्शिका — दृश्यात्मक, इंटरएक्टिव और हर नागरिक के लिए।",
      heroBtn: "अपनी यात्रा शुरू करें",
      heroBtnQuiz: "प्रश्नोत्तरी लें",
      overviewTitle: "चुनाव क्या हैं?",
      timelineTitle: "चुनाव समयरेखा",
      journeyTitle: "आपकी मतदाता यात्रा",
      faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
      mythTitle: "मिथक बनाम तथ्य",
      quizTitle: "नागरिक ज्ञान प्रश्नोत्तरी",
      simTitle: "चुनाव सिम्युलेटर",
      chatPlaceholder: "चुनाव के बारे में कुछ भी पूछें...",
      chatSend: "भेजें",
      themeToggle: "थीम बदलें",
      langToggle: "English",
      largText: "बड़ा टेक्स्ट",
      verified: "✓ सत्यापित जानकारी",
      progress: "आपकी यात्रा प्रगति",
      badgeFirst: "पहली बार मतदाता",
      badgeExplorer: "लोकतंत्र खोजकर्ता",
      badgeExpert: "नागरिक विशेषज्ञ",
      overviewDesc: "लोकतंत्र आपके वोट की शक्ति पर बना है। जानें कि चुनाव क्यों महत्वपूर्ण हैं।",
      timelineDesc: "भारत की चुनाव प्रक्रिया के हर चरण को जानने के लिए किसी भी चरण पर क्लिक करें।",
      journeyDesc: "पात्रता से लेकर वोट डालने तक — आपके लिए एक अनुकूलित मार्गदर्शिका।",
      simDesc: "संपूर्ण मॉक मतदान केंद्र का अनुभव करें। कोई वास्तविक वोट नहीं डाला जाएगा!",
      faqDesc: "भारत में मतदान के बारे में सब कुछ जानें - सरल और स्पष्ट शब्दों में।",
      modalTitle: "VoteSathi में आपका स्वागत है!",
      modalDesc: "अपनी यात्रा को अनुकूलित करने के लिए अपने बारे में बताएं।",
      modalAge: "आपकी आयु *",
      modalFirst: "क्या आप पहली बार मतदाता हैं?",
      modalState: "आपका राज्य / क्षेत्र",
      modalSubmit: "🚀 मेरी व्यक्तिगत यात्रा शुरू करें",
      modalSkip: "अभी छोड़ें"
    }
  }
};

// Export for use in other modules
if (typeof module !== 'undefined') module.exports = VOTESATHI_DATA;
