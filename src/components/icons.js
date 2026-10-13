// content.js e icon naam diye icon ber kora hoy. Notun icon lagle ekhane ekta line add korun.
import { FiUser, FiLayout, FiShoppingBag, FiTarget, FiPenTool, FiCode, FiSend, FiZap, FiStar } from "react-icons/fi";
import { FaHtml5, FaCss3Alt, FaReact, FaGitAlt } from "react-icons/fa";
import { SiJavascript, SiTailwindcss } from "react-icons/si";

export const ICONS = {
  user: FiUser, layout: FiLayout, bag: FiShoppingBag, target: FiTarget, pen: FiPenTool, code: FiCode, send: FiSend, zap: FiZap, star: FiStar,
  html: FaHtml5, css: FaCss3Alt, js: SiJavascript, react: FaReact, tailwind: SiTailwindcss, git: FaGitAlt,
};
export const iconFor = (name) => ICONS[name] || FiStar;
