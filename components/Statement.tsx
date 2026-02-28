"use client";
import { useReveal } from "@/hooks/useReveal";

export default function Statement() {
  const r1 = useReveal();
  const r2 = useReveal(150);

  return (
    <section className="bg-navy py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left */}
        <div ref={r1} className="reveal">
          <p className="text-white/40 text-xs tracking-widest uppercase font-light mb-4">About sakhidev</p>
          <h2 className="font-serif font-light text-white leading-[1.15] tracking-tight mb-6"
            style={{ fontSize: "clamp(28px, 3.5vw, 44px)", letterSpacing: "-1px" }}>
            Caring Isn&apos;t Enough Anymore. It&apos;s About Opening Real Doors. And Building Through Them Together.
          </h2>
          <p className="text-white/55 text-sm sm:text-base font-light leading-relaxed mb-8">
            sakhidev isn&apos;t just a dev studio — it&apos;s a commitment to craft. Every line of code is intentional, every interface considered. We build digital products that feel effortless because we obsess over the details others skip.
          </p>
          <a href="#" className="text-link-anim text-white text-sm font-medium border-white/30">
            About us ↗
          </a>
        </div>

        {/* Right grid */}
        <div ref={r2} className="reveal grid grid-cols-2 gap-4">
          {[
            { icon: "⚡", title: "Turning Ideas Into Action", desc: "Real change happens when great ideas meet disciplined execution. We bring both." },
            { icon: "🎯", title: "Pixel-Perfect Delivery", desc: "Every detail matters. We don't ship until it's something we're proud of." },
            { icon: "🤝", title: "Long-Term Partnerships", desc: "Our relationships grow as your product grows — ongoing support, iterative improvements, and genuine care.", wide: true },
          ].map((c) => (
            <div
              key={c.title}
              className={`bg-white/5 border border-white/8 rounded-2xl p-5 sm:p-6 hover:bg-white/8 transition-colors ${c.wide ? "col-span-2" : ""}`}
            >
              <span className="text-2xl mb-4 block">{c.icon}</span>
              <h4 className="text-white text-sm font-medium mb-2">{c.title}</h4>
              <p className="text-white/45 text-xs sm:text-sm font-light leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
