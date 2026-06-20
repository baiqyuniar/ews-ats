interface Props {
  title: string;
  value: string;
  color: string;
  subtitle: string;
}

export default function StatCard({ title, value, color, subtitle }: Props) {
  return (
    <div
      className={`bg-white rounded-3xl p-6 shadow-sm border-l-4 ${color} border border-slate-200`}
    >
      <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
        {title}
      </p>

      <h3 className="text-4xl font-bold text-slate-800 mt-3">{value}</h3>

      <p className="text-sm text-slate-500 mt-3">{subtitle}</p>
    </div>
  );
}
