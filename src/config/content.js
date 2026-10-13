// ====== SITE ER SHOB LEKHA EKHANE ======
// icon naam gulo components/icons.js e ache. Rong: globals.css er @theme.

export const nav = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export const hero = {
  badge: "Web Designer & Developer",
  titleStart: "I design & build websites that",
  titleHighlight: "turn visitors into clients.",
  subtitle:
    "Portfolio websites, landing pages and ecommerce stores. Custom designed, fast, mobile-first and built to grow with your business.",
  points: ["Portfolio Websites", "Landing Pages", "Ecommerce Stores"],
  primaryCta: "View My Work",
  whatsappCta: "Chat on WhatsApp",
  whatsappText: "Hi Awal, I saw your portfolio and I'd like to talk about a website project.",
  floating: [
    { icon: "user", label: "Portfolio" },
    { icon: "layout", label: "Landing Page" },
    { icon: "bag", label: "Ecommerce" },
  ],
};

export const services = {
  eyebrow: "What I do",
  title: "Websites for",
  highlight: "every goal",
  subtitle: "Three focused services, each designed and built from scratch around your brand.",
  items: [
    {
      icon: "user",
      title: "Portfolio Websites",
      text: "A polished online home for creatives, freelancers and personal brands.",
      points: ["Custom design that fits your personality", "Fast, mobile-first layout", "SEO-ready and easy to update"],
      cta: "Start a portfolio",
      whatsappText: "Hi Awal, I'd like a portfolio website. Can we talk?",
    },
    {
      icon: "layout",
      title: "Landing Pages",
      text: "Focused pages that explain your offer clearly and make people take action.",
      points: ["Conversion-focused structure", "Lead form, call and WhatsApp buttons", "Quick turnaround, speed-optimized"],
      cta: "Start a landing page",
      whatsappText: "Hi Awal, I need a landing page for my business. Can we talk?",
    },
    {
      icon: "bag",
      title: "Ecommerce Stores",
      text: "Online stores that are easy to manage and built to sell.",
      points: ["Custom product and checkout experience", "Mobile-first, fast and SEO-ready", "Built on the platform that fits you:"],
      platforms: ["Shopify", "WooCommerce", "Headless Next.js"],
      cta: "Start a store",
      whatsappText: "Hi Awal, I want to launch an online store. Can we talk?",
    },
  ],
  note: "Not sure which one fits your project?",
  noteCta: "Message me, we'll figure it out together",
  noteText: "Hi Awal, I'm not sure which website I need. Can you help me decide?",
};

export const work = {
  eyebrow: "Selected work",
  title: "Websites I've",
  highlight: "built for clients",
  subtitle: "A few live projects. Open any of them to see the real thing.",
  perPage: 6,
  empty: "New projects are being added. Message me to see more of my work.",
};

export const howItWorks = {
  eyebrow: "How I work",
  title: "A simple process,",
  highlight: "no surprises",
  steps: [
    { icon: "target", title: "Discover", text: "We talk about your goals, your audience and what the website needs to achieve." },
    { icon: "pen", title: "Design", text: "I create a clean, on-brand layout and refine it with you before any code is written." },
    { icon: "code", title: "Develop", text: "A responsive, fast build with clean code, tested on real devices." },
    { icon: "send", title: "Launch", text: "Go-live, final checks and support so your site keeps working for you." },
  ],
};

export const about = {
  eyebrow: "About me",
  title: "Design-led",
  highlight: "development",
  story: [
    "I'm Awal, a web designer and developer based in Dhaka. I help businesses, creators and professionals get a website that looks great, loads fast and works on every device.",
    "I've worked on client projects across portfolio websites, landing pages and ecommerce stores, so I know what each type of site needs to actually deliver results, not just look good.",
    "My approach is simple: understand the goal, design with care, build it clean and deliver on time.",
  ],
  resumeLabel: "Download Resume",
  cards: [
    { icon: "pen", title: "Design-first", text: "Every layout is designed around your brand and your audience." },
    { icon: "code", title: "Clean, responsive code", text: "Mobile-first builds that look right and run well on every screen." },
    { icon: "zap", title: "Built to perform", text: "Fast loading, SEO-ready structure and clear calls to action." },
  ],
  experienceTitle: "Experience",
  experience: [
    { role: "Freelance Web Designer & Developer", place: "Independent", time: "Present", text: "Designing and building portfolio websites, landing pages and ecommerce stores for clients." },
    { role: "Web Developer", place: "Softvence Agency", time: "Apr 2025 – Aug 2026", text: "Delivered client websites including landing pages, portfolio sites and ecommerce stores." },
  ],
};

export const skills = {
  eyebrow: "Skills",
  title: "Core",
  highlight: "skills",
  subtitle: "The tools I use every day to design and build fast, reliable websites.",
  items: [
    { icon: "html", title: "HTML5", text: "Semantic, accessible markup." },
    { icon: "css", title: "CSS3", text: "Responsive layouts and polished UI." },
    { icon: "js", title: "JavaScript", text: "Interactive, modern ES6+ code." },
    { icon: "react", title: "React", text: "Component-based web apps." },
    { icon: "tailwind", title: "Tailwind CSS", text: "Fast, consistent styling." },
    { icon: "git", title: "Git & GitHub", text: "Clean version control." },
  ],
  platformsLabel: "Ecommerce platforms",
  platforms: ["Shopify", "WooCommerce", "Headless Next.js"],
};

export const testimonials = {
  eyebrow: "Testimonials",
  title: "Kind words from",
  highlight: "clients",
  items: [
    { name: "aurthurma", quote: "Super rapid, super precise!" },
    { name: "kelsie_akiha", quote: "Always so great to work with." },
    { name: "felixschmidt617", quote: "The design, the structure, the responsiveness - everything was top-notch. I am truly happy with the final result." },
    { name: "vaheol", quote: "Working with Awal was a breath of fresh air! His professionalism in website development, impeccable code expertise, and bug-free delivery were outstanding. Politeness and swift communication made collaboration a breeze. I can not wait to hire him again!" },
    { name: "gunnarstelnn", quote: "Exceptional work! Every aspect of the website was crafted with precision and care. The attention to detail and understanding of my requirements were outstanding. A seamless and professional experience - highly recommended!" },
  ],
};

export const contact = {
  eyebrow: "Contact",
  title: "Let's build",
  highlight: "your website",
  subtitle: "Tell me about your project. I'll get back to you as soon as possible.",
  whatsappText: "Hi Awal, I'd like to talk about my website project.",
  serviceOptions: ["Portfolio Website", "Landing Page", "Ecommerce Store", "Something else"],
  success: "Thanks! Your message has been sent. I'll reply soon.",
  error: "Message could not be sent. Please try WhatsApp or email directly.",
};

export const footer = {
  bio: "Web designer & developer building portfolio websites, landing pages and ecommerce stores.",
  explore: ["services", "work", "about", "skills"],
};
