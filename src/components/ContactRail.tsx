import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import ContactLinks from "./ContactLinks";

const segment = "relative w-px flex-1 bg-slate-400/40";
const fill = "absolute top-0 h-0 w-full bg-amber-500";

export default function ContactRail() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const topFill = useRef<HTMLDivElement>(null);
  const bottomFill = useRef<HTMLDivElement>(null);
  const [onDark, setOnDark] = useState(false);
  const hidden = pathname.startsWith("/admin") || pathname.startsWith("/login");

  // Enquanto a barra está ativa, o CSS esconde a barra de scroll do browser
  useEffect(() => {
    if (hidden) return;
    document.documentElement.classList.add("rail-active");
    return () => document.documentElement.classList.remove("rail-active");
  }, [hidden]);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;

      // Progresso do scroll (0 a 1): enche a metade de cima e depois a de baixo
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (topFill.current)
        topFill.current.style.height = `${Math.min(1, progress * 2) * 100}%`;
      if (bottomFill.current) {
        bottomFill.current.style.height = `${Math.max(0, progress * 2 - 1) * 100}%`;
      }

      // Cor dos ícones: depende do fundo que está por baixo deles (meio do ecrã)
      const probe = window.innerHeight / 2;
      const dark = Array.from(
        document.querySelectorAll<HTMLElement>("[data-tone]"),
      ).some((el) => {
        const r = el.getBoundingClientRect();
        return (
          el.dataset.tone === "dark" && r.top <= probe && r.bottom >= probe
        );
      });
      setOnDark(dark);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // A página pode crescer depois de carregar (projetos): reavalia
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
    };
  }, [pathname]);

  if (hidden) return null;

  return (
    <aside
      aria-label={t("footer.title")}
      className="pointer-events-none fixed top-16 right-4 bottom-16 z-40 hidden w-10 flex-col items-center py-6 xl:flex"
    >
      <div className={segment} aria-hidden="true">
        <div ref={topFill} className={fill} />
      </div>

      <ContactLinks
        className="pointer-events-auto my-4 flex flex-col items-center gap-1"
        linkClassName={`rounded p-2 transition hover:text-amber-500 ${
          onDark ? "text-white" : "text-slate-900"
        }`}
      />

      <div className={segment} aria-hidden="true">
        <div ref={bottomFill} className={fill} />
      </div>
    </aside>
  );
}
