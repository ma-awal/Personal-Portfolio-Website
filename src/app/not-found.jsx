export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-ink px-5 text-center text-white">
      <div>
        <strong className="grad-text block font-display text-8xl font-extrabold">404</strong>
        <h1 className="mt-3 font-display text-2xl font-bold">Page not found</h1>
        <p className="mt-2 text-slate-400">The page you are looking for does not exist.</p>
        <a href="/" className="btn-primary mt-8">Back to home</a>
      </div>
    </main>
  );
}
