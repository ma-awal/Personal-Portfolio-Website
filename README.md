# Awal – Web Designer & Developer Portfolio

Next.js 15 (App Router) + Tailwind CSS 4. Projects Firebase Firestore theke ashe, admin panel diye manage hoy.

## Chalano
    npm install
    npm run dev                  # http://localhost:3000
    npm run build && npm start   # production

> Fonts (Google Fonts) build-er shomoy download hoy, tai internet lage.
> Prothom bar `npm install` e `package-lock.json` toiri hobe, ota commit kore rekho.

## Kon file e ki edit korbe
| Ki | Kothay |
|---|---|
| Hero, Services, Process, About, Skills, Experience, Testimonials, Contact er shob lekha | `src/config/content.js` |
| Naam, email, phone, **WhatsApp number**, location, GitHub/LinkedIn/Facebook link, resume path, SEO title/description | `src/config/site.js` |
| Rong (orange/pink gradient, dark navy) | `src/app/globals.css` (upore `@theme`) |
| Profile photo | `public/images/profile.webp` replace koro (square, 500px+) |
| Resume PDF | `public/resume.pdf` replace koro |
| Share image (WhatsApp/Facebook preview) | `public/og.png` (1200x630) |
| Section order | `src/app/page.jsx` |

`social.facebook` faka thakle footer e icon dekhay na. Icon naam gulo `src/components/icons.js` e.

## Admin panel
- Login: `https://your-domain.com/login` (public site e kono admin link nai)
- **Add / Edit project** e shudhu 5 ta field: Project name, Category (Portfolio / Ecommerce / Landing Page), Live link, Thumbnail link (optional), Order (optional).
- Description, tech stack, GitHub, store password: nai. Purono project edit kore Save dile oi purono field gulo Firestore theke auto muche jay.
- Order faka rakhle project sobar sheshe jay. Save korle public site tatkhonai update hoy (nahole max 60 second).
- Ager `Shopify` category auto **Ecommerce** dekhay. `React`/`Webflow` category-r project "All" e dekhay ar dashboard e warning ashe, edit kore notun category dao.

## Firebase Rules (gurutto-purno)
1. Firebase Console > Firestore Database > Rules e `firestore.rules` file er content paste koro, `ADMIN_EMAIL` er jaygay tomar admin email dao, Publish.
2. Firebase Console > Authentication > Settings > User actions e **sign-up disable** koro.
Eta na korle jekeu account khule project edit korte pare.

## Deploy (Vercel)
1. GitHub e push, Vercel e Import.
2. Environment Variables: `NEXT_PUBLIC_SITE_URL=https://your-domain.com` (ar optional `ADMIN_EMAIL`).
3. Deploy. (`.env.example` dekho.)

Firebase / EmailJS ager account-i default hishebe ache, notun hole `.env.example` er variable gulo dao.

## SEO (auto)
Title/description, Open Graph, canonical, `sitemap.xml`, `robots.txt` (admin/login hide), favicon, ar Google structured data. `NEXT_PUBLIC_SITE_URL` set korte bhulo na.
