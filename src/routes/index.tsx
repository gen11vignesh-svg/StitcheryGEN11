import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import stitcheryLogo from "@/assets/stitchery-logo.png.asset.json";

function useTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  const tick = () => {
    const el = ref.current;
    if (!el) { frame.current = null; return; }
    // Ease current toward target for buttery motion.
    current.current.x += (target.current.x - current.current.x) * 0.12;
    current.current.y += (target.current.y - current.current.y) * 0.12;
    el.style.setProperty("--tx", current.current.x.toFixed(3));
    el.style.setProperty("--ty", current.current.y.toFixed(3));
    const dx = Math.abs(target.current.x - current.current.x);
    const dy = Math.abs(target.current.y - current.current.y);
    if (dx > 0.001 || dy > 0.001) {
      frame.current = requestAnimationFrame(tick);
    } else {
      frame.current = null;
    }
  };
  const schedule = () => {
    if (frame.current == null) frame.current = requestAnimationFrame(tick);
  };
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    target.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    target.current.y = ((e.clientY - r.top) / r.height) * 2 - 1;
    schedule();
  };
  const onLeave = () => {
    target.current.x = 0;
    target.current.y = 0;
    schedule();
  };
  return { ref, onMouseMove: onMove, onMouseLeave: onLeave };
}

const IMG = {
  machine: "https://stitchery-sewing-perfection.lovable.app/__l5e/assets-v1/48f6b5ac-c372-49d7-97ef-23436a6025fe/machine.webp",
  suit: "https://stitchery-sewing-perfection.lovable.app/__l5e/assets-v1/be67c11d-0786-4a5a-b610-ce82cf65c34a/suit.jpg",
  founder: "https://stitchery-sewing-perfection.lovable.app/__l5e/assets-v1/cb88c559-a1e4-494b-94ef-0e1680bf019b/founder.jpg",
  ncc: "https://stitchery-sewing-perfection.lovable.app/__l5e/assets-v1/a5e1c7be-754b-45e0-b67e-d06fe1fb52ef/ncc.jpg",
  groups: "https://stitchery-sewing-perfection.lovable.app/__l5e/assets-v1/5d904bc1-34eb-4307-a965-7a828a79bcab/groups.jpg",
  stitching: "https://stitchery-sewing-perfection.lovable.app/__l5e/assets-v1/729739fd-2734-45e0-a8d6-0b6ec21a856e/stitching.jpg",
  threads: "https://stitchery-sewing-perfection.lovable.app/__l5e/assets-v1/8e045ae9-fa10-4410-8043-48edba2bd41c/threads.jpg",
  jersey: "https://stitchery-sewing-perfection.lovable.app/__l5e/assets-v1/b0192549-8730-4cbf-9d0e-62477fdf1ed2/jersey.jpg",
  quilt: "https://stitchery-sewing-perfection.lovable.app/__l5e/assets-v1/0c34bb0d-911c-479d-b543-905424be12f5/quilt.jpg",
};

const NAV = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  { t: "School Uniforms", d: "Durable, comfortable uniforms tailored for daily wear." },
  { t: "Corporate Uniforms", d: "Sharp professional attire that reflects your brand." },
  { t: "NCC Uniforms", d: "Regulation-compliant NCC attire with precision finish." },
  { t: "Army Uniforms", d: "Field-tested fabrics & combat-grade stitching." },
  { t: "Air Force Uniforms", d: "Crisp tailoring built to spec for service personnel." },
  { t: "Navy Uniforms", d: "Premium naval whites & service dress." },
  { t: "Police Uniforms", d: "Service-grade uniforms with authentic detailing." },
  { t: "Security Uniforms", d: "Heavy-duty workwear for security personnel." },
  { t: "Blazers", d: "Bespoke blazers with structured tailoring." },
  { t: "Sports Jerseys", d: "Custom sublimated jerseys for teams." },
  { t: "Safety Jackets", d: "High-visibility & protective workwear." },
  { t: "Rain Coats", d: "Weather-resistant outerwear built to last." },
  { t: "Custom Bags", d: "Branded bags for schools & institutions." },
  { t: "Shirting & Suiting", d: "Premium fabrics by the metre." },
  { t: "Bulk Orders", d: "Large-volume production with consistent quality." },
];

