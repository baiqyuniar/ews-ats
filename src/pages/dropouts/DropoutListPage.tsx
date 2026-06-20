import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Upload,
  Download,
  RefreshCcw,
  Search,
  Users,
  School,
  AlertTriangle,
  Activity,
  Eye,
} from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
  getDropouts,
  getDropoutStats,
  uploadDropoutExcel,
} from "../../services/dropout.service";

export default function DropoutListPage() {
  const [students, setStudents] = useState<any[]>([]);

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: 0,
    belumIntervensi: 0,
    dalamIntervensi: 0,
    kembaliSekolah: 0,
  });

  const [search, setSearch] = useState("");

  const [kecamatanFilter, setKecamatanFilter] = useState("all");

  const [statusFilter, setStatusFilter] = useState("all");

  const [uploading, setUploading] = useState(false);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [totalData, setTotalData] = useState(0);

  const [pageSize, setPageSize] = useState(20);

  const getVisiblePages = () => {
    const pages = [];

    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  useEffect(() => {
    loadData();
  }, [page, search, kecamatanFilter, statusFilter]);

  const loadData = async () => {
    try {
      const list = await getDropouts({
        page,
        limit: pageSize,
        search,
        kecamatan: kecamatanFilter === "all" ? "" : kecamatanFilter,
        status: statusFilter === "all" ? "" : statusFilter,
      });

      const statistic = await getDropoutStats();

      setStudents(list.data || []);

      setStats(statistic);

      setTotalPages(list.pagination?.totalPages || 1);

      setTotalData(list.pagination?.total || 0);

      console.log(list);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("file", file);

      const result = await uploadDropoutExcel(formData);

      alert(result.message);

      await loadData();
    } catch (error) {
      console.error(error);

      alert("Upload gagal");
    } finally {
      setUploading(false);
    }
  };

  const kecamatanOptions = [
    ...new Set(students.map((s) => s.kecamatan).filter(Boolean)),
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* SUMMARY */}

        <div className="grid md:grid-cols-4 gap-5">
          <SummaryCard
            title="Total ATS"
            value={stats.total}
            icon={<Users size={22} />}
          />

          <SummaryCard
            title="Belum Intervensi"
            value={stats.belumIntervensi}
            icon={<AlertTriangle size={22} />}
            color="text-orange-600"
          />

          <SummaryCard
            title="Dalam Intervensi"
            value={stats.dalamIntervensi}
            icon={<Activity size={22} />}
            color="text-blue-600"
          />

          <SummaryCard
            title="Kembali Sekolah"
            value={stats.kembaliSekolah}
            icon={<School size={22} />}
            color="text-green-600"
          />
        </div>

        {/* TOOLBAR */}

        <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm">
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-3 border rounded-xl flex items-center gap-2 hover:bg-slate-50">
              <Download size={18} />
              Download Template
            </button>

            <label className="px-4 py-3 bg-blue-600 text-white rounded-xl flex items-center gap-2 cursor-pointer hover:bg-blue-700">
              <Upload size={18} />

              {uploading ? "Uploading..." : "Upload Excel"}

              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                hidden
                onChange={handleUpload}
              />
            </label>

            <button
              onClick={loadData}
              className="px-4 py-3 border rounded-xl flex items-center gap-2 hover:bg-slate-50"
            >
              <RefreshCcw size={18} />
              Refresh
            </button>
          </div>
        </div>

        {/* FILTER */}

        <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-3.5 text-slate-400"
              />

              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Cari NISN atau Nama"
                className="w-full border rounded-xl pl-10 pr-4 py-3"
              />
            </div>

            <select
              value={kecamatanFilter}
              onChange={(e) => {
                setKecamatanFilter(e.target.value);
                setPage(1);
              }}
              className="border rounded-xl px-4 py-3"
            >
              <option value="all">Semua Kecamatan</option>

              {kecamatanOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="border rounded-xl px-4 py-3"
            >
              <option value="all">Semua Status</option>

              <option value="Belum Diverifikasi">Belum Diverifikasi</option>

              <option value="Sudah Diverifikasi">Sudah Diverifikasi</option>
            </select>
          </div>
        </div>

        {/* TABLE */}

        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-5 border-b flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-lg">Data ATS</h3>

              <p className="text-sm text-slate-500">
                Total {totalData.toLocaleString()} siswa
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 text-sm">
                  <th className="p-4 text-left">NISN</th>
                  <th className="p-4 text-left">Nama</th>
                  <th className="p-4 text-center">JK</th>
                  <th className="p-4 text-left">Sekolah Asal</th>
                  <th className="p-4 text-left">Tingkat Pendidikan</th>
                  <th className="p-4 text-left">Kecamatan</th>
                  <th className="p-4 text-left">Alasan DO</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="p-10 text-center text-slate-500">
                      Tidak ada data ditemukan
                    </td>
                  </tr>
                ) : (
                  students.map((student) => (
                    <tr key={student.id} className="border-t hover:bg-slate-50">
                      <td className="p-4">{student.nisn}</td>

                      <td className="p-4 font-medium">{student.nama}</td>

                      <td className="p-4 text-center">
                        {student.jenis_kelamin}
                      </td>

                      <td className="p-4">{student.nama_sekolah}</td>

                      <td className="p-4">{student.tingkat_pendidikan}</td>

                      <td className="p-4">{student.kecamatan}</td>

                      <td className="p-4">{student.keterangan}</td>

                      <td className="p-4 text-center">
                        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">
                          {student.status}
                        </span>
                      </td>

                      <td className="p-4 text-center">
                        <button
                          onClick={() => navigate(`/dropouts/${student.id}`)}
                          className="
    px-3 py-2
    bg-blue-600
    text-white
    rounded-xl
    text-sm
    flex items-center gap-2 mx-auto
  "
                        >
                          <Eye size={16} />
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div className="p-5 border-t flex justify-between items-center flex-wrap gap-4">
              <div>
                <p className="text-sm text-slate-500">
                  Total Data ATS:
                  <span className="font-semibold ml-1">
                    {totalData.toLocaleString()}
                  </span>
                </p>

                <p className="text-sm text-slate-500">
                  Halaman {page} dari {totalPages}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">Tampilkan</span>

                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setPage(1);
                  }}
                  className="border rounded-xl px-3 py-2"
                >
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>

                <span className="text-sm text-slate-500">data</span>
              </div>

              <div className="flex items-center gap-2">
                {/* First */}
                <button
                  disabled={page === 1}
                  onClick={() => setPage(1)}
                  className="
        px-3 py-2
        border
        rounded-xl
        disabled:opacity-50
      "
                >
                  «
                </button>

                {/* Prev */}
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="
        px-3 py-2
        border
        rounded-xl
        disabled:opacity-50
      "
                >
                  ‹
                </button>

                {/* Page Numbers */}
                {getVisiblePages().map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`
          px-4 py-2 rounded-xl border
          ${
            p === page
              ? "bg-blue-600 text-white border-blue-600"
              : "hover:bg-slate-50"
          }
        `}
                  >
                    {p}
                  </button>
                ))}

                {/* Next */}
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="
        px-3 py-2
        border
        rounded-xl
        disabled:opacity-50
      "
                >
                  ›
                </button>

                {/* Last */}
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(totalPages)}
                  className="
        px-3 py-2
        border
        rounded-xl
        disabled:opacity-50
      "
                >
                  »
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function SummaryCard({
  title,
  value,
  icon,
  color = "text-slate-800",
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color?: string;
}) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h3 className={`text-3xl font-bold mt-2 ${color}`}>{value}</h3>
        </div>

        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
          {icon}
        </div>
      </div>
    </div>
  );
}
