import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import { schoolList } from "../../data/schoolList";

export default function SchoolListPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const pageSize = 10;

  const filteredData = useMemo(() => {
    return schoolList.filter(
      (item) =>
        item.nama.toLowerCase().includes(search.toLowerCase()) ||
        item.kepanewon.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const paginatedData = filteredData.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const totalHigh = filteredData.filter(
    (s) => s.siswa > 0 && (s.berisiko / s.siswa) * 100 >= 75,
  ).length;

  const totalMedium = filteredData.filter((s) => {
    const p = s.siswa > 0 ? (s.berisiko / s.siswa) * 100 : 0;
    return p >= 50 && p < 75;
  }).length;

  const totalLow = filteredData.filter((s) => {
    const p = s.siswa > 0 ? (s.berisiko / s.siswa) * 100 : 0;
    return p < 50;
  }).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <p className="text-sm text-slate-500">Total Sekolah</p>

            <h2 className="text-3xl font-bold text-slate-800 mt-2">
              {filteredData.length}
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <p className="text-sm text-slate-500">Risiko Tinggi</p>

            <h2 className="text-3xl font-bold text-red-500 mt-2">
              {totalHigh}
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <p className="text-sm text-slate-500">Risiko Sedang</p>

            <h2 className="text-3xl font-bold text-yellow-500 mt-2">
              {totalMedium}
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <p className="text-sm text-slate-500">Risiko Rendah</p>

            <h2 className="text-3xl font-bold text-green-500 mt-2">
              {totalLow}
            </h2>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          {/* HEADER */}
          <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Daftar Satuan Pendidikan
              </h2>
            </div>

            <input
              type="text"
              placeholder="Cari sekolah atau kepanewon..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full md:w-80 px-4 py-3 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 text-slate-600 text-sm">
                  <th className="p-4 text-center">No</th>
                  <th className="p-4 text-left">NPSN</th>
                  <th className="p-4 text-left">Nama Sekolah</th>
                  <th className="p-4 text-left">Kepanewon</th>
                  <th className="p-4 text-center">Siswa</th>
                  <th className="p-4 text-center">Berisiko</th>
                  <th className="p-4 text-center">Risiko</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {paginatedData.map((school, index) => {
                  const persen =
                    school.siswa > 0
                      ? Number(
                          ((school.berisiko / school.siswa) * 100).toFixed(1),
                        )
                      : 0;

                  let status = "Rendah";

                  if (persen >= 75) status = "Tinggi";
                  else if (persen >= 50) status = "Sedang";

                  return (
                    <tr
                      key={school.id}
                      className="border-t hover:bg-blue-50 transition"
                    >
                      <td className="p-4 text-center text-slate-500">
                        {(page - 1) * pageSize + index + 1}
                      </td>

                      <td className="p-4">{school.npsn}</td>

                      <td className="p-4 font-medium text-slate-800">
                        {school.nama}
                      </td>

                      <td className="p-4">{school.kepanewon}</td>

                      <td className="p-4 text-center">{school.siswa}</td>

                      <td className="p-4 text-center">{school.berisiko}</td>

                      <td className="p-4 min-w-[180px]">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                persen >= 75
                                  ? "bg-red-500"
                                  : persen >= 50
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                              }`}
                              style={{
                                width: `${persen}%`,
                              }}
                            />
                          </div>

                          <span className="text-sm font-semibold w-12 text-right">
                            {persen}%
                          </span>
                        </div>
                      </td>

                      <td className="p-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            status === "Tinggi"
                              ? "bg-red-100 text-red-600"
                              : status === "Sedang"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                          }`}
                        >
                          {status}
                        </span>
                      </td>

                      <td className="p-4 text-center">
                        <button
                          className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
                          onClick={() => navigate(`/schools/${school.id}`)}
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* FOOTER */}
          <div className="p-5 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              Menampilkan {(page - 1) * pageSize + 1} -{" "}
              {Math.min(page * pageSize, filteredData.length)} dari{" "}
              {filteredData.length} sekolah
            </p>

            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 border rounded-xl disabled:opacity-50"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .slice(Math.max(page - 3, 0), Math.max(page - 3, 0) + 5)
                .map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-10 h-10 rounded-xl font-medium ${
                      p === page
                        ? "bg-blue-600 text-white"
                        : "border border-slate-300"
                    }`}
                  >
                    {p}
                  </button>
                ))}

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 border rounded-xl disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
