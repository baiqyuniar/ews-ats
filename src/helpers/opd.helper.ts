export function getRecommendedOPD(reason: string): string[] {
  const mapping: Record<string, string[]> = {
    "Tidak mau bersekolah": ["Dinas Pendidikan", "Sekolah", "DP3AP2KB"],

    "Tidak ada biaya": ["Dinas Sosial", "Dinas Pendidikan"],

    "Sekolah jauh dari rumah": ["Dinas Pendidikan", "Dinas Perhubungan"],

    "Sudah cukup dengan tingkat pendidikan yang dimiliki saat ini": [
      "Dinas Pendidikan",
    ],

    "Menikah/mengurus rumah tangga": ["DP3AP2KB", "Dinas Pendidikan"],

    "Mengalami kekerasan/perundungan/trauma di sekolah": [
      "DP3AP2KB",
      "Dinas Pendidikan",
    ],

    Bekerja: ["Dinas Tenaga Kerja", "Dinas Pendidikan"],

    "Pengaruh lingkungan/teman": ["DP3AP2KB", "Dinas Pendidikan"],

    "Beranggapan sekolah tidak penting": ["Dinas Pendidikan", "Sekolah"],

    "Tidak memiliki seragam sekolah": ["Dinas Sosial", "Dinas Pendidikan"],

    "Tidak memiliki akta kelahiran": ["Disdukcapil"],

    "Masalah kesehatan/penyandang disabilitas": [
      "Dinas Kesehatan",
      "Dinas Sosial",
    ],

    "Anak tidak ditemukan": ["Kalurahan", "Kapanewon"],

    "Pindah Domisili": ["Disdukcapil"],

    "Bukan Penduduk Desa Tersebut": ["Disdukcapil", "Kalurahan"],
  };

  return (
    mapping[reason] || [
      "Dinas Pendidikan",
      "Disdukcapil",
      "Kalurahan",
      "Kapanewon",
      "Dinas Kesehatan",
      "Dinas Sosial",
      "DP3AP2KB",
    ]
  );
}
