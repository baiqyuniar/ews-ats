import { useState } from "react";
import { Save, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

export default function EWSReportCreatePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nisn: "",
    nama: "",
    sekolah: "",
    kelas: "",
    pelapor: "",
    catatan: "",
  });

  const [selectedFactors, setSelectedFactors] = useState<string[]>([]);

  const riskFactors = [
    "Kehadiran Rendah",
    "Kesulitan Ekonomi",
    "Bekerja Membantu Orang Tua",
    "Bullying",
    "Kekerasan Dalam Rumah Tangga",
    "Disabilitas",
    "Jarak Rumah Jauh",
    "Tidak Naik Kelas",
    "Menikah Dini",
    "Tidak Memiliki Dokumen Kependudukan",
    "Lainnya",
  ];

  const handleFactorChange = (factor: string) => {
    if (selectedFactors.includes(factor)) {
      setSelectedFactors(selectedFactors.filter((f) => f !== factor));
    } else {
      setSelectedFactors([...selectedFactors, factor]);
    }
  };

  const handleSave = async () => {
    console.log({
      ...form,
      faktor_risiko: selectedFactors,
      status: "Draft",
    });

    alert("Draft berhasil disimpan");
  };

  const handleSubmit = async () => {
    console.log({
      ...form,
      faktor_risiko: selectedFactors,
      status: "Dikirim",
    });

    alert("Laporan berhasil dikirim");

    navigate("/ews-reports");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* IDENTITAS SISWA */}

        <div className="bg-white rounded-3xl border p-6">
          <h3 className="font-semibold text-lg mb-5">Identitas Siswa</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              placeholder="NISN"
              value={form.nisn}
              onChange={(e) =>
                setForm({
                  ...form,
                  nisn: e.target.value,
                })
              }
              className="border rounded-xl px-4 py-3"
            />

            <input
              placeholder="Nama"
              value={form.nama}
              onChange={(e) =>
                setForm({
                  ...form,
                  nama: e.target.value,
                })
              }
              className="border rounded-xl px-4 py-3"
            />

            <input
              placeholder="Sekolah"
              value={form.sekolah}
              onChange={(e) =>
                setForm({
                  ...form,
                  sekolah: e.target.value,
                })
              }
              className="border rounded-xl px-4 py-3"
            />

            <input
              placeholder="Kelas"
              value={form.kelas}
              onChange={(e) =>
                setForm({
                  ...form,
                  kelas: e.target.value,
                })
              }
              className="border rounded-xl px-4 py-3"
            />

            <input
              placeholder="Pelapor"
              value={form.pelapor}
              onChange={(e) =>
                setForm({
                  ...form,
                  pelapor: e.target.value,
                })
              }
              className="border rounded-xl px-4 py-3"
            />
          </div>
        </div>

        {/* FAKTOR RISIKO */}

        <div className="bg-white rounded-3xl border p-6">
          <h3 className="font-semibold text-lg mb-5">Faktor Risiko</h3>

          <div className="grid md:grid-cols-2 gap-3">
            {riskFactors.map((factor) => (
              <label
                key={factor}
                className="
                  flex
                  items-center
                  gap-3
                  border
                  rounded-xl
                  p-3
                  hover:bg-slate-50
                  cursor-pointer
                "
              >
                <input
                  type="checkbox"
                  checked={selectedFactors.includes(factor)}
                  onChange={() => handleFactorChange(factor)}
                />

                {factor}
              </label>
            ))}
          </div>
        </div>

        {/* CATATAN */}

        <div className="bg-white rounded-3xl border p-6">
          <h3 className="font-semibold text-lg mb-5">Catatan Guru</h3>

          <textarea
            rows={5}
            value={form.catatan}
            onChange={(e) =>
              setForm({
                ...form,
                catatan: e.target.value,
              })
            }
            className="
              w-full
              border
              rounded-xl
              p-4
            "
            placeholder="Tuliskan kondisi siswa..."
          />
        </div>

        {/* ACTION */}

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="
              px-5 py-3
              bg-slate-600
              text-white
              rounded-xl
              flex items-center gap-2
            "
          >
            <Save size={18} />
            Simpan Draft
          </button>

          <button
            onClick={handleSubmit}
            className="
              px-5 py-3
              bg-blue-600
              text-white
              rounded-xl
              flex items-center gap-2
            "
          >
            <Send size={18} />
            Kirim Laporan
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
