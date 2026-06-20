import { villages } from "../../data/villages";

export default function VillageHeatmap() {
  const getColor = (risk: number) => {
    if (risk >= 130) {
      return "bg-red-200 text-red-800 border-red-300";
    }

    if (risk >= 80) {
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    }

    return "bg-emerald-100 text-emerald-800 border-emerald-300";
  };

  const getRiskPercentage = (highRisk: number, totalStudents: number) => {
    return ((highRisk / totalStudents) * 100).toFixed(1);
  };

  return (
    <div>
      {/* Heatmap */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {villages.map((village) => (
          <div
            key={village.id}
            className={`rounded-2xl border p-5 transition hover:scale-[1.03] hover:shadow-md cursor-pointer ${getColor(
              village.highRisk,
            )}`}
          >
            <h3 className="font-bold text-lg">{village.name}</h3>

            <p className="text-sm mt-2">
              {village.totalStudents.toLocaleString("id-ID")} siswa
            </p>

            <p className="font-semibold mt-3">
              {village.highRisk} risiko tinggi
            </p>

            <p className="text-xs mt-2 opacity-80">
              {getRiskPercentage(village.highRisk, village.totalStudents)}%
              tingkat risiko
            </p>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-6 mt-8">
        {/* Aman */}
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-lg bg-emerald-100 border border-emerald-300" />

          <div>
            <p className="font-medium text-slate-700">Rendah</p>

            <p className="text-xs text-slate-500">
              &lt; 80 siswa risiko tinggi
            </p>
          </div>
        </div>

        {/* Waspada */}
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-lg bg-yellow-100 border border-yellow-300" />

          <div>
            <p className="font-medium text-slate-700">Sedang</p>

            <p className="text-xs text-slate-500">
              80 - 129 siswa risiko tinggi
            </p>
          </div>
        </div>

        {/* Tinggi */}
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-lg bg-red-200 border border-red-300" />

          <div>
            <p className="font-medium text-slate-700">Tinggi</p>

            <p className="text-xs text-slate-500">≥ 130 siswa risiko tinggi</p>
          </div>
        </div>
      </div>
    </div>
  );
}
