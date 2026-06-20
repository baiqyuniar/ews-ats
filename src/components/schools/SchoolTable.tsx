import { useState } from "react";

const schools = [
  {
    id: 1,
    name: "MI AL QODIR",
    kapanewon: "Gamping",
    siswa: 87,
    risiko: 74,
    persen: 85.1,
    status: "Tinggi",
  },
  {
    id: 2,
    name: "SD NEGERI JETISJOGOPATEN",
    kapanewon: "Mlati",
    siswa: 6,
    risiko: 5,
    persen: 83.3,
    status: "Tinggi",
  },
  {
    id: 3,
    name: "MIS MUHAMMADIYAH AL MUTTAQIEn",
    kapanewon: "Depok",
    siswa: 45,
    risiko: 36,
    persen: 80,
    status: "Tinggi",
  },
];

export default function SchoolTable() {
  const [search, setSearch] = useState("");

  const filtered = schools.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      {/* Filter */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200">
        <input
          type="text"
          placeholder="Cari sekolah..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full lg:w-96 px-4 py-3 border rounded-xl"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="font-semibold text-slate-800">Semua Sekolah</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-6 py-4">Sekolah</th>
                <th className="text-center px-6 py-4">Kapanewon</th>
                <th className="text-center px-6 py-4">Siswa</th>
                <th className="text-center px-6 py-4">Berisiko</th>
                <th className="text-center px-6 py-4">%</th>
                <th className="text-center px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((school) => (
                <tr key={school.id} className="border-t hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium">{school.name}</td>

                  <td className="text-center">{school.kapanewon}</td>

                  <td className="text-center">{school.siswa}</td>

                  <td className="text-center">{school.risiko}</td>

                  <td className="text-center">{school.persen}</td>

                  <td className="text-center">
                    <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-600">
                      {school.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
