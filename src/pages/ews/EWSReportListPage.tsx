import { useEffect, useState } from "react";
import { AlertTriangle, Search, Eye, Plus, ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import SummaryCard from "../../components/dashboard/SummaryCard";

import { getEWSReports } from "../../services/ews-report.service";

export default function EWSReportListPage() {
  const navigate = useNavigate();

  const [reports, setReports] = useState<any[]>([]);

  const [search, setSearch] = useState("");

  const loadData = async () => {
    try {
      const result = await getEWSReports();

      setReports(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const total = reports.length;

  const risikoTinggi = reports.filter((x) => x.risiko === "Tinggi").length;

  const risikoSedang = reports.filter((x) => x.risiko === "Sedang").length;

  const belumVerifikasi = reports.filter((x) => x.status === "Draft").length;

  const filteredData = reports.filter(
    (item) =>
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.nisn.includes(search),
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* HEADER */}

        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate("/ews-report/create")}
            className="
              px-5 py-3
              bg-blue-600
              text-white
              rounded-xl
              flex items-center gap-2
            "
          >
            <Plus size={18} />
            Buat Laporan
          </button>
        </div>

        {/* SUMMARY */}

        <div className="grid md:grid-cols-4 gap-5">
          <SummaryCard
            title="Total Laporan"
            value={total}
            icon={<AlertTriangle size={22} />}
          />

          <SummaryCard
            title="Risiko Tinggi"
            value={risikoTinggi}
            icon={<ShieldAlert size={22} />}
            color="text-red-600"
          />

          <SummaryCard
            title="Risiko Sedang"
            value={risikoSedang}
            icon={<AlertTriangle size={22} />}
            color="text-amber-600"
          />

          <SummaryCard
            title="Belum Diverifikasi"
            value={belumVerifikasi}
            icon={<AlertTriangle size={22} />}
            color="text-blue-600"
          />
        </div>

        {/* FILTER */}

        <div className="bg-white rounded-3xl border p-5">
          <div className="relative">
            <Search
              size={18}
              className="
                absolute
                left-3
                top-3.5
                text-slate-400
              "
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari Nama atau NISN"
              className="
                w-full
                border
                rounded-xl
                pl-10
                pr-4
                py-3
              "
            />
          </div>
        </div>

        {/* TABLE */}

        <div className="bg-white rounded-3xl border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="p-4 text-left">Nama</th>

                <th className="p-4 text-left">Sekolah</th>

                <th className="p-4 text-center">Kelas</th>

                <th className="p-4 text-center">Pelapor</th>

                <th className="p-4 text-center">Risiko</th>

                <th className="p-4 text-center">Status</th>

                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-4 font-medium">{item.nama}</td>

                  <td className="p-4">{item.sekolah}</td>

                  <td className="p-4 text-center">{item.kelas}</td>

                  <td className="p-4 text-center">{item.pelapor}</td>

                  <td className="p-4 text-center">
                    <span
                      className={`
                      px-3 py-1 rounded-full text-xs

                      ${
                        item.risiko === "Tinggi"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      }
                    `}
                    >
                      {item.risiko}
                    </span>
                  </td>

                  <td className="p-4 text-center">{item.status}</td>

                  <td className="p-4 text-center">
                    <button
                      onClick={() => navigate(`/ews-reports/${item.id}`)}
                      className="
                        px-3 py-2
                        bg-blue-600
                        text-white
                        rounded-xl
                        flex
                        items-center
                        gap-2
                        mx-auto
                      "
                    >
                      <Eye size={16} />
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
