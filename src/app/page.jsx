import { SITE_URL, SEO, site } from "@/config/site";
import { services } from "@/config/content";
import { fetchProjectsServer } from "@/lib/projects";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Process from "@/components/Process";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";

// Static page + projects server-e fetch; 60s por por nijei fresh hoy. Admin save korle sathe sathe fresh hoy (api/revalidate).
export const revalidate = 60;

// Google er jonno structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: `${site.name} – ${site.role}`,
  url: SITE_URL,
  image: `${SITE_URL}/og.png`,
  description: SEO.description,
  email: site.email,
  telephone: site.phone,
  address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
  founder: { "@type": "Person", name: site.fullName, jobTitle: site.role, sameAs: Object.values(site.social).filter(Boolean) },
  makesOffer: services.items.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, description: s.text } })),
};

export default async function Home() {
  const projects = await fetchProjectsServer();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Work initialProjects={projects} />
        <Process />
        <About />
        <Skills />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
