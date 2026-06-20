import { useMemo, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";

import { schoolList } from "../../data/schoolList";
import { schoolDetails } from "../../data/schoolDetail";

import { Users, AlertTriangle, ShieldCheck, Search, Eye } from "lucide-react";

export default function StudentListPage() {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [schoolFilter, setSchoolFilter] = useState("all");

  const [kelasFilter, setKelasFilter] = useState("all");

  const [riskFilter, setRiskFilter] = useState("all");

  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);

  const pageSize = 10;

  const allStudents = useMemo(() => {
    return schoolDetails.flatMap((school) => {
      const schoolInfo = schoolList.find((s) => s.id === school.schoolId);

      return school.students.map((student) => ({
        ...student,
        schoolId: school.schoolId,
        schoolName: schoolInfo?.nama ?? "-",
      }));
    });
  }, []);

  const schoolOptions = schoolList.map((s) => s.nama);

  const kelasOptions = [...new Set(allStudents.map((s) => s.kelas))].sort();

  const filteredStudents = useMemo(() => {
    return allStudents.filter((student) => {
      const matchSearch =
        student.nama.toLowerCase().includes(search.toLowerCase()) ||
        student.nisn.includes(search);

      const matchSchool =
        schoolFilter === "all" ? true : student.schoolName === schoolFilter;

      const matchKelas =
        kelasFilter === "all" ? true : student.kelas === kelasFilter;

      const status =
        student.risiko >= 75
          ? "tinggi"
          : student.risiko >= 50
            ? "sedang"
            : "rendah";

      const matchRisk = riskFilter === "all" ? true : status === riskFilter;

      return matchSearch && matchSchool && matchKelas && matchRisk;
    });
  }, [allStudents, search, schoolFilter, kelasFilter, riskFilter]);

  const totalPages = Math.ceil(filteredStudents.length / pageSize);

  const paginatedStudents = filteredStudents.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const totalHigh = allStudents.filter((s) => s.risiko >= 75).length;

  const totalMedium = allStudents.filter(
    (s) => s.risiko >= 50 && s.risiko < 75,
  ).length;

  const totalLow = allStudents.filter((s) => s.risiko < 50).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* SUMMARY */}

        <div className="grid md:grid-cols-4 gap-5">
          <SummaryCard
            title="Total Siswa"
            value={allStudents.length}
            icon={<Users size={22} />}
          />

          <SummaryCard
            title="Risiko Tinggi"
            value={totalHigh}
            color="text-red-600"
            icon={<AlertTriangle size={22} />}
          />

          <SummaryCard
            title="Risiko Sedang"
            value={totalMedium}
            color="text-yellow-600"
            icon={<AlertTriangle size={22} />}
          />

          <SummaryCard
            title="Risiko Rendah"
            value={totalLow}
            color="text-green-600"
            icon={<ShieldCheck size={22} />}
          />
        </div>

        {/* FILTER */}

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-3 text-slate-400"
              />

              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Cari Nama / NISN"
                className="w-full pl-10 pr-4 py-3 rounded-xl border"
              />
            </div>

            <select
              value={schoolFilter}
              onChange={(e) => {
                setSchoolFilter(e.target.value);
                setPage(1);
              }}
              className="border rounded-xl px-4 py-3"
            >
              <option value="all">Semua Sekolah</option>

              {schoolOptions.map((school) => (
                <option key={school} value={school}>
                  {school}
                </option>
              ))}
            </select>

            <select
              value={kelasFilter}
              onChange={(e) => {
                setKelasFilter(e.target.value);
                setPage(1);
              }}
              className="border rounded-xl px-4 py-3"
            >
              <option value="all">Semua Kelas</option>

              {kelasOptions.map((kelas) => (
                <option key={kelas} value={kelas}>
                  {kelas}
                </option>
              ))}
            </select>

            <select
              value={riskFilter}
              onChange={(e) => {
                setRiskFilter(e.target.value);
                setPage(1);
              }}
              className="border rounded-xl px-4 py-3"
            >
              <option value="all">Semua Risiko</option>

              <option value="tinggi">Tinggi</option>

              <option value="sedang">Sedang</option>

              <option value="rendah">Rendah</option>
            </select>
          </div>
        </div>

        {/* TABLE */}

        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-5 border-b">
            <h3 className="font-semibold">Data Siswa</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 text-sm">
                  <th className="p-4 text-center">#</th>

                  <th className="p-4 text-left">NISN</th>

                  <th className="p-4 text-left">Nama Siswa</th>

                  <th className="p-4 text-center">Kelas</th>

                  <th className="p-4 text-center">Literasi</th>

                  <th className="p-4 text-center">Numerasi</th>

                  <th className="p-4 text-center">Sains</th>

                  <th className="p-4 text-center">Status Risiko</th>

                  <th className="p-4 text-center">Probabilitas</th>

                  <th className="p-4 text-left">Faktor ATS</th>

                  <th className="p-4 text-center">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {paginatedStudents.map((student, index) => {
                  const status =
                    student.risiko >= 75
                      ? "Tinggi"
                      : student.risiko >= 50
                        ? "Sedang"
                        : "Rendah";

                  const faktorATS =
                    student.risiko >= 75
                      ? "Prestasi Akademik"
                      : student.risiko >= 50
                        ? "Kehadiran"
                        : "Stabil";

                  return (
                    <tr
                      key={student.id}
                      className="border-t hover:bg-slate-50 transition"
                    >
                      <td className="p-4 text-center font-semibold">
                        {(page - 1) * pageSize + index + 1}
                      </td>

                      {/* NISN */}
                      <td className="p-4 font-mono text-sm">{student.nisn}</td>

                      {/* Nama */}
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-slate-800">
                            {student.nama}
                          </p>

                          <p className="text-xs text-slate-500">
                            {student.schoolName}
                          </p>
                        </div>
                      </td>

                      {/* Kelas */}
                      <td className="p-4 text-center">{student.kelas}</td>

                      {/* Literasi */}
                      <td className="p-4 text-center">{student.literasi}</td>

                      {/* Numerasi */}
                      <td className="p-4 text-center">{student.numerasi}</td>

                      {/* Sains */}
                      <td className="p-4 text-center">{student.sains}</td>

                      {/* Status Risiko */}
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

                      {/* Probabilitas */}
                      <td className="p-4 min-w-[140px]">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-slate-200 rounded-full">
                            <div
                              className={`h-2 rounded-full ${
                                student.risiko >= 75
                                  ? "bg-red-500"
                                  : student.risiko >= 50
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                              }`}
                              style={{
                                width: `${student.risiko}%`,
                              }}
                            />
                          </div>

                          <span className="text-sm font-semibold min-w-[45px]">
                            {student.risiko}%
                          </span>
                        </div>
                      </td>

                      {/* Faktor ATS */}
                      <td className="p-4">
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">
                          {faktorATS}
                        </span>
                      </td>

                      {/* Aksi */}
                      {/* Aksi */}
                      <td className="p-4 text-center">
                        {(status === "Tinggi" || status === "Sedang") && (
                          <button
                            onClick={() => setSelectedStudent(student)}
                            className="
        px-3 py-2
        rounded-xl
        bg-blue-600
        text-white
        text-sm
        hover:bg-blue-700
      "
                          >
                            Tindak Lanjut
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}

          <div className="p-5 border-t flex justify-between items-center">
            <p className="text-sm text-slate-500">
              Menampilkan {(page - 1) * pageSize + 1}-
              {Math.min(page * pageSize, filteredStudents.length)}
            </p>

            <div className="flex gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 border rounded-xl"
              >
                Prev
              </button>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 border rounded-xl"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-end">
          <div className="w-full max-w-2xl bg-white h-full overflow-y-auto shadow-xl">
            <div className="p-6 border-b flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">Tindak Lanjut Kasus ATS</h2>

                <p className="text-sm text-slate-500">{selectedStudent.nama}</p>
              </div>

              <button
                onClick={() => setSelectedStudent(null)}
                className="text-slate-500"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Identitas */}
              <div>
                <h3 className="font-semibold mb-3">Profil Siswa</h3>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <Info label="NISN" value={selectedStudent.nisn} />
                  <Info label="Kelas" value={selectedStudent.kelas} />
                  <Info label="Literasi" value={selectedStudent.literasi} />
                  <Info label="Numerasi" value={selectedStudent.numerasi} />
                  <Info label="Sains" value={selectedStudent.sains} />
                  <Info
                    label="Probabilitas ATS"
                    value={`${selectedStudent.risiko}%`}
                  />
                </div>
              </div>

              {/* Faktor ATS */}
              <div>
                <h3 className="font-semibold mb-3">Faktor Risiko ATS</h3>

                <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                  Prestasi Akademik Rendah
                </div>
              </div>

              {/* Rekomendasi */}
              <div>
                <h3 className="font-semibold mb-3">Rekomendasi Intervensi</h3>

                <ul className="space-y-2 text-sm">
                  <li>✓ Pendampingan belajar intensif</li>
                  <li>✓ Monitoring kehadiran mingguan</li>
                  <li>✓ Konseling siswa dan orang tua</li>
                </ul>
              </div>

              {/* Lintas Sektor */}
              <div>
                <h3 className="font-semibold mb-3">Rujukan Lintas Sektor</h3>

                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" />
                    Dinas Sosial
                  </label>

                  <label className="flex items-center gap-3">
                    <input type="checkbox" />
                    Dinas PPPA
                  </label>

                  <label className="flex items-center gap-3">
                    <input type="checkbox" />
                    Puskesmas
                  </label>

                  <label className="flex items-center gap-3">
                    <input type="checkbox" />
                    Pemerintah Kalurahan
                  </label>
                </div>
              </div>

              {/* Status */}
              <div>
                <h3 className="font-semibold mb-3">Status Penanganan</h3>

                <select className="w-full border rounded-xl px-4 py-3">
                  <option>Belum Ditindaklanjuti</option>
                  <option>Dalam Pendampingan</option>
                  <option>Selesai</option>
                </select>
              </div>

              <button className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold">
                Simpan Tindak Lanjut
              </button>
            </div>
          </div>
        </div>
      )}
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
      <div className="flex justify-between">
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

function Info({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-slate-500 text-xs">{label}</p>

      <p className="font-semibold">{value}</p>
    </div>
  );
}
