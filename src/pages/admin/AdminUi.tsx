import type { ReactNode } from "react";

const paths = {
  up: "M12 19V5M5 12l7-7 7 7",
  down: "M12 5v14M19 12l-7 7-7-7",
  trash: "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6",
  plus: "M12 5v14M5 12h14",
  close: "M18 6 6 18M6 6l12 12",
  image: "M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4M9 9h.01",
};

export function Icon({
  name,
  size = 16,
}: {
  name: keyof typeof paths;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}

// Bloco do formulário com título
export function Card({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 p-5 sm:p-6">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
        {title}
      </h3>
      {hint && <p className="mt-1 text-sm text-slate-500">{hint}</p>}
      <div className="mt-5 space-y-5">{children}</div>
    </section>
  );
}
