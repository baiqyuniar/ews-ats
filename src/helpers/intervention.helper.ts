export function getRecommendedInterventions(reason: string): string[] {
  const mapping: Record<string, string[]> = {
    "Tidak ada biaya": ["Bantuan Sosial", "Program KIP", "Beasiswa Daerah"],

    Bekerja: ["Konseling keluarga", "Pendidikan Kesetaraan"],

    "Tidak memiliki akta kelahiran": ["Penerbitan Akta Kelahiran"],

    "Sekolah jauh dari rumah": ["Mutasi Sekolah", "Bantuan Transportasi"],

    "Mengalami kekerasan/perundungan/trauma di sekolah": [
      "Pendampingan Psikologis",
      "Mediasi Sekolah",
    ],

    "Masalah kesehatan/penyandang disabilitas": [
      "Rujukan Kesehatan",
      "Pendampingan Disabilitas",
    ],
  };

  return mapping[reason] || [];
}
