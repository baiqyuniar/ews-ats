import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import { Users, AlertTriangle, BookOpen, Calculator } from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  Legend,
} from "recharts";

import { schoolList } from "../../data/schoolList";
import { schoolDetails } from "../../data/schoolDetail";

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-slate-500 text-sm">{title}</p>

          <h3 className="text-4xl font-bold text-slate-800 mt-2">{value}</h3>
        </div>

        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function DashboardSchoolPage() {
  const { id } = useParams();

  // STATE
  const [studentPage, setStudentPage] = useState(1);
  const [searchStudent, setSearchStudent] = useState("");
  const [kelasFilter, setKelasFilter] = useState("all");
  const [risikoFilter, setRisikoFilter] = useState("all");

  // DATA SEKOLAH
  const school = schoolList.find((item) => item.id === Number(id));

  const schoolDetail = schoolDetails.find(
    (item) => item.schoolId === Number(id),
  );

  const students = schoolDetail?.students ?? [];

  // FILTER OPTION
  const kelasOptions = [...new Set(students.map((s) => s.kelas))].sort();

  // FILTER SISWA
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchSearch =
        student.nama.toLowerCase().includes(searchStudent.toLowerCase()) ||
        student.nisn.includes(searchStudent);

      const matchKelas =
        kelasFilter === "all" ? true : student.kelas === kelasFilter;

      const status =
        student.risiko >= 75
          ? "tinggi"
          : student.risiko >= 50
            ? "sedang"
            : "rendah";

      const matchRisiko =
        risikoFilter === "all" ? true : status === risikoFilter;

      return matchSearch && matchKelas && matchRisiko;
    });
  }, [students, searchStudent, kelasFilter, risikoFilter]);

  // PAGINATION
  const pageSize = 10;

  const totalStudentPages = Math.ceil(filteredStudents.length / pageSize);

  const paginatedStudents = filteredStudents.slice(
    (studentPage - 1) * pageSize,
    studentPage * pageSize,
  );

  // STATISTIK
  const totalSiswa = students.length;

  const totalHigh = students.filter((s) => s.risiko >= 75).length;

  const avgLiterasi =
    totalSiswa > 0
      ? students.reduce((a, b) => a + b.literasi, 0) / totalSiswa
      : 0;

  const avgNumerasi =
    totalSiswa > 0
      ? students.reduce((a, b) => a + b.numerasi, 0) / totalSiswa
      : 0;

  // PIE CHART
  const riskData = [
    {
      name: "Rendah",
      value: students.filter((s) => s.risiko < 50).length,
      color: "#22c55e",
    },
    {
      name: "Sedang",
      value: students.filter((s) => s.risiko >= 50 && s.risiko < 75).length,
      color: "#facc15",
    },
    {
      name: "Tinggi",
      value: students.filter((s) => s.risiko >= 75).length,
      color: "#ef4444",
    },
  ];

  // BAR CHART
  const classData = Object.entries(
    students.reduce<Record<string, number>>((acc, student) => {
      if (student.risiko >= 75) {
        acc[student.kelas] = (acc[student.kelas] || 0) + 1;
      }

      return acc;
    }, {}),
  ).map(([kelas, siswa]) => ({
    kelas,
    siswa,
  }));

  // PRIORITAS INTERVENSI
  const priorityStudents = [...students]
    .sort((a, b) => b.risiko - a.risiko)
    .slice(0, 6);

  // NOT FOUND
  if (!school || !schoolDetail) {
    return (
      <DashboardLayout>
        <div className="bg-white rounded-3xl p-10">Sekolah tidak ditemukan</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* HEADER */}

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white">
          <div className="flex justify-between flex-col md:flex-row">
            <div>
              <p className="uppercase text-blue-100 text-sm">
                Dashboard Sekolah
              </p>

              <h1 className="text-4xl font-bold mt-2">{school.nama}</h1>

              <p className="text-blue-100 mt-3">{school.kepanewon}</p>
            </div>

            <div className="mt-4 md:mt-0 text-right">
              <p className="text-blue-100">Tahun Ajaran</p>

              <p className="text-3xl font-bold">2025 / 2026</p>
            </div>
          </div>
        </div>

        {/* STAT */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          <StatCard
            title="Total Siswa"
            value={totalSiswa}
            icon={<Users size={28} />}
          />

          <StatCard
            title="Risiko Tinggi"
            value={totalHigh}
            icon={<AlertTriangle size={28} />}
          />

          <StatCard
            title="Rata-rata Literasi"
            value={avgLiterasi.toFixed(1)}
            icon={<BookOpen size={28} />}
          />

          <StatCard
            title="Rata-rata Numerasi"
            value={avgNumerasi.toFixed(1)}
            icon={<Calculator size={28} />}
          />
        </div>

        {/* CHART */}

        <div className="grid xl:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-800 mb-6">
              Distribusi Risiko Siswa
            </h3>

            <div className="grid lg:grid-cols-[320px_1fr] gap-6 items-center">
              {/* PIE */}
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={riskData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={100}
                      innerRadius={60}
                      paddingAngle={4}
                    >
                      {riskData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>

                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* LEGEND CUSTOM */}
              <div className="space-y-4">
                {riskData.map((item) => {
                  const total = riskData.reduce((a, b) => a + b.value, 0);

                  const percentage = ((item.value / total) * 100).toFixed(1);

                  return (
                    <div
                      key={item.name}
                      className="border border-slate-200 rounded-2xl p-4"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{
                              backgroundColor: item.color,
                            }}
                          />

                          <span className="font-medium text-slate-700">
                            {item.name}
                          </span>
                        </div>

                        <span className="font-bold text-slate-800">
                          {item.value}
                        </span>
                      </div>

                      <div className="mt-3">
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${percentage}%`,
                              backgroundColor: item.color,
                            }}
                          />
                        </div>

                        <p className="text-xs text-slate-500 mt-2">
                          {percentage}% dari total siswa
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200">
            <h3 className="font-semibold mb-5">Risiko Tinggi per Kelas</h3>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={classData}>
                <XAxis dataKey="kelas" />
                <Tooltip />
                <Bar dataKey="siswa" fill="#2563eb" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PRIORITAS */}

        <div className="bg-white rounded-3xl p-6 border border-slate-200">
          <h3 className="font-semibold text-red-600 mb-5">
            Siswa Prioritas Intervensi
          </h3>

          <div className="grid md:grid-cols-3 gap-4">
            {priorityStudents.map((student) => (
              <div
                key={student.id}
                className="bg-red-50 border border-red-200 rounded-2xl p-5"
              >
                <h4 className="font-bold">{student.nama}</h4>

                <p className="text-sm text-slate-500 mt-2">{student.kelas}</p>

                <p className="text-3xl font-bold text-red-600 mt-3">
                  {student.risiko}%
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SISWA */}

        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-200">
            <div className="flex flex-col lg:flex-row gap-4 justify-between">
              <div>
                <h3 className="font-semibold text-lg">Daftar Siswa</h3>

                <p className="text-sm text-slate-500">
                  Menampilkan {filteredStudents.length} siswa
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <input
                  type="text"
                  placeholder="Cari nama / NISN..."
                  value={searchStudent}
                  onChange={(e) => {
                    setSearchStudent(e.target.value);
                    setStudentPage(1);
                  }}
                  className="px-4 py-2 border rounded-xl"
                />

                <select
                  value={kelasFilter}
                  onChange={(e) => {
                    setKelasFilter(e.target.value);
                    setStudentPage(1);
                  }}
                  className="px-4 py-2 border rounded-xl"
                >
                  <option value="all">Semua Kelas</option>

                  {kelasOptions.map((kelas) => (
                    <option key={kelas} value={kelas}>
                      {kelas}
                    </option>
                  ))}
                </select>

                <select
                  value={risikoFilter}
                  onChange={(e) => {
                    setRisikoFilter(e.target.value);
                    setStudentPage(1);
                  }}
                  className="px-4 py-2 border rounded-xl"
                >
                  <option value="all">Semua Risiko</option>

                  <option value="tinggi">Tinggi</option>

                  <option value="sedang">Sedang</option>

                  <option value="rendah">Rendah</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="p-4 text-center">No</th>
                  <th className="p-4 text-left">NISN</th>
                  <th className="p-4 text-left">Nama</th>
                  <th className="p-4 text-center">Kelas</th>
                  <th className="p-4 text-center">Literasi</th>
                  <th className="p-4 text-center">Numerasi</th>
                  <th className="p-4 text-center">Risiko</th>
                  <th className="p-4 text-center">Status</th>
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

                  return (
                    <tr key={student.id} className="border-t hover:bg-slate-50">
                      <td className="p-4 text-center">
                        {(studentPage - 1) * pageSize + index + 1}
                      </td>

                      <td className="p-4">{student.nisn}</td>

                      <td className="p-4 font-medium">{student.nama}</td>

                      <td className="p-4 text-center">{student.kelas}</td>

                      <td className="p-4 text-center">{student.literasi}</td>

                      <td className="p-4 text-center">{student.numerasi}</td>

                      <td className="p-4 text-center font-semibold">
                        {student.risiko}%
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
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="p-5 border-t border-slate-200 flex justify-between items-center">
              <p className="text-sm text-slate-500">
                Menampilkan {(studentPage - 1) * pageSize + 1}
                {" - "}
                {Math.min(studentPage * pageSize, filteredStudents.length)}
                {" dari "}
                {filteredStudents.length} siswa
              </p>

              <div className="flex gap-2">
                <button
                  disabled={studentPage === 1}
                  onClick={() => setStudentPage(studentPage - 1)}
                  className="px-4 py-2 border rounded-xl disabled:opacity-50"
                >
                  Prev
                </button>

                {Array.from(
                  {
                    length: totalStudentPages,
                  },
                  (_, i) => i + 1,
                )
                  .slice(
                    Math.max(studentPage - 3, 0),
                    Math.max(studentPage - 3, 0) + 5,
                  )
                  .map((p) => (
                    <button
                      key={p}
                      onClick={() => setStudentPage(p)}
                      className={`w-10 h-10 rounded-xl ${
                        p === studentPage ? "bg-blue-600 text-white" : "border"
                      }`}
                    >
                      {p}
                    </button>
                  ))}

                <button
                  disabled={studentPage === totalStudentPages}
                  onClick={() => setStudentPage(studentPage + 1)}
                  className="px-4 py-2 border rounded-xl disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
