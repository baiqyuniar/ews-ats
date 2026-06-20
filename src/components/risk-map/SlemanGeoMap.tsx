import { useState } from "react";

export default function SlemanGeoMap() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const regions = [
    {
      id: "tempel",
      name: "Tempel",
      value: 72,
      path: "M180 80 L280 70 L330 130 L290 190 L190 180 L150 120 Z",
      labelX: 240,
      labelY: 135,
    },
    {
      id: "turi",
      name: "Turi",
      value: 65,
      path: "M330 60 L450 50 L500 120 L470 190 L350 180 L330 130 Z",
      labelX: 410,
      labelY: 125,
    },
    {
      id: "pakem",
      name: "Pakem",
      value: 88,
      path: "M500 70 L630 80 L670 160 L620 220 L500 200 L470 130 Z",
      labelX: 570,
      labelY: 145,
    },
    {
      id: "cangkringan",
      name: "Cangkringan",
      value: 55,
      path: "M650 110 L770 140 L800 240 L700 280 L620 220 L670 160 Z",
      labelX: 715,
      labelY: 205,
    },
    {
      id: "minggir",
      name: "Minggir",
      value: 35,
      path: "M80 220 L180 200 L210 300 L160 380 L70 350 L50 270 Z",
      labelX: 130,
      labelY: 290,
    },
    {
      id: "seyegan",
      name: "Seyegan",
      value: 48,
      path: "M190 190 L320 190 L350 290 L270 360 L170 340 L210 300 Z",
      labelX: 260,
      labelY: 275,
    },
    {
      id: "sleman",
      name: "Sleman",
      value: 74,
      path: "M350 190 L470 190 L510 300 L430 360 L320 340 L320 260 Z",
      labelX: 415,
      labelY: 275,
    },
    {
      id: "ngaglik",
      name: "Ngaglik",
      value: 93,
      path: "M470 190 L620 220 L650 340 L520 390 L430 360 L510 300 Z",
      labelX: 545,
      labelY: 295,
    },
    {
      id: "ngemplak",
      name: "Ngemplak",
      value: 58,
      path: "M650 250 L790 280 L820 390 L710 450 L590 390 L650 340 Z",
      labelX: 720,
      labelY: 355,
    },
    {
      id: "moyudan",
      name: "Moyudan",
      value: 40,
      path: "M70 350 L170 340 L190 450 L130 530 L50 500 L40 410 Z",
      labelX: 120,
      labelY: 435,
    },
    {
      id: "godean",
      name: "Godean",
      value: 76,
      path: "M170 340 L320 340 L350 460 L240 530 L140 520 L190 450 Z",
      labelX: 250,
      labelY: 435,
    },
    {
      id: "mlati",
      name: "Mlati",
      value: 91,
      path: "M320 340 L430 360 L460 470 L360 540 L240 530 L350 460 Z",
      labelX: 360,
      labelY: 445,
    },
    {
      id: "depok",
      name: "Depok",
      value: 99,
      path: "M430 360 L590 390 L610 500 L470 560 L360 540 L460 470 Z",
      labelX: 500,
      labelY: 465,
    },
    {
      id: "kalasan",
      name: "Kalasan",
      value: 62,
      path: "M590 390 L710 450 L740 560 L620 610 L500 560 L610 500 Z",
      labelX: 635,
      labelY: 510,
    },
    {
      id: "gamping",
      name: "Gamping",
      value: 81,
      path: "M180 520 L330 520 L360 620 L250 670 L140 630 L130 530 Z",
      labelX: 255,
      labelY: 590,
    },
    {
      id: "berbah",
      name: "Berbah",
      value: 50,
      path: "M470 560 L620 610 L620 700 L490 730 L400 660 Z",
      labelX: 530,
      labelY: 645,
    },
    {
      id: "prambanan",
      name: "Prambanan",
      value: 45,
      path: "M620 610 L760 590 L820 700 L690 760 L620 700 Z",
      labelX: 710,
      labelY: 670,
    },
  ];

  const schoolData = {
    tempel: [
      {
        name: "SMP Negeri 1 Tempel",
        risk: 72,
        status: "Tinggi",
      },
    ],

    turi: [
      {
        name: "SD Negeri Turi",
        risk: 65,
        status: "Tinggi",
      },
    ],

    pakem: [
      {
        name: "SMA Negeri Pakem",
        risk: 88,
        status: "Sangat Tinggi",
      },
    ],

    cangkringan: [
      {
        name: "SMK Cangkringan",
        risk: 55,
        status: "Sedang",
      },
    ],

    minggir: [
      {
        name: "SD Negeri Minggir",
        risk: 35,
        status: "Rendah",
      },
    ],

    seyegan: [
      {
        name: "SMP Negeri Seyegan",
        risk: 48,
        status: "Sedang",
      },
    ],

    sleman: [
      {
        name: "SMA Negeri Sleman",
        risk: 74,
        status: "Tinggi",
      },
    ],

    ngaglik: [
      {
        name: "SMK Ngaglik",
        risk: 93,
        status: "Kritis",
      },
    ],

    ngemplak: [
      {
        name: "SMP Negeri Ngemplak",
        risk: 58,
        status: "Sedang",
      },
    ],

    moyudan: [
      {
        name: "SD Negeri Moyudan",
        risk: 40,
        status: "Rendah",
      },
    ],

    godean: [
      {
        name: "SMP Negeri 1 Godean",
        risk: 92,
        status: "Kritis",
      },
      {
        name: "SD Negeri Sidomoyo",
        risk: 68,
        status: "Tinggi",
      },
      {
        name: "SMK Muhammadiyah Godean",
        risk: 40,
        status: "Rendah",
      },
    ],

    mlati: [
      {
        name: "SMK Negeri Mlati",
        risk: 91,
        status: "Kritis",
      },
    ],

    depok: [
      {
        name: "SMA Negeri 1 Depok",
        risk: 97,
        status: "Kritis",
      },
      {
        name: "SMP Negeri 2 Depok",
        risk: 80,
        status: "Sangat Tinggi",
      },
    ],

    kalasan: [
      {
        name: "SMK Kalasan",
        risk: 62,
        status: "Tinggi",
      },
    ],

    gamping: [
      {
        name: "SMA Gamping",
        risk: 81,
        status: "Sangat Tinggi",
      },
    ],

    berbah: [
      {
        name: "SMP Negeri Berbah",
        risk: 50,
        status: "Sedang",
      },
    ],

    prambanan: [
      {
        name: "SMK Prambanan",
        risk: 45,
        status: "Sedang",
      },
    ],
  };

  const getColor = (value: number) => {
    if (value >= 90) return "#EF4444"; // Critical
    if (value >= 75) return "#FB923C"; // High
    if (value >= 60) return "#FDE047"; // Medium
    if (value >= 45) return "#86EFAC"; // Low

    return "#4ADE80"; // Very Low
  };

  const getTextColor = (value: number) => {
    return value >= 75 ? "#ffffff" : "#111827";
  };

  const selectedSchools =
    schoolData[selectedRegion as keyof typeof schoolData] || [];

  return (
    <div className="space-y-6">
      {/* MAP */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 overflow-hidden shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-800">
            Heatmap Kepanewon
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Klik wilayah untuk melihat sekolah
          </p>
        </div>

        <div className="w-full overflow-auto">
          <svg viewBox="0 0 900 820" className="w-full h-auto min-w-[700px]">
            {regions.map((region) => (
              <g key={region.id}>
                <path
                  d={region.path}
                  fill={getColor(region.value)}
                  stroke={
                    selectedRegion === region.id
                      ? "#ffffff"
                      : "rgba(255,255,255,0.2)"
                  }
                  strokeWidth={selectedRegion === region.id ? 5 : 2}
                  className="transition-all duration-300 cursor-pointer hover:brightness-110"
                  onClick={() => setSelectedRegion(region.id)}
                />

                <text
                  x={region.labelX}
                  y={region.labelY}
                  textAnchor="middle"
                  fontSize="15"
                  fontWeight="700"
                  fill={getTextColor(region.value)}
                  style={{ pointerEvents: "none" }}
                >
                  {region.name}
                </text>

                <text
                  x={region.labelX}
                  y={region.labelY + 24}
                  textAnchor="middle"
                  fontSize="22"
                  fontWeight="800"
                  fill={getTextColor(region.value)}
                  style={{ pointerEvents: "none" }}
                >
                  {region.value}
                </text>
              </g>
            ))}
          </svg>
          <div className="flex flex-wrap items-center gap-6 mt-6 px-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-500" />
              <span className="text-sm text-slate-600 font-medium">
                Kritis (90+)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-orange-400" />
              <span className="text-sm text-slate-600 font-medium">
                Tinggi (75-89)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-yellow-300" />
              <span className="text-sm text-slate-600 font-medium">
                Sedang (60-74)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-300" />
              <span className="text-sm text-slate-600 font-medium">
                Rendah (45-59)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-500" />
              <span className="text-sm text-slate-600 font-medium">
                Sangat Rendah (&lt;45)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      {selectedRegion && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div className="mb-5">
            <h3 className="text-2xl font-bold text-slate-800">
              Data Sekolah -{" "}
              {regions.find((r) => r.id === selectedRegion)?.name}
            </h3>

            <p className="text-slate-500 mt-1">
              Total sekolah: {selectedSchools.length}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-100 text-slate-600">
                  <th className="px-4 py-3 text-left rounded-l-2xl">
                    Nama Sekolah
                  </th>

                  <th className="px-4 py-3 text-left">Risiko</th>

                  <th className="px-4 py-3 text-left rounded-r-2xl">Status</th>
                </tr>
              </thead>

              <tbody>
                {selectedSchools.map((school, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-4 py-4 font-medium text-slate-800">
                      {school.name}
                    </td>

                    <td className="px-4 py-4 font-bold text-slate-700">
                      {school.risk}
                    </td>

                    <td className="px-4 py-4">
                      <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium">
                        {school.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {selectedSchools.length === 0 && (
              <div className="text-center py-10 text-slate-500">
                Tidak ada data sekolah
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
