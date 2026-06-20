export const getEWSReports = async () => {
  return [
    {
      id: 1,
      nisn: "1234567890",
      nama: "Budi Santoso",
      sekolah: "SMPN 1 Wonogiri",
      kelas: "VIII",
      pelapor: "Wali Kelas",
      risiko: "Tinggi",
      status: "Draft",
      tanggal: "2026-06-19",
    },
    {
      id: 2,
      nisn: "987654321",
      nama: "Siti Aminah",
      sekolah: "SMPN 2 Wonogiri",
      kelas: "VII",
      pelapor: "Guru BK",
      risiko: "Sedang",
      status: "Terverifikasi",
      tanggal: "2026-06-18",
    },
  ];
};
