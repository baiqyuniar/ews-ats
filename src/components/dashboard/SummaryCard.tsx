interface SummaryCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  color?: string;
  className?: string;
}

export default function SummaryCard({
  title,
  value,
  icon,
  color = "text-slate-700",
  className = "",
}: SummaryCardProps) {
  return (
    <div
      className={`
        bg-white
        rounded-3xl
        border
        border-slate-200
        p-5
        shadow-sm
        ${className}
      `}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h3 className={`text-3xl font-bold mt-2 ${color}`}>{value}</h3>
        </div>

        <div className={color}>{icon}</div>
      </div>
    </div>
  );
}
