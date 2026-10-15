import { useEffect, useRef, useState, type ReactNode } from "react";

const tones = {
  light: "bg-white text-slate-900",
  dark: "bg-black text-white",
};

interface Props {
  id: string;
  tone: keyof typeof tones;
  wide?: boolean; // true: usa mais largura (ex: skill tree)
  children: ReactNode;
}

export default function Section({ id, tone, wide = false, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  // Entrada suave quando a secção aparece no ecrã
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      data-tone={tone}
      className={`flex min-h-[calc(100svh-4rem)] scroll-mt-16 items-center px-4 py-12 sm:px-6 sm:py-16 ${tones[tone]}`}
    >
      <div
        ref={ref}
        className={`mx-auto w-full transition duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
          wide ? "max-w-6xl" : "max-w-5xl"
        } ${shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
      >
        {children}
      </div>
    </section>
  );
}
