/* local-data.js — a curated set of REAL, recognizable Walker County
   (Jasper, AL) businesses, researched for this talk, with grounded
   marketing copy. This lets the Live Demo run a genuine "we looked them
   up" moment fully offline — no API key required. When someone names a
   business that IS in this list, the deck shows the real, researched
   content; anything else falls back to a live web lookup (if a key is
   set) or a name-aware generic sample.

   Details verified via TripAdvisor / Yelp / local listings, July 2026. */

(function () {
  const BUSINESSES = [
    {
      keys: ['warehouse 319', 'warehouse three nineteen', 'warehouse 3nineteen', '319'],
      found: "Found: Warehouse 319 — a downtown Jasper sports bar & grill serving Southern fare with flair, known for its signature wings and famous shrimp & grits.",
      social:
        "🍗 Game day just got better — our signature wings are hot, saucy, and waiting for you at Warehouse 319 in downtown Jasper.\n\n" +
        "🍤 Shrimp & grits done right. Come taste the dish Jasper won’t stop talking about.\n\n" +
        "📺 Big screens, cold drinks, and Southern comfort food — grab the crew and pull up a table tonight.",
      review:
        "Thank you for taking the time to share this — I’m sorry your visit to Warehouse 319 didn’t live up to what you should expect from us. Great food and a great time are what we’re about, and it sounds like we missed the mark. I’d genuinely like to make it right, so please reach out to me directly. We’d love the chance to have you back for those wings.",
      sms:
        "Thanks for reaching out to Warehouse 319! The kitchen’s closed for the night, but we read every message in the morning and will get right back to you. 🍗",
    },
    {
      keys: ['alabama stackers', 'stackers', 'the stacker'],
      found: "Found: Alabama Stackers — a family-owned burger joint in historic downtown Jasper (108 19th St E), famous for its stacked burgers, hand-cut fries, and hand-dipped shakes.",
      social:
        "🍔 That first bite of a Stacker with our signature sauce? Unbeatable. Come see us in downtown Jasper.\n\n" +
        "🍟 Hand-cut fries and hand-dipped shakes, made to order — Alabama Stackers is worth the trip to 19th St E.\n\n" +
        "🥤 Family-owned and stacked high. Bring the whole crew this week!",
      review:
        "Thank you for the honest feedback — I’m sorry your visit to Alabama Stackers didn’t live up to what you’d expect from a family-owned spot. We take pride in every stack we send out, and it sounds like we let you down. I’d really like to make it right — please reach out so we can hear what happened and earn your business back.",
      sms:
        "Thanks for messaging Alabama Stackers! We’ve closed up for the night, but we’ll get right back to you first thing tomorrow. 🍔",
    },
    {
      keys: ['bayou fresh', 'bayou fresh seafood', 'bayou fresh seafood & deli', 'bayou'],
      found: "Found: Bayou Fresh Seafood & Deli — a Jasper favorite for fresh-daily seafood (grilled snapper, fried shrimp) and made-to-order sushi.",
      social:
        "🦐 Fresh off the boat and onto your plate — grilled snapper and fried shrimp are calling your name at Bayou Fresh.\n\n" +
        "🍣 Craving sushi in Jasper? Our rolls are made fresh to order at Bayou Fresh Seafood & Deli.\n\n" +
        "🐟 Seafood so fresh it arrives daily. Come taste the Bayou Fresh difference this week.",
      review:
        "Thank you for letting us know — I’m sorry your experience at Bayou Fresh didn’t meet the standard we hold ourselves to. Fresh, quality seafood is our whole reason for being here, and it sounds like we fell short. Please reach out directly so we can make it right and welcome you back.",
      sms:
        "Thanks for reaching out to Bayou Fresh! We’re closed for the evening, but we’ll get back to you first thing in the morning. 🦐",
    },
    {
      keys: ["michelle's bakery", 'michelles bakery', "michelle's", 'michelles', "michelle's bakery cafe", 'michelles bakery cafe & coffee shoppe'],
      found: "Found: Michelle’s Bakery Cafe & Coffee Shoppe — Jasper’s top-rated coffee & breakfast spot (320 20th St W), loved for its baked goods and famous chicken salad.",
      social:
        "☕ Morning in Jasper starts here — fresh coffee and warm-from-the-oven treats at Michelle’s Bakery Cafe.\n\n" +
        "🥪 Everybody’s talking about the chicken salad. Come find out why at Michelle’s, 320 20th St W.\n\n" +
        "🧁 Breakfast, lunch, and something sweet — Michelle’s has your table waiting.",
      review:
        "Thank you so much for the feedback — I’m sorry your visit to Michelle’s didn’t live up to what our regulars have come to love. We pour our hearts into every plate and every cup, and it sounds like we missed the mark. I’d love to make it right, so please reach out and give us another chance.",
      sms:
        "Thanks for reaching out to Michelle’s Bakery Cafe! We’re closed for the day, but we’ll get back to you first thing in the morning. ☕",
    },
    {
      keys: ['tin cup', 'the tin cup', 'tin cup market', 'the tin cup market'],
      found: "Found: The Tin Cup Market — a beloved downtown Jasper boutique with around 50 vendors and ever-changing merchandise that keeps regulars coming back weekly.",
      social:
        "🛍️ New treasures just landed at The Tin Cup Market — you never know what you’ll find, and that’s the fun of it.\n\n" +
        "✨ Fifty vendors, one gorgeous downtown shop. Come get lost in The Tin Cup this weekend.\n\n" +
        "💐 Gifts, home, and unique finds you won’t see anywhere else — that’s The Tin Cup, Jasper.",
      review:
        "Thank you for sharing this — I’m sorry your visit to The Tin Cup Market didn’t live up to the experience our regulars love. We work hard to make every visit special, and it sounds like we let you down. I’d truly appreciate the chance to make it right — please reach out to us directly.",
      sms:
        "Thanks for reaching out to The Tin Cup Market! We’re closed for the day, but we’ll get right back to you when we open. 🛍️",
    },
    {
      keys: ['lavish', 'lavish boutique'],
      found: "Found: Lavish Boutique — a Jasper women’s clothing boutique known for on-trend styles and personal, merchant-owner service you won’t get at a big-box store.",
      social:
        "👗 New arrivals just dropped at Lavish Boutique — come find your next favorite outfit in downtown Jasper.\n\n" +
        "💃 Styled for you, by people who know you. That’s the Lavish Boutique difference.\n\n" +
        "🛍️ Treat yourself this week — swing by Lavish and let us pull a few looks just for you.",
      review:
        "Thank you for the honest feedback — I’m sorry your visit to Lavish didn’t live up to what you should expect from us. Taking great care of every customer is exactly why we do this, and it sounds like we fell short. Please reach out so we can make it right and welcome you back.",
      sms:
        "Thanks for messaging Lavish Boutique! We’re closed for now, but we’ll get right back to you as soon as we’re open. 👗",
    },
    {
      keys: ['elizabeth garner', 'elizabeth garner interiors', 'garner interiors'],
      found: "Found: Elizabeth Garner Interiors — the area’s premier home & design boutique, serving Jasper and beyond since 2014.",
      social:
        "🛋️ Make your home feel like you — timeless pieces and design help at Elizabeth Garner Interiors.\n\n" +
        "✨ Serving Jasper and beyond since 2014. Come see what’s new on the floor this week.\n\n" +
        "🏡 From one perfect accent to a whole-room refresh — Elizabeth Garner Interiors is here for it.",
      review:
        "Thank you for taking the time to share this — I’m sorry your experience with Elizabeth Garner Interiors didn’t meet the standard we’ve built since 2014. Beautiful spaces and genuine care are what we’re about, and it sounds like we missed the mark. I’d love to make it right, so please reach out to us directly.",
      sms:
        "Thanks for reaching out to Elizabeth Garner Interiors! We’re closed at the moment, but we’ll get right back to you during business hours. 🛋️",
    },
    {
      keys: ['taqueria raquel', 'raquel', "raquel's", 'taqueria'],
      found: "Found: Taqueria Raquel — a Jasper taqueria loved for flavorful, authentic tacos and a friendly, family-friendly vibe.",
      social:
        "🌮 Taco cravings? Taqueria Raquel has you covered with fresh, flavorful tacos right here in Jasper.\n\n" +
        "🌶️ Authentic, made with love, and easy on the wallet — come taste why folks keep coming back.\n\n" +
        "🥑 Bring the family — Taqueria Raquel has something everybody will love.",
      review:
        "Thank you for letting us know — I’m sorry your visit to Taqueria Raquel didn’t live up to what you should expect. Authentic food and a warm welcome are what we’re about, and it sounds like we fell short. Please reach out so we can make it right and welcome you back.",
      sms:
        "Thanks for reaching out to Taqueria Raquel! We’re closed for now, but we’ll get right back to you first thing. 🌮",
    },

    /* ---- Rotary Club of Jasper member businesses (so the room sees itself) ---- */
    {
      keys: ['riverside fly shop', 'riverside fly', 'fly shop'],
      found: "Found: Riverside Fly Shop — a full-service fly shop and outfitter on the Sipsey Fork (Hwy 69), owned by Brandon & Mary Carole Jackson, with flies, gear, waders, and guided trips.",
      social:
        "🎣 The Sipsey’s running clear — come grab flies, tippet, and a hot tip at Riverside Fly Shop on Hwy 69.\n\n" +
        "🐟 New to fly fishing? Our ‘give it a try’ package puts you on the water for a day. Stop in and let’s get you set up.\n\n" +
        "🌊 Rods, reels, waders, and the local know-how to put you on trout — that’s Riverside Fly Shop.",
      review:
        "Thank you for the feedback — I’m sorry your visit to Riverside Fly Shop didn’t live up to what you should expect from us. Sharing our love of the Sipsey and fly fishing is the whole reason we’re here, and it sounds like we let you down. Please reach out so we can make it right and get you back on the water.",
      sms:
        "Thanks for reaching out to Riverside Fly Shop! We’re off the clock for now, but we’ll get right back to you — and let you know how the Sipsey’s fishing. 🎣",
    },
    {
      keys: ['cigar box', 'the cigar box'],
      found: "Found: The Cigar Box — a premium cigar shop and lounge in historic downtown Jasper (411 19th St W), stocked with fine cigars, pipe tobacco, and accessories.",
      social:
        "🚬 Unwind the right way — premium cigars and a comfortable lounge waiting for you at The Cigar Box in downtown Jasper.\n\n" +
        "🥃 New arrivals just hit the humidor. Come find your next favorite smoke at The Cigar Box.\n\n" +
        "👔 Good conversation and a great cigar — bring a friend and pull up a chair at 411 19th St W.",
      review:
        "Thank you for letting us know — I’m sorry your visit to The Cigar Box didn’t live up to the experience we aim for. Helping every guest find the right smoke in a relaxed setting is what we’re about, and it sounds like we missed the mark. Please reach out so we can make it right and welcome you back.",
      sms:
        "Thanks for reaching out to The Cigar Box! We’re closed for now, but we’ll get right back to you when we open. 🚬",
    },
    {
      keys: ['don kilgore', 'don h kilgore', 'kilgore realtors', 'don h kilgore realtors', 'kilgore'],
      found: "Found: Don H. Kilgore Realtors — a local Jasper real estate professional helping folks buy and sell homes across Walker County.",
      social:
        "🏡 Thinking about selling? Let’s talk about what your Walker County home is really worth. — Don H. Kilgore Realtors.\n\n" +
        "🔑 Local expertise and someone who actually answers the phone. That’s the Kilgore difference.\n\n" +
        "📍 Deep knowledge of the Jasper market — call Don H. Kilgore Realtors first.",
      review:
        "Thank you for sharing this — I’m sorry your experience didn’t live up to the service you should expect. Taking great care of every client through one of life’s biggest decisions is exactly why I do this, and it sounds like I fell short. Please reach out to me directly so I can make it right.",
      sms:
        "Thanks for reaching out to Don H. Kilgore Realtors! I’m away from the desk right now, but I’ll get right back to you. 🔑",
    },
    {
      keys: ['pinnacle bank', 'pinnacle banc', 'pinnacle'],
      found: "Found: Pinnacle Bank — a community bank serving Jasper and Walker County with local decisions and hometown service.",
      social:
        "🏦 Banking should feel local. At Pinnacle Bank, the person deciding on your loan lives right here in Walker County.\n\n" +
        "🤝 Big-bank tools, hometown service — come see the Pinnacle Bank difference.\n\n" +
        "💳 From your first account to your next big move, Pinnacle Bank is right here in Jasper for you.",
      review:
        "Thank you for the honest feedback — I’m sorry your experience with Pinnacle Bank didn’t meet the standard we hold ourselves to. Taking great care of our neighbors is exactly why we’re a community bank, and it sounds like we let you down. Please reach out so we can make it right.",
      sms:
        "Thanks for reaching out to Pinnacle Bank! Our lobby is closed, but we’ll get right back to you during business hours. 🏦",
    },
    {
      keys: ['bank of walker county', 'walker county bank'],
      found: "Found: Bank of Walker County — a hometown community bank serving Jasper and Walker County.",
      social:
        "🏦 Your money, managed by neighbors who know your name — that’s Bank of Walker County.\n\n" +
        "🤝 Local decisions, local service. Come see why folks bank close to home.\n\n" +
        "💼 Whatever’s next for you or your business, Bank of Walker County is right here for it.",
      review:
        "Thank you for sharing this — I’m sorry your experience with Bank of Walker County didn’t meet the standard we hold ourselves to. Serving our neighbors well is the whole point of a community bank, and it sounds like we fell short. Please reach out so we can make it right.",
      sms:
        "Thanks for reaching out to Bank of Walker County! Our lobby is closed, but we’ll get right back to you during business hours. 🏦",
    },
    {
      keys: ['anthony christian', 'anthony christian state farm', 'state farm'],
      found: "Found: Anthony Christian – State Farm — a local Jasper insurance agent helping neighbors protect their homes, cars, and families.",
      social:
        "🚗 Life happens — make sure you’re covered. Anthony Christian, your local State Farm agent right here in Jasper.\n\n" +
        "🏠 Home, auto, life — one local agent who actually knows you.\n\n" +
        "📞 Questions about your coverage? Stop by and let’s make sure you’ve got what you need.",
      review:
        "Thank you for the feedback — I’m sorry your experience didn’t live up to what you should expect from a local agent. Taking care of my neighbors like family is exactly why I do this, and it sounds like I fell short. Please reach out to me directly so I can make it right.",
      sms:
        "Thanks for reaching out to Anthony Christian – State Farm! I’m out of the office right now, but I’ll get right back to you. 🚗",
    },
    {
      keys: ['allison jones law', 'allison jones', 'jones law'],
      found: "Found: Allison Jones Law — a Jasper law practice serving clients across Walker County.",
      social:
        "⚖️ When you need someone in your corner, local matters. Allison Jones Law is right here in Jasper for you.\n\n" +
        "📋 Straight answers and steady guidance — that’s what we bring to every client.\n\n" +
        "🤝 Facing a legal question? Reach out to Allison Jones Law for a conversation, not a runaround.",
      review:
        "Thank you for sharing this — I’m sorry your experience with our office didn’t live up to what you should expect. Serving every client with care and clarity is exactly why I practice here, and it sounds like we fell short. Please reach out to me directly so I can make it right.",
      sms:
        "Thanks for reaching out to Allison Jones Law! I’m away from the office right now, but I’ll get right back to you. ⚖️",
    },
    {
      keys: ['tina burgett', 'burgett law', 'tina burgett lawyer'],
      found: "Found: Tina Burgett, Attorney — a Jasper lawyer serving clients across Walker County.",
      social:
        "⚖️ Local, approachable, and in your corner — that’s attorney Tina Burgett, right here in Jasper.\n\n" +
        "📋 Big legal questions deserve a real conversation. Reach out and let’s talk it through.\n\n" +
        "🤝 Trusted guidance for the moments that matter — Tina Burgett, Attorney.",
      review:
        "Thank you for sharing this — I’m sorry your experience didn’t live up to what you should expect from my office. Taking good care of every client is exactly why I practice here, and it sounds like I fell short. Please reach out to me directly so I can make it right.",
      sms:
        "Thanks for reaching out to the office of Tina Burgett, Attorney! I’m away right now, but I’ll get right back to you. ⚖️",
    },
    {
      keys: ['d and a cpa', 'dandacpa', 'd&a cpa', 'downs cpa', 'd a cpa'],
      found: "Found: D&A CPA — a Jasper accounting firm helping local businesses and families with taxes, books, and financial guidance.",
      social:
        "🧾 Tax season doesn’t have to be stressful. Let D&A CPA handle the numbers so you can run your business.\n\n" +
        "📊 Local businesses trust D&A CPA to keep the books straight and the plan clear.\n\n" +
        "💼 Questions about your finances? Reach out to D&A CPA right here in Jasper.",
      review:
        "Thank you for the honest feedback — I’m sorry your experience with our firm didn’t meet the standard we hold ourselves to. Taking great care of our clients’ numbers and peace of mind is exactly why we’re here, and it sounds like we fell short. Please reach out so we can make it right.",
      sms:
        "Thanks for reaching out to D&A CPA! We’re out of the office right now, but we’ll get right back to you. 🧾",
    },
    {
      keys: ['debbie olive', 'debbie olive cpa', 'olive cpa'],
      found: "Found: Debbie Olive, CPA — a Jasper accountant helping local businesses and families keep their finances on track.",
      social:
        "🧾 Books a mess? Taxes looming? Debbie Olive, CPA has you covered right here in Jasper.\n\n" +
        "📊 Clear numbers, honest advice, and a local you can actually reach.\n\n" +
        "💼 Let’s make your finances make sense — reach out to Debbie Olive, CPA.",
      review:
        "Thank you for sharing this — I’m sorry your experience with my practice didn’t meet the standard you should expect. Taking good care of my clients is exactly why I do this, and it sounds like I fell short. Please reach out so I can make it right.",
      sms:
        "Thanks for reaching out to Debbie Olive, CPA! I’m out of the office right now, but I’ll get right back to you. 🧾",
    },
    {
      keys: ['boys and girls club', 'boys & girls club', 'boys and girls clubs', 'boys girls club'],
      found: "Found: Boys & Girls Clubs — a non-profit giving Walker County kids a safe, positive place to learn, play, and grow.",
      social:
        "💙 Every kid deserves a champion. Your support gives Walker County youth a safe place to belong — Boys & Girls Clubs.\n\n" +
        "🏀 After-school programs, caring mentors, and big dreams — that’s what your gift builds.\n\n" +
        "🙌 Want to help? Volunteer, donate, or just spread the word about the Boys & Girls Clubs.",
      review:
        "Thank you for sharing this — I’m sorry your experience didn’t reflect the mission we work toward every day. Serving our kids and families with care is everything to us, and it sounds like we fell short. Please reach out so we can listen and make it right.",
      sms:
        "Thanks for reaching out to the Boys & Girls Clubs! Our office is closed right now, but we’ll get back to you first thing. 💙",
    },
    {
      keys: ['walker arc', 'the arc', 'walker county arc'],
      found: "Found: Walker ARC — a Jasper non-profit supporting people with intellectual and developmental disabilities and their families.",
      social:
        "💜 Everyone deserves the chance to live, work, and belong. That’s the mission at Walker ARC.\n\n" +
        "🤝 Programs, support, and advocacy for our neighbors with disabilities — right here in Walker County.\n\n" +
        "🙌 Want to make a difference close to home? Get involved with Walker ARC.",
      review:
        "Thank you for reaching out — I’m sorry your experience didn’t reflect the care we strive for every day. Supporting the people and families we serve is everything to us, and it sounds like we fell short. Please contact us directly so we can listen and make it right.",
      sms:
        "Thanks for reaching out to Walker ARC! Our office is closed right now, but we’ll get back to you first thing. 💜",
    },
    {
      keys: ['walker area community foundation', 'community foundation', 'wacf'],
      found: "Found: Walker Area Community Foundation — a local non-profit that invests in Walker County through grants and scholarships.",
      social:
        "🌱 Local giving, local impact. The Walker Area Community Foundation turns your generosity into lasting good.\n\n" +
        "🎓 From scholarships to community grants, we’re building a stronger Walker County together.\n\n" +
        "🤝 Want to leave a legacy here at home? Let’s talk — Walker Area Community Foundation.",
      review:
        "Thank you for sharing this — I’m sorry your experience didn’t reflect the care we bring to our work. Investing in Walker County and honoring every donor’s trust is everything to us, and it sounds like we fell short. Please reach out so we can make it right.",
      sms:
        "Thanks for reaching out to the Walker Area Community Foundation! Our office is closed right now, but we’ll get back to you soon. 🌱",
    },
    {
      keys: ['jasper main street', 'main street'],
      found: "Found: Jasper Main Street — the non-profit keeping historic downtown Jasper vibrant with events, small-business support, and revitalization.",
      social:
        "🏙️ Downtown Jasper is having a moment — and Jasper Main Street is helping lead the way.\n\n" +
        "🎉 Events, shopping, and small businesses worth cheering for. Come see what’s happening downtown.\n\n" +
        "🤝 Love our historic square? Support Jasper Main Street and keep it thriving.",
      review:
        "Thank you for the feedback — I’m sorry your experience didn’t reflect the heart we put into downtown. Building a vibrant, welcoming Jasper is exactly why we’re here, and it sounds like we fell short. Please reach out so we can listen and make it right.",
      sms:
        "Thanks for reaching out to Jasper Main Street! Our office is closed right now, but we’ll get back to you soon. 🏙️",
    },
    {
      keys: ['bevill state', 'bevill state community college', 'bevill', 'bscc'],
      found: "Found: Bevill State Community College — a community college serving Jasper and the region with affordable, career-focused education.",
      social:
        "🎓 Your next chapter starts close to home. Affordable, career-ready programs at Bevill State Community College.\n\n" +
        "📚 From a first degree to a fresh start, Bevill State meets you where you are.\n\n" +
        "🙌 Local, affordable, and built for real careers — that’s Bevill State.",
      review:
        "Thank you for sharing this — I’m sorry your experience didn’t live up to the standard we set for our students. Helping our community learn and grow is exactly why we’re here, and it sounds like we fell short. Please reach out so we can make it right.",
      sms:
        "Thanks for reaching out to Bevill State Community College! Our offices are closed right now, but we’ll get back to you first thing. 🎓",
    },
    {
      keys: ['southeast hospice', 'southeast hospice network', 'hospice'],
      found: "Found: Southeast Hospice Network — a non-profit providing compassionate hospice and end-of-life care to families in the Jasper area.",
      social:
        "🤍 Comfort, dignity, and care when families need it most — that’s Southeast Hospice Network.\n\n" +
        "🕊️ You’re not alone. Our team walks alongside patients and families every step of the way.\n\n" +
        "🙌 Learn how we serve — and how you can support hospice care right here at home.",
      review:
        "Thank you for reaching out — I’m so sorry your experience didn’t reflect the compassion we strive to give every family. Caring for people with dignity is everything to us, and it sounds like we fell short. Please contact us directly so we can listen and make it right.",
      sms:
        "Thanks for reaching out to Southeast Hospice Network. Our office is closed right now, but a member of our team will get back to you soon. 🤍",
    },
    {
      keys: ['sanders aviation', 'sanders'],
      found: "Found: Sanders Aviation — a local Jasper-area aviation business serving pilots and travelers in Walker County.",
      social:
        "✈️ Big skies start at a small hometown airfield — that’s Sanders Aviation.\n\n" +
        "🛩️ Services and know-how for pilots and travelers right here in Walker County.\n\n" +
        "🌤️ Whatever your reason to fly, Sanders Aviation is ready to help you take off.",
      review:
        "Thank you for the feedback — I’m sorry your experience with Sanders Aviation didn’t meet the standard we hold ourselves to. Taking great care of everyone who comes through is exactly why we’re here, and it sounds like we fell short. Please reach out so we can make it right.",
      sms:
        "Thanks for reaching out to Sanders Aviation! We’re away right now, but we’ll get right back to you. ✈️",
    },
  ];

  function norm(s) {
    return (s || '')
      .toLowerCase()
      .replace(/[’']/g, "'")
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9' ]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Match a typed name against the curated set. Exact key match, or the
  // typed name contains a key, or a key contains the typed name (for short
  // inputs like "lavish" or "319"). Guards against tiny/ambiguous inputs.
  function matchLocalBusiness(name) {
    const n = norm(name);
    if (n.length < 3) return null;
    for (const biz of BUSINESSES) {
      for (const key of biz.keys) {
        const k = norm(key);
        if (n === k) return biz;
        if (k.length >= 4 && (n.includes(k) || k.includes(n))) return biz;
      }
    }
    return null;
  }

  window.LOCAL_BUSINESSES = BUSINESSES;
  window.matchLocalBusiness = matchLocalBusiness;
})();
