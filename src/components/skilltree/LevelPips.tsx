export default function LevelPips({ level, color }: { level: number; color: string }) {
  return (
    <div className="flex justify-center gap-1" aria-hidden="true">
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: i <= level ? color : '#334155' }}
        />
      ))}
    </div>
  )
}
