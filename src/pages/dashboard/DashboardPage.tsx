import DashboardLayout from "../../layouts/DashboardLayout";

import StatCard from "../../components/dashboard/StatCard";
import RiskChart from "../../components/dashboard/RiskChart";
import VillageHeatmap from "../../components/dashboard/VillageHeatmap";
import TopSchoolsChart from "../../components/dashboard/TopSchoolsChart";

import { dashboardStats } from "../../data/dashboard";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* KPI */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard
            title="Total Siswa"
            value={dashboardStats.totalStudents.toLocaleString("id-ID")}
            color="border-blue-500"
            subtitle="Data siswa terdaftar"
          />

          <StatCard
            title="Risiko Rendah"
            value={dashboardStats.lowRisk.toLocaleString("id-ID")}
            color="border-emerald-500"
            subtitle="Kategori aman"
          />

          <StatCard
            title="Risiko Sedang"
            value={dashboardStats.mediumRisk.toLocaleString("id-ID")}
            color="border-yellow-500"
            subtitle="Perlu monitoring"
          />

          <StatCard
            title="Risiko Tinggi"
            value={dashboardStats.highRisk.toLocaleString("id-ID")}
            color="border-red-500"
            subtitle="Perlu tindak lanjut"
          />
        </div>

        {/* Analytics */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Heatmap */}
          <div className="xl:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-800">
                Peta Risiko Kapanewon
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Persebaran risiko anak tidak sekolah
              </p>
            </div>

            <VillageHeatmap />
          </div>

          {/* Donut */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-800">
                Distribusi Risiko
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Persentase kategori risiko
              </p>
            </div>

            <RiskChart />
          </div>
        </div>

        {/* Bottom */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Top Schools */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-800">
                Sekolah Risiko Tinggi
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Ranking sekolah dengan risiko tertinggi
              </p>
            </div>

            <TopSchoolsChart />
          </div>

          {/* Table */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  Peringatan Risiko Tinggi
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Prioritas tindak lanjut
                </p>
              </div>

              <button className="text-blue-600 font-medium">Lihat Semua</button>
            </div>

            <div className="space-y-4">
              {[
                {
                  name: "Siti Rahma",
                  school: "SMPN 2 Depok",
                  risk: 81,
                },
                {
                  name: "Dewi Lestari",
                  school: "SMPN 3 Ngaglik",
                  risk: 76,
                },
                {
                  name: "Budi Santoso",
                  school: "SMPN 1 Mlati",
                  risk: 72,
                },
              ].map((student) => (
                <div
                  key={student.name}
                  className="flex items-center justify-between p-4 rounded-2xl bg-slate-50"
                >
                  <div>
                    <h4 className="font-semibold text-slate-800">
                      {student.name}
                    </h4>

                    <p className="text-sm text-slate-500">{student.school}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-red-500">
                      {student.risk}%
                    </p>

                    <span className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full">
                      Tinggi
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
