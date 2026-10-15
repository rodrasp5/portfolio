import type { ReactNode } from "react";

interface Props {
  index: string; // '01', '02'...
  tone?: "light" | "dark";
  children: ReactNode;
}

export default function SectionHeading({
  index,
  tone = "light",
  children,
}: Props) {
  return (
    <h2 className="font-display flex items-baseline gap-3 text-3xl font-bold tracking-tight">
      <span
        className={`text-lg font-medium ${tone === "dark" ? "text-amber-400" : "text-amber-600"}`}
      >
        {index}
      </span>
      {children}
    </h2>
  );
}
