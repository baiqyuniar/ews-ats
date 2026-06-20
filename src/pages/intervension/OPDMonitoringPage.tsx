import { useEffect, useState, useCallback } from "react";
import { Building2, Users, Clock3, CheckCircle } from "lucide-react";

import SummaryCard from "../../components/dashboard/SummaryCard";
import DashboardLayout from "../../layouts/DashboardLayout";

import { getOPDMonitoring } from "../../services/opd-monitoring.service";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";

export default function OPDMonitoringPage() {
  const [data, setData] = useState<any[]>([]);
  const navigate = useNavigate();
  const totalOPD = data.length;

  const totalKasus = data.reduce(
    (sum, item) => sum + Number(item.total || 0),
    0,
  );

  const totalDiproses = data.reduce(
    (sum, item) => sum + Number(item.diproses || 0),
    0,
  );

  const totalSelesai = data.reduce(
    (sum, item) => sum + Number(item.selesai || 0),
    0,
  );

  const loadData = useCallback(async () => {
    try {
      const result = await getOPDMonitoring();

      setData(result);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <SummaryCard
            title="Total OPD"
            value={totalOPD}
            icon={<Building2 size={22} />}
          />

          <SummaryCard
            title="Total Kasus"
            value={totalKasus}
            icon={<Users size={22} />}
            color="text-blue-600"
          />

          <SummaryCard
            title="Diproses"
            value={totalDiproses}
            icon={<Clock3 size={22} />}
            color="text-amber-600"
          />

          <SummaryCard
            title="Selesai"
            value={totalSelesai}
            icon={<CheckCircle size={22} />}
            color="text-green-600"
          />
        </div>

        {/* CHART + RANKING */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* CHART */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-6">
              Distribusi Kasus per OPD
            </h3>

            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="opd_tujuan" />

                  <YAxis />

                  <Tooltip />

                  <Bar dataKey="total" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* RANKING */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-6">Ranking OPD</h3>

            <div className="space-y-5">
              {[...data]
                .sort((a, b) => b.total - a.total)
                .slice(0, 5)
                .map((item, index) => (
                  <div
                    key={item.opd_tujuan}
                    className="
                    flex
                    justify-between
                    items-center
                    border-b
                    pb-4
                    last:border-0
                  "
                  >
                    <div>
                      <p className="font-semibold">
                        #{index + 1} {item.opd_tujuan}
                      </p>

                      <p className="text-sm text-slate-500">
                        {item.diproses} diproses • {item.selesai} selesai
                      </p>
                    </div>

                    <span className="text-2xl font-bold text-blue-600">
                      {item.total}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-5 border-b">
            <h3 className="font-semibold text-lg">Detail Monitoring OPD</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="p-4 text-left">OPD</th>
                  <th className="p-4 text-center">Total</th>
                  <th className="p-4 text-center">Draft</th>
                  <th className="p-4 text-center">Diajukan</th>
                  <th className="p-4 text-center">Diproses</th>
                  <th className="p-4 text-center">Progress</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item) => (
                  <tr
                    key={item.opd_tujuan}
                    className="border-t hover:bg-slate-50"
                  >
                    <td className="p-4">
                      <button
                        onClick={() =>
                          navigate(
                            `/opd-monitoring/${encodeURIComponent(
                              item.opd_tujuan,
                            )}`,
                          )
                        }
                        className="
                        text-blue-600
                        hover:text-blue-800
                        hover:underline
                        font-medium
                      "
                      >
                        {item.opd_tujuan}
                      </button>
                    </td>

                    <td className="p-4 text-center">{item.total}</td>

                    <td className="p-4 text-center">{item.draft}</td>

                    <td className="p-4 text-center">{item.diajukan}</td>

                    <td className="p-4 text-center">{item.diproses}</td>

                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-24 bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{
                              width: `${Math.round(
                                ((item.selesai || 0) / (item.total || 1)) * 100,
                              )}%`,
                            }}
                          />
                        </div>

                        <span className="text-sm font-medium">
                          {Math.round(
                            ((item.selesai || 0) / (item.total || 1)) * 100,
                          )}
                          %
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
