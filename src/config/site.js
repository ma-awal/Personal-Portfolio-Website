// ====== SITE SETTINGS: naam, contact, social, WhatsApp. Shob ekhane ======
const isUrl = (u) => { try { return !!new URL(u); } catch { return false; } };
const envUrl = (process.env.NEXT_PUBLIC_SITE_URL || "").trim().replace(/\/+$/, "");
export const SITE_URL = isUrl(envUrl) ? envUrl : "http://localhost:3000";

export const site = {
  name: "Awal",
  fullName: "Md Abdul Awal",
  role: "Web Designer & Developer",
  email: "awal3web@gmail.com",
  phone: "+880 1812959878",
  whatsapp: "8801812959878",           // country code shoho, + ba space charao
  location: "Dhaka, Bangladesh",
  social: {
    github: "https://github.com/ma-awal",
    linkedin: "https://www.linkedin.com/in/md-awal3web",
    facebook: "",                       // link boshale footer e icon dekhabe, faka thakle hide
  },
  resume: "/resume.pdf",                // public/resume.pdf replace korle download file bodlay
  // Contact form (EmailJS). Notun account hole .env e dao, na hole ager account-i cholbe.
  emailjs: {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_nwft8ci",
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_7wtoevd",
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "Ll7D219ac6PdEGGgk",
  },
};

export const SEO = {
  title: "Awal – Web Designer & Developer | Portfolio, Landing Page & Ecommerce Websites",
  description:
    "I design and build custom portfolio websites, high-converting landing pages and ecommerce stores. Fast, mobile-first and ready to grow your business.",
  keywords: ["web designer", "web developer", "portfolio website", "landing page design", "ecommerce website", "Shopify", "WooCommerce", "Next.js", "Dhaka"],
};

// WhatsApp link (message age theke likha thake)
export const waLink = (text = "Hi Awal, I'd like to talk about a website project.") =>
  `https://wa.me/${String(site.whatsapp).replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