const WHY = [
  { t: "Premium Fabrics", d: "Hand-picked materials from trusted mills." },
  { t: "Precision Measurements", d: "Tailored to exact body specifications." },
  { t: "Quality Assurance", d: "Multi-stage QC on every garment." },
  { t: "Bulk Capability", d: "Scaled production without compromise." },
  { t: "On-Time Delivery", d: "Reliable timelines you can plan around." },
  { t: "Competitive Pricing", d: "Mill-direct value for institutional buyers." },
  { t: "Custom Tailoring", d: "Bespoke designs to your specification." },
  { t: "Professional Finishing", d: "Crisp seams, perfect hems, every time." },
];

const GALLERY = [
  { src: IMG.suit, alt: "White tuxedo with black trim" },
  { src: IMG.ncc, alt: "NCC cadet uniform" },
  { src: IMG.machine, alt: "Vintage tailoring machine and threads" },
  { src: IMG.groups, alt: "Institutional group uniforms" },
  { src: IMG.stitching, alt: "Stitching process close-up" },
  { src: IMG.threads, alt: "Colourful thread spools" },
  { src: IMG.jersey, alt: "Custom sports jersey" },
  { src: IMG.quilt, alt: "Handcrafted textile work" },
];

const PROCESS = [
  { n: "01", t: "Requirement Collection", d: "We listen to your specs, quantities, and timelines." },
  { n: "02", t: "Design & Measurements", d: "Accurate sizing & sample approval." },
  { n: "03", t: "Fabric Selection", d: "Choose from premium curated fabrics." },
  { n: "04", t: "Production & Stitching", d: "Precision tailoring at scale." },
  { n: "05", t: "Quality Inspection", d: "Every piece verified before dispatch." },
  { n: "06", t: "Delivery", d: "On-time, well-packed, ready to wear." },
];

const TESTIMONIALS = [
  { q: "Outstanding stitching quality and timely delivery. The team's attention to detail is remarkable.", n: "Principal", r: "Government Higher Secondary School" },
  { q: "Professional finish and excellent bulk order execution. Our staff uniforms look truly premium.", n: "HR Manager", r: "Corporate Client" },
  { q: "Reliable partner for institutional uniforms. Consistent quality across every batch we receive.", n: "Commandant", r: "NCC Unit" },
];

