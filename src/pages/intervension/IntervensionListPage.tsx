import { useEffect, useState } from "react";
import {
  Eye,
  ClipboardList,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import { getAllInterventions } from "../../services/intervention.service";

export default function InterventionListPage() {
  const navigate = useNavigate();

  const [interventions, setInterventions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getAllInterventions();
      setInterventions(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const countByStatus = (status: string) =>
    interventions.filter((i) => i.status === status).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* HEADER SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 border">
            <div className="flex items-center gap-3">
              <ClipboardList className="text-slate-500" />
              <div>
                <p className="text-sm text-slate-500">Total Kasus</p>
                <p className="text-xl font-bold">{interventions.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border">
            <div className="flex items-center gap-3">
              <AlertTriangle className="text-red-500" />
              <div>
                <p className="text-sm text-slate-500">Perlu Perhatian</p>
                <p className="text-xl font-bold">{countByStatus("Tinggi")}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-500" />
              <div>
                <p className="text-sm text-slate-500">Selesai / Aman</p>
                <p className="text-xl font-bold">{countByStatus("Rendah")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-3xl border overflow-hidden">
          <div className="p-5 border-b">
            <h3 className="font-semibold">Daftar Intervensi</h3>
            <p className="text-sm text-slate-500">
              Monitoring tindak lanjut siswa berisiko
            </p>
          </div>

          {loading ? (
            <div className="p-12 text-center text-slate-500 animate-pulse">
              Memuat data intervensi...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-left">
                    <th className="p-4">Nama</th>
                    <th className="p-4">Faktor ATS</th>
                    <th className="p-4">OPD</th>
                    <th className="p-4">Jenis Intervensi</th>
                    <th className="p-4 text-center">Status</th>
                    <th className="p-4 text-center">Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {interventions.map((item) => {
                    const statusColor =
                      item.status === "Selesai"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Proses"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700";

                    return (
                      <tr
                        key={item.id}
                        className="border-t hover:bg-slate-50 transition"
                      >
                        <td className="p-4 font-medium">{item.nama}</td>
                        <td className="p-4 text-slate-600">
                          {item.faktor_penyebab}
                        </td>
                        <td className="p-4">{item.opd_tujuan}</td>
                        <td className="p-4">{item.jenis_intervensi}</td>

                        <td className="p-4 text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}
                          >
                            {item.status}
                          </span>
                        </td>

                        <td className="p-4 text-center">
                          <button
                            onClick={() =>
                              navigate(`/interventions/${item.id}`)
                            }
                            className="
                              px-3 py-2
                              bg-blue-600
                              text-white
                              rounded-xl
                              flex
                              items-center
                              gap-2
                              mx-auto
                              hover:bg-blue-700
                              transition
                            "
                          >
                            <Eye size={16} />
                            Detail
                          </button>
                        </td>
                      </tr>
                    );
                  })}

                  {interventions.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-16">
                        <ClipboardList
                          className="mx-auto mb-3 text-slate-300"
                          size={48}
                        />
                        <p className="text-slate-500">
                          Belum ada data intervensi
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
