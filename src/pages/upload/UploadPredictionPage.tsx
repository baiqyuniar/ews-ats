import { useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
  Upload,
  Download,
  FileSpreadsheet,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

type PredictionResult = {
  nisn: string;
  nama: string;
  sekolah: string;
  risiko: number;
};

export default function UploadPredictionPage() {
  const [file, setFile] = useState<File | null>(null);

  const [results, setResults] = useState<PredictionResult[]>([]);

  const handlePredict = () => {
    /**
     * nanti diganti API ML
     */

    const dummy: PredictionResult[] = Array.from({ length: 25 }, (_, i) => ({
      nisn: `01234${i}`,
      nama: `Siswa ${i + 1}`,
      sekolah: `SD ${i + 1}`,
      risiko: Math.floor(Math.random() * 100),
    }));

    setResults(dummy);
  };

  const highRisk = results.filter((s) => s.risiko >= 75).length;

  const mediumRisk = results.filter(
    (s) => s.risiko >= 50 && s.risiko < 75,
  ).length;

  const lowRisk = results.filter((s) => s.risiko < 50).length;

  const chartData = [
    {
      name: "Tinggi",
      value: highRisk,
      color: "#ef4444",
    },
    {
      name: "Sedang",
      value: mediumRisk,
      color: "#f59e0b",
    },
    {
      name: "Rendah",
      value: lowRisk,
      color: "#22c55e",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* UPLOAD + SUMMARY */}

        <div className="grid gap-6">
          {/* UPLOAD */}

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Upload className="text-blue-600" />
              <h3 className="font-semibold text-lg">Upload Dataset Prediksi</h3>
            </div>

            <p className="text-slate-500 text-sm mb-5">
              Upload file Excel atau CSV untuk menjalankan prediksi risiko
              secara massal.
            </p>

            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center">
              <FileSpreadsheet size={48} className="mx-auto text-green-600" />

              <h4 className="font-semibold mt-4">
                Drag & Drop atau Pilih File
              </h4>

              <p className="text-sm text-slate-500 mt-2">
                Mendukung format .xlsx dan .csv
              </p>

              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                className="mt-5"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </div>

            {file && (
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="font-semibold">{file.name}</p>

                <p className="text-sm text-slate-500">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            )}

            <div className="flex gap-3 mt-5">
              <button className="border rounded-xl px-4 py-3 flex items-center gap-2">
                <Download size={18} />
                Download Template
              </button>

              <button
                onClick={handlePredict}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl"
              >
                Jalankan Prediksi
              </button>
            </div>
          </div>
        </div>

        {/* SUMMARY + CHART */}

        {results.length > 0 && (
          <div className="grid xl:grid-cols-5 gap-6">
            {/* Cards */}

            <div className="xl:col-span-3 grid md:grid-cols-2 xl:grid-cols-4 gap-4">
              <SummaryCard title="Total Data" value={results.length} />

              <SummaryCard
                title="Risiko Tinggi"
                value={highRisk}
                color="text-red-600"
              />

              <SummaryCard
                title="Risiko Sedang"
                value={mediumRisk}
                color="text-yellow-600"
              />

              <SummaryCard
                title="Risiko Rendah"
                value={lowRisk}
                color="text-green-600"
              />
            </div>

            {/* Chart */}

            <div className="xl:col-span-2 bg-white rounded-3xl border border-slate-200 p-6">
              <h3 className="font-semibold mb-5">Distribusi Risiko</h3>

              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={chartData} dataKey="value" outerRadius={80} label>
                    {chartData.map((item) => (
                      <Cell key={item.name} fill={item.color} />
                    ))}
                  </Pie>

                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* TABLE */}

        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
          <div className="p-5 border-b flex justify-between">
            <h3 className="font-semibold">Hasil Prediksi</h3>

            <div className="flex gap-3">
              <button className="border px-4 py-2 rounded-xl">
                Export CSV
              </button>

              <button className="border px-4 py-2 rounded-xl">
                Export Excel
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="p-4 text-left">NISN</th>

                  <th className="p-4 text-left">Nama</th>

                  <th className="p-4 text-left">Sekolah</th>

                  <th className="p-4 text-center">Risiko</th>

                  <th className="p-4 text-center">Status</th>
                </tr>
              </thead>

              <tbody>
                {results.map((student) => {
                  const status =
                    student.risiko >= 75
                      ? "Tinggi"
                      : student.risiko >= 50
                        ? "Sedang"
                        : "Rendah";

                  return (
                    <tr key={student.nisn} className="border-t">
                      <td className="p-4">{student.nisn}</td>

                      <td className="p-4">{student.nama}</td>

                      <td className="p-4">{student.sekolah}</td>

                      <td className="p-4 text-center">{student.risiko}%</td>

                      <td className="p-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            student.risiko >= 75
                              ? "bg-red-100 text-red-600"
                              : student.risiko >= 50
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-600"
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function SummaryCard({
  title,
  value,
  color = "text-slate-800",
}: {
  title: string;
  value: number;
  color?: string;
}) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>

      <h3 className={`text-4xl font-bold mt-3 ${color}`}>{value}</h3>
    </div>
  );
}
