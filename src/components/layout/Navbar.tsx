import { Bell } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const pageConfig: Record<
    string,
    {
      title: string;
      description: string;
    }
  > = {
    "/dashboard": {
      title: "Dashboard EWS ATS",
      description: "Monitoring risiko anak tidak sekolah Kabupaten Sleman",
    },

    "/risk-map": {
      title: "Peta Risiko Kabupaten Sleman",
      description: "Visualisasi persebaran risiko anak tidak sekolah",
    },

    "/login": {
      title: "Login",
      description: "Masuk ke sistem",
    },

    "/schools": {
      title: "Daftar Satuan Pendidikan",
      description: "Monitoring seluruh sekolah Kabupaten Sleman",
    },

    "/schools/:id": {
      title: "Daftar Satuan Pendidikan",
      description: "Monitoring seluruh sekolah Kabupaten Sleman",
    },

    "/students": {
      title: "Daftar Siswa",
      description: "Monitoring seluruh siswa lintas sekolah",
    },

    "/dropouts": {
      title: "Data Anak Tidak Sekolah (ATS)",
      description:
        "Monitoring dan penanganan anak putus sekolah di Kabupaten Sleman",
    },

    "/dropouts/:id": {
      title: "Detail Kasus ATS",
      description:
        "Data identitas, faktor penyebab, rekomendasi intervensi, dan monitoring penanganan lintas sektor.",
    },

    "/interventions": {
      title: "Kasus Intervensi ATS",
      description: "Monitoring seluruh kasus ATS yang sedang ditangani OPD.",
    },

    "/ews-report": {
      title: "Laporan Siswa Berisiko",
      description: "Laporan Monitoring Siswa Berisiko Putus Sekolah",
    },

    "/ews-report/create": {
      title: "Buat Laporan Risiko",
      description: "Laporan Monitoring Siswa Berisiko Putus Sekolah",
    },

    "/opd-monitoring": {
      title: "Monitoring Intervensi OPD",
      description:
        "  Monitoring progres penanganan kasus ATS lintas OPD Kabupaten Sleman",
    },

    "/prediction": {
      title: "Simulasi Prediksi Risiko",
      description: "Simulasi probabilitas risiko anak tidak sekolah",
    },
    "/upload-prediction": {
      title: "Upload & Prediksi Batch",
      description:
        "Upload file Excel dan lakukan prediksi risiko siswa secara massal.",
    },
  };

  let currentPage = pageConfig[location.pathname];

  if (!currentPage && location.pathname.startsWith("/schools/")) {
    currentPage = {
      title: "Dashboard Sekolah",
      description: "Monitoring risiko siswa dan capaian sekolah",
    };
  }

  if (!currentPage && location.pathname.startsWith("/dropouts/")) {
    currentPage = {
      title: "Detail Kasus ATS",
      description:
        "Data identitas, faktor penyebab, rekomendasi intervensi, dan monitoring penanganan lintas sektor.",
    };
  }

  if (!currentPage && location.pathname.startsWith("/interventions/")) {
    currentPage = {
      title: "Detail Intervensi ATS",
      description: "Monitoring progres penanganan kasus ATS",
    };
  }

  return (
    <header className="h-20 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          {currentPage.title}
        </h1>

        <p className="text-sm text-slate-500">{currentPage.description}</p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <button className="relative w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition">
          <Bell size={20} />

          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold">
            A
          </div>

          <div className="hidden md:block">
            <p className="font-semibold text-slate-800">Admin Kabupaten</p>

            <p className="text-sm text-slate-500">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}
