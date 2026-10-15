interface Props {
  level: number;
  className?: string; // alinhamento, ex: 'justify-end'
}

export default function LevelPips({
  level,
  className = "justify-center",
}: Props) {
  return (
    <div className={`flex gap-1 ${className}`} aria-hidden="true">
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full ${i <= level ? "bg-amber-400" : "bg-slate-800"}`}
        />
      ))}
    </div>
  );
}
