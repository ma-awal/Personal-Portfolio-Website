import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { FaGithub, FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { nav, footer } from "@/config/content";
import { site } from "@/config/site";

const SOCIALS = [
  { key: "linkedin", label: "LinkedIn", icon: FaLinkedinIn },
  { key: "github", label: "GitHub", icon: FaGithub },
  { key: "facebook", label: "Facebook", icon: FaFacebookF },
];

export default function Footer() {
  const links = nav.filter((n) => footer.explore.includes(n.id));
  const socials = SOCIALS.filter((s) => site.social[s.key]);
  const contactRows = [
    { icon: FiMail, text: site.email, href: `mailto:${site.email}` },
    {
      icon: FiPhone,
      text: site.phone,
      href: `tel:${site.phone.replace(/\s/g, "")}`,
    },
    { icon: FiMapPin, text: site.location },
  ];

  return (
    <footer className="bg-ink pt-16 text-slate-400 md:pt-20">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.3fr_0.7fr_1fr]">
          <div className="min-w-0">
            <a
              href="#home"
              className="inline-flex items-center gap-2.5"
              aria-label={`${site.name} – home`}
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl text-sm font-extrabold text-white grad-bg">
                AW
              </span>
              <span className="font-display text-xl font-bold text-white">
                {site.name}
              </span>
            </a>
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed">
              {footer.bio}
            </p>
            {socials.length > 0 && (
              <div className="mt-6 flex gap-3">
                {socials.map(({ key, label, icon: Icon }) => (
                  <a
                    key={key}
                    href={site.social[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-brand hover:bg-brand hover:text-white"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Explore
            </h4>
            <ul className="mt-5 space-y-3 text-[15px]">
              {links.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="transition hover:text-brand">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Contact
            </h4>
            <ul className="mt-5 space-y-4 text-[15px]">
              {contactRows.map(({ icon: Icon, text, href }) => (
                <li key={text} className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/5 text-brand">
                    <Icon />
                  </span>
                  {href ? (
                    <a
                      href={href}
                      className="min-w-0 truncate transition hover:text-white"
                    >
                      {text}
                    </a>
                  ) : (
                    <span>{text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 py-7 text-center text-xs tracking-wide text-slate-500 md:text-left">
          © {new Date().getFullYear()} {site.fullName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
