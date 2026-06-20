export interface DropoutStudent {
  id: number;

  ats_id?: string;

  nisn: string;

  nik: string;

  nama: string;

  jenis_kelamin: string;

  nama_sekolah: string;

  tingkat_pendidikan: string;

  kecamatan: string;

  desa_kelurahan: string;

  status: string;

  alasan_do?: string;

  keterangan?: string;

  ingin_kembali_sekolah: boolean;

  tanggal_verifikasi?: string;

  created_at?: string;
}

export interface DropoutStats {
  total: number;

  inginKembali: number;

  sudahVerifikasi: number;

  belumVerifikasi: number;
}