const FAQS = [
  { q: "What is the minimum order quantity?", a: "We accept orders from small batches to bulk production of thousands of pieces. Pricing scales with volume." },
  { q: "Do you provide custom designs and logos?", a: "Yes. We craft fully custom uniforms with embroidered or printed logos as per your brand specifications." },
  { q: "How long does production take?", a: "Standard bulk orders ship in 2–4 weeks depending on volume and complexity. Rush timelines available on request." },
  { q: "Do you ship across India?", a: "Yes, we deliver pan-India and coordinate logistics for institutional clients." },
];

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [open, setOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const heroTilt = useTilt();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 sm:px-8 lg:grid-cols-[1fr_auto_1fr]">
          <a href="#top" className="flex min-w-0 items-center gap-3" aria-label="Stitchery — Sewing Excellence">
            <img
              src={stitcheryLogo.url}
              alt="Stitchery — Uniforms & Clothing"
              className="h-14 w-auto sm:h-16 lg:h-20 shrink-0 select-none drop-shadow-[0_2px_8px_rgba(15,27,61,0.15)]"
              loading="eager"
              decoding="async"
            />
          </a>

          <nav className="hidden lg:flex items-center justify-center gap-9">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center justify-end gap-2 sm:gap-3">
            <a
              href="tel:+918300760028"
              className="hidden xl:inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/80 px-4 py-2 text-sm font-semibold text-primary shadow-soft transition hover:border-primary hover:bg-primary hover:text-primary-foreground"
              aria-label="Call +91 83007 60028"
            >
              <span aria-hidden className="text-accent">☏</span>
              <span className="tabular-nums tracking-tight">+91 83007 60028</span>
            </a>
            <a
              href="https://wa.me/918300760028"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-soft transition hover:bg-accent/90 hover:translate-y-[-1px]"
              aria-label="WhatsApp"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              WhatsApp
            </a>
            <a href="#contact" className="hidden sm:inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition hover:bg-primary/90 hover:translate-y-[-1px]">
              Quote
              <span aria-hidden>→</span>
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden grid h-10 w-10 place-items-center rounded-full border border-border text-primary hover:border-accent hover:text-accent transition"
              aria-label="Menu"
            >
              <span className="space-y-1.5">
                <span className="block h-px w-5 bg-current" />
                <span className="block h-px w-5 bg-current" />
              </span>
            </button>
          </div>
        </div>
        {open && (
          <div className="lg:hidden border-t border-border bg-background">
            <nav className="mx-auto max-w-7xl px-5 py-4 grid gap-1">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-base font-medium hover:bg-secondary">
                  {n.label}
                </a>
              ))}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <a href="tel:+918300760028" onClick={() => setOpen(false)} className="inline-flex items-center justify-center gap-2 rounded-full border border-primary bg-card px-4 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground">
                  <span aria-hidden className="text-accent">☏</span> Call
                </a>
                <a href="https://wa.me/918300760028" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground transition hover:bg-accent/90">
                  WhatsApp
                </a>
              </div>
              <a href="#contact" onClick={() => setOpen(false)} className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
                Request Quote
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.86_0.08_82/0.35),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,oklch(0.76_0.13_78/0.18),transparent_55%)]" />
        </div>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-12 pb-20 sm:pt-20 sm:pb-28 lg:pt-28 lg:pb-36">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-card/60 px-4 py-1.5 text-eyebrow text-muted-foreground backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                Sewing Excellence Since Day One
              </span>
              <h1 className="text-display mt-6">
                Precision Stitching for{" "}
                <em className="not-italic gold-text font-display italic">Every Profession</em>
              </h1>
              <p className="text-lede mt-6 max-w-xl text-muted-foreground">
                Premium uniforms and custom tailoring solutions for schools, corporates, defense services, institutions, and organizations.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-luxe transition hover:translate-y-[-1px]">
                  Get a Quote <span aria-hidden>→</span>
                </a>
                <a href="tel:+918300760028" className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-card px-6 py-3.5 text-sm font-semibold text-primary shadow-soft transition hover:border-primary hover:bg-primary hover:text-primary-foreground">
                  <span aria-hidden className="text-accent">☏</span> Contact Us
                </a>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
                {[
                  { n: "10+", l: "Years Crafting" },
                  { n: "500+", l: "Institutions" },
                  { n: "50,000+", l: "Garments" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="font-display text-3xl sm:text-4xl font-semibold gold-text">{s.n}</div>
                    <div className="mt-1 text-xs sm:text-sm text-muted-foreground">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative perspective-scene">
              {/* Floating 3D medallion behind card */}
              <div className="pointer-events-none absolute -top-8 -right-6 sm:-top-10 sm:-right-10 z-10">
                <div className="float-3d">
                  <div className="medallion grid h-28 w-28 sm:h-36 sm:w-36 place-items-center">
                    <div className="spin-y">
                      <img src={stitcheryLogo.url} alt="" className="h-16 sm:h-20 w-auto" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Orbiting gold beads — subtle, wider, slower */}
              <div className="orbit-scene pointer-events-none absolute inset-0 grid place-items-center">
                <div className="relative h-0 w-0" style={{ transformStyle: "preserve-3d" }}>
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="orbit-bead absolute rounded-full bg-gradient-to-br from-gold-soft to-gold"
                      style={{
                        width: `${6 - i}px`,
                        height: `${6 - i}px`,
                        animation: `orbit ${28 + i * 6}s linear infinite`,
                        animationDelay: `${-i * 9}s`,
                        // @ts-expect-error css var
                        "--r": `${180 + i * 46}px`,
                        boxShadow: "0 0 10px rgba(214,171,64,.45)",
                        opacity: 0.55 - i * 0.12,
                      }}
                    />
                  ))}
                </div>
              </div>


              {/* Mouse-tilt hero card */}
              <div
                ref={heroTilt.ref}
                onMouseMove={heroTilt.onMouseMove}
                onMouseLeave={heroTilt.onMouseLeave}
                className="tilt-3d relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-luxe"
              >
                <img src={IMG.suit} alt="Premium tailored suit" className="aspect-[4/5] w-full object-cover" loading="eager" />
                <div className="pointer-events-none absolute inset-0 shine-sweep mix-blend-overlay opacity-40" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent tilt-deep">
                  <span className="text-eyebrow text-gold-soft">Premium Tailoring</span>
                  <p className="mt-2 font-display text-xl sm:text-2xl text-cream">Bespoke craftsmanship, delivered.</p>
                </div>
              </div>
              <div className="absolute -left-4 sm:-left-8 bottom-10 hidden sm:block rounded-2xl border border-gold/40 bg-card/95 px-5 py-4 shadow-soft backdrop-blur z-20">
                <div className="text-eyebrow text-muted-foreground">Hand-crafted</div>
                <div className="font-display text-lg">Finish</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:items-center">
            <div className="relative">
              <div className="overflow-hidden rounded-[2rem] border border-border shadow-luxe">
                <img src={IMG.founder} alt="Hari Balaji, Proprietor of Stitchery" className="aspect-[4/5] w-full object-cover" loading="lazy" />
              </div>
              <div className="absolute -right-4 sm:-right-6 -bottom-6 rounded-2xl border border-gold/40 bg-card px-6 py-5 shadow-luxe">
                <div className="text-eyebrow text-muted-foreground">Proprietor</div>
                <div className="font-display text-xl">Hari Balaji</div>
                <div className="text-xs text-muted-foreground mt-1">Master Tailor</div>
              </div>
            </div>
            <div>
              <span className="text-eyebrow text-muted-foreground">About Stitchery</span>
              <h2 className="text-h1 mt-4 font-display">
                A trusted name in <em className="gold-text not-italic font-display italic">precision uniform tailoring.</em>
              </h2>
              <div className="gold-divider mt-6 max-w-[8rem]" />
              <p className="text-lede mt-6 text-muted-foreground">
                Stitchery is a professional uniform manufacturer dedicated to precision tailoring, premium materials, and long-term partnerships. From institutional bulk orders to bespoke corporate attire, every garment is built with the discipline of a craftsman and the rigour of a quality-first workshop.
              </p>
              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                {[
                  { t: "Quality First", d: "Multi-stage inspection." },
                  { t: "Trusted Partner", d: "500+ institutions served." },
                  { t: "Precision Fit", d: "Tailored to your spec." },
                  { t: "On-Time Delivery", d: "Reliable timelines." },
                ].map((c) => (
                  <div key={c.t} className="luxe-card rounded-2xl p-5">
                    <div className="font-display text-lg">{c.t}</div>
                    <div className="text-sm text-muted-foreground mt-1">{c.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-28">
          <SectionHead eyebrow="Our Services" title={<>Tailoring for every <em className="gold-text not-italic font-display italic">uniform need</em></>} sub="From classrooms to combat zones — uniforms built with precision." />
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <div key={s.t} className="card-3d group bg-background p-6 sm:p-8 transition hover:bg-secondary/60">
                <div className="flex items-start justify-between gap-3">
                  <span className="font-display text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  <span className="h-px w-12 bg-gold/50 mt-3 transition-all group-hover:w-20" />
                </div>
                <h3 className="text-h3 mt-4 font-display">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="border-t border-border bg-ink text-cream relative overflow-hidden">
        <div className="absolute inset-0 -z-0 opacity-30 bg-[radial-gradient(ellipse_at_top,oklch(0.76_0.13_78/0.35),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-28 relative">
          <div className="max-w-3xl">
            <span className="text-eyebrow text-gold-soft">Why Stitchery</span>
            <h2 className="text-h1 mt-4 font-display text-cream">
              Built on <em className="gold-text not-italic font-display italic">craft, trust</em> & precision
            </h2>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w, i) => (
              <div key={w.t} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur transition hover:border-gold/50 hover:bg-white/[0.06]">
                <div className="font-display text-xs text-gold-soft">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="text-h3 mt-3 font-display text-cream">{w.t}</h3>
                <p className="mt-2 text-sm text-cream/70">{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-28">
          <SectionHead eyebrow="Gallery" title={<>Crafted with <em className="gold-text not-italic font-display italic">discipline & care</em></>} sub="A glimpse of our workshop, fabrics & finished garments." />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 [grid-auto-flow:dense]">
            {GALLERY.map((g, i) => (
              <figure
                key={g.src}
                className={`group relative overflow-hidden rounded-2xl border border-border shadow-soft ${i % 5 === 0 ? "sm:col-span-2 sm:row-span-2" : ""}`}
              >
                <img src={g.src} alt={g.alt} loading="lazy" className="aspect-[4/5] w-full h-full object-cover transition duration-700 group-hover:scale-105" />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-ink/80 to-transparent text-cream text-sm font-medium opacity-0 group-hover:opacity-100 transition">
                  {g.alt}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-28">
          <SectionHead eyebrow="Our Process" title={<>From requirement to <em className="gold-text not-italic font-display italic">delivery</em></>} />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROCESS.map((p) => (
              <div key={p.n} className="luxe-card rounded-2xl p-7 relative overflow-hidden">
                <div className="font-display text-5xl sm:text-6xl gold-text leading-none">{p.n}</div>
                <h3 className="text-h3 mt-5 font-display">{p.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-28">
          <SectionHead eyebrow="Testimonials" title={<>Trusted by <em className="gold-text not-italic font-display italic">institutions</em></>} />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.n} className="luxe-card rounded-2xl p-7 flex flex-col">
                <span className="font-display text-5xl gold-text leading-none">“</span>
                <blockquote className="mt-2 font-display text-lg sm:text-xl leading-snug text-foreground">
                  {t.q}
                </blockquote>
                <figcaption className="mt-6 pt-5 border-t border-border">
                  <div className="font-medium">{t.n}</div>
                  <div className="text-sm text-muted-foreground">{t.r}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 py-20 sm:py-28">
          <SectionHead eyebrow="FAQs" title={<>Common <em className="gold-text not-italic font-display italic">questions</em></>} />
          <div className="mt-12 divide-y divide-border rounded-2xl border border-border bg-card">
            {FAQS.map((f, i) => (
              <button
                key={f.q}
                onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                className="w-full text-left p-6 sm:p-7 transition hover:bg-secondary/60"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-display text-lg sm:text-xl">{f.q}</span>
                  <span className={`shrink-0 grid h-7 w-7 place-items-center rounded-full border border-gold/50 text-gold transition ${faqOpen === i ? "rotate-45" : ""}`}>+</span>
                </div>
                {faqOpen === i && <p className="mt-3 text-muted-foreground">{f.a}</p>}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-border bg-ink text-cream relative overflow-hidden">
        <div className="absolute inset-0 -z-0 opacity-30 bg-[radial-gradient(ellipse_at_bottom_right,oklch(0.76_0.13_78/0.35),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-28 relative">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <span className="text-eyebrow text-gold-soft">Get In Touch</span>
              <h2 className="text-h1 mt-4 font-display text-cream">
                Let's tailor something <em className="gold-text not-italic font-display italic">exceptional</em>
              </h2>
              <p className="text-lede mt-6 text-cream/75 max-w-md">
                Share your requirements and we'll respond within 24 hours with a custom quote.
              </p>
              <div className="mt-10 grid gap-3 max-w-md">
                <ContactLink href="tel:+918300760028" label="Call Now" value="+91 83007 60028" icon="☏" />
                <ContactLink href="mailto:stitcheryclothings@gmail.com" label="Email Us" value="stitcheryclothings@gmail.com" icon="✉" />
                <ContactLink href="https://wa.me/918300760028" label="WhatsApp" value="Chat instantly" icon="◉" />
              </div>
              <div className="mt-10 flex items-center gap-4 pt-8 border-t border-white/10">
                <img src={IMG.founder} alt="Hari Balaji" className="h-14 w-14 rounded-full object-cover border border-gold/40" />
                <div>
                  <div className="text-eyebrow text-gold-soft">Proprietor</div>
                  <div className="font-display text-lg text-cream">Hari Balaji</div>
                </div>
              </div>
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); alert("Thank you — we'll be in touch within 24 hours."); }}
              className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur p-7 sm:p-9 shadow-luxe"
            >
              <h3 className="font-display text-h2 text-cream">Request a Quote</h3>
              <div className="gold-divider mt-4 max-w-[5rem]" />
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <Field label="Full Name *" name="name" required />
                <Field label="Phone *" name="phone" type="tel" required />
                <Field label="Email *" name="email" type="email" required />
                <Field label="Company / Institution" name="company" />
                <div className="sm:col-span-2">
                  <Field label="Requirement (e.g. School Uniforms, 200 pcs) *" name="req" required />
                </div>
                <div className="sm:col-span-2">
                  <Field label="Message" name="message" textarea />
                </div>
              </div>
              <button
                type="submit"
                className="mt-7 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-soft to-gold px-7 py-3.5 text-sm font-medium text-ink shadow-luxe transition hover:translate-y-[-1px]"
              >
                Send Inquiry <span aria-hidden>→</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-ink text-cream/70 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-10 grid gap-6 sm:grid-cols-[1fr_auto] items-center">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-cream/95 p-3 shadow-soft">
              <img src={stitcheryLogo.url} alt="Stitchery" className="h-12 w-auto" loading="lazy" />
            </div>
            <div>
              <div className="font-display text-cream text-lg">Sewing Excellence</div>
              <div className="text-xs">© {new Date().getFullYear()} Stitchery · All rights reserved.</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="https://wa.me/918300760028" className="rounded-full border border-accent/60 bg-accent px-4 py-2 text-sm font-semibold text-ink transition hover:bg-accent/90">WhatsApp</a>
            <a href="tel:+918300760028" className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold transition hover:border-gold hover:text-cream hover:bg-white/5">Call</a>
            <a href="mailto:stitcheryclothings@gmail.com" className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold transition hover:border-gold hover:text-cream hover:bg-white/5">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub?: string }) {
  return (
    <div className="max-w-3xl">
      <span className="text-eyebrow text-muted-foreground">{eyebrow}</span>
      <h2 className="text-h1 mt-4 font-display">{title}</h2>
      <div className="gold-divider mt-5 max-w-[6rem]" />
      {sub && <p className="text-lede mt-5 text-muted-foreground">{sub}</p>}
    </div>
  );
}

function ContactLink({ href, label, value, icon }: { href: string; label: string; value: string; icon: string }) {
  return (
    <a href={href} className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-gold/50 hover:bg-white/[0.06]">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold-soft to-gold text-ink text-lg">{icon}</span>
      <span className="min-w-0">
        <span className="block text-eyebrow text-gold-soft">{label}</span>
        <span className="block truncate font-medium text-cream">{value}</span>
      </span>
    </a>
  );
}

function Field({ label, name, type = "text", required, textarea }: { label: string; name: string; type?: string; required?: boolean; textarea?: boolean }) {
  const cls = "mt-2 w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-cream placeholder:text-cream/40 outline-none transition focus:border-gold focus:bg-white/[0.08]";
  return (
    <label className="block">
      <span className="text-xs font-medium tracking-wide text-cream/70">{label}</span>
      {textarea ? (
        <textarea name={name} required={required} rows={4} className={cls} />
      ) : (
        <input name={name} type={type} required={required} className={cls} />
      )}
    </label>
  );
}
